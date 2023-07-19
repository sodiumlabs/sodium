import { TransactionRequest } from "@0xsodium/transactions";
import { StableCoinPaymaster__factory, ERC20__factory, Sodium__factory } from '@0xsodium/wallet-contracts';
import { getNetwork } from "../network";
import { ethers } from 'ethers';
import { PaymasterInfo, AuthData } from "../define";
import { NetworkConfig, createContext } from "@0xsodium/network";
import { MulticallWrapper } from 'ethers-multicall-provider';

const StableCoinPaymasterByChainId = {
    31337: "0x441746A42c895e5b7e8C1136C7aE8ae3ff957dCc"
}
const StableCoinsByChainId = {
    31337: [
        "0x1DD6b5F9281c6B4f043c02A83a46c2772024636c",
        "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
    ],
}

const getNativeTokenPaymasterAndData = async (txn: TransactionRequest, auth: AuthData, network: NetworkConfig): Promise<PaymasterInfo> => {
    const provider = MulticallWrapper.wrap(new ethers.providers.JsonRpcProvider(network.rpcUrl));

    const [
        tokenRates,
        balance,
        userOpBuilder
    ] = await Promise.all([
        auth.web3signer.getTokenRates([
            ethers.constants.AddressZero
        ], network.chainId),
        provider.getBalance(auth.blockchainAddress),
        auth.signer.newUserOpBuilder(network.chainId)
    ]);

    const tokenRate = tokenRates[0];
    const paymasterAndData = "0x";
    const context = createContext(network.context);
    await userOpBuilder.executeTransactions(txn);
    const userOp = await userOpBuilder.buildOp(
        context.entryPointAddress,
        network.chainId
    );

    const gasTotalMaxLimit = ethers.BigNumber.from(userOp.callGasLimit).add(
        userOp.preVerificationGas
    ).add(
        userOp.verificationGasLimit
    );

    // calculate gas fee
    const amount = gasTotalMaxLimit.mul(userOp.maxFeePerGas);

    const expiry = parseInt(`${(new Date().getTime() + 1000 * 60) / 1000}`);

    const paymasterInfo: PaymasterInfo = {
        id: paymasterAndData,
        token: {
            address: ethers.constants.AddressZero,
            chainId: network.chainId,
            decimals: 18,
            symbol: network.nativeTokenSymbol,
            name: network.name,
            centerData: network.centerData,
        },
        userOp: userOp,
        amount: amount,
        balance: balance,
        usdRate: tokenRate,
        expiry: expiry,
    }
    return paymasterInfo;
}

export const buildSimulateStableCoinPayTransfer = (paymaster: string, tokenAddress: string, gasTokenAmount: ethers.BigNumber) => {
    // 如果转账成功说明有足够的gas
    // 这样是为了防止用户支付gas的token和交易需要的token冲突。导致交易失败
    const transferCalldata = ERC20__factory.createInterface().encodeFunctionData("transfer", [
        paymaster,
        gasTokenAmount
    ]);

    return Sodium__factory.createInterface().encodeFunctionData("execute", [
        [
            {
                op: 0,
                revertOnError: true,
                gasLimit: 0,
                target: tokenAddress,
                value: 0,
                data: transferCalldata
            }
        ]
    ]);
}

export const getAllPaymasterAndData = async (txn: TransactionRequest, auth: AuthData, chainId: number): Promise<PaymasterInfo[]> => {
    const nativeTokenPaymaster = await getNativeTokenPaymasterAndData(txn, auth, getNetwork(chainId));
    const paymasterInfos = [
        nativeTokenPaymaster
    ];

    const stableCoinPaymaster = StableCoinPaymasterByChainId[chainId];

    if (!stableCoinPaymaster) {
        return paymasterInfos;
    }

    const stableCoins: string[] | undefined = StableCoinsByChainId[chainId];

    if (!stableCoins) {
        return paymasterInfos;
    }

    const network = getNetwork(chainId);
    const context = createContext(network.context);
    const provider = MulticallWrapper.wrap(new ethers.providers.JsonRpcProvider(network.rpcUrl));
    const contract = StableCoinPaymaster__factory.connect(stableCoinPaymaster, provider);

    const stableCoinsPaymasterInfoPromises = stableCoins.map(async (payTokenAddress) => {
        const payToken = ERC20__factory.connect(payTokenAddress, provider);

        const [balance, decimals, symbol, name] = await Promise.all([
            payToken.balanceOf(auth.blockchainAddress),
            payToken.decimals(),
            payToken.symbol(),
            payToken.name()
        ]);

        if (balance.eq(ethers.utils.parseUnits("5", decimals))) {
            throw new Error("Insufficient balance");
        }

        const paymasterAndData = ethers.utils.hexConcat([
            stableCoinPaymaster,
            "0x095ea7b3",
            payTokenAddress
        ]);

        const userOpBuilder = await auth.signer.newUserOpBuilder(network.chainId);
        await userOpBuilder.executeTransactionsWithPaymasterId(txn, paymasterAndData);
        const userOp = await userOpBuilder.buildOp(
            context.entryPointAddress,
            network.chainId
        );
        const gasTotalMaxLimit = ethers.BigNumber.from(userOp.callGasLimit).add(
            userOp.preVerificationGas
        ).add(
            userOp.verificationGasLimit
        );
        // calculate gas fee
        const ethAmount = gasTotalMaxLimit.mul(userOp.maxFeePerGas);
        const expiry = parseInt(`${(new Date().getTime() + 1000 * 60) / 1000}`);
        const tokenAmount = await contract.getTokenValueOfEth(payTokenAddress, ethAmount);

        const success = await auth.signer.simulateHandleOp(userOp, userOp.sender, buildSimulateStableCoinPayTransfer(
            stableCoinPaymaster,
            payTokenAddress,
            tokenAmount
        ));

        if (!success) {
            throw new Error("Insufficient balance");
        }

        console.info("userOp", userOp)

        const paymasterInfo: PaymasterInfo = {
            id: paymasterAndData,
            token: {
                address: payTokenAddress,
                chainId: network.chainId,
                decimals: decimals,
                symbol: symbol,
                name: name,
                centerData: {},
            },
            balance: balance,
            amount: tokenAmount,
            userOp: userOp,
            usdRate: 1,
            expiry: expiry,
        }
        return paymasterInfo;
    });

    for (let i = 0; i < stableCoinsPaymasterInfoPromises.length; i++) {
        try {
            paymasterInfos.push(await stableCoinsPaymasterInfoPromises[i]);
        } catch (error) {
            console.warn(error);
            continue;
        }
    }

    return paymasterInfos;
}
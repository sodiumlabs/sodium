import { IDecodeTranscation } from "../../../lib/define";
import { ethers } from 'ethers';
import { BaseFoldFrame } from '../../base/baseFoldFrame';
import { Interface } from '@ethersproject/abi';
import MText from '../../baseUI/mText';
import { eColor } from '../../../lib/globalStyles';
import { keccak256 } from "ethers/lib/utils";
import { useCallback, useMemo } from "react";
import { toUtf8Bytes } from "@ethersproject/strings";
import * as WebBrowser from 'expo-web-browser';
import { getAddressExplorer } from '../../../lib/network';

type Props = {
    decodeTxn: IDecodeTranscation;
    key: number;
    transcationIndex: number;
    transcationMaxIndex: number;
    chainId: number
}

export function ABITransaction(props: Props) {
    const { decodeTxn, key, transcationIndex, transcationMaxIndex } = props;
    let contractName = decodeTxn.originTxReq.to;
    let opensource = false;
    let method = decodeTxn.originTxReq.data.toString().slice(0, 10);
    let childrenTransactions: {
        functionFragment: ethers.utils.FunctionFragment;
        result: ethers.utils.Result;
    }[] = [];
    let functionFragment: ethers.utils.FunctionFragment;
    let result: ethers.utils.Result = [];
    const contractAddress = decodeTxn.originTxReq.to;
    const contractAddressExplorer = getAddressExplorer(props.chainId, contractAddress)

    if (decodeTxn.contractInfo) {
        opensource = true;
        contractName = decodeTxn.contractInfo.contractName;
        const { contractInfo } = decodeTxn;

        // 花费多少 native token.
        const value = decodeTxn.originTxReq.value;
        const contractInterface = new Interface(contractInfo.abi);
        result = contractInterface.decodeFunctionData(method, decodeTxn.originTxReq.data);
        functionFragment = contractInterface.getFunction(method);

        // is multicall
        // https://github.com/Uniswap/v3-periphery/blob/main/contracts/base/Multicall.sol#L11
        if (method == `${keccak256(toUtf8Bytes("multicall(bytes[])"))}`) {
            const multiCallData = result[0];
            for (let i = 0; i < multiCallData.length; i++) {
                const multiCallDataItem = multiCallData[i];
                const multiCallDataItemMethod = multiCallDataItem.slice(0, 10);
                const multiCallDataItemResult = contractInterface.decodeFunctionData(multiCallDataItemMethod, multiCallDataItem);
                const multiCallDataItemFunctionFragment = contractInterface.getFunction(multiCallDataItemMethod);
                childrenTransactions.push({
                    functionFragment: multiCallDataItemFunctionFragment,
                    result: multiCallDataItemResult
                })
            }
        }

        if (functionFragment) {
            method = functionFragment.name;
        }
    }

    const resultOrChildren = useMemo(() => {
        if (childrenTransactions.length > 0) {
            return childrenTransactions.map((child, index) => {
                return (
                    <BaseFoldFrame defaultExpansion key={index} header={`Transaction(${index + 1}/${childrenTransactions.length})`} style={{ marginTop: 20 }}>
                        <MText style={{ color: eColor.GrayContentText }}>{contractName}: {child.functionFragment.name}</MText>
                    </BaseFoldFrame>
                )
            })
        } else if (functionFragment) {
            return functionFragment.inputs.map((input, index) => {
                if (input.type == "address") {
                    return (
                        <MText style={{ color: eColor.GrayContentText }} key={index.toString()}>{input.name}: {result[index]}</MText>
                    )
                } else if (input.type == "uint256") {
                    if (input.name.includes("amount")
                        || input.name.includes("balance")
                        || input.name.includes("price")
                    ) {
                        return (
                            <MText style={{ color: eColor.GrayContentText }} key={index.toString()}>{input.name}: {ethers.utils.formatEther(result[index])}</MText>
                        )
                    } else if (input.name.includes("time")
                        || input.name.includes("deadline")
                    ) {
                        const time = new Date(result[index].toNumber() * 1000);
                        return (
                            <MText style={{ color: eColor.GrayContentText }} key={index.toString()}>{input.name}: {time.toLocaleString()}</MText>
                        )
                    }
                } else if (input.type == "bool") {
                    return (
                        <MText style={{ color: eColor.GrayContentText }} key={index.toString()}>{input.name}: {result[index] ? "true" : "false"}</MText>
                    )
                } else if (input.type == "string") {
                    return (
                        <MText style={{ color: eColor.GrayContentText }} key={index.toString()}>{input.name}: {result[index]}</MText>
                    )
                } else {
                    return (
                        <></>
                    )
                }
            });
        }
    }, [childrenTransactions])

    const gotoContractAddressExplorer = useCallback(() => {
        WebBrowser.openBrowserAsync(contractAddressExplorer);
    }, [contractAddressExplorer])

    const opensourceDom = useMemo(() => {
        if (opensource) {
            return (
                <MText onPress={gotoContractAddressExplorer} style={{ color: eColor.Green }}>Opensource</MText>
            )
        } else {
            return (
                <MText style={{ color: eColor.Red }}>No Opensource</MText>
            )
        }
    }, [opensource]);

    return (
        <BaseFoldFrame defaultExpansion key={key} header={`Transaction(${transcationIndex}/${transcationMaxIndex})`} style={{ marginTop: 20 }}>
            {opensourceDom}
            <MText style={{ color: eColor.GrayContentText }}>Call {contractName}: {method.slice(0, 1).toUpperCase()}{method.slice(1)}</MText>
            {resultOrChildren}
        </BaseFoldFrame>
    )
}
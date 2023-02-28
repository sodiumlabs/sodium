

//     // Masks to extract certain bits of commands
//     bytes1 internal constant FLAG_ALLOW_REVERT = 0x80;
//     bytes1 internal constant COMMAND_TYPE_MASK = 0x1f;
//     bytes1 internal constant NFT_TYPE_MASK = 0x10;
//     bytes1 internal constant SUB_IF_BRANCH_MASK = 0x08;

//     // Command Types. Maximum supported command at this moment is 0x1F.

//     // Command Types where value<0x08, executed in the first nested-if block
//     uint256 constant V3_SWAP_EXACT_IN = 0x00;
//     uint256 constant V3_SWAP_EXACT_OUT = 0x01;
//     uint256 constant PERMIT2_TRANSFER_FROM = 0x02;
//     uint256 constant PERMIT2_PERMIT_BATCH = 0x03;
//     uint256 constant SWEEP = 0x04;
//     uint256 constant TRANSFER = 0x05;
//     uint256 constant PAY_PORTION = 0x06;
//     uint256 constant COMMAND_PLACEHOLDER_0x07 = 0x07;

//     // Command Types where 0x08<=value<=0x0f, executed in the second nested-if block
//     uint256 constant V2_SWAP_EXACT_IN = 0x08;
//     uint256 constant V2_SWAP_EXACT_OUT = 0x09;
//     uint256 constant PERMIT2_PERMIT = 0x0a;
//     uint256 constant WRAP_ETH = 0x0b;
//     uint256 constant UNWRAP_WETH = 0x0c;
//     uint256 constant PERMIT2_TRANSFER_FROM_BATCH = 0x0d;
//     uint256 constant COMMAND_PLACEHOLDER_0x0e = 0x0e;
//     uint256 constant COMMAND_PLACEHOLDER_0x0f = 0x0f;

//     // Command Types where 0x10<=value<0x18, executed in the third nested-if block
//     uint256 constant SEAPORT = 0x10;
//     uint256 constant LOOKS_RARE_721 = 0x11;
//     uint256 constant NFTX = 0x12;
//     uint256 constant CRYPTOPUNKS = 0x13;
//     uint256 constant LOOKS_RARE_1155 = 0x14;
//     uint256 constant OWNER_CHECK_721 = 0x15;
//     uint256 constant OWNER_CHECK_1155 = 0x16;
//     uint256 constant SWEEP_ERC721 = 0x17;

//     // Command Types where 0x18<=value<=0x1f, executed in the final nested-if block
//     uint256 constant X2Y2_721 = 0x18;
//     uint256 constant SUDOSWAP = 0x19;
//     uint256 constant NFT20 = 0x1a;
//     uint256 constant X2Y2_1155 = 0x1b;
//     uint256 constant FOUNDATION = 0x1c;
//     uint256 constant SWEEP_ERC1155 = 0x1d;
//     uint256 constant COMMAND_PLACEHOLDER_0x1e = 0x1e;
//     uint256 constant COMMAND_PLACEHOLDER_0x1f = 0x1f

// if (command < 0x10) {
//     // 0x00 <= command < 0x08
//     if (command < 0x08) {
//         if (command == Commands.V3_SWAP_EXACT_IN) {
//             (address recipient, uint256 amountIn, uint256 amountOutMin, bytes memory path, bool payerIsUser) =
//                 abi.decode(inputs, (address, uint256, uint256, bytes, bool));
//             address payer = payerIsUser ? msg.sender : address(this);
//             v3SwapExactInput(recipient.map(), amountIn, amountOutMin, path, payer);
//         } else if (command == Commands.V3_SWAP_EXACT_OUT) {
//             (address recipient, uint256 amountOut, uint256 amountInMax, bytes memory path, bool payerIsUser) =
//                 abi.decode(inputs, (address, uint256, uint256, bytes, bool));
//             address payer = payerIsUser ? msg.sender : address(this);
//             v3SwapExactOutput(recipient.map(), amountOut, amountInMax, path, payer);
//         } else if (command == Commands.PERMIT2_TRANSFER_FROM) {
//             (address token, address recipient, uint160 amount) = abi.decode(inputs, (address, address, uint160));
//             permit2TransferFrom(token, msg.sender, recipient, amount);
//         } else if (command == Commands.PERMIT2_PERMIT_BATCH) {
//             (IAllowanceTransfer.PermitBatch memory permitBatch, bytes memory data) =
//                 abi.decode(inputs, (IAllowanceTransfer.PermitBatch, bytes));
//             PERMIT2.permit(msg.sender, permitBatch, data);
//         } else if (command == Commands.SWEEP) {
//             (address token, address recipient, uint256 amountMin) =
//                 abi.decode(inputs, (address, address, uint256));
//             Payments.sweep(token, recipient.map(), amountMin);
//         } else if (command == Commands.TRANSFER) {
//             (address token, address recipient, uint256 value) = abi.decode(inputs, (address, address, uint256));
//             Payments.pay(token, recipient.map(), value);
//         } else if (command == Commands.PAY_PORTION) {
//             (address token, address recipient, uint256 bips) = abi.decode(inputs, (address, address, uint256));
//             Payments.payPortion(token, recipient.map(), bips);
//         } else if (command == Commands.COMMAND_PLACEHOLDER_0x07) {
//             // placeholder for a future command
//             revert InvalidCommandType(command);
//         }
//         // 0x08 <= command < 0x10
//     } else {
//         if (command == Commands.V2_SWAP_EXACT_IN) {
//             (address recipient, uint256 amountIn, uint256 amountOutMin, address[] memory path, bool payerIsUser)
//             = abi.decode(inputs, (address, uint256, uint256, address[], bool));
//             address payer = payerIsUser ? msg.sender : address(this);
//             v2SwapExactInput(recipient.map(), amountIn, amountOutMin, path, payer);
//         } else if (command == Commands.V2_SWAP_EXACT_OUT) {
//             (address recipient, uint256 amountOut, uint256 amountInMax, address[] memory path, bool payerIsUser)
//             = abi.decode(inputs, (address, uint256, uint256, address[], bool));
//             address payer = payerIsUser ? msg.sender : address(this);
//             v2SwapExactOutput(recipient.map(), amountOut, amountInMax, path, payer);
//         } else if (command == Commands.PERMIT2_PERMIT) {
//             (IAllowanceTransfer.PermitSingle memory permitSingle, bytes memory data) =
//                 abi.decode(inputs, (IAllowanceTransfer.PermitSingle, bytes));
//             PERMIT2.permit(msg.sender, permitSingle, data);
//         } else if (command == Commands.WRAP_ETH) {
//             (address recipient, uint256 amountMin) = abi.decode(inputs, (address, uint256));
//             Payments.wrapETH(recipient.map(), amountMin);
//         } else if (command == Commands.UNWRAP_WETH) {
//             (address recipient, uint256 amountMin) = abi.decode(inputs, (address, uint256));
//             Payments.unwrapWETH9(recipient.map(), amountMin);
//         } else if (command == Commands.PERMIT2_TRANSFER_FROM_BATCH) {
//             (IAllowanceTransfer.AllowanceTransferDetails[] memory batchDetails) =
//                 abi.decode(inputs, (IAllowanceTransfer.AllowanceTransferDetails[]));
//             permit2TransferFrom(batchDetails);
//         } else if (command == Commands.COMMAND_PLACEHOLDER_0x0e) {
//             // placeholder for a future command
//             revert InvalidCommandType(command);
//         } else if (command == Commands.COMMAND_PLACEHOLDER_0x0f) {
//             // placeholder for a future command
//             revert InvalidCommandType(command);
//         }
//     }
//     // 0x10 <= command
// } else {
//     // 0x10 <= command < 0x18
//     if (command < 0x18) {
//         if (command == Commands.SEAPORT) {
//             (uint256 value, bytes memory data) = abi.decode(inputs, (uint256, bytes));
//             (success, output) = SEAPORT.call{value: value}(data);
//         } else if (command == Commands.LOOKS_RARE_721) {
//             (success, output) = callAndTransfer721(inputs, LOOKS_RARE);
//         } else if (command == Commands.NFTX) {
//             (uint256 value, bytes memory data) = abi.decode(inputs, (uint256, bytes));
//             (success, output) = NFTX_ZAP.call{value: value}(data);
//         } else if (command == Commands.CRYPTOPUNKS) {
//             (uint256 punkId, address recipient, uint256 value) = abi.decode(inputs, (uint256, address, uint256));
//             (success, output) = CRYPTOPUNKS.call{value: value}(
//                 abi.encodeWithSelector(ICryptoPunksMarket.buyPunk.selector, punkId)
//             );
//             if (success) ICryptoPunksMarket(CRYPTOPUNKS).transferPunk(recipient.map(), punkId);
//             else output = 'CryptoPunk Trade Failed';
//         } else if (command == Commands.LOOKS_RARE_1155) {
//             (success, output) = callAndTransfer1155(inputs, LOOKS_RARE);
//         } else if (command == Commands.OWNER_CHECK_721) {
//             (address owner, address token, uint256 id) = abi.decode(inputs, (address, address, uint256));
//             success = (ERC721(token).ownerOf(id) == owner);
//             if (!success) output = abi.encodeWithSignature('InvalidOwnerERC721()');
//         } else if (command == Commands.OWNER_CHECK_1155) {
//             (address owner, address token, uint256 id, uint256 minBalance) =
//                 abi.decode(inputs, (address, address, uint256, uint256));
//             success = (ERC1155(token).balanceOf(owner, id) >= minBalance);
//             if (!success) output = abi.encodeWithSignature('InvalidOwnerERC1155()');
//         } else if (command == Commands.SWEEP_ERC721) {
//             (address token, address recipient, uint256 id) = abi.decode(inputs, (address, address, uint256));
//             Payments.sweepERC721(token, recipient.map(), id);
//         }
//         // 0x18 <= command < 0x1f
//     } else {
//         if (command == Commands.X2Y2_721) {
//             (success, output) = callAndTransfer721(inputs, X2Y2);
//         } else if (command == Commands.SUDOSWAP) {
//             (uint256 value, bytes memory data) = abi.decode(inputs, (uint256, bytes));
//             (success, output) = SUDOSWAP.call{value: value}(data);
//         } else if (command == Commands.NFT20) {
//             (uint256 value, bytes memory data) = abi.decode(inputs, (uint256, bytes));
//             (success, output) = NFT20_ZAP.call{value: value}(data);
//         } else if (command == Commands.X2Y2_1155) {
//             (success, output) = callAndTransfer1155(inputs, X2Y2);
//         } else if (command == Commands.FOUNDATION) {
//             (success, output) = callAndTransfer721(inputs, FOUNDATION);
//         } else if (command == Commands.SWEEP_ERC1155) {
//             (address token, address recipient, uint256 id, uint256 amount) =
//                 abi.decode(inputs, (address, address, uint256, uint256));
//             Payments.sweepERC1155(token, recipient.map(), id, amount);
//         } else if (command == Commands.COMMAND_PLACEHOLDER_0x1e) {
//             // placeholder for a future command
//             revert InvalidCommandType(command);
//         } else if (command == Commands.COMMAND_PLACEHOLDER_0x1f) {
//             // placeholder for a future command
//             revert InvalidCommandType(command);
//         }
//     }
// }
export const UNISWAP_COMMANDS = {
    "0x00": "V3_SWAP_EXACT_IN",
    "0x01": "V3_SWAP_EXACT_OUT",
    "0x02": "PERMIT2_TRANSFER_FROM",
    "0x03": "PERMIT2_PERMIT_BATCH",
    "0x04": "SWEEP",
    "0x05": "TRANSFER",
    "0x06": "PAY_PORTION",
    "0x07": "COMMAND_PLACEHOLDER_0x07",
    "0x08": "V2_SWAP_EXACT_IN",
    "0x09": "V2_SWAP_EXACT_OUT",
    "0x0a": "PERMIT2_PERMIT",
    "0x0b": "WRAP_ETH",
    "0x0c": "UNWRAP_WETH",
    "0x0d": "PERMIT2_TRANSFER_FROM_BATCH",
    "0x0e": "COMMAND_PLACEHOLDER_0x0e",
    "0x0f": "COMMAND_PLACEHOLDER_0x0f",
    "0x10": "SEAPORT",
    "0x11": "LOOKS_RARE_721",
    "0x12": "NFTX",
    "0x13": "CRYPTOPUNKS",
    "0x14": "LOOKS_RARE_1155",
    "0x15": "OWNER_CHECK_721",

    "0x16": "OWNER_CHECK_1155",
    "0x17": "SWEEP_ERC721",
    "0x18": "X2Y2_721",
    "0x19": "SUDOSWAP",
    "0x1a": "NFT20",
    "0x1b": "X2Y2_1155",
    "0x1c": "FOUNDATION",
    "0x1d": "SWEEP_ERC1155",
    "0x1e": "COMMAND_PLACEHOLDER_0x1e",
    "0x1f": "COMMAND_PLACEHOLDER_0x1f",
};
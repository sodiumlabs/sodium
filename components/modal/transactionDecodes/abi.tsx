import { ContractABI } from "../../../lib/define"
import { BytesLike } from 'ethers';

type Props = {
    abi: ContractABI
    data: BytesLike
}

export function ABI(props: Props) {
    const abi = props.abi;

    return (
        <></>
    )
}
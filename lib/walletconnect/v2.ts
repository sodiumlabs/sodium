import { Core } from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";
import { CLIENT_OPTIONS } from './utils';

const core = new Core({
    projectId: process.env.PROJECT_ID,
});

const walletconnectv2 = await Web3Wallet.init({
    core,
    metadata: CLIENT_OPTIONS.clientMeta,
});

walletconnectv2.getActiveSessions()

walletconnectv2.on("session_proposal", async (proposal) => {
    // proposal.params.proposer.publicKey
    const session = await walletconnectv2.approveSession({
        id: proposal.id,
        namespaces: {},
    });
});

walletconnectv2.on("auth_request", async (authRequest) => {
    // TODO
});

walletconnectv2.on("session_request", async (event) => {
    const { topic, params, id } = event;
    const { request, chainId } = params;
    const requestParamsMessage = request.params[0];
});

// @ts-ignore
walletconnectv2.on("session_delete", async (event) => {

});

function init() {

}

export {
    walletconnectv2
}
import { atom } from 'nanostores';
import { WalletConnectSession } from './type';
import { saveWalletConnectSessions } from '../common';

const walletConnectSessions = atom<WalletConnectSession[]>([]);
// Maximum number of supported sessions, beyond which old sessions are automatically eliminated
const maxSessionLimit = 5;


function xsaveWalletConnectSessions(sessions: WalletConnectSession[]) {
    saveWalletConnectSessions(sessions.map(s => {
        let connectURI = "";
        let sessionV1 = "";
    
        if (s.version == "1") {
            connectURI = s.connectorV1.getURI();
            sessionV1 = s.sessionV1;
        }
    
        return {
            id: s.id,
            meta: s.meta,
            connectURI: connectURI,
            version: s.version,
            sessionV1: sessionV1,
        }
    }))
}

export const pushSession = (session: WalletConnectSession) => {
    const sessions = walletConnectSessions.get();
    if (sessions.length >= maxSessionLimit) {
        const oldSession = sessions.shift();
        if (oldSession.version === "1") {
            oldSession.connectorV1.kill("Sessions are too old");
        } else {
            // TODO v2
        }
    }
    sessions.push(session);
    walletConnectSessions.set(sessions);
    // store session
    xsaveWalletConnectSessions(sessions);
}

export const removeSessionById = (id: string, message: string) => {
    const sessions = walletConnectSessions.get();
    const newSessions = sessions.filter(s => s.id != id);
    const removeSession = sessions.find(s => s.id == id);

    if (removeSession !== undefined) {
        if (removeSession.version == "1") {
            removeSession.connectorV1.kill(message);
        }
    }
    walletConnectSessions.set(newSessions);
    // store session
    xsaveWalletConnectSessions(newSessions);
}
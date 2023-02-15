import { atom } from 'nanostores';
import { WalletConnectSession } from './type';
import { saveWalletConnectSessions } from '../common';

const walletConnectSessions = atom<WalletConnectSession[]>([]);
// Maximum number of supported sessions, beyond which old sessions are automatically eliminated
const maxSessionLimit = 5;


function xsaveWalletConnectSessions(sessions: WalletConnectSession[]) {
    saveWalletConnectSessions(sessions.map(s => {
        let connectURI = s.connector.getURI();
        let sessionV1 = "";
        let needsNamespaces = {};
        let topic = "";

        if (s.version == "1") {
            sessionV1 = s.sessionV1;
        } else {
            needsNamespaces = s.needsNamespaces;
            topic = s.topic;
        }

        return {
            id: s.id,
            meta: s.meta,
            connectURI: connectURI,
            version: s.version,
            sessionV1: sessionV1,
            topic: topic,
            needsNamespaces: needsNamespaces
        }
    }))
}

export const pushSession = (session: WalletConnectSession) => {
    const sessions = walletConnectSessions.get();
    if (sessions.length >= maxSessionLimit) {
        const oldSession = sessions.shift();
        oldSession.connector.kill("Sessions are too old");
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
        removeSession.connector.kill(message);
    }
    walletConnectSessions.set(newSessions);
    // store session
    xsaveWalletConnectSessions(newSessions);
}

export const findSessionByTopic = (topic: string): WalletConnectSession | undefined => {
    const sessions = walletConnectSessions.get();
    return sessions.find(s => {
        return s.version == "2" && s.topic == topic;
    });
}
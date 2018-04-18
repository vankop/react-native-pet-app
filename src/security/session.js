import RNSecureKeyStore from 'react-native-secure-key-store';

const sessionKey = 'session';
let fetchedSession = null;

export async function getSession() {
    if (fetchedSession === null) {
        fetchedSession = await RNSecureKeyStore.get(sessionKey);
    }

    return fetchedSession;
}

export async function setSession(session) {
    await RNSecureKeyStore.set(sessionKey, session);

    if (fetchedSession !== null) {
        fetchedSession = session;
    }
}

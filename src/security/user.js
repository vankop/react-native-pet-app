import RNSecureKeyStore from 'react-native-secure-key-store';
// import { AsyncStorage } from 'react-native';

const loginKey = 'login';
const passwordKey = 'password';

export async function getCredentials() {
    const [login, password] = await Promise.all([
        RNSecureKeyStore.get(loginKey),
        RNSecureKeyStore.get(passwordKey)
    ]);

    console.log(`______________ get login ${login} ____________________`);
    console.log(`______________ get password ${password} ____________________`);

    return { login, password };
}

export async function setCredentials(login, password) {
    await Promise.all([
        RNSecureKeyStore.set(loginKey, login || ''),
        RNSecureKeyStore.set(passwordKey, password || '')
    ]);

    console.log(`______________ set login ${login} ____________________`);
    console.log(`______________ set password ${password} ____________________`);
}

export async function removeCredentials() {
    await Promise.all([
        RNSecureKeyStore.remove(loginKey),
        RNSecureKeyStore.remove(passwordKey)
    ]);
}

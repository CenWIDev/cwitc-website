import firebase from 'firebase';
import 'firebase/auth';
import { firebaseApp } from './firebase';

export class User {
    userId: string;
    name: string | null;
    email: string | null;
    photoUrl: string | null;
    linkedProviders: LoginProvider[];
}

export type LoginProvider = 'GitHub' | 'Facebook' | 'Twitter' | 'Google';

export class LoginProviders {
    public static github: 'GitHub' = 'GitHub';
    public static facebook: 'Facebook' = 'Facebook';
    public static twitter: 'Twitter' = 'Twitter';
    public static google: 'Google' = 'Google';
}

const user_storage_key: string = 'gatsbyUser';

const isBrowser = () => {
    return typeof window !== 'undefined';
};

const createUser = (credential: firebase.auth.UserCredential): User => {
    if (credential && credential.user) {
        const user: User = new User();

        user.userId = credential.user.uid,
        user.name = credential.user.displayName,
        user.email = credential.user.email || credential.user!.providerData[0]!.email,
        user.photoUrl = credential.user!.providerData[0]!.photoURL

        user.linkedProviders = [];

        credential.user!.providerData!.forEach((providerData) => {
            switch (providerData!.providerId) {
                case 'github.com':
                    user.linkedProviders.push(LoginProviders.github);
                    break;
                default:
                    return;
            }
        });

        return user;
    }

    throw new Error('Failed to create user');
};

export const isLoggedIn = (): boolean => {
    const user = getUser();

    return !!user.userId;
};

export const getUser = (): User => {
    return isBrowser() && window.localStorage.getItem(user_storage_key) ?
        JSON.parse(<string> window.localStorage.getItem(user_storage_key)) :
        { };
};

export const setUser = (user: User): void => {
    window.localStorage.setItem('gatsbyUser', JSON.stringify(user));
};

export const login = async (provider: LoginProvider): Promise<User> => {
    const authProvider: firebase.auth.AuthProvider = getProvider(provider);

    const credential: firebase.auth.UserCredential = await firebaseApp.auth().signInWithPopup(authProvider);

    const user: User = createUser(credential);

    console.log(credential);

    setUser(user);

    return user;
};

export const link = async (provider: LoginProvider): Promise<User> => {
    const authProvider: firebase.auth.AuthProvider = getProvider(provider);

    const credential: firebase.auth.UserCredential = await firebaseApp.auth().currentUser!.linkWithPopup(authProvider);

    console.log(credential);

    const user: User = createUser(credential);

    // setUser(user);

    return user;
}

export const logout = async (callback: Function): Promise<void> => {
    await firebase.auth().signOut();
    window.localStorage.removeItem(user_storage_key);
    callback();
}

function getProvider(provider: LoginProvider): firebase.auth.AuthProvider {
    let authProvider: firebase.auth.AuthProvider;

    switch (provider) {
        case LoginProviders.github:
            authProvider = new firebase.auth.GithubAuthProvider();
            break;
        case LoginProviders.facebook:
            authProvider = new firebase.auth.FacebookAuthProvider();
            break;
        case LoginProviders.twitter:
            authProvider = new firebase.auth.TwitterAuthProvider();
            break;
        case LoginProviders.google:
            authProvider = new firebase.auth.GoogleAuthProvider();
            authProvider.addScope('profile');
            authProvider.addScope('email');
            break;
        default:
            throw new Error('Unsupported auth provider!');
    }

    return authProvider;
}

const AuthService = { isLoggedIn, getUser, setUser, login, logout, link };

export default AuthService;
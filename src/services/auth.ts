import firebase from 'firebase';
import 'firebase/auth';
import { firebaseApp } from './firebase';

export type User = {
    userId: string;
    name: string | null;
    email: string | null;
};

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
        return {
            userId: credential.user.uid,
            name: credential.user.displayName,
            email: credential.user.email || credential.user!.providerData[0]!.email
        }
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
            break;
        default:
            throw new Error('Unsupported auth provider!');
    }

    const credential: firebase.auth.UserCredential = await firebaseApp.auth().signInWithPopup(authProvider);

    const user: User = createUser(credential);

    setUser(user);

    return user;
};

export const logout = async (callback: Function): Promise<void> => {
    await firebase.auth().signOut();
    window.localStorage.removeItem(user_storage_key);
    callback();
}

const AuthService = { isLoggedIn, getUser, setUser, login, logout };

export default AuthService;
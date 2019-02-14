import firebase from 'firebase';
import 'firebase/auth';
import { firebaseApp } from './../firebase';

import { ILoginProvider, LoginProviders } from './login-providers';

export class User {
    userId: string;
    name: string | null;
    email: string | null;
    photoUrl: string | null;
    linkedProviders: ILoginProvider[];
}

const user_storage_key: string = 'gatsbyUser';

const isBrowser = () => {
    return typeof window !== 'undefined';
};

const createUser = (credential: firebase.auth.UserCredential | null): User => {
    if (credential && credential.user) {
        const user: User = new User();

        user.userId = credential.user.uid;
        user.name = credential.user.displayName;

        user.linkedProviders = [];

        credential.user.providerData.forEach((providerData) => {
            if (providerData) {
                const loginProvider: ILoginProvider | undefined = LoginProviders.list.find(provider => provider.providerId === providerData.providerId);

                if (loginProvider) {
                    user.linkedProviders.push(loginProvider);
                }

                user.email = user.email || providerData.email;
                user.photoUrl = user.photoUrl || providerData.photoURL;
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

export const login = async (provider: ILoginProvider): Promise<User> => {
    const authProvider: firebase.auth.AuthProvider = getProvider(provider);

    const credential: firebase.auth.UserCredential = await firebaseApp.auth().signInWithPopup(authProvider);

    const user: User = createUser(credential);

    setUser(user);

    return user;
};

export const link = async (providerToAdd: ILoginProvider): Promise<User> => {
    const authProvider: firebase.auth.AuthProvider = getProvider(providerToAdd);

    const credential: firebase.auth.UserCredential = await firebaseApp.auth().currentUser!.linkWithPopup(authProvider);

    const user: User = createUser(credential);

    setUser(user);

    return user;
}

export const unlink = async (providerToRemove: ILoginProvider): Promise<User> => {
    await firebaseApp.auth().currentUser!.unlink(providerToRemove.providerId)

    const user: User = getUser();

    user.linkedProviders = user.linkedProviders.filter((provider) => provider.providerId != providerToRemove.providerId);

    setUser(user);

    return user;
}

export const logout = async (callback: Function): Promise<void> => {
    await firebase.auth().signOut();
    window.localStorage.removeItem(user_storage_key);
    callback();
}

function getProvider(provider: ILoginProvider): firebase.auth.AuthProvider {
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

            // @ts-ignore
            authProvider.addScope('profile');

            // @ts-ignore
            authProvider.addScope('email');
            break;
        default:
            throw new Error('Unsupported auth provider!');
    }

    return authProvider;
}

export const AuthService = { isLoggedIn, getUser, setUser, login, logout, link, unlink };
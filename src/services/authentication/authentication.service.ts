import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseApp } from './../firebase';

import { LoginProvider, LoginProviders } from './login-providers';

export class User {
    userId: string;
    name: string | null;
    email: string | null;
    photoUrl: string | null;
    linkedProviders: LoginProvider[];
    claims: string[]
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
                const loginProvider: LoginProvider | undefined = LoginProviders.list.find(provider => provider.providerId === providerData.providerId);

                if (loginProvider) {
                    user.linkedProviders.push(loginProvider);
                }

                user.email = user.email || providerData.email;

                if (!user.photoUrl) {
                    user.photoUrl = user.photoUrl || providerData.photoURL;
                }

                if (user.photoUrl) {
                    if (providerData.providerId === LoginProviders.facebook.providerId) {
                        user.photoUrl = `${ user.photoUrl }?height=500`;
                    }
                    else if (providerData.providerId === LoginProviders.twitter.providerId) {
                        user.photoUrl = user.photoUrl.split('_normal').join('');
                    }
                }
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

export const isAdmin = (): boolean => {
    const user = getUser();

    return !!user.claims?.find(claim => claim === 'admin');
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

    const result = await firebaseApp.auth().currentUser?.getIdTokenResult();

    if (result?.claims.admin) {
        user.claims = ['admin'];
    }

    setUser(user);

    return user;
};

export const link = async (providerToAdd: LoginProvider): Promise<User> => {
    const authProvider: firebase.auth.AuthProvider = getProvider(providerToAdd);

    const credential: firebase.auth.UserCredential = await firebaseApp.auth().currentUser!.linkWithPopup(authProvider);

    const user: User = createUser(credential);

    setUser(user);

    return user;
}

export const unlink = async (providerToRemove: LoginProvider): Promise<User> => {
    await firebaseApp.auth().currentUser!.unlink(providerToRemove.providerId)

    const user: User = getUser();

    user.linkedProviders = user.linkedProviders.filter((provider) => provider.providerId !== providerToRemove.providerId);

    setUser(user);

    return user;
}

export const logout = async (callback?: Function): Promise<void> => {
    await firebase.auth().signOut();
    window.localStorage.removeItem(user_storage_key);

    if (callback) {
        callback();
    }
}

export const clearAuthSession = async (): Promise<void> => {
    if (isLoggedIn()) {
        console.info('An authentication session was detected, logging the current user out because the login feature is disabled.');
        await logout();
    }
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

export const AuthService = { isLoggedIn, isAdmin, getUser, setUser, login, logout, link, unlink, clearAuthSession };
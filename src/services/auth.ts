import firebase from 'firebase';
import 'firebase/auth';
import { firebaseApp } from './firebase';

export type User = {
    userId: string;
    name: string | null;
    email: string | null;
};

const user_storage_key: string = 'gatsbyUser';

const isBrowser = () => {
    return typeof window !== 'undefined';
};

const createUser = (credential: firebase.auth.UserCredential): User => {
    if (credential && credential.user) {
        return {
            userId: credential.user.uid,
            name: credential.user.displayName,
            email: credential.user.email
        }
    }

    throw new Error('Failed to create user');
};

export const isLoggedIn = () => {
    const user = getUser();
    return !!user.userId;
};

export const getUser = (): User => {
    return isBrowser && window.localStorage.getItem(user_storage_key) ?
        JSON.parse(<string>window.localStorage.getItem(user_storage_key)) :
        { };
};

export const setUser = (user: User): void => {
    window.localStorage.setItem('gatsbyUser', JSON.stringify(user));
};

export const login = async (provider: string): Promise<User> => {
    const authProvider = new firebase.auth[`${ provider }AuthProvider`]();

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
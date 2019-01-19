export type User = {
    username: string;
    name: string;
    email: string;
};

const user_storage_key: string = 'gatsbyUser';

const isBrowser = () => {
    return typeof window !== 'undefined';
};

const isLoggedIn = () => {
    const user = getUser();
    return !!user.username;
};

const getUser = () => {
    return isBrowser && window.localStorage.getItem(user_storage_key)
        ? JSON.parse(<string>window.localStorage.getItem(user_storage_key))
        : {};
};

const setUser = (user: User): void => {
    window.localStorage.setItem('gatsbyUser', JSON.stringify(user));
};

const login = (username: string, password: string): User => {
    if (username === `john` && password === `pass`) {
        const user: User = {
            username: `john`,
            name: `Johnny`,
            email: `johnny@example.org`
        };

        setUser(user);

        return user;
    }

    throw Error('Invalid username or password');
};

const logout = (callback: Function): void => {
    window.localStorage.removeItem(user_storage_key);
    callback();
}

const AuthService = { isLoggedIn, getUser, setUser, login, logout };

export default AuthService;
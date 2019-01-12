export type User = {
    username: string;
    name: string;
    email: string;
};

export class AuthService {
    private readonly user_storage_key: string = 'gatsbyUser';

    public get isBrowser() {
        return typeof window !== 'undefined';
    }

    public get isLoggedIn() {
        const user = this.getUser();
        return !!user.username;
    }

    public getUser(): User {
        return this.isBrowser && window.localStorage.getItem(this.user_storage_key)
            ? JSON.parse(<string>window.localStorage.getItem(this.user_storage_key))
            : {};
    }

    public setUser(user: User): void {
        window.localStorage.setItem('gatsbyUser', JSON.stringify(user));
    }

    public login(username: string, password: string): User {
        if (username === `john` && password === `pass`) {
            const user: User = {
                username: `john`,
                name: `Johnny`,
                email: `johnny@example.org`
            };

            this.setUser(user);

            return user;
        }

        throw Error('Invalid username or password');
    }

    public logout(callback: Function): void {
        window.localStorage.removeItem(this.user_storage_key);
        callback();
    }
}
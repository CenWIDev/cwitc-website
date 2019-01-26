import React, { Component, ReactNode } from 'react';
import { navigate } from 'gatsby';

import AuthService, { LoginProvider } from './../../services/auth';

export default class Login extends Component {

    public props: LoginProps;

    handleSubmit = async (provider: LoginProvider): Promise<void> => {
        await AuthService.login(provider);
        navigate(`/app/profile`);
    }

    public render(): ReactNode {
        if (AuthService.isLoggedIn()) {
            navigate(`/app/profile`);
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <h1>Log in</h1>
                        <button className="btn btn-outline-primary" onClick={ async () => await this.handleSubmit(LoginProvider.github) }>Login with GitHub</button>
                    </div>
                </div>
            </div>
        );
    }
}

export type LoginProps = {
    path: string;
};
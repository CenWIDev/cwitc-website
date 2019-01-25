import React, { Component, ReactNode } from 'react';
import { navigate } from 'gatsby';

import { Button } from './../button/button';
import AuthService, { LoginProvider } from './../../services/auth';

type LoginProps = {
    path: string;
};

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
                        <Button onClick={ async () => await this.handleSubmit(LoginProvider.github) }>Login with GitHub</Button>
                    </div>
                </div>
            </div>
        );
    }
}
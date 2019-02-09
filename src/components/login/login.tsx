import React, { Component, ReactNode } from 'react';
import { navigate } from 'gatsby';

import AuthService, { LoginProvider } from './../../services/auth';
import { GitHubIcon, FacebookIcon, TwitterIcon, GoogleIcon } from './../icon';

import "./login.scss";

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
            <div className="login-container container">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="row justify-content-center">
                            <span
                                className="social-button github col-9 col-sm-6 btn"
                                onClick={ async () => await this.handleSubmit(LoginProvider.github) }>
                                <span className="social-button-icon"><GitHubIcon /></span>
                                <span className="social-button-text">GitHub</span>
                                <div />
                            </span>
                        </div>
                        <div className="row justify-content-center">
                            <span
                                className="social-button facebook col-9 col-sm-6 btn"
                                onClick={ async () => await this.handleSubmit(LoginProvider.facebook) }>
                                <span className="social-button-icon"><FacebookIcon /></span>
                                <span className="social-button-text">Facebook</span>
                                <div />
                            </span>
                        </div>
                        <div className="row justify-content-center">
                            <span
                                className="social-button twitter col-9 col-sm-6 btn"
                                onClick={ async () => await this.handleSubmit(LoginProvider.twitter) }>
                                <span className="social-button-icon"><TwitterIcon /></span>
                                <span className="social-button-text">Twitter</span>
                                <div />
                            </span>
                        </div>
                        <div className="row justify-content-center">
                            <span
                                className="social-button google col-9 col-sm-6 btn"
                                onClick={ async () => await this.handleSubmit(LoginProvider.google) }>
                                <span className="social-button-icon"><GoogleIcon /></span>
                                <span className="social-button-text">Google</span>
                                <div />
                            </span>
                        </div>
                    </div>
                    <div className="col-6">
                        <h1>Log in</h1>
                        <h5>Can't remember which one you used previously?</h5>
                        <span>Don't worry, as long as the email address associated to your account is the same, you can choose any provider.</span>
                    </div>
                </div>
            </div>
        );
    }
}

export type LoginProps = {
    path: string;
};
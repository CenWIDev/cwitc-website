import React, { Component, ReactNode } from 'react';
import AuthService, { User, LoginProvider, LoginProviders } from './../../services/auth';
import { GitHubIcon, FacebookIcon, TwitterIcon, GoogleIcon } from './../icon';
import LoginButton from './../login/login-button/login-button';

import './profile.scss';

type ProfileProps = {
    path: string;
};

export default class Profile extends Component {

    public props: ProfileProps;

    public get user(): User {
        return AuthService.getUser();
    }

    public getButtonDisplayText = (provider: LoginProvider): string => {
        return this.user.linkedProviders.includes(provider) ? `Unlink ${ provider }` : `Link ${ provider }`;
    };

    public handleSubmit = async (provider: LoginProvider): Promise<void> => {
        await AuthService.link(provider);
        // navigate(`/app/profile`);
    };

    public render(): ReactNode {
        return (
            <div className="profile-container container">
                <div className="row justify-content-center">
                    <div className="bio col-10 col-md-5">
                        { this.user.photoUrl ? <img src={ this.user.photoUrl } /> : null }
                        <h3>{ this.user.name }</h3>
                        <p>{ this.user.email }</p>
                    </div>
                    <div className="col-10 col-md-5">
                        <h4 className="text-center">Link other Providers</h4>
                        <LoginButton
                            displayText={ this.getButtonDisplayText(LoginProviders.github) }
                            provider={ LoginProviders.github }
                            providerEnabled={ true }
                            onClick={ this.handleSubmit }>
                            <GitHubIcon />
                        </LoginButton>
                        <LoginButton
                            displayText={ this.getButtonDisplayText(LoginProviders.facebook) }
                            provider={ LoginProviders.facebook }
                            providerEnabled={ true }
                            onClick={ this.handleSubmit }>
                            <FacebookIcon />
                        </LoginButton>
                        <LoginButton
                            displayText={ this.getButtonDisplayText(LoginProviders.twitter) }
                            provider={ LoginProviders.twitter }
                            providerEnabled={ true }
                            onClick={ this.handleSubmit }>
                            <TwitterIcon />
                        </LoginButton>
                        <LoginButton
                            displayText={ this.getButtonDisplayText(LoginProviders.google) }
                            provider={ LoginProviders.google }
                            providerEnabled={ true }
                            onClick={ this.handleSubmit }>
                            <GoogleIcon />
                        </LoginButton>
                    </div>
                </div>
            </div>
        );
    }
}
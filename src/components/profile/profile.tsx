import React, { Component, ReactNode } from 'react';
import { AuthService, User, ILoginProvider, LoginProviders } from './../../services/authentication';
import { GitHubIcon, FacebookIcon, TwitterIcon, GoogleIcon } from './../icon';
import LoginButton from './../login/login-button/login-button';

import './profile.scss';

export default class Profile extends Component {

    public props: ProfileProps;

    public get user(): User {
        return AuthService.getUser();
    }

    public disableButton = (provider: ILoginProvider): boolean => {
        return this.user.linkedProviders.length === 1 && this.user.linkedProviders.includes(provider) ;
    }

    public getButtonDisplayText = (provider: ILoginProvider): string => {
        return this.user.linkedProviders.includes(provider) ? `Unlink ${ provider.providerName }` : `Link ${ provider.providerName }`;
    };

    public handleSubmit = async (provider: ILoginProvider): Promise<void> => {
        this.user.linkedProviders.includes(provider) ?
            await AuthService.unlink(provider) :
            await AuthService.link(provider);
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
                            disabled={ this.disableButton(LoginProviders.github) }
                            provider={ LoginProviders.github }
                            providerEnabled={ true }
                            onClick={ this.handleSubmit }>
                            <GitHubIcon />
                        </LoginButton>
                        <LoginButton
                            displayText={ this.getButtonDisplayText(LoginProviders.facebook) }
                            disabled={ this.disableButton(LoginProviders.facebook) }
                            provider={ LoginProviders.facebook }
                            providerEnabled={ true }
                            onClick={ this.handleSubmit }>
                            <FacebookIcon />
                        </LoginButton>
                        <LoginButton
                            displayText={ this.getButtonDisplayText(LoginProviders.twitter) }
                            disabled={ this.disableButton(LoginProviders.twitter) }
                            provider={ LoginProviders.twitter }
                            providerEnabled={ true }
                            onClick={ this.handleSubmit }>
                            <TwitterIcon />
                        </LoginButton>
                        <LoginButton
                            displayText={ this.getButtonDisplayText(LoginProviders.google) }
                            disabled={ this.disableButton(LoginProviders.google) }
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

export type ProfileProps = {
    path: string;
};
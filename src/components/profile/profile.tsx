import React, { Component, ReactNode } from 'react';
import { AuthService, User, ILoginProvider, LoginProviders } from './../../services/authentication';
import { GitHubIcon, FacebookIcon, TwitterIcon, GoogleIcon } from './../icon';
import LoginButton from './../login/login-button/login-button';

import './profile.scss';

export default class Profile extends Component {

    public state: ProfileState;

    constructor(props: ProfileProps) {
        super(props);

        this.state = { user: AuthService.getUser(), isLoading: false };
    }

    public providerIsLinked(providerToCheck: ILoginProvider): boolean {
        return  !!this.state.user.linkedProviders.find(provider => provider.providerId === providerToCheck.providerId);
    }

    public disableButton = (provider: ILoginProvider): boolean => {
        return this.state.user.linkedProviders.length === 1 && this.providerIsLinked(provider);
    }

    public getButtonDisplayText = (provider: ILoginProvider): string => {
        return this.providerIsLinked(provider) ? `Unlink ${ provider.providerName }` : `Link ${ provider.providerName }`;
    };

    public dismissAlert = () => {
        this.setState({ status: null });
    };

    public handleSubmit = async (provider: ILoginProvider): Promise<void> => {
        let user: User = this.state.user;
        let status = null;

        this.setState({ isLoading: true });

        if (this.providerIsLinked(provider)) {
            try {
                user = await AuthService.unlink(provider);
                status = {
                    type: 'success',
                    message: `Unlinked ${ provider.providerName }`
                };
            }
            catch (err) {
                console.error(err);

                status = {
                    type: 'danger',
                    message: `Failed to unlink ${ provider.providerName }. Try logging out and logging back in again.`
                };
            }
        }
        else {
            try {
                user = await AuthService.link(provider);
                status = {
                    type: 'success',
                    message: `Linked ${ provider.providerName }!`
                };
            }
            catch (err) {
                console.error(err);

                status = {
                    type: 'danger',
                    message: `Failed to link ${ provider.providerName }. This ${ provider.providerName } account might be used for a different CWITC account. Try logging out of CWITC and logging in with ${ provider.providerName } or login with a different ${ provider.providerName } account.`
                };
            }
        }

        this.setState({ user, isLoading: false, status });
    };

    public render(): ReactNode {
        return (
            <div className="profile-container container">
                <div className="row justify-content-center">
                    <div className="bio col-10 col-md-5">
                        { this.state.user.photoUrl ? <img src={ this.state.user.photoUrl } /> : null }
                        <h3>{ this.state.user.name }</h3>
                        <p>{ this.state.user.email }</p>
                    </div>
                    {
                        this.state.isLoading ?
                            <div className="col-10 col-md-5 d-flex justify-content-center align-items-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            :
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
                                {
                                    this.state.status ?
                                        <div className="row justify-content-center">
                                            <div className={`col-12 col-md-8 alert alert-${ this.state.status.type } d-flex justify-content-between`} role="alert">
                                                { this.state.status.message }
                                                <button type="button" className="close align-self-start mt-n1" onClick={ this.dismissAlert }>
                                                    <span className="close align-self-start">&times;</span>
                                                </button>
                                            </div>
                                        </div> : null
                                }
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export type ProfileProps = {
    path: string;
};

export type ProfileState = {
    user: User;
    isLoading: boolean;
    status?: {
        type: "success" | "danger";
        message: string;
    };
};
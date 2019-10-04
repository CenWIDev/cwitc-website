import React, { Component, ReactNode } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { AuthService, User, LoginProvider, LoginProviders } from './../../services/authentication';
import { GitHubIcon, FacebookIcon, TwitterIcon, GoogleIcon } from './../icon';
import LoginButton from './../login/login-button/login-button';

import './profile.scss';

export default class Profile extends Component {

    public state: ProfileState;

    constructor(props: ProfileProps) {
        super(props);

        this.state = { user: AuthService.getUser(), isLoading: false };
    }

    public providerIsLinked(providerToCheck: LoginProvider): boolean {
        return  !!this.state.user.linkedProviders.find(provider => provider.providerId === providerToCheck.providerId);
    }

    public disableButton = (provider: LoginProvider): boolean => {
        return this.state.user.linkedProviders.length === 1 && this.providerIsLinked(provider);
    }

    public getButtonDisplayText = (provider: LoginProvider): string => {
        return this.providerIsLinked(provider) ? `Unlink ${ provider.providerName }` : `Link ${ provider.providerName }`;
    };

    public dismissAlert = () => {
        this.setState({ status: null });
    };

    public handleSubmit = async (provider: LoginProvider): Promise<void> => {

        this.setState({ isLoading: true });

        if (this.providerIsLinked(provider)) {
            await this.unlinkProvider(provider);
        }
        else {
            await this.linkProvider(provider);
        }

        this.setState({ isLoading: false });
    };

    private linkProvider = async (provider: LoginProvider) => {
        let user: User = this.state.user;
        let status = null;

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

        this.setState({ user, status });
    };

    private unlinkProvider = async (provider: LoginProvider) => {
        let user: User = this.state.user;
        let status = null;

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

        this.setState({ user, status });
    };

    private getFavoritesLink = (sessionPages: any, currentYear: string): string | null => {
        let link: string | null = null;

        if (sessionPages && sessionPages.edges && currentYear) {
            const favoritePage = sessionPages.edges.find(({ node }: any) => node.conferenceYear === currentYear);

            if (favoritePage && favoritePage.node && favoritePage.node.page) {
                link = favoritePage.node.page.slug + '?viewFavorites=true';
            }
        }

        return link;
    }

    public render(): ReactNode {
        return (
            <StaticQuery
                query={ profilePageQuery }
                render={ ({ global, sessionPages }) => {
                    const { enableGithubAuth, enableFacebookAuth, enableTwitterAuth, enableGoogleAuth, currentYear } = global;

                    const favoritesPath: string | null = this.getFavoritesLink(sessionPages, currentYear);

                    return (
                        <div className="profile-container container">
                            <div className="row justify-content-center">
                                <div className="bio col-10 col-md-5 d-flex flex-column align-items-center">
                                    { this.state.user.photoUrl ? <img src={ this.state.user.photoUrl } /> : null }
                                    <h3>{ this.state.user.name }</h3>
                                    <p>{ this.state.user.email }</p>
                                    {
                                        favoritesPath ?
                                            <Link className="mb-3"to={ `/${ favoritesPath }` }>View Favorited Sessions</Link> :
                                            null
                                    }
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
                                                providerEnabled={ enableGithubAuth }
                                                onClick={ this.handleSubmit }>
                                                <GitHubIcon />
                                            </LoginButton>
                                            <LoginButton
                                                displayText={ this.getButtonDisplayText(LoginProviders.facebook) }
                                                disabled={ this.disableButton(LoginProviders.facebook) }
                                                provider={ LoginProviders.facebook }
                                                providerEnabled={ enableFacebookAuth }
                                                onClick={ this.handleSubmit }>
                                                <FacebookIcon />
                                            </LoginButton>
                                            <LoginButton
                                                displayText={ this.getButtonDisplayText(LoginProviders.twitter) }
                                                disabled={ this.disableButton(LoginProviders.twitter) }
                                                provider={ LoginProviders.twitter }
                                                providerEnabled={ enableTwitterAuth }
                                                onClick={ this.handleSubmit }>
                                                <TwitterIcon />
                                            </LoginButton>
                                            <LoginButton
                                                displayText={ this.getButtonDisplayText(LoginProviders.google) }
                                                disabled={ this.disableButton(LoginProviders.google) }
                                                provider={ LoginProviders.google }
                                                providerEnabled={ enableGoogleAuth }
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
                )}} />
        );
    }
}

const profilePageQuery = graphql`
    query ProfilePageQuery {
        global: contentfulGlobalSiteSettings {
            enableGithubAuth
            enableFacebookAuth
            enableTwitterAuth
            enableGoogleAuth
            currentYear: conferenceStartDateTime(formatString: "YYYY")
        }
        sessionPages: allContentfulSessionsPageLayout {
            edges {
                node {
                    conferenceYear: conferenceDate(formatString: "YYYY")
                    page {
                        slug
                    }
                }
            }
        }
    }
`;

export type ProfileProps = {
    path: string;
};

export type ProfileState = {
    user: User;
    isLoading: boolean;
    status?: {
        type: 'success' | 'danger';
        message: string;
    };
};
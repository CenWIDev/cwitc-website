import React, { Component, ReactNode } from 'react';
import { RouteComponentProps } from '@reach/router';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { StaticQuery, graphql, navigate } from 'gatsby';
import * as queryString from 'query-string';

import { AuthService, LoginProvider, LoginProviders } from './../../services/authentication';
import { GitHubIcon, FacebookIcon, TwitterIcon, GoogleIcon } from './../icon';
import LoginButton from './login-button/login-button';

import './login.scss';

export default class Login extends Component<LoginProps> {

    public state: LoginState;

    constructor(props: LoginProps) {
        super(props);

        this.state = { };
    }

    public dismissAlert = () => {
        this.setState({ error: null });
    };

    public handleSubmit = async (provider: LoginProvider): Promise<void> => {
        try {
            await AuthService.login(provider);

            this.redirect();
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);

            this.setState({ error: 'Sorry, there was a problem logging in. Please try again later or try using a different log in method.' })
        }
    }

    private redirect = () => {
        let redirectPath: string | undefined;

        if (this.props.location && this.props.location.search) {
            const queryStringValues: any = queryString.parse(this.props.location.search)
            redirectPath = queryStringValues.redirectPath;
        }

        // Using the navigate method prevents cross domain redirect attacks
        if (redirectPath) {
            navigate(redirectPath);
        }
        else {
            navigate(`/app/profile`);
        }
    };

    public renderPage = (landingPageContent: any, global: any): ReactNode => {
        const { body } = landingPageContent;
        const { enableGithubAuth, enableFacebookAuth, enableTwitterAuth, enableGoogleAuth } = global;

        return (
            <div className="login-container container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-10 col-sm-5">
                    {
                        documentToReactComponents(body.json)
                    }
                    </div>
                    {/* </div> dangerouslySetInnerHTML={{ __html: body.childContentfulRichText.html }} /> */}
                    <div className="col-10 col-sm-5">
                        <LoginButton
                            provider={ LoginProviders.github }
                            providerEnabled={ enableGithubAuth }
                            onClick={ this.handleSubmit }>
                            <GitHubIcon />
                        </LoginButton>
                        <LoginButton
                            provider={ LoginProviders.facebook }
                            providerEnabled={ enableFacebookAuth }
                            onClick={ this.handleSubmit }>
                            <FacebookIcon />
                        </LoginButton>
                        <LoginButton
                            provider={ LoginProviders.twitter }
                            providerEnabled={ enableTwitterAuth }
                            onClick={ this.handleSubmit }>
                            <TwitterIcon />
                        </LoginButton>
                        <LoginButton
                            provider={ LoginProviders.google }
                            providerEnabled={ enableGoogleAuth }
                            onClick={ this.handleSubmit }>
                            <GoogleIcon />
                        </LoginButton>
                        {
                            this.state.error ?
                                <div className="row justify-content-center">
                                    <div className={`col-12 col-md-8 alert alert-danger d-flex justify-content-between`} role="alert">
                                        { this.state.error }
                                        <button type="button" className="close align-self-start mt-n1" onClick={ this.dismissAlert }>
                                            <span className="close align-self-start">&times;</span>
                                        </button>
                                    </div>
                                </div> : null
                        }
                    </div>
                </div>
            </div>
        )
    };

    public render(): ReactNode {
        if (AuthService.isLoggedIn()) {
            navigate(`/app/profile`);
        }

        return (
            <StaticQuery
                query={ loginPageQuery }
                render={ ({ landingPageContent, global }) => this.renderPage(landingPageContent, global) }/>
        );
    }
}

const loginPageQuery = graphql`
    query LogInPageQuery {
        landingPageContent: contentfulLogInPageLayout {
            title
            body {
                json
            }
        }
        global: contentfulGlobalSiteSettings {
            enableGithubAuth
            enableFacebookAuth
            enableTwitterAuth
            enableGoogleAuth
        }
    }
`;

export interface LoginProps extends RouteComponentProps {
    path: string;
}

export type LoginState = {
    error?: string;
};
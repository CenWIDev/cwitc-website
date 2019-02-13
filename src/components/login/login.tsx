import React, { Component, ReactNode } from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';

import { AuthService, ILoginProvider, LoginProviders } from './../../services/authentication';
import { GitHubIcon, FacebookIcon, TwitterIcon, GoogleIcon } from './../icon';
import LoginButton from './login-button/login-button';

import "./login.scss";

export default class Login extends Component {

    public props: LoginProps;

    handleSubmit = async (provider: ILoginProvider): Promise<void> => {
        await AuthService.login(provider);
        navigate(`/app/profile`);
    }

    renderPage = ({ body, enableGithubAuth, enableFacebookAuth, enableTwitterAuth, enableGoogleAuth }: any): ReactNode => (
        <div className="login-container container">
            <div className="row align-items-center justify-content-center">
                <div className="col-10 col-sm-5" dangerouslySetInnerHTML={{ __html: body.childContentfulRichText.html }} />
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
                </div>
            </div>
        </div>
    );

    public render(): ReactNode {
        if (AuthService.isLoggedIn()) {
            navigate(`/app/profile`);
        }

        return (
            <StaticQuery
                query={ loginPageQuery }
                render={ ({ landingPageContent }) => this.renderPage(landingPageContent) }/>
        );
    }
}

const loginPageQuery = graphql`
    query LogInPageQuery {
        landingPageContent: contentfulLogInPageLayout {
            title
            body {
                childContentfulRichText {
                    html
                }
            }
            enableGithubAuth
            enableFacebookAuth
            enableTwitterAuth
            enableGoogleAuth
        }
    }
`;

export type LoginProps = {
    path: string;
};
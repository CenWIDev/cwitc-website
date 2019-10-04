import React, { useState, ReactNode } from 'react';
import { RouteComponentProps } from '@reach/router';
import RichText from './../richText/richText';
import { StaticQuery, graphql, navigate } from 'gatsby';
import * as queryString from 'query-string';

import { AuthService, LoginProvider, LoginProviders } from './../../services/authentication';
import { GitHubIcon, FacebookIcon, TwitterIcon, GoogleIcon } from './../icon';
import LoginButton from './login-button/login-button';
import PageLoader from '../page-loader/pageLoader';

import './login.scss';

const Login = ({ location }: RouteComponentProps) => {
    if (AuthService.isLoggedIn()) {
        navigate(`/app/profile`);
    }

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dismissAlert = () => {
        setError(null);
    };

    const handleSubmit = async (provider: LoginProvider): Promise<void> => {
        try {
            setIsLoading(true);

            await AuthService.login(provider);

            redirect();
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);

            setIsLoading(false);

            setError('Sorry, there was a problem logging in. Please try again later or try using a different log in method.');
        }
    }

    const redirect = () => {
        let redirectPath: string | undefined;

        if (location && location.search) {
            const queryStringValues: any = queryString.parse(location.search)
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

    const renderPage = (landingPageContent: any, global: any): ReactNode => {
        const { body } = landingPageContent;
        const { enableGithubAuth, enableFacebookAuth, enableTwitterAuth, enableGoogleAuth } = global;

        return (
            <div className="login-container container">
                {
                    isLoading ?
                        <PageLoader /> :
                        <div className="row align-items-center justify-content-center">
                            <div className="col-10 col-sm-5">
                                <RichText richText={ body.json } />
                            </div>
                            <div className="col-10 col-sm-5">
                                <LoginButton
                                    provider={ LoginProviders.github }
                                    providerEnabled={ enableGithubAuth }
                                    onClick={ handleSubmit }>
                                    <GitHubIcon />
                                </LoginButton>
                                <LoginButton
                                    provider={ LoginProviders.facebook }
                                    providerEnabled={ enableFacebookAuth }
                                    onClick={ handleSubmit }>
                                    <FacebookIcon />
                                </LoginButton>
                                <LoginButton
                                    provider={ LoginProviders.twitter }
                                    providerEnabled={ enableTwitterAuth }
                                    onClick={ handleSubmit }>
                                    <TwitterIcon />
                                </LoginButton>
                                <LoginButton
                                    provider={ LoginProviders.google }
                                    providerEnabled={ enableGoogleAuth }
                                    onClick={ handleSubmit }>
                                    <GoogleIcon />
                                </LoginButton>
                                {
                                    error ?
                                        <div className="row justify-content-center">
                                            <div className={`col-12 col-md-8 alert alert-danger d-flex justify-content-between`} role="alert">
                                                { error }
                                                <button type="button" className="close align-self-start mt-n1" onClick={ dismissAlert }>
                                                    <span className="close align-self-start">&times;</span>
                                                </button>
                                            </div>
                                        </div> : null
                                }
                            </div>
                        </div>
                }
            </div>
        )
    };

    return (
        <StaticQuery
            query={ loginPageQuery }
            render={ ({ landingPageContent, global }) => renderPage(landingPageContent, global) }/>
    );
};

export default Login;

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

export type LoginState = {
    error?: string;
};
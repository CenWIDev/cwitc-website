import React, { useState } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { AuthService, User, LoginProvider, LoginProviders } from './../../services/authentication';
import { GitHubIcon, FacebookIcon, TwitterIcon, GoogleIcon } from './../icon';
import LoginButton from './../login/login-button/login-button';

import './profile.scss';

const Profile = () => {

    const [user, setUser] = useState<User>(AuthService.getUser());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<ProfileStatus | null>(null);
    const [showUserId, setShowUserId] = useState<boolean>(false);

    const toggleUserId = (): void => {
        setShowUserId(!showUserId);
    };

    const providerIsLinked = (providerToCheck: LoginProvider): boolean => {
        return  !!user.linkedProviders.find(provider => provider.providerId === providerToCheck.providerId);
    };

    const disableButton = (provider: LoginProvider): boolean => {
        return user.linkedProviders.length === 1 && providerIsLinked(provider);
    }

    const getButtonDisplayText = (provider: LoginProvider): string => {
        return providerIsLinked(provider) ? `Unlink ${ provider.providerName }` : `Link ${ provider.providerName }`;
    };

    const dismissAlert = () => {
        setStatus(null);
    };

    const handleSubmit = async (provider: LoginProvider): Promise<void> => {
        setIsLoading(true);

        if (providerIsLinked(provider)) {
            await unlinkProvider(provider);
        }
        else {
            await linkProvider(provider);
        }

        setIsLoading(false);
    };

    const linkProvider = async (provider: LoginProvider) => {
        try {
            setUser(await AuthService.link(provider));
            setStatus({
                type: 'success',
                message: `Linked ${ provider.providerName }!`
            });
        }
        catch (err) {
            console.error(err);

            setStatus({
                type: 'danger',
                message: `Failed to link ${ provider.providerName }. This ${ provider.providerName } account might be used for a different CWITC account. Try logging out of CWITC and logging in with ${ provider.providerName } or login with a different ${ provider.providerName } account.`
            });
        }
    };

    const unlinkProvider = async (provider: LoginProvider) => {
        try {
            setUser(await AuthService.unlink(provider));
            setStatus({
                type: 'success',
                message: `Unlinked ${ provider.providerName }`
            });
        }
        catch (err) {
            console.error(err);

            setStatus({
                type: 'danger',
                message: `Failed to unlink ${ provider.providerName }. Try logging out and logging back in again.`
            });
        }
    };

    const getFavoritesLink = (sessionPages: any, currentYear: string): string | null => {
        let link: string | null = null;

        if (sessionPages && sessionPages.edges && currentYear) {
            const favoritePage = sessionPages.edges.find(({ node }: any) => node.conferenceYear === currentYear);

            if (favoritePage && favoritePage.node && favoritePage.node.page) {
                link = favoritePage.node.page.slug + '?viewFavorites=true';
            }
        }

        return link;
    }

    return (
        <StaticQuery
            query={ profilePageQuery }
            render={ ({ global, sessionPages }) => {
                const { enableGithubAuth, enableFacebookAuth, enableTwitterAuth, enableGoogleAuth, currentYear } = global;

                const favoritesPath: string | null = getFavoritesLink(sessionPages, currentYear);

                return (
                    <div className="profile-container container">
                        <div className="row justify-content-center">
                            <div className="bio col-10 col-md-5 d-flex flex-column align-items-center">
                                { user.photoUrl ? <img src={ user.photoUrl } /> : null }
                                <h3>{ user.name }</h3>
                                <p onClick={ toggleUserId }>{ user.email }</p>
                                {
                                    showUserId && <pre>{ user.userId }</pre>
                                }
                                {
                                    favoritesPath ?
                                        <Link className="mb-3"to={ `/${ favoritesPath }` }>View Favorited Sessions</Link> :
                                        null
                                }
                            </div>
                            {
                                isLoading ?
                                    <div className="col-10 col-md-5 d-flex justify-content-center align-items-center">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    :
                                    <div className="col-10 col-md-5">
                                        <h4 className="text-center">Link other Providers</h4>
                                        <LoginButton
                                            displayText={ getButtonDisplayText(LoginProviders.github) }
                                            disabled={ disableButton(LoginProviders.github) }
                                            provider={ LoginProviders.github }
                                            providerEnabled={ enableGithubAuth }
                                            onClick={ handleSubmit }>
                                            <GitHubIcon />
                                        </LoginButton>
                                        <LoginButton
                                            displayText={ getButtonDisplayText(LoginProviders.facebook) }
                                            disabled={ disableButton(LoginProviders.facebook) }
                                            provider={ LoginProviders.facebook }
                                            providerEnabled={ enableFacebookAuth }
                                            onClick={ handleSubmit }>
                                            <FacebookIcon />
                                        </LoginButton>
                                        <LoginButton
                                            displayText={ getButtonDisplayText(LoginProviders.twitter) }
                                            disabled={ disableButton(LoginProviders.twitter) }
                                            provider={ LoginProviders.twitter }
                                            providerEnabled={ enableTwitterAuth }
                                            onClick={ handleSubmit }>
                                            <TwitterIcon />
                                        </LoginButton>
                                        <LoginButton
                                            displayText={ getButtonDisplayText(LoginProviders.google) }
                                            disabled={ disableButton(LoginProviders.google) }
                                            provider={ LoginProviders.google }
                                            providerEnabled={ enableGoogleAuth }
                                            onClick={ handleSubmit }>
                                            <GoogleIcon />
                                        </LoginButton>
                                        {
                                            status ?
                                                <div className="row justify-content-center">
                                                    <div className={`col-12 col-md-8 alert alert-${ status.type } d-flex justify-content-between`} role="alert">
                                                        { status.message }
                                                        <button type="button" className="close align-self-start mt-n1" onClick={ dismissAlert }>
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

export default Profile;

export type ProfileProps = {
    path: string;
};

export type ProfileStatus = {
    type: 'success' | 'danger';
    message: string;
}
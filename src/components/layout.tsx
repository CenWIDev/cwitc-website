import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header/header';
import Footer, { FooterProps } from './footer/footer';
import { trimChar } from './../services/text-helper';

// Imports Bootstrap
import './_vars.scss';

// Polyfills
import 'core-js/es6/number';

type Props = {
    isHomePage?: boolean;
    className?: string;
    path: string;
    children: React.ReactNode;
};

const Layout = ({ isHomePage = false, className, path, children }: Props) => (
    <StaticQuery
        query={graphql`
            query GlobalSiteSettings {
                siteSettings: contentfulGlobalSiteSettings {
                    siteName
                    siteUrl
                    addressLine1
                    addressLine2
                    cityStatePostalCode
                    contactEmailAddress
                    socialShareImageLarge {
                        fixed(width: 2160) {
                            src
                            width
                            height
                        }
                        file {
                            url
                        }
                    }
                    socialShareImageSmall {
                        fixed(width: 2160) {
                            src
                        }
                        file {
                            url
                        }
                    }
                    facebookEventUrl
                    twitterUsername
                    linkedInProfileUrl
                    gitHubProfileUrl
                }
                hero: contentfulHomePageHero {
                    description {
                        description
                    }
                }
            }
        `}
        render={({ siteSettings, hero }) => {

            const footerConfig: FooterProps = {
                addressLine1: siteSettings.addressLine1,
                addressLine2: siteSettings.addressLine2,
                cityStatePostalCode: siteSettings.cityStatePostalCode,
                contactEmailAddress: siteSettings.contactEmailAddress,
                facebookUrl: siteSettings.facebookEventUrl,
                twitterUsername: siteSettings.twitterUsername,
                linkedInUrl: siteSettings.linkedInProfileUrl,
                githubUrl: siteSettings.gitHubProfileUrl,
                siteName: siteSettings.siteName
            };

            let canonicalUrl: string = 'https://seo--cwitc.netlify.com'; //trimChar(siteSettings.siteUrl, '/');

            if (path) {
                canonicalUrl += `/${ trimChar(path, '/') }`;
            }

            canonicalUrl += '/';

            return (
                <>
                    <Helmet
                        title={`${ siteSettings.siteName }`}
                        meta={[
                            { property: 'og:type', content: 'website' },
                            { property: 'og:url', content: canonicalUrl },
                            { property: 'twitter:card', content: 'summary' },
                            { property: 'twitter:site:id', content: siteSettings.twitterUsername },
                            { property: 'twitter:image', content: `https:${ siteSettings.socialShareImageSmall.fixed.src || siteSettings.socialShareImageSmall.file.url }` },
                            { property: 'twitter:image:alt', content: `${ siteSettings.siteName } Logo` },
                            { property: 'og:image', content: `https:${ siteSettings.socialShareImageLarge.fixed.src || siteSettings.socialShareImageLarge.file.url }` },
                            { property: 'og:image:width', content: siteSettings.socialShareImageLarge.fixed.width },
                            { property: 'og:image:height', content: siteSettings.socialShareImageLarge.fixed.height },
                            { property: 'og:description', content: hero.description.description }
                        ]}>
                        <html lang="en" />
                        <link rel="canonical" href={ canonicalUrl } />
                    </Helmet>
                    <Header useHero={ isHomePage }/>
                    <div className={ className }>
                        { children }
                    </div>
                    <Footer { ...footerConfig }/>
                </>
            );
        }}
    />
);

export default Layout;

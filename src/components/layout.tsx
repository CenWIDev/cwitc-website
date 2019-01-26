import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header/header';
import Footer, { FooterProps } from './footer/footer';

// Imports Bootstrap
import './_vars.scss';

// Polyfills
import 'core-js/es6/number';

type Props = {
    isHomePage?: boolean ;
    children: React.ReactNode;
};

const Layout = ({ isHomePage = false, children }: Props) => (
    <StaticQuery
        query={graphql`
            query GlobalSiteSettings {
                siteSettings: contentfulGlobalSiteSettings {
                    siteName
                    addressLine1
                    addressLine2
                    cityStatePostalCode
                    contactEmailAddress
                    facebookEventUrl
                    twitterUsername
                    linkedInProfileUrl
                    gitHubProfileUrl
                }
            }
        `}
        render={({ siteSettings }) => {

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

            return (
                <>
                    <Helmet
                        title={`${ siteSettings.siteName }`}
                        meta={[
                            { name: 'description', content: 'Sample' },
                            { name: 'keywords', content: 'sample, something' }
                        ]}>
                        <html lang="en" />
                    </Helmet>
                    <Header useHero={ isHomePage }/>
                    <div>
                        { children }
                    </div>
                    <Footer { ...footerConfig }/>
                </>
            );
        }}
    />
);

export default Layout;

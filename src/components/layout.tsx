import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { BaseCSS as BaseBootstrapGrid } from 'styled-bootstrap-grid';

import GlobalStyle from '../styles/global-style';
import Header from './header/header';

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
                }
            }
        `}
        render={({ siteSettings }) => (
            <>
                <GlobalStyle />
                <BaseBootstrapGrid />
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
            </>
        )}
    />
);

export default Layout;

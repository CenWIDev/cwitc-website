import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import GlobalStyle from '../styles/global-style';
import Header from './header/header';

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
    <StaticQuery
        query={graphql`
            query GlobalSiteSettings {
                contentfulGlobalSiteSettings {
                    siteName
                }
            }
        `}
        render={({ contentfulGlobalSiteSettings }) => (
            <>
                <GlobalStyle />
                <Helmet
                    title={`${ contentfulGlobalSiteSettings.siteName }`}
                    meta={[
                        { name: 'description', content: 'Sample' },
                        { name: 'keywords', content: 'sample, something' }
                    ]}>
                    <html lang="en" />
                </Helmet>
                <Header />
                <div>
                    { children }
                </div>
            </>
        )}
    />
);

export default Layout;

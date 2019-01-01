import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';

import './layout.scss';

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
                <Helmet
                    title={`${ contentfulGlobalSiteSettings.siteName }`}
                    meta={[
                        { name: 'description', content: 'Sample' },
                        { name: 'keywords', content: 'sample, something' }
                    ]}>
                    <html lang="en" />
                </Helmet>
                <Header />
                <div className="container">
                    { children }
                </div>
            </>
        )}
    />
);

export default Layout;

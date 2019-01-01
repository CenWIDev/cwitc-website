import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import Header from './header';

import './layout.scss';

// Extract our Sass variables into a JS object
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./_vars.scss');

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
            <ThemeProvider theme={ theme }>
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
            </ThemeProvider>
        )}
    />
);

export default Layout;

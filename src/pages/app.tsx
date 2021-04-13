import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import { PrivateRoute } from './../components/privateRoute/privateRoute';
import { AdminRoute } from '../components/privateRoute/adminRoute';
import Profile from '../components/profile/profile';
import Login from '../components/login/login';
import NotFound from '../components/not-found/notFound';
import SessionSubmission from '../components/session-submission/session-submission';
import Admin from '../components/admin/admin';

const App = (props: any) => {
    const { globalSettings } = useStaticQuery(appGlobalSettingsQuery);

    return globalSettings && globalSettings.enableLogin ? (
        <Layout path={props.location.pathname}>
            <Router>
                <PrivateRoute path="/app/profile" component={Profile} />
                <PrivateRoute path="/app/submit-session" component={ SessionSubmission }/>
                <AdminRoute path="/app/admin" component={ Admin } />
                <Login path="/app/log-in" />
                <NotFound default />
            </Router>
        </Layout>
    ) : (
        <Layout path={props.location.pathname}>
            <NotFound default />
        </Layout>
    );
};

export default App;

const appGlobalSettingsQuery = graphql`
    query appGlobalSettingsQuery {
        globalSettings: contentfulGlobalSiteSettings {
            enableLogin
        }
    }
`;
import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import { PrivateRoute } from './../components/privateRoute/privateRoute';
import Profile from '../components/profile/profile';
import Login from '../components/login/login';
import NotFound from '../components/not-found/notFound';
// import SessionSubmission from '../components/session-submission/session-submission';

const App = (props: any) => (
    <Layout path={props.location.pathname}>
        <Router>
            <PrivateRoute path="/app/profile" component={Profile} />
            {/* <PrivateRoute path="/app/submit-session" component={ SessionSubmission }/> */}
            <Login path="/app/log-in" />
            <NotFound default />
        </Router>
    </Layout>
);

export default App;

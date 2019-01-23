import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import { PrivateRoute } from './../components/privateRoute/privateRoute';
import Profile from '../components/profile/profile';
import Login from '../components/login/login';
import SessionSubmission from '../components/session-submission/session-submission';

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={ Profile }/>
      <PrivateRoute path="/app/submit-session" component={ SessionSubmission }/>
      <Login path="/app/login" />
    </Router>
  </Layout>
);

export default App;
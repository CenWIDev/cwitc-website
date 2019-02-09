import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import { PrivateRoute } from './../components/privateRoute/privateRoute';
import Profile from '../components/profile/profile';
import Login from '../components/login/login';

const App = (props: any) => (
  <Layout path={ props.location.pathname }>
    <Router>
      <PrivateRoute path="/app/profile" component={ Profile }/>
      <Login path="/app/log-in" />
    </Router>
  </Layout>
);

export default App;
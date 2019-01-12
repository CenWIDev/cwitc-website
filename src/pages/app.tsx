import React from "react";
import { Router } from "@reach/router";
import Layout from "../components/layout";
import PrivateRoute from './../components/privateRoute/privateRoute';
import Profile from "../components/profile/profile";
import Login from "../components/login/login";

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={ Profile }/>
      <Login path="/app/login" />
    </Router>
  </Layout>
);

export default App;
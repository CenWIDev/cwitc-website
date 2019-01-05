import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout';
import { Container } from '../components/layout/container';

const Header = styled.h1`
  color: '#0505'
`;

class IndexPage extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <div>
            <Header>Hi people</Header>
            <p>Welcome to your new Gatsby site.</p>
            <p>Now go build something great.</p>
            <Link to="/page-2/">Go to page 2</Link>
          </div>
          <div>
            <Header>Hi people</Header>
            <p>Welcome to your new Gatsby site.</p>
            <p>Now go build something great.</p>
            <Link to="/page-2/">Go to page 2</Link>
          </div>
        </Container>
      </Layout>
    )
  }
}
export default IndexPage;

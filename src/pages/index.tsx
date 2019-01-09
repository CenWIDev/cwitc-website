import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Container } from 'styled-bootstrap-grid';

import Layout from '../components/layout';

const Header = styled.h1`
  color: '#0505';
`;

class IndexPage extends Component {
    render() {
        return (
            <StaticQuery
                query={graphql`
                    query LandingPageQuery {
                        contentfulLandingPageLayout {
                            heading
                            heroImage {
                                resize(width: 1600) {
                                    src
                                }
                            }
                        }
                    }
                `}
                render={({ contentfulLandingPageLayout }) => (
                    <Layout isHomePage={ true }>
                        <Container >
                            <div>
                                <Header>{ contentfulLandingPageLayout.heading }</Header>
                                <p>Welcome to your new Gatsby site.</p>
                                <p>Now go build something great.</p>
                                <Link to="/page-2/">Go to page 2</Link>
                            </div>
                        </Container>
                    </Layout>
                )}
            />
        )
    }
}

export default IndexPage;

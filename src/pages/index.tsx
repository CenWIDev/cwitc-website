import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Container, Row, Col } from 'styled-bootstrap-grid';

import Icon from '../components/icon/icon';
import Layout from '../components/layout';

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
                        hero: contentfulHomePageHero {
                            description {
                              description
                            }
                        }
                    }
                `}
                render={({ contentfulLandingPageLayout, hero }) => (
                    <Layout isHomePage={ true }>
                        <Container>
                            <Row>
                                <Col hiddenSmUp>
                                    <p>{ hero.description.description }</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Icon name="inbox" />
                                </Col>
                            </Row>
                        </Container>
                    </Layout>
                )}
            />
        )
    }
}

export default IndexPage;

import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import Layout from '../components/layout';
import IconCard , { IconCardProps, IconCardJustifications } from './../components/icon-card/icon-card';

const CardRule = styled.hr`
    margin: 3rem auto;
    width: 100%;
`;

class IndexPage extends Component {
    render() {
        return (
            <StaticQuery
                query={graphql`
                    query LandingPageQuery {
                        landingPageContent: contentfulLandingPageLayout {
                            title
                            cards {
                                title
                                description {
                                    childContentfulRichText {
                                        html
                                    }
                                }
                                iconName
                            }
                        }
                        hero: contentfulHomePageHero {
                            description {
                              description
                            }
                        }
                    }
                `}
                render={({ landingPageContent, hero }) => (
                    <Layout isHomePage>
                        <Container>
                            <Row>
                                <Col hiddenSmUp>
                                    <p>{ hero.description.description }</p>
                                </Col>
                            </Row>
                            {
                                landingPageContent.cards.map((contentfulIconCard: any, index: number) => {
                                    const iconCardProps: IconCardProps = {
                                        title: contentfulIconCard.title,
                                        descriptionHtml: contentfulIconCard.description.childContentfulRichText.html,
                                        iconName: contentfulIconCard.iconName,
                                        justification: index % 2 === 0 ? IconCardJustifications.LEFT : IconCardJustifications.RIGHT
                                    };

                                    return (
                                        <>
                                            <IconCard { ...iconCardProps } />
                                            { index !== landingPageContent.cards.length - 1 ? <CardRule /> : null }
                                        </>
                                    );
                                })
                            }
                        </Container>
                    </Layout>
                )}
            />
        )
    }
}

export default IndexPage;

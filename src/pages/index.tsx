import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components';

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
                        <div className="container">
                            <div className="row">
                                <div className="col d-block d-sm-none">
                                    <p>{ hero.description.description }</p>
                                </div>
                            </div>
                            {
                                landingPageContent.cards.map((contentfulIconCard: any, index: number) => {
                                    const iconCardProps: IconCardProps = {
                                        title: contentfulIconCard.title,
                                        descriptionHtml: contentfulIconCard.description.childContentfulRichText.html,
                                        iconName: contentfulIconCard.iconName,
                                        justification: index % 2 === 0 ? IconCardJustifications.LEFT : IconCardJustifications.RIGHT
                                    };

                                    return (
                                        <React.Fragment key={ index }>
                                            <IconCard { ...iconCardProps } />
                                            { index !== landingPageContent.cards.length - 1 ? <CardRule /> : null }
                                        </React.Fragment>
                                    );
                                })
                            }
                        </div>
                    </Layout>
                )}
            />
        )
    }
}

export default IndexPage;

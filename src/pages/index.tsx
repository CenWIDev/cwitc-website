import React, { Component, ReactNode } from 'react'
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout';
import IconCard , { IconCardProps, IconCardJustifications } from './../components/icon-card/icon-card';

import './index.scss';

export default class IndexPage extends Component {

    public render(): ReactNode {
        return (
            <StaticQuery
                query={ homePageQuery }
                render={({ landingPageContent, hero }) => this.renderPage(landingPageContent, hero)} />
        );
    }

    public renderPage(landingPageContent: any, hero: any): ReactNode {
        return (
            <Layout isHomePage path="">
                <Helmet
                    meta={[
                        { property: 'og:title', content: landingPageContent.title },
                        !!landingPageContent.page.socialMediaShareDescription ? { property: 'og:description', content: landingPageContent.page.socialMediaShareDescription } : { }
                    ]}
                />
                <div className="home-container container">
                    <div className="row">
                        <div className="col d-block d-sm-none">
                            <p>{ hero.description.description }</p>
                        </div>
                    </div>
                    { this.renderPartners(landingPageContent.partners) }
                    { this.renderCards(landingPageContent.cards) }
                    { this.renderSponsors(landingPageContent.sponsors) }
                </div>
            </Layout>
        );
    }

    public renderPartners(partners: any[]): ReactNode | null {
        return partners && partners.length > 0 ?
            <>
                <div className="row mb-3">
                    <h3 className="col text-center">Organizers and Community Partners</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="row justify-content-center align-items-center">
                            {
                                partners
                                    .map(({ name, siteUrl, logo }: any) => (
                                        <div className="col-6 col-sm">
                                            <a href={ siteUrl } title={ name } target="_blank" rel="noopener">
                                                <img className="w-100" src={ logo.fixed.src } alt={ name } />
                                            </a>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </> :
            null;
    }

    public renderSponsors(partners: any[]): ReactNode | null {
        partners.sort((a, b) => {
            const sortValueA: number = determineSortValue(a.sponsorshipLevel);
            const sortValueB: number = determineSortValue(b.sponsorshipLevel);

            return sortValueA - sortValueB;

            function determineSortValue(level: string) {
                switch (level) {
                    case 'Gold': return 1;
                    case 'Silver': return 2;
                    case 'Bronze': return 3;
                    case 'Other': return 4;
                    default: return 5;
                }
            }
        });

        return partners && partners.length > 0 ?
            <>
                <div className="row mb-3">
                    <h3 className="col text-center">Thank you to our Sponsors!</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="row justify-content-start align-items-center">
                        {
                            partners.map(({ name, siteUrl, logo, sponsorshipLevel }: any) => (
                                <div className="sponsor-card-container col-12 col-md-6 col-lg-4 mb-3">
                                    <a href={ siteUrl } title={ name } target="_blank" rel="noopener" className="d-block">
                                        <div className={ `sponsor-card sponsor-${ sponsorshipLevel.toLowerCase() } d-flex flex-column justify-content-center mb-1` }>
                                            <img className="w-100" src={ logo.fixed.src } alt={ name } />
                                            <span className="sponsor-level text-center mb-0">{ sponsorshipLevel }</span>
                                        </div>
                                        <p className="sponsor-name text-center">{ name }</p>
                                    </a>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </> :
            null;
    }

    public renderCards(cards: any[]): ReactNode | null {
        return cards && cards.length > 0 ? cards.map(mapCard) : null;

        function mapCard(contentfulIconCard: any, index: number) {
            const iconCardProps: IconCardProps = {
                title: contentfulIconCard.title,
                descriptionHtml: contentfulIconCard.description.childContentfulRichText.html,
                iconName: contentfulIconCard.iconName,
                justification: index % 2 === 0 ? IconCardJustifications.LEFT : IconCardJustifications.RIGHT
            };

            return (
                <React.Fragment key={ index }>
                    <hr />
                    <IconCard { ...iconCardProps } />
                    { index === cards.length - 1 ? <hr /> : null }
                </React.Fragment>
            );
        }
    }
}

const homePageQuery = graphql`
    query LandingPageQuery {
        landingPageContent: contentfulLandingPageLayout {
            title
            partners {
                name
                siteUrl
                logo {
                    fixed(width: 500) {
                        src
                    }
                }
            }
            cards {
                title
                description {
                    childContentfulRichText {
                        html
                    }
                }
                iconName
            }
            sponsors {
                name
                siteUrl
                sponsorshipLevel
                logo {
                    fixed(width: 500) {
                        src
                    }
                }
            }
            page {
                socialMediaShareDescription
            }
        }
        hero: contentfulHomePageHero {
            description {
                description
            }
        }
    }
`;
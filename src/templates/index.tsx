import React, { ReactNode } from 'react'
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout';
import IconCard , { IconCardProps, IconCardJustifications } from '../components/icon-card/icon-card';
import { getUrlSafeId } from '../services/text-helper';

import './index.scss';

const IndexPage = ({ data }: any) => {

    const { landingPageContent, hero, keynotes, latestSessionsPage } = data;

    const renderPage = (landingPageContent: any, hero: any, keynotes: any[], latestSessionsPage: any[]): ReactNode => {
        const sessionsPageSlug: string = latestSessionsPage && latestSessionsPage.length === 1 && latestSessionsPage[0].node && latestSessionsPage[0].node.page ? latestSessionsPage[0].node.page.slug : '';

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
                    { renderPartners(landingPageContent.partners) }
                    { renderKeynotes(keynotes, sessionsPageSlug) }
                    { renderCards(landingPageContent.cards) }
                    { renderSponsors(landingPageContent.sponsors) }
                </div>
            </Layout>
        );
    };

    const renderPartners = (partners: any[]): ReactNode | null => {
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
                                    .map(({ name, siteUrl, logo }: any, index: number) => (
                                        <div className="col-6 col-sm" key={ index }>
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
    };

    const renderKeynotes = (keynotes: any[], sessionsPageSlug: string): ReactNode | null => {
        return keynotes && keynotes.length > 0 ?
            <>
                <hr />
                <div className="row mb-3">
                    <h3 className="col text-center">{ keynotes.length === 1 ? 'Our Keynote Speaker' : 'Our Keynote Speakers' }</h3>
                </div>
                <div className="row justify-content-center">
                    {
                        keynotes
                            .sort((a: any, b: any) => {
                                const aTime = new Date(a.node.startDateTime);
                                const bTime = new Date(b.node.startDateTime);
                                if (aTime > bTime) { return 1; }
                                if (aTime < bTime) { return -1; }

                                return 0;
                            })
                            .map(({ node }: any, index: number) => (
                                <div className="col-md-6 col-lg-5 col-sm-7 col-8 mb-3 mb-lg-0 keynote-speaker-card" key={ index }>
                                    <div className="card mb-3 h-100">
                                        <div className="row no-gutters h-100">
                                            <div className="col-md-5 col-lg-4">
                                                <img src={ node.speakers[0].photo.fixed.src } className="card-img h-100 w-100" alt={ node.speakers[0].name } />
                                            </div>
                                            <div className="col-md-7 col-lg-8">
                                                <div className="card-body h-100 d-flex flex-column">
                                                    <h5 className="card-title">{ node.speakers[0].name }</h5>
                                                    <div className="flex-grow-1">
                                                        <p className="font-italic mb-0">{ node.title }</p>
                                                        <small className="text-muted">{ node.sessionType } &#64; { node.startTime }</small>
                                                    </div>
                                                    {
                                                        sessionsPageSlug ?
                                                            <Link to={`/${ sessionsPageSlug }#${ getUrlSafeId(node.title) }`}>
                                                                <small>Read More...</small>
                                                            </Link> :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </> :
            null;
    };

    const renderSponsors = (partners: any[]): ReactNode | null => {
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
                        <div className="row justify-content-center align-items-center">
                        {
                            partners.map(({ name, siteUrl, logo, sponsorshipLevel }: any, index: number) => (
                                <div className="sponsor-card-container col-12 col-md-6 col-lg-4 mb-3" key={ index }>
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
    };

    const renderCards  = (cards: any[]): ReactNode | null => {
        return cards && cards.length > 0 ? cards.map(mapCard) : null;

        function mapCard(contentfulIconCard: any, index: number) {
            const iconCardProps: IconCardProps = {
                title: contentfulIconCard.title,
                descriptionRichText: contentfulIconCard.description.json,
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
    };

    return renderPage(landingPageContent, hero, keynotes.edges, latestSessionsPage.edges);
};

export default IndexPage;

export const query = graphql`
    query LandingPageQuery($currentConferenceStartOfDay: Date!, $currentConferenceEndOfDay: Date!) {
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
                    json
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
        latestSessionsPage: allContentfulSessionsPageLayout(
            sort: {
                fields: [page___slug],
                order: DESC
            },
            limit:1
          ) {
              edges {
                node {
                  page {
                    slug
                  }
                }
              }
          }
        keynotes: allContentfulSession(filter: {
            sessionType: {
                in: ["Opening Keynote", "Closing Keynote"]
            },
            startTime:{
              gte: $currentConferenceStartOfDay,
              lte: $currentConferenceEndOfDay
            }
        }) {
            edges {
                node {
                    title
                    sessionType
                    startDateTime: startTime
                    startTime(formatString: "h:mma")
                    speakers {
                        name
                        photo {
                            fixed {
                                src
                            }
                        }
                    }
                }
            }
        }
    }
`;
import React, { Component, ReactNode } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from './../components/layout';
import Session, { SessionProps } from './../components/session/session';

import './sessionsPageLayout.scss';

export default class SessionsPageLayout extends Component {

    public props: any;

    public render(): ReactNode {
        const { sessionsPage, sessions } = this.props.data;
        const { page, heading, heroImage, emptyPageContent } = sessionsPage;

        const sessionGroups = sessions && sessions.edges ? sessions.edges
            .reduce((result: any, sessionNode: any) => {
                const session = sessionNode.node;
                result[session.startDateTime] = result[session.startDateTime] || [];
                result[session.startDateTime].push(session);
                return result;
            }, { }) : { };

        const sessionGroupsSorted = Object.keys(sessionGroups);
        sessionGroupsSorted
            .sort((a: any, b: any) => {
                const aTime = new Date(b).getTime();
                const bTime = new Date(a).getTime();

                if (aTime > bTime) return -1;
                if (aTime < bTime) return 1;
                return 0;
            });

        return (
            <Layout className="sessions-page-wrapper" path={ page.slug }>
                <Helmet
                    meta={[
                        !!page.socialMediaShareDescription ? { property: 'description', content: page.socialMediaShareDescription } : { },
                        { property: 'og:title', content: page.title },
                        !!page.socialMediaShareDescription ? { property: 'og:description', content: page.socialMediaShareDescription } : { }
                    ]}
                />
                <div
                    className="hero container-fluid text-center"
                    style={{ backgroundImage: `url(${ heroImage.fixed.src })` }}>
                    <h1>{ heading }</h1>
                </div>
                <div className="session-groups-container container">
                    {
                        !sessions || !sessions.edges || sessions.edges.length === 0 ?
                            /* Empty Page Content: No sessions have been published */
                            <div className="row justify-content-center">
                                <div className="col-12 col-sm-8" dangerouslySetInnerHTML={{ __html: emptyPageContent.childContentfulRichText.html }} />
                            </div> :

                            /* Grouped list of sesions and events by time */
                            <div className="row justify-content-center">
                            {
                                sessionGroupsSorted.map((key: string) => {
                                    const groupedSessions = sessionGroups[key];

                                    let startTime, endTime = null;

                                    const sessionChildren = groupedSessions.map((session: any) => {
                                        startTime = session.startTime;
                                        endTime = session.endTime;

                                        const sessionProps: SessionProps = {
                                            session: {
                                                id: session.id,
                                                title: session.title,
                                                speakers: session.speakers ?
                                                    session.speakers.map((speaker: any) => ({ name: speaker.name })):
                                                    undefined,
                                                abstractHtml: session.description.childContentfulRichText.html,
                                                startTime: session.startTime,
                                                endTime: session.endTime,
                                                room: session.room,
                                                category: session.category ? {
                                                    name: session.category.name,
                                                    colorHex: session.category.color
                                                } : undefined,
                                                sessionType: session.sessionType
                                            }
                                        };

                                        return (
                                            <Session key={ session.id } session={ sessionProps.session } />
                                        );
                                    });

                                    const displayTime: string = `${ startTime }${ endTime ? ' - ' + endTime : '' }`;

                                    return (
                                        <div className="session-group-container col-md-10" key={ key }>
                                            <h4 className="h1 session-group-heading text-center text-sm-left">{ displayTime }</h4>
                                            { sessionChildren }
                                        </div>
                                    );
                                })
                            }
                            </div>
                    }
                </div>
            </Layout>
        );
    }
}

export const query = graphql`
    query SessionsPageQuery($slug: String!, $yearGlob: String!) {
        sessionsPage: contentfulSessionsPageLayout(page: {
            slug: {
                eq: $slug
            }
        }) {
            heading
            heroImage {
                fixed(width: 400) {
                    src
                }
            }
            page {
                title
                slug
            }
            emptyPageContent {
                childContentfulRichText {
                    html
                }
            }
        }
        sessions: allContentfulSession(
            filter: {
              startTime: { glob: $yearGlob }
            }
        ) {
            edges {
            node {
                id
                title
                description {
                    childContentfulRichText {
                        html
                    }
                }
                sessionType
                startDateTime: startTime
                startTime(formatString: "h:mma")
                endTime(formatString: "h:mma")
                room
                category {
                    name
                    color
                }
                speakers {
                    name
                }
            }
        }
    }
}`;
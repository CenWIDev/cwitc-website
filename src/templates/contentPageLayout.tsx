import React, { Component, ReactNode } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import RichText from './../components/richText/richText';

import Layout from './../components/layout';

import './contentPageLayout.scss';

export default class ContentPageLayout extends Component {

    public props: any;

    public render(): ReactNode {
        const { contentfulContentPageLayout } = this.props.data;
        const { heading, subheading, heroImage, body, entries, callToActionButton, page } = contentfulContentPageLayout;

        return (
            <Layout className="content-page-wrapper" path={ page.slug }>
                <Helmet
                    title={ page.title }
                    meta={[
                        !!page.socialMediaShareDescription ? { property: 'description', content: page.socialMediaShareDescription } : { },
                        { property: 'og:title', content: page.title },
                        !!page.socialMediaShareDescription ? { property: 'og:description', content: page.socialMediaShareDescription } : { }
                    ]}
                />
                <div
                    className="hero container-fluid"
                    style={{ backgroundImage: `url(${ heroImage.fixed.src })` }}>
                    <h1>{ heading }</h1>
                    <h3>{ subheading }</h3>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col col-md-8">
                            <RichText richText={ body.json } />
                        </div>
                    </div>
                    {
                        entries &&
                        <div className="row justify-content-center">
                            {
                                entries.map((entry: any, index: number, array: any[]) => {
                                    const { __typename } = entry;

                                    switch (__typename) {
                                        case 'ContentfulPartner':
                                            return (
                                                <div className={`col-12 col-md-6 mx-md-5 pb-3 d-flex flex-column align-items-center mb-5`} key={index}>
                                                    <a href={entry.siteUrl} target="_blank" rel="noopener" className="mx-auto d-block border p-3">
                                                        <img className="w-100" src={ entry.logo.fixed.src} alt={`${entry.name} logo`} />
                                                    </a>
                                                    <a href={entry.siteUrl} target="_blank" rel="noopener" className="w-75 mt-1 text-center">{entry.name}</a>
                                                </div>
                                            );
                                        default:
                                            return <span>No renderer for { __typename }</span>
                                    }
                                })
                            }
                        </div>
                    }
                    {
                        callToActionButton ?
                            <div className="row justify-content-center mt-3">
                                <div className="cta col-12 col-md-4">
                                    <RichText richText={ callToActionButton.json } />
                                </div>
                            </div> :
                            null
                    }
                </div>
            </Layout>
        );
    }
}

export const query = graphql`
    query ContentPageQuery($slug: String!) {
        contentfulContentPageLayout(page: {
            slug: {
                eq: $slug
            }
        }) {
            heading
            subheading
            heroImage {
                fixed(width: 2560) {
                    src
                }
            }
            body {
                json
            }
            entries {
                ... on ContentfulPartner {
                    __typename
                    name
                    siteUrl
                    logo {
                        fixed(width: 1000) {
                            src
                        }
                    }
                }
            }
            callToActionButton {
                json
            }
            page {
                title
                socialMediaShareDescription
                slug
            }
        }
    }`;
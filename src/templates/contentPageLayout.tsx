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
        const { heading, subheading, heroImage, body, callToActionButton, page } = contentfulContentPageLayout;

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
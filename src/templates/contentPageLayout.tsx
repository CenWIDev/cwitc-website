import React, { Component, ReactNode } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from './../components/layout';

import './contentPageLayout.scss';

export default class ContentPageLayout extends Component {

    public props: any;

    public render(): ReactNode {
        const { contentfulContentPageLayout } = this.props.data;
        const { heading, subheading, heroImage, body, page } = contentfulContentPageLayout;

        return (
            <Layout className="content-page-wrapper" path={ page.slug }>
                <Helmet
                    meta={[
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
                <div className="container d-flex justify-content-center">
                    <div className="col col-md-8"dangerouslySetInnerHTML={{ __html: body.childContentfulRichText.html }} />
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
                childContentfulRichText {
                    html
                }
            }
            page {
                title
                socialMediaShareDescription
                slug
            }
        }
    }`;
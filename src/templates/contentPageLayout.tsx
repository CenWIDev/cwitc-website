import React, { Component, ReactNode } from 'react';
import { graphql } from 'gatsby';

import Layout from './../components/layout';

export default class ContentPageLayout extends Component {

    public props: any;

    public render(): ReactNode {
        const { contentfulContentPageLayout } = this.props.data;
        const { heading, subheading, body } = contentfulContentPageLayout;

        return (
            <Layout>
                <h1>{ heading }</h1>
                <h3>{ subheading }</h3>
                <div dangerouslySetInnerHTML={{ __html: body.childContentfulRichText.html }} />
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
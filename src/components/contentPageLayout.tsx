import React, { Component, ReactNode } from 'react';
import { graphql } from 'gatsby';

import Layout from './layout';

export default class ContentPageLayout extends Component {

    public render(): ReactNode {
        return (
            <Layout>
                <h1>content page</h1>
            </Layout>
        );
    }
}

// export const query = graphql`
//     query PageQuery($slug: String!) {
//         markdownRemark(frontmatter: {
//             slug: {
//                 eq: $slug
//             }
//         }) {
//             html
//             frontmatter {
//                 title
//                 date
//                 slug
//             }
//         }
//     }`;
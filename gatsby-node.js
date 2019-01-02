const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const DYNAMIC_PAGES_QUERY = `
        query ContentPagesQuery {
            allContentfulContentPageLayout {
                edges {
                    node {
                        page {
                            slug
                        }
                    }
                }
            }
        }`;

    return new Promise((resolve) => {
        graphql(DYNAMIC_PAGES_QUERY)
            .then(({ data }) => {
                data.allContentfulContentPageLayout.edges.forEach(({node}) => {
                    createPage({
                        path: `/${ node.page.slug }`,
                        component: path.resolve('./src/components/contentPageLayout.tsx'),
                        context: {
                            slug: node.page.slug
                        }
                    })
                });
                resolve();
            });
    });
};
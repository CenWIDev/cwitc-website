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
                        component: path.resolve('./src/templates/contentPageLayout.tsx'),
                        context: {
                            slug: node.page.slug
                        }
                    })
                });
                resolve();
            });
    });
};

// https://github.com/gatsbyjs/gatsby/issues/8612#issuecomment-428820523
exports.onCreateWebpackConfig = ({actions, stage}) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /firebase/,
                        use: ['null-loader']
                    },
                ],
            }
        })
    }
};
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const DYNAMIC_PAGES_QUERY = `
        query ContentPagesQuery {
            contentPages: allContentfulContentPageLayout {
                edges {
                    node {
                        page {
                            slug
                        }
                    }
                }
            }
            sessionPages: allContentfulSessionsPageLayout {
                edges {
                  node {
                    conferenceDate
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
                data.contentPages.edges.forEach(({node}) => {
                    createPage({
                        path: `/${ node.page.slug }`,
                        component: path.resolve('./src/templates/contentPageLayout.tsx'),
                        context: {
                            slug: node.page.slug
                        }
                    })
                });

                data.sessionPages.edges.forEach(({node}) => {
                    const conferenceStartOfDay = new Date(node.conferenceDate);
                    conferenceStartOfDay.setUTCHours(0, 0, 0, 0);

                    const conferenceEndOfDay = new Date(node.conferenceDate);
                    conferenceEndOfDay.setUTCHours(23, 59, 59, 999);

                    createPage({
                        path: `/${ node.page.slug }`,
                        component: path.resolve('./src/templates/sessionsPageLayout.tsx'),
                        context: {
                            conferenceStartOfDay: conferenceStartOfDay.toISOString(),
                            conferenceEndOfDay: conferenceEndOfDay.toISOString(),
                            slug: node.page.slug
                        }
                    })
                });
                resolve();
            });
    });
};

// https://github.com/gatsbyjs/gatsby/issues/8612#issuecomment-428820523
exports.onCreateWebpackConfig = ({ actions, stage }) => {
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

    if (stage === 'develop') {
        actions.setWebpackConfig({
            devtool: 'cheap-module-source-map'
        });
    }
};
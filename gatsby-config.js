const { INLINES, BLOCKS } = require('@contentful/rich-text-types');
const { ParagraphRenderer } = require('./contentful/paragraph-renderer');
const { HyperlinkRenderer } = require('./contentful/hyperlink-renderer');
const { EntryHyperlinkRenderer } = require('./contentful/entry-hyperlink-renderer');
const { AssetHyperlinkRenderer } = require('./contentful/asset-hyperlink-renderer');

if (process.env.ENVIROMENT !== 'production') {
  require('dotenv').config()
}

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
}

module.exports = {
  siteMetadata: {
    siteUrl: 'https://cwitc.org'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Central Wisconsin IT Conference',
        short_name: 'CWITC',
        start_url: '/',
        background_color: '#ec2f4b',
        theme_color: '#ec2f4b',
        display: 'browser',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: [`/app/*`] }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/app', '/app/*']
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.cwitc.org',
        sitemap: 'https://www.cwitc.org/sitemap.xml',
        resolveEnv: () => process.env.ENV,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          preview: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          }
        }
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
    'gatsby-transformer-remark',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: '@contentful/gatsby-transformer-contentful-richtext',
      options: {
        renderOptions: {
          renderNode: {
            [BLOCKS.PARAGRAPH]: ParagraphRenderer,
            [INLINES.HYPERLINK]: HyperlinkRenderer,
            [INLINES.ENTRY_HYPERLINK]: EntryHyperlinkRenderer,
            [INLINES.ASSET_HYPERLINK]: AssetHyperlinkRenderer
          }
        }
      }
    },
    'gatsby-plugin-netlify' // This must be last in the config list
  ]
}

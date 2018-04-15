const
    metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    layouts = require('metalsmith-layouts'),
    discoverPartials = require('metalsmith-discover-partials'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    sass = require('metalsmith-sass'),
    handlebars = require('handlebars'),
    helpers = require('handlebars-helpers'),
    autoprefixer = require('metalsmith-autoprefixer'),
    assets = require('metalsmith-assets'),
    // copy = require('metalsmith-copy-assets-540'),
    browsersync = require('metalsmith-browser-sync'),
    circularJSON = require('circular-json'),
    appConfig = require('./app-config.json');

const environment = process.argv[2] || 'dev';

handlebars.registerHelper('json', function(context) {
    return circularJSON.stringify(context);
});

helpers();

const pipeline =
    metalsmith(__dirname)
        .metadata(appConfig)
        .source('src/site')
        .destination('dist')
        .use(assets({
            source: 'src/site/assets',
            destination: 'assets'
        }))
        .use(collections({
            pages: {
                pattern: '*.md'
            }
        }))
        .use(markdown())
        .use(permalinks({
            pattern: ':collections/:title',
            relative: false
        }))
        .use(discoverPartials({
            directory: 'src/layouts/partials',
            pattern: /\.hbs$/
        }))
        .use(sass({
            includePaths: ['src/site/styles']
        }))
        .use(autoprefixer())
        .use(layouts({
            directory: 'src/layouts'
        }));

    if (environment === 'dev') {
        pipeline
            .use(browsersync({
                server: "dist",
                files: [
                    "src/site/**/*.md",
                    "src/site/**/*.scss",
                    "src/layouts/**/*.hbs"
                ]
            }))
            // https://github.com/segmentio/metalsmith-collections/issues/27#issuecomment-266647074
            .use((files, metalsmith, done) => {
                setImmediate(done);
                metalsmith.metadata(Object.assign({
                    site: {},
                    package: require( './package.json')
                }, appConfig));
            });
    }

    pipeline
        .build(function (err) { if(err) console.log(err) })

/**
 * A custom renderer to change how Entry Hyperlinks are rendered from Rich Text fields on a content model.
 * Used in gatsby-config.js
 */
module.exports.EntryHyperlinkRenderer = node => {
    const text = node.content
        .reduce((accumulator, currentContent) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const slug = `/${ node.data.target.fields.slug['en-US'] }`;

    return `<a href="${ slug }">${ text }</a>`;
};
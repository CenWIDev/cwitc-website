/**
 * A custom renderer to change how Entry Hyperlinks are rendered from Rich Text fields on a content model.
 * Used in gatsby-config.js
 */
module.exports.AssetHyperlinkRenderer = node => {
    const text = node.content
        .reduce((accumulator, currentContent) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const fileUrl = node.data.target.fields.file['en-US'].url;

    return `<a href="https:${ fileUrl }" target="_blank" rel="noopener">${ text }</a>`;
};
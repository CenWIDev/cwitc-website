/**
 * A custom renderer to change how paragraph are rendered from Rich Text fields on a content model.
 * Used in gatsby-config.js
 */
module.exports.ParagraphRenderer = (node, next) => {
    return `<p>${next(node.content).replace(/\n/g, `</br>`)}</p>`;
};
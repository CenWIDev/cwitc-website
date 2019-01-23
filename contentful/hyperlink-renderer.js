module.exports.HyperlinkRenderer = node => {
    const text = node.content
        .reduce((accumulator, currentContent) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const location = node.data.uri;

    return `<a href="${ location }" rel="noopener">${ text }</a>`;
};
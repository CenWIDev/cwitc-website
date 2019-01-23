module.exports.EntryHyperlinkRenderer = node => {
    const text = node.content
        .reduce((accumulator, currentContent) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const slug = `/${ node.data.target.fields.slug['en-US'] }`;

    return `<a href="${ slug }">${ text }</a>`;
};
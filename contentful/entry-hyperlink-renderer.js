const { INLINES } = require('@contentful/rich-text-types');

module.exports.EntryHyperlinkRenderer = {
    [INLINES.ENTRY_HYPERLINK]: node => {
        const text = node.content
            .reduce((accumulator, currentContent) => {
                return `${ accumulator } ${ currentContent.value }`;
            }, '')
            .trim();

        const slug = `/${ node.data.target.fields.slug['en-US'] }`;

        return `<a href="${ slug }">${ text }</a>`;
    }
};
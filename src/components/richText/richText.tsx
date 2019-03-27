import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';

const entryHyperlinkRenderer = (node: any) => {
    const text = node.content
        .reduce((accumulator: any, currentContent: any) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const slug = `/${ node.data.target.fields.slug['en-US'] }`;

    return <Link to={ slug }>{ text }</Link>;
}

const assetHyperlinkRenderer = (node: any) => {
    const text = node.content
        .reduce((accumulator: any, currentContent: any) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const fileUrl = node.data.target.fields.file['en-US'].url;

    return <a href={ `https:${ fileUrl }` } target="_blank" rel="noopener">${ text }</a>;
};

const externalHyperlinkRenderer = (node: any) => {
    const text = node.content
        .reduce((accumulator: any, currentContent: any) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const location = node.data.uri;

    return <a href={` ${ location } `} target="_blank" rel="noopener">${ text }</a>;
};

const paragraphRenderer = (node: any) => {
    const text = node.content
        .reduce((accumulator: any, currentContent: any) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    return <p>{ text.replace(/\n/g, `</br>`) }</p>;
};

const RichText = ({ richText }: { richText: Document }) => {
    const options: Options = {
        renderNode: {
            [INLINES.ENTRY_HYPERLINK]: entryHyperlinkRenderer,
            [INLINES.ASSET_HYPERLINK]: assetHyperlinkRenderer,
            [INLINES.HYPERLINK]: externalHyperlinkRenderer,
            // [BLOCKS.PARAGRAPH]: paragraphRenderer
        }
    };

    return documentToReactComponents(richText, options);
};

export default RichText;
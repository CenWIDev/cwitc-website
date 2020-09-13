import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import { Document, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';

const englishUsLocale: string = 'en-US';

const entryHyperlinkRenderer = (node: any): ReactNode => {
    const text = node.content
        .reduce((accumulator: any, currentContent: any) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    // if this ever throws an undefined error during development, delete the gatsby cache and restart
    const slug = `/${ node.data.target.fields.slug[englishUsLocale] }`;

    return <Link to={ slug }>{ text }</Link>;
}

const assetHyperlinkRenderer = (node: any): ReactNode => {
    const text = node.content
        .reduce((accumulator: any, currentContent: any) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const fileUrl = node.data.target.fields.file[englishUsLocale].url;

    return <a href={ `https:${ fileUrl }` } target="_blank" rel="noopener">{ text }</a>;
};

const externalHyperlinkRenderer = (node: any): ReactNode => {
    const text = node.content
        .reduce((accumulator: any, currentContent: any) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const location = node.data.uri;

    return <a href={` ${ location } `} target="_blank" rel="noopener">{ text }</a>;
};

const inlineEmbeddedEntryRenderer = (node: any): ReactNode => {
    try {
        if (node.data.target.sys.contentType.sys.id === 'partner' && node.data.target.fields.partnerType[englishUsLocale] === 'Lunch Venue') {
            return (
                <>
                    <a href={ node.data.target.fields.siteUrl[englishUsLocale] } target="_blank" rel="noopener">{ node.data.target.fields.name[englishUsLocale]}</a> <br/>
                    <span>{ newLineFormatter(node.data.target.fields.address[englishUsLocale]) }</span>
                </>
            );
        }
    }
    catch (err) {
        console.warn('Renderer has not been implemented for inline entry', err);
    }

    return null;
};

const RichText = ({ richText }: { richText: Document }): React.ReactElement<any> => {
    const options: Options = {
        renderNode: {
            [INLINES.ENTRY_HYPERLINK]: entryHyperlinkRenderer,
            [INLINES.ASSET_HYPERLINK]: assetHyperlinkRenderer,
            [INLINES.HYPERLINK]: externalHyperlinkRenderer,
            [INLINES.EMBEDDED_ENTRY]: inlineEmbeddedEntryRenderer
        },
        // https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer
        renderText: newLineFormatter
    };

    return documentToReactComponents(richText, options) as React.ReactElement<any>;
};

export default RichText;

const newLineFormatter = (text: string): ReactNode => {
    return text.split('\n').reduce((prev: ReactNode, curr: string, index: number) => {
        return [...prev, index > 0 && <br key={ index } />, curr];
    }, []);
};
import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import { Document, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';

const entryHyperlinkRenderer = (node: any): ReactNode => {
    const text = node.content
        .reduce((accumulator: any, currentContent: any) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const slug = `/${ node.data.target.fields.slug['en-US'] }`;

    return <Link to={ slug }>{ text }</Link>;
}

const assetHyperlinkRenderer = (node: any): ReactNode => {
    const text = node.content
        .reduce((accumulator: any, currentContent: any) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const fileUrl = node.data.target.fields.file['en-US'].url;

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

const RichText = ({ richText }: { richText: Document }): React.ReactElement<any> => {
    const options: Options = {
        renderNode: {
            [INLINES.ENTRY_HYPERLINK]: entryHyperlinkRenderer,
            [INLINES.ASSET_HYPERLINK]: assetHyperlinkRenderer,
            [INLINES.HYPERLINK]: externalHyperlinkRenderer
        },
        // https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer
        renderText: text => {
            return text.split('\n').reduce((children: ReactNode, textSegment: string, index: number) => {
                return [...children, index > 0 && <br key={ index } />, textSegment];
            }, []);
        }
    };

    return documentToReactComponents(richText, options) as React.ReactElement<any>;
};

export default RichText;
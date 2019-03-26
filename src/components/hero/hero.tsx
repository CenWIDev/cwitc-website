import React, { Component, ReactNode } from 'react';
import { Link } from 'gatsby';
import { Document, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';

import './hero.scss';

const renderer = (node: any) => {
    const text = node.content
        .reduce((accumulator: any, currentContent: any) => {
            return `${ accumulator } ${ currentContent.value }`;
        }, '')
        .trim();

    const slug = `/${ node.data.target.fields.slug['en-US'] }`;

    return <Link to={ slug }>{ text }</Link>;
}

const options: Options = {
    renderNode: {
        [INLINES.ENTRY_HYPERLINK]: renderer
    }
};

export default class Hero extends Component {

    public props: HeroProps;

    public render(): ReactNode {
        const { config } = this.props;

        return (
            <div className="hero-container container">
                <div className="row">
                    <div className="col">
                        <h1>{ config.heading }</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <h4 className="date">{ config.conferenceDate }</h4>
                    </div>
                    <div className="col-12 col-sm-6">
                        <h4 className="time">{ config.startTime } - { config.endTime }</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="subheading">{ config.subheading }</p>
                    </div>
                </div>
                <div className="row">
                    {
                        config.primaryButtonRichText || config.secondaryButtonRichText ?
                            <div className="button-column col-sm-12 col-md-10 offset-md-1 col-lg-3 offset-lg-2">
                                {
                                    config.primaryButtonRichText ?
                                        <div
                                            className="primary col-10 offset-1 col-sm-6 offset-sm-0 col-lg-12">
                                            {
                                                documentToReactComponents(config.primaryButtonRichText, options)
                                            }
                                        </div> : null
                                }
                                {
                                    config.secondaryButtonRichText ?
                                        <div
                                            className="secondary col-10 offset-1 col-sm-6 offset-sm-0 col-lg-12">
                                            {
                                                documentToReactComponents(config.secondaryButtonRichText, options)
                                            }
                                        </div> : null
                                }
                            </div> : null
                    }
                    <div className="d-none d-sm-block col-md-10 offset-md-1 col-lg-5 offset-lg-0">
                        <p className="description">{ config.description }</p>
                    </div>
                </div>
            </div>
        );
    }
}

export type HeroConfig = {
    heading: string;
    subheading: string;
    conferenceDate: string;
    startTime: string;
    endTime: string;
    description: string;
    primaryButtonRichText: Document;
    secondaryButtonRichText: Document;
};

export type HeroProps = {
    className?: string;
    config: HeroConfig;
};
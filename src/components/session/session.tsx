import React, { Component, ReactNode } from 'react';
import { Document } from '@contentful/rich-text-types';
import RichText from './../richText/richText';
import Icon from '../icon/icon';
import { getUrlSafeId, copyToClipboard } from '../../services/text-helper';

import './session.scss';

export default class Session extends Component<SessionProps> {

    public state: SessionState = { copyTextHover: false, copyTextMessage: 'Copy share link' };

    public copyButtonOnClick = (sessionTitle: string) => {
        const textToCopy = `${ this.props.sessionListPageUrl }#${ getUrlSafeId(sessionTitle) }`;
        copyToClipboard(textToCopy);
        this.setState({ copyTextMessage: 'Copied!' });
    };

    public copyButtonOnMouseHover = () => {
        this.setState({ copyTextHover: true, copyTextMessage: 'Copy share link' });
    };

    public copyButtonOnMouseLeave = () => {
        this.setState({ copyTextHover: false, copyTextMessage: 'Copy share link' });
    };

    public render(): ReactNode {
        const { session } = this.props;

        return (
            <>
                <div className="session-container container">
                    <a href="#" id={ getUrlSafeId(session.title) } />
                    <div className="header row justify-content-between align-items-center">
                        <div className="col-12 col-sm order-1 order-sm-0">
                            <h4 className="session-title">{ session.title }</h4>
                            {
                                session.speakers ?
                                <h6 className="session-authors">
                                    { session.speakers.map((speaker: any) => speaker.name).join(', ') }
                                </h6>
                                : null
                            }
                        </div>
                        {
                            session.sessionType || session.room ?
                                <div className="col-12 col-sm text-sm-right flex-grow-0 text-nowrap">
                                {
                                    session.sessionType !== 'Event' ?
                                        <h5 className="d-inline-block d-sm-block mr-2 mr-sm-0">{ session.sessionType }</h5> :
                                        null
                                }
                                {
                                    session.room ?
                                        <h6 className="session-room d-inline-block d-sm-block">{ session.room }</h6> :
                                        null
                                }
                                </div>
                                : null
                        }
                    </div>
                    <div className="abstract row">
                        <div className="col">
                        {
                            <RichText richText={ session.abstractRichText } />
                        }
                        </div>
                    </div>
                    <div className="footer row">
                        {
                            session.category ?
                            <div className="category col">
                                <span>{ session.category.name }</span>
                            </div> : null
                        }
                        <div className="col d-flex justify-content-end align-items-center share-container">
                            <span className={ `copy-text ${ this.state.copyTextHover ? 'd-block' : 'd-none' }`}>{ this.state.copyTextMessage }</span>
                            <Icon
                                name="link"
                                className="share-link"
                                onClick={ () => this.copyButtonOnClick(session.title) }
                                onMouseEnter={ () => this.copyButtonOnMouseHover() }
                                onMouseLeave={ () => this.copyButtonOnMouseLeave() } />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export type SessionProps = {
    session: SessionModel,
    sessionListPageUrl: string
};

export type SessionState = {
    copyTextHover: boolean,
    copyTextMessage: string
};

export type SessionModel = {
    id: string;
    title: string;
    speakers?: Speaker[];
    abstractRichText: Document;
    startTime: string;
    endTime: string;
    room: string;
    category?: Category;
    sessionType: string;
};

export type Speaker = {
    name: string;
}

export type Category = {
    name: string;
    colorHex: string;
};
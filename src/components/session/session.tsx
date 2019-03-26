import React from 'react';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import './session.scss';

const Session = ({ session }: SessionProps) => (
    <div className="session-container container">
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
                documentToReactComponents(session.abstractRichText)
            }
            </div>
            {/* dangerouslySetInnerHTML={{ __html: session.abstractHtml}} /> */}
        </div>
        <div className="categories row">
            {
                session.category ?
                <div className="category col">
                    <p>{ session.category.name }</p>
                </div> : null
            }
        </div>
    </div>
);

export type SessionProps = {
    session: Session
};

export type Session = {
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

export default Session;
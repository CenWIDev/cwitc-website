import React from 'react';
import { Document } from '@contentful/rich-text-types';
import RichText from './../richText/richText';

import Icon from './../icon/icon';

import './icon-card.scss';

const IconCard = ({ title, descriptionRichText, iconName, justification = IconCardJustifications.LEFT }: IconCardProps) => {

    const isLeft = justification === IconCardJustifications.LEFT;

    return (
        <div className="icon-card-container row justify-content-center">
            <div className={`icon-col d-none d-sm-flex col-sm-2 col-lg-1 ${ isLeft ? '' : 'right' }`}>
                <Icon className="large-icon" name={ iconName } />
            </div>
            <div className="text-col col-sm-9 col-md-8 col-md-7">
                <h3>
                    <Icon className="d-flex d-sm-none" name={ iconName } />
                    { title }
                </h3>
                <span className="description">
                    <RichText richText={ descriptionRichText }/>
                </span>
            </div>
        </div>
    );
};

export type IconCardJustification = 'left' | 'right';

export class IconCardJustifications {
    public static readonly LEFT: 'left' = 'left';
    public static readonly RIGHT: 'right' = 'right';
}

export type IconCardProps = {
    title: string,
    descriptionRichText: Document,
    iconName: string,
    justification: IconCardJustification
}

export default IconCard;
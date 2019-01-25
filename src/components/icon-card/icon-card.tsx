import React from 'react';
import styled from 'styled-components';

import { sizes } from './../../styles/variables';
import Icon from './../icon/icon';

const CenterRow = styled.div`
    justify-content: center;

    @media (max-width: ${ sizes.sm }) {
        .icon svg {
            height: 100px;
        }
    }
`;

const IconCol = styled.div`
    display: flex;
    order: ${ props => props.left ? 0 : 2 };

    .icon { width: 100%; }

    @media (max-width: ${ sizes.sm }) {
        order: 0;
    }
`;

const TextCol = styled.div`
    order: 1;
`;

const Description = styled.span`
    a {
        display: block;
        margin-top: 2rem;
    }
`;

const IconCard = ({ title, descriptionHtml, iconName, justification = IconCardJustifications.LEFT }: IconCardProps) => {

    const isLeft = justification === IconCardJustifications.LEFT;

    return (
        <CenterRow className="row">
            <IconCol className="col-sm-3 col-md-2 col-lg-1" left={ isLeft }>
                <Icon name={ iconName } />
            </IconCol>
            <TextCol className="col-sm-9 col-md-8 col-md-7">
                <h3>{ title }</h3>
                <Description dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            </TextCol>
        </CenterRow>
    );
};

export type IconCardJustification = 'left' | 'right';

export class IconCardJustifications {
    public static readonly LEFT: 'left' = 'left';
    public static readonly RIGHT: 'right' = 'right';
}

export type IconCardProps = {
    title: string,
    descriptionHtml: string,
    iconName: string,
    justification: IconCardJustification
}

export default IconCard;
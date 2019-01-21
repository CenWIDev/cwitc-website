import React from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import styled from 'styled-components';

import { sizes } from './../../styles/variables';
import Icon from './../icon/icon';

const CenterRow = styled(Row)`
    justify-content: center;

    @media (max-width: ${ sizes.sm }) {
        .icon svg {
            height: 100px;
        }
    }
`;

const IconCol = styled(Col)`
    order: ${ props => props.left ? 0 : 2 };

    @media (max-width: ${ sizes.sm }) {
        order: 0;
    }
`;

const TextCol = styled(Col)`
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
        <CenterRow>
            <IconCol left={ isLeft } sm={ 3 } md={ 2 } lg={ 1 }>
                <Icon name={ iconName } />
            </IconCol>
            <TextCol sm={ 9 } md={ 8 } lg={ 7 }>
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
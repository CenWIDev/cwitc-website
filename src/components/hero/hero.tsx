import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

import { Container } from './../layout/container';
import { color } from './../../styles/variables'

const Heading = styled.h1`
    color: ${ color.white };
`;

const Subheading = styled.h3`
    color: ${ color.white };
`;

const HeroWrapper = styled(Container)`
    flex-direction: column;
    align-items: center;
`;

export type HeroConfig = {
    heading: string;
    subheading?: string;
    conferenceDate: string;
    startTime: string;
    endTime: string;
    description: string;
    primaryButtonText: string;
    primaryButtonAction?: string;
    secondaryButtonText: string;
    secondaryButtonAction?: string;
};

type HeroProps = {
    config: HeroConfig;
};

export class Hero extends Component {

    public props: HeroProps;

    public render(): ReactNode {
        const { config } = this.props;

        return (
            <HeroWrapper>
                <Heading>{ config.heading }</Heading>
                <Subheading>{ config.conferenceDate }</Subheading>
                <Subheading>{ config.startTime } - { config.endTime }</Subheading>

            </HeroWrapper>
        );
    }
}
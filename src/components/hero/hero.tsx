import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import { Heading, Subheading } from './../headings/headings';
import { PrimaryButton, SecondaryButton } from './../button/button';
import { color, sizes } from './../../styles/variables'

const Date = styled(Subheading)`
    @media (min-width: ${ sizes.sm }) {
        text-align: right;
    }
`;

const Time = styled(Subheading)`
    @media (min-width: ${ sizes.sm }) {
        text-align: left;
    }
`;

const Description = styled.p`
    color: ${ color.white };
    margin: 0;

    @media (max-width: ${ sizes.lg }) {
        margin-top: 1vh;
    }
`;

const ButtonColumn = styled(Col)`
    display: block;

    ${ PrimaryButton }, ${ SecondaryButton } {
        width: 100%;
    }

    ${ SecondaryButton } {
        @media (max-width: ${ sizes.xs }) {
            margin-top: 1vh;
        }
    }

    @media (min-width: ${ sizes.sm }) {
        display: flex;
    }

    @media (min-width: ${ sizes.sm }) and (max-width: ${ sizes.lg }) {
        > div:first-child {
            padding-left: 0;
        }

        > div:last-child {
            padding-right: 0;
        }
    }

    @media (min-width: ${ sizes.lg }) {
        flex-direction: column;
        justify-content: space-around;

        > div {
            flex-basis: auto;
            padding: inherit;
        }
    }

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
    className?: string;
    config: HeroConfig;
};

export class Hero extends Component {

    public props: HeroProps;

    public render(): ReactNode {
        const { config } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Heading>{ config.heading }</Heading>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <Date>{ config.conferenceDate }</Date>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Time>{ config.startTime } - { config.endTime }</Time>
                    </Col>
                </Row>
                <Row>
                    <ButtonColumn sm={12} md={10} mdOffset={1} lg={3} lgOffset={2}>
                        <Col xs={10} xsOffset={1} sm={6} smOffset={0} lg={12}>
                            <PrimaryButton>{ config.primaryButtonText }</PrimaryButton>
                        </Col>
                        <Col xs={10} xsOffset={1} sm={6} smOffset={0} lg={12}>
                            <SecondaryButton>{ config.secondaryButtonText }</SecondaryButton>
                        </Col>
                    </ButtonColumn>
                    <Col hiddenXsDown md={10} mdOffset={1} lg={5} lgOffset={0}>
                        <Description>{ config.description }</Description>
                    </Col>
                </Row>
            </Container>
        );
    }
}
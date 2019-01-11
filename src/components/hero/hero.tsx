import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { darken } from 'polished';

import { color, sizes, desktop_logo_height, mobile_logo_height, heading_padding } from './../../styles/variables'

const Heading = styled.h1`
    color: ${ color.white };
    grid-area: heading;
    text-align: center;

    @media (max-width: ${ sizes.sm }) {
        font-size: 1.17em;
    }
`;

const Subheading = styled.h3`
    color: ${ color.white };
    text-align: center;

    &.date {
        @media (min-width: ${ sizes.sm }) {
            text-align: right;
        }
    }

    &.time {
        @media (min-width: ${ sizes.sm }) {
            text-align: left;
        }
    }
`;

const Button = styled.button`
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    width: 100%;

    &.primary {
        color: ${ color.white };
        background-color: ${ color.primary };
        grid-area: primaryButton;

        &:hover {
            background-color: ${ darken(0.075, color.primary) };
        }
    }

    &.secondary {
        color: ${ color.white };
        background-color: ${ color.secondary };
        grid-area: secondaryButton;

        &:hover {
            background-color: ${ darken(0.075, color.secondary) };
        }
    }
`;

const Description = styled.p`
    grid-area: blurb;
    color: ${ color.white };
    margin: 0;
`;

const ButtonColumn = styled(Col)`
    display: block;

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
                        <Subheading className="date">{ config.conferenceDate }</Subheading>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Subheading className="time">{ config.startTime } - { config.endTime }</Subheading>
                    </Col>
                </Row>
                <Row>
                    <ButtonColumn sm={12} md={10} mdOffset={1} lg={3} lgOffset={2}>
                        <Col xs={8} xsOffset={2} sm={6} smOffset={0} lg={12}>
                            <Button className="primary">{ config.primaryButtonText }</Button>
                        </Col>
                        <Col xs={8} xsOffset={2} sm={6} smOffset={0} lg={12}>
                            <Button className="secondary">{ config.secondaryButtonText }</Button>
                        </Col>
                    </ButtonColumn>
                    <Col md={10} mdOffset={1} lg={5} lgOffset={0}>
                        <Description>{ config.description }</Description>
                    </Col>
                </Row>
            </Container>
        );
    }
}
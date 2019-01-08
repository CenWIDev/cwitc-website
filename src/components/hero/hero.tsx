import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { Container } from './../layout/container';
import { color } from './../../styles/variables'

const Heading = styled.h1`
    color: ${ color.white };
    grid-area: heading;
    text-align: center;
`;

const Subheading = styled.h3`
    color: ${ color.white };
    width: 49%;

    &.date { text-align: right; }
`;

const SubheadingWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    grid-area: date;
`;

const HeroWrapper = styled.div`
    width: 70%;
    margin: 0 auto;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        "heading heading heading"
        "date date date"
        "primaryButton blurb blurb"
        "secondaryButton blurb blurb";
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
            <Container>
                <HeroWrapper>
                    <Heading>{ config.heading }</Heading>
                    <SubheadingWrapper>
                        <Subheading className="date">{ config.conferenceDate }</Subheading>
                        <Subheading className="times">{ config.startTime } - { config.endTime }</Subheading>
                    </SubheadingWrapper>
                    <Button className="primary">{ config.primaryButtonText }</Button>
                    <Button className="secondary">{ config.secondaryButtonText }</Button>
                    <Description>
                        { config.description }
                    </Description>
                </HeroWrapper>
            </Container>
        );
    }
}
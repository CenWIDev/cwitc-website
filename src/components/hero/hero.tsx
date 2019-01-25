import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

import { Heading, Subheading } from './../headings/headings';
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

const ButtonColumn = styled.div`
    display: block;

    .btn {
        width: 100%;
    }

    .btn-secondary {
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
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Heading>{ config.heading }</Heading>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <Date>{ config.conferenceDate }</Date>
                    </div>
                    <div className="col-12 col-sm-6">
                        <Time>{ config.startTime } - { config.endTime }</Time>
                    </div>
                </div>
                <div className="row">
                    <ButtonColumn className="col-sm-12 col-md-10 offset-md-1 col-lg-3 offset-lg-2">
                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 col-lg-12">
                            <button className="btn btn-primary">{ config.primaryButtonText }</button>
                        </div>
                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 col-lg-12">
                            <button className="btn btn-secondary">{ config.secondaryButtonText }</button>
                        </div>
                    </ButtonColumn>
                    <div className="d-none d-sm-block col-md-10 offset-md-1 col-lg-5 offset-lg-0">
                        <Description>{ config.description }</Description>
                    </div>
                </div>
            </div>
        );
    }
}
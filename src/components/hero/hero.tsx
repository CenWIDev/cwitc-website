import React, { Component, ReactNode } from 'react';

import "./hero.scss";

export default class Hero extends Component {

    public props: HeroProps;

    public render(): ReactNode {
        const { config } = this.props;

        return (
            <div className="hero-container container">
                <div className="row">
                    <div className="col">
                        <h1>{ config.heading }</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <h3 className="date">{ config.conferenceDate }</h3>
                    </div>
                    <div className="col-12 col-sm-6">
                        <h3 className="time">{ config.startTime } - { config.endTime }</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="button-column col-sm-12 col-md-10 offset-md-1 col-lg-3 offset-lg-2">
                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 col-lg-12">
                            <button className="btn btn-primary">{ config.primaryButtonText }</button>
                        </div>
                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 col-lg-12">
                            <button className="btn btn-secondary">{ config.secondaryButtonText }</button>
                        </div>
                    </div>
                    <div className="d-none d-sm-block col-md-10 offset-md-1 col-lg-5 offset-lg-0">
                        <p className="description">{ config.description }</p>
                    </div>
                </div>
            </div>
        );
    }
}

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

export type HeroProps = {
    className?: string;
    config: HeroConfig;
};
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

export class Hero extends Component {

    public render(): ReactNode {
        return (
            <HeroWrapper>
                <Heading>Hero Component</Heading>
                <Subheading>Subheading</Subheading>

            </HeroWrapper>
        );
    }
}
import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

import { Container } from './../layout/container';


import { color } from './../../styles/variables'
const Heading = styled.h1`
    color: ${ color.white };
`;

export class Hero extends Component {

    public render(): ReactNode {
        return (
            <Container>
                <Heading>Hero Component</Heading>
            </Container>
        );
    }
}
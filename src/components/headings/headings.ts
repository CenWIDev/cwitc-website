import styled from 'styled-components';
import { color, sizes } from './../../styles/variables'

export const Heading = styled.h1`
    color: ${ color.white };
    text-align: center;

    @media (max-width: ${ sizes.sm }) {
        font-size: 1.5em;
    }
`;

export const Subheading = styled.h3`
    color: ${ color.white };
    text-align: center;
`;
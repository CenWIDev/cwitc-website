import styled from 'styled-components';

export const Heading = styled.h1`
    color: ${ props => props.theme.white };
    text-align: center;

    @media (max-width: ${ props => props.theme.sizeSm }px) {
        font-size: 1.5em;
    }
`;

export const Subheading = styled.h3`
    color: ${ props => props.theme.white };
    text-align: center;
`;
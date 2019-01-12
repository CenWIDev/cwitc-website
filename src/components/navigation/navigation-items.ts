import styled from 'styled-components';
import { color } from '../../styles/variables';
import { sizes } from './../../styles/variables';

export const NavigationItems = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    display: flex;

    li:first-child {
        padding-left: 0;
    }

    li {
        padding: 0 1vw;
    }

    li:last-child {
        padding-right: 0;
    }

    a {
        color: ${ color.white };

        &:hover {
            color: ${ color.gray };
            text-decoration: none;
        }
    }

    @media (max-width: ${ sizes.md }) {
        display: none;
    }
`;
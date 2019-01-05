import styled from 'styled-components';
import { color } from '../../styles/variables';

export const HeaderLogo = styled.img`
    height: 10vw;

    @media (min-width: 576px) {
        height: 5vw;
    }
`;

export const NavigationWrapper = styled.ul`
    a {
        color: ${ color.white };

        &:hover {
            color: ${ color.gray };
        }
    }

    @media (max-width: 576px) {
        display: none;
    }
`;

export const NavigationMenuButton = styled.button`
    color: ${ color.white };

    @media (min-width: 576px) {
        display: none;
    }
`;
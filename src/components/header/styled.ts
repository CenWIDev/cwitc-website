import styled from 'styled-components';
import { mediaMinWidth } from '../../styles/utilities';
import { color } from '../../styles/variables';

export const HeaderWrapper = styled.header`
    width: 100vw;
    padding: 0 5vw;
    background-color: ${ color.dark };
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderLogo = styled.img`
    height: 10vw;

    ${ mediaMinWidth.xs`height: 5w;` }
`;

export const NavigationItems = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    a {
        color: ${ color.white };

        &:hover {
            color: ${ color.gray };
        }
    }
`;

export const NavigationMenuButton = styled.button`
    color: ${ color.white };

    ${ mediaMinWidth.xs`display: none;` }
`;
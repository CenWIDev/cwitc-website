import styled, { css } from 'styled-components';
import { mediaMinWidth } from '../../styles/utilities';
import { color } from '../../styles/variables';
import { Container } from './../layout/container'

const Hero = css`
    background: url(${ (props: HeaderWrapperProps) => props.image }), ${ color.dark };
    background-blend-mode: multiply;
    background-position: center bottom;
    background-size: cover;
    align-items: flex-start;
    height: 70vh;

    @media (orientation: portrait) {
        height: 50vh
    }
`;

type HeaderWrapperProps = {
    useHero: boolean;
    image: string;
};

export const HeaderWrapper = styled.header`
    width: 100vw;
    padding: 1vw 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${color.dark};

    ${props => props.useHero ? Hero : '' }

    ${Container} {
        justify-content: space-between;
        align-items: center;
    }
`;

export const HeaderLogo = styled.img`
    height: 10vw;

    ${ mediaMinWidth.sm`height: 4vw;` }
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

    ${ mediaMinWidth.sm`display: none;` }
`;
import styled, { css } from 'styled-components';
import { color, sizes, heading_padding } from './../../styles/variables';
import { NavigationWrapper } from './../navigation/navigation-wrapper';

type HeaderWrapperProps = {
    useHero: boolean;
    image: string;
};

export const HeaderWrapper = styled.header`
    position: relative;

    width: 100vw;
    padding: ${ heading_padding } 0;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background: ${color.dark};

    ${ props => props.useHero ? HeroHeaderWrapper : '' }
`;

const HeroHeaderWrapper = css`
    background: url(${ (props: HeaderWrapperProps) => props.image }), ${ color.dark };
    background-blend-mode: multiply;
    background-position: center bottom;
    background-size: cover;
    align-items: center;
    height: 60vh;
    min-height: 380px;
    margin-bottom: 3rem;

    @media (max-width: ${ sizes.sm }) {
        margin-bottom: 2rem;
    }

    @media (orientation: portrait) {
        height: 40vh;
    }

    ${ NavigationWrapper } {
        position: absolute;
        top: 1vw;

        /* Internet Explorer Styles */
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            transform: translateX(-50%);
        }
    }

    /* Internet Explorer Styles */
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        &:before {
            content: "";
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.75);
            background-blend-mode: unset;
        }
    }
`;
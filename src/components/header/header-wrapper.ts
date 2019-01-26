import styled, { css } from 'styled-components';
import { NavigationWrapper } from './../navigation/navigation-wrapper';

type HeaderWrapperProps = {
    useHero: boolean;
    image: string;
};

export const HeaderWrapper = styled.header`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background: ${ props => props.theme.dark };

    ${ props => props.useHero ? HeroHeaderWrapper : '' }
`;

const HeroHeaderWrapper = css`
    background: url(${ (props: HeaderWrapperProps) => props.image }), ${ (props: any) => props.theme.dark };
    background-blend-mode: multiply;
    background-position: center bottom;
    background-size: cover;
    align-items: center;
    height: 60vh;
    min-height: 380px;
    margin-bottom: 3rem;

    @media (max-width: ${ (props: any) => props.theme.sizeSm}px) {
        margin-bottom: 2rem;
    }

    @media (orientation: portrait) {
        height: 50vh;
    }

    ${ NavigationWrapper } {
        position: absolute;
        top: 0;
        padding-top: 10px;

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
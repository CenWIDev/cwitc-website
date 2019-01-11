import styled, { css } from 'styled-components';
import { color, heading_padding } from './../../styles/variables';

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
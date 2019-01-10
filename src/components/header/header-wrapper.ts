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

    @media (orientation: portrait) {
        height: 40vh;
    }
`;
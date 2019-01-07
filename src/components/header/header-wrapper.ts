import styled, { css } from 'styled-components';
import { color } from '../../styles/variables';
import { mediaMinWidth } from '../../styles/utilities';

type HeaderWrapperProps = {
    useHero: boolean;
    image: string;
};

export const HeaderWrapper = styled.header`
    width: 100vw;
    padding: 1vw 0;
    display: flex;
    flex-direction: column;
    background: ${color.dark};

    ${ props => props.useHero ? HeroHeaderWrapper : '' }

    img {
        height: 10vw;

        ${ mediaMinWidth.sm`height: 4vw;` }
    }
`;

const HeroHeaderWrapper = css`
    background: url(${ (props: HeaderWrapperProps) => props.image }), ${ color.dark };
    background-blend-mode: multiply;
    background-position: center bottom;
    background-size: cover;
    align-items: flex-start;
    height: 70vh;

    @media (orientation: portrait) {
        height: 50vh;
    }
`;
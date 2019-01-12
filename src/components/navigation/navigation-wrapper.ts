import styled, { css } from 'styled-components';
import { Container } from 'styled-bootstrap-grid';

import { sizes, desktop_logo_height, mobile_logo_height } from './../../styles/variables';

const Overlay = css`
    &:after {
        content: "";
        position: fixed;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.25);
        background-blend-mode: unset;
        z-index: 50;
    }
`;

export const NavigationWrapper = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        height: ${ mobile_logo_height };

        @media (min-width: ${ sizes.sm }) {
            height: ${ desktop_logo_height };
        }
    }

    ${ props => props.overlay ? Overlay: '' };
`;
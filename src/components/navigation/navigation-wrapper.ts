import styled from 'styled-components';
import { Container } from 'styled-bootstrap-grid';

import { sizes, desktop_logo_height, mobile_logo_height } from './../../styles/variables';

export const NavigationWrapper = styled(Container)`
    position: absolute;
    top: 1vw;

    /* Internet Explorer Styles */
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        transform: translateX(-50%);
    }

    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        height: ${ mobile_logo_height };

        @media (min-width: ${ sizes.sm }) {
            height: ${ desktop_logo_height };
        }
    }
`;

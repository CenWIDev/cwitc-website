import styled from 'styled-components';

import { sizes, desktop_logo_height, mobile_logo_height } from './../../styles/variables';

export const NavigationWrapper = styled.div`
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
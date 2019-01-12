import styled from 'styled-components';
import { Container } from 'styled-bootstrap-grid';

import { sizes, desktop_logo_height, mobile_logo_height } from './../../styles/variables';

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
`;
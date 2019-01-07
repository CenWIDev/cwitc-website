import styled from 'styled-components';
import { color } from '../../styles/variables';

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
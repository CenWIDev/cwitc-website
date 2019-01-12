import styled from 'styled-components';
import { color } from '../../styles/variables';

export const NavigationMobile = styled.div`
    position: absolute;
    top: 1vw;
    left: 59vw;
    background: white;
    width: 40vw;
    border-radius: .25em;
    padding: 3vw;
    z-index: 100;

    ${ props => props.showMenu ? '' : 'display: none;' }

    .close {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 0;
        top: 0;
        margin: 1vw;
    }

    ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0;
        margin: 0;

        a {
            font-size: 1.5em;
            color: ${ color.dark };
        }
    }
`;
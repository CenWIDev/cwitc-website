import styled from 'styled-components';

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
            color: ${ props => props.theme.dark };
        }
    }
`;

export const Overlay = styled.span`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.25);
    background-blend-mode: unset;
    z-index: 50;

    ${ props => props.enabled ? '' : 'display: none;' }
`;
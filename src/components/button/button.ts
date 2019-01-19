import styled from 'styled-components';
import { color } from '../../styles/variables'
import { darken } from 'polished';

export const Button = styled.button`
    /* Styles copied from Bootstrap 4 */
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const PrimaryButton = styled(Button)`
    color: ${ color.white };
    background-color: ${ color.primary };

    &:hover {
        background-color: ${ darken(0.075, color.primary) };
    }
`;

export const SecondaryButton = styled(Button)`
    color: ${ color.white };
    background-color: ${ color.secondary };

    &:hover {
        background-color: ${ darken(0.075, color.secondary) };
    }
`;
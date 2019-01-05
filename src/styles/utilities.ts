import { css } from 'styled-components';

export const sizes = {
    xl: 1200,
    lg: 992,
    sm: 768,
    xs: 576
};

// Iterate through the sizes and create a media template
export const mediaMaxWidth = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args: Array<any>) => css`
        @media (max-width: ${sizes[label] / 16}em) {
            ${ css(...args) }
        }
    `

    return acc
}, {});

export const mediaMinWidth = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args: Array<any>) => css`
        @media (min-width: ${sizes[label] / 16}em) {
            ${ css(...args) }
        }
    `

    return acc
}, {});
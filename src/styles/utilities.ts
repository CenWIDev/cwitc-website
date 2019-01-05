import { css } from 'styled-components';
import { sizes } from './variables';

type MediaQuery = {
    xl: any;
    lg: any;
    md: any;
    sm: any;
};

// Iterate through the sizes and create a media template
export const mediaMaxWidth: MediaQuery = Object.keys(sizes).reduce(
    (acc, label) => {
        acc[label] = (...args: Array<any>) => css`
            @media (max-width: ${sizes[label] / 16}em) {
                // @ts-ignore
                ${css(...args)}
            }
        `;

        return acc;
    },
    {}
) as MediaQuery;

export const mediaMinWidth: MediaQuery = Object.keys(sizes).reduce(
    (acc, label) => {
        acc[label] = (...args: Array<any>) => css`
            @media (min-width: ${sizes[label] / 16}em) {
                // @ts-ignore
                ${css(...args)}
            }
        `;

        return acc;
    },
    {}
) as MediaQuery;

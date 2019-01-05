import { darken } from 'polished';

export const primary = `rgba(236, 47, 75, 1)`;
export const secondary = `rgba(34, 165, 211, 1)`;
export const dark = `rgba(47, 46, 46, 1)`;
export const white = `rgba(255, 255, 255, 1)`;
export const gray =  darken(0.2, white);

export const color = {
    primary,
    secondary,
    dark,
    white,
    gray,
    grey: gray
};

export const sizes = {
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576
};
import React from 'react';
import styled from 'styled-components';
import feather from 'feather-icons';

type IconProps = {
    name: string,
    className?: string,
    onClick?: Function
}

const IconContainer = styled.span`
    svg {
        width: 100%;
        height: 100%;
    }
`;

const Icon = ({ name, className, onClick }: IconProps) => {
    let iconHtml: string;

    try {
        iconHtml = feather.icons[name].toSvg();
    }
    catch (err) {
        console.error(`${ name } is not a valid feather icon! https://feathericons.com/`);
        iconHtml = feather.icons.info.toSvg();
    }

    const clickHandler = () => {
        if (onClick) onClick();
    };

    return (
        <IconContainer
            className={ ['icon', `icon-${ name }`, className].join(' ') }
            onClick={ clickHandler }
            dangerouslySetInnerHTML={{ __html: iconHtml }} />);
};

export default Icon;
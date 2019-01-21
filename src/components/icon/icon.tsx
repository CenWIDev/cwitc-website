import React from 'react';
import feather from 'feather-icons';

type IconProps = {
    name: string
}

const Icon = ({ name }: IconProps) => {
    let iconHtml: string;
    try {
        iconHtml = feather.icons[name].toSvg();
    }
    catch (err) {
        console.error(`${ name } is not a valid feather icon! https://feathericons.com/`);
        iconHtml = feather.icons.info.toSvg();
    }

    return <span dangerouslySetInnerHTML={{ __html: iconHtml }}></span>;
};

export default Icon;
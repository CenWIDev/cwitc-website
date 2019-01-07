import React, { Component, ReactNode } from 'react';
import { Link } from 'gatsby';

import { NavigationItems } from './../navigation/navigation-items';
import { NavigationWrapper } from './../navigation/navigation-wrapper';

type HeaderNavigationPage = {
    slug: string;
    navigationText: string;
};

type NavigationProps = {
    logoSource: string;
    navigationItems: Array<HeaderNavigationPage>;
};

export class Navigation extends Component {

    public props: NavigationProps;

    public render(): ReactNode {
        return (
            <NavigationWrapper>
                <Link to="/">
                    <img src={ this.props.logoSource } />
                </Link>
                <NavigationItems>
                    {this.props.navigationItems.map(({ slug, navigationText }: HeaderNavigationPage) => (
                        <li key={ slug }>
                            <Link to={ slug }>{ navigationText }</Link>
                        </li>
                    ))}
                </NavigationItems>
            </NavigationWrapper>
        );
    }
}
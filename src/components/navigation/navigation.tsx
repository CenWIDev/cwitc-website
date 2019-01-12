import React, { Component, ReactNode } from 'react';
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../../services/auth"

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
        const content = { message: "", login: true }
        if (isLoggedIn()) {
            content.message = `Hello, ${getUser().name}`
        } else {
            content.message = "You are not logged in"
        }

        return (
            <NavigationWrapper>
                <Link to="/">
                    <img src={ this.props.logoSource } />
                </Link>
                <span>{content.message}</span>
                <NavigationItems>
                    {this.props.navigationItems.map(({ slug, navigationText }: HeaderNavigationPage) => (
                        <li key={ slug }>
                            <Link to={ slug }>{ navigationText }</Link>
                        </li>
                    ))}
                    <li>
                        { isLoggedIn() ? <Link to="/app/profile">Profile</Link> : null }
                    </li>
                    <li>
                        { isLoggedIn() ?
                            <a href="/" onClick={event => { event.preventDefault(); logout(() => navigate(`/app/login`)); }}>Logout</a> :
                            <Link to="/app/login">Login</Link>
                        }
                    </li>
                </NavigationItems>
            </NavigationWrapper>
        );
    }
}
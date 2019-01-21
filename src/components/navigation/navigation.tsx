import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import AuthService from '../../services/auth';

import { sizes, color } from './../../styles/variables';
import { Button } from './../button/button';
import { NavigationItems } from './navigation-items';
import { NavigationWrapper } from './navigation-wrapper';
import { NavigationMobile, Overlay } from './navigation-mobile';
import Icon from './../icon/icon';

const NavButton = styled(Button)`
    background-color: rgba(255, 255, 255, 0.25);
    color: ${ color.white };
    font-weight: 500;
    padding: 0.25rem 0.75rem;

    @media (min-width: ${ sizes.md }) {
        display: none;
    }
`;

type HeaderNavigationPage = {
    slug: string;
    navigationText: string;
};

type NavigationProps = {
    logoSource: string;
    navigationItems: HeaderNavigationPage[];
};

export class Navigation extends Component {

    public props: NavigationProps;

    public state = {
        displayMobileNav: false
    };

    logout = async (event: any): Promise<void> => {
        event.preventDefault();
        await AuthService.logout(() => navigate('/'));
    };

    showMobileNav = (): void => {
        this.setState({
            displayMobileNav: true
        });
    };

    hideMobileNav = (): void => {
        this.setState({
            displayMobileNav: false
        });
    };

    public render(): ReactNode {
        return (
            <>
                <NavigationWrapper overlay={ this.state.displayMobileNav }>
                    <Link to="/">
                        <img src={ this.props.logoSource } />
                    </Link>
                    <NavigationItems>
                        {this.props.navigationItems.map(({ slug, navigationText }: HeaderNavigationPage) => (
                            <li key={ slug }>
                                <Link to={ slug }>{ navigationText }</Link>
                            </li>
                        ))}
                        <li>
                            { AuthService.isLoggedIn() ? <Link to="/app/profile">Profile</Link> : null }
                        </li>
                        <li>
                            {
                                AuthService.isLoggedIn() ?
                                    <a href="/" onClick={ this.logout }>Logout</a> :
                                    <Link to="/app/login">Login</Link>
                            }
                        </li>
                    </NavigationItems>
                    <NavButton type="button" onClick={ this.showMobileNav }>Menu</NavButton>
                </NavigationWrapper>
                <Overlay enabled={ this.state.displayMobileNav } onClick={ this.hideMobileNav } />
                <NavigationMobile showMenu={ this.state.displayMobileNav }>
                    <Icon className="close" onClick={ this.hideMobileNav } name="x-circle" />
                    <ul>
                        {this.props.navigationItems.map(({ slug, navigationText }: HeaderNavigationPage) => (
                            <li key={ slug }>
                                <Link to={ slug }>{ navigationText }</Link>
                            </li>
                        ))}
                        <li>
                            { AuthService.isLoggedIn() ? <Link to="/app/profile">Profile</Link> : null }
                        </li>
                        <li>
                            {
                                AuthService.isLoggedIn() ?
                                    <a href="/" onClick={ this.logout }>Logout</a> :
                                    <Link to="/app/login">Login</Link>
                            }
                        </li>
                    </ul>
                </NavigationMobile>
            </>
        );
    }
}
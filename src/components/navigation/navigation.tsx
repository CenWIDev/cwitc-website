import React, { Component, ReactNode } from 'react';
import { Link, navigate } from 'gatsby';
import AuthService from '../../services/auth';

import { NavigationItems } from './navigation-items';
import { NavigationWrapper } from './navigation-wrapper';
import { NavigationMobile, Overlay } from './navigation-mobile';
import Icon from './../icon/icon';

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
        const navItems =
            <>
                {
                    this.props.navigationItems.map(({ slug, navigationText }: HeaderNavigationPage) => {
                        return slug && navigationText ?
                            <li key={ slug }>
                                <Link to={ slug }>{ navigationText }</Link>
                            </li> : '';
                    })
                }
                {
                    AuthService.isLoggedIn() ?
                        <>
                            <li><Link to="/app/profile">Profile</Link></li>
                            <li><a href="/" onClick={ this.logout }>Logout</a></li>
                        </> :
                        <li><Link to="/app/login">Login</Link></li>
                }
            </>;

        return (
            <>
                <NavigationWrapper className="container" overlay={ this.state.displayMobileNav }>
                    <Link to="/">
                        <img src={ this.props.logoSource } />
                    </Link>
                    <NavigationItems>
                        { navItems }
                    </NavigationItems>
                    <button className="btn btn-outline-light d-block d-md-none" type="button" onClick={ this.showMobileNav }>Menu</button>
                </NavigationWrapper>
                <Overlay enabled={ this.state.displayMobileNav } onClick={ this.hideMobileNav } />
                <NavigationMobile showMenu={ this.state.displayMobileNav }>
                    <Icon className="close" onClick={ this.hideMobileNav } name="x-circle" />
                    <ul>
                        { navItems }
                    </ul>
                </NavigationMobile>
            </>
        );
    }
}
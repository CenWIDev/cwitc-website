import React, { Component, ReactNode } from 'react';
import { Link, navigate } from 'gatsby';
import { AuthService } from '../../services/authentication';

import Icon from './../icon/icon';

import './navigation.scss';
import './navigation-mobile.scss';

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
                        <li><Link to="/app/log-in">Log In</Link></li>
                }
            </>;

        return (
            <>
                <div className="container navigation-wrapper">
                    <Link to="/">
                        <img src={ this.props.logoSource } />
                    </Link>
                    <ul className="navigation-items">
                        { navItems }
                    </ul>
                    <button className="btn btn-outline-light d-block d-md-none" type="button" onClick={ this.showMobileNav }>Menu</button>
                </div>
                <span className={`overlay ${ this.state.displayMobileNav ? 'open' : '' }`} onClick={ this.hideMobileNav } />
                <div className={`navigation-mobile ${ this.state.displayMobileNav ? 'open' : '' } `}>
                    <Icon className="close" onClick={ this.hideMobileNav } name="x-circle" />
                    <ul>
                        { navItems }
                    </ul>
                </div>
            </>
        );
    }
}

export type HeaderNavigationPage = {
    slug: string;
    navigationText: string;
};

export type NavigationProps = {
    logoSource: string;
    navigationItems: HeaderNavigationPage[];
};
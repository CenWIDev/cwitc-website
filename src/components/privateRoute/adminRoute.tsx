import React, { Component, ReactNode } from 'react';
import { navigate } from 'gatsby';
import { AuthService } from './../../services/authentication';

type AdminRouteProps = {
    component: Component;
    location: any;
};

export class AdminRoute extends Component {

    public props: AdminRouteProps & any;

    public render(): ReactNode {
        const { component: Component, location, ...rest } = this.props;

        if (!AuthService.isLoggedIn() && location.pathname !== `/app/log-in`) {
            // If the user is not logged in, redirect to the login page.
            navigate(`/app/log-in?redirectPath=${ location.pathname }`);

            return null;
        }

        if (AuthService.isAdmin()) {
            return (
                <Component {...rest} />
            );
        }
        else {
            navigate(`/app/log-in?redirectPath=${ location.pathname }`);

            return null;
        }
    }
}
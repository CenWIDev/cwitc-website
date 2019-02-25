import React, { Component, ReactNode } from 'react';
import { navigate } from 'gatsby';
import { AuthService } from './../../services/authentication';

type PrivateRouteProps = {
    component: Component;
    location: any;
};

export class PrivateRoute extends Component {

    public props: PrivateRouteProps & any;

    public render(): ReactNode {
        const { component: Component, location, ...rest } = this.props;

        if (!AuthService.isLoggedIn() && location.pathname !== `/app/log-in`) {
            // If the user is not logged in, redirect to the login page.
            navigate(`/app/log-in`);

            return null;
        }

        return (
            <Component {...rest} />
        );
    }
}
import React, { Component, ReactNode } from "react";
import { navigate } from "gatsby";
import { AuthService } from "./../../services/auth";

type PrivateRouteProps = {
    component: Component;
    location: any;
};

export class PrivateRoute extends Component {

    private readonly authService: AuthService = new AuthService();

    public props: PrivateRouteProps & any;

    public render(): ReactNode {
        const { component: Component, location, ...rest } = this.props;

        if (!this.authService.isLoggedIn && location.pathname !== `/app/login`) {
            // If the user is not logged in, redirect to the login page.
            navigate(`/app/login`);
            return null;
        }

        return (
            <Component {...rest} />
        );
    }
}
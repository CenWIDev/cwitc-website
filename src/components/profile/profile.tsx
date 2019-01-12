import React, { Component, ReactNode } from "react";
import { getUser } from "../../services/auth"

type ProfileProps = {
    path: string;
};

export default class Profile extends Component {

    public props: ProfileProps;

    public render(): ReactNode{
        return (
            <>
                <h1>Your profile</h1>
                <ul>
                    <li>Name: {getUser().name}</li>
                    <li>E-mail: {getUser().email}</li>
                </ul>
            </>
        );
    }
}
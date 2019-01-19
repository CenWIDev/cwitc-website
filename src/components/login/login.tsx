import React, { Component, ReactNode } from "react";
import { navigate } from "gatsby";
import { Container, Row, Col } from 'styled-bootstrap-grid';

import AuthService from "./../../services/auth";

type LoginProps = {
    path: string;
};

export default class Login extends Component {

    public props: LoginProps;

    public state = {
        username: '',
        password: '',
        error: ''
    };

    handleUpdate = (event: any): void => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = async (event: any, provider: string): Promise<void> => {
        event.preventDefault();

        try {
            await AuthService.login(provider);
            navigate(`/app/profile`);
        }
        catch (err) {
            console.error(err);
            this.setState({ error: 'Invalid username or password' });
        }
    }

    public render(): ReactNode {
        if (AuthService.isLoggedIn()) {
            navigate(`/app/profile`);
        }

        return (
            <Container>
                <Row>
                    <h1>Log in</h1>
                </Row>
                <Row>
                    <button onClick={ async (event) => await this.handleSubmit(event, 'Github') }>Login with GitHub</button>
                </Row>
            </Container>
        );
    }
}
import React, { Component, ReactNode } from "react";
import { navigate } from "gatsby";
import { Container, Row, Col } from 'styled-bootstrap-grid';

import { AuthService } from "./../../services/auth";

type LoginProps = {
    path: string;
};

export default class Login extends Component {
    private readonly authService: AuthService = new AuthService();

    public props: LoginProps;

    public state = {
        username: '',
        password: '',
        error: ''
    };

    public handleUpdate(event: any): void {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    public handleSubmit(event: any): void {
        event.preventDefault();

        try {
            this.authService.login(this.state.username, this.state.password);
            navigate(`/app/profile`);
        }
        catch (err) {
            this.setState({ error: 'Invalid username or password' });
        }
    }

    public render(): ReactNode {
        if (this.authService.isLoggedIn) {
            navigate(`/app/profile`);
        }

        return (
            <Container>
                <Row>
                    <h1>Log in</h1>
                </Row>
                <Row>
                    <form method="post" onSubmit={ event => this.handleSubmit(event) }>
                        <Col>
                            <label>
                                Username
                                <input type="text" name="username" onChange={ event => this.handleUpdate(event) } />
                            </label>
                        </Col>
                        <Col>
                            <label>
                                Password
                                <input type="password" name="password" onChange={ event =>this.handleUpdate(event) } />
                            </label>
                        </Col>
                        <Col>
                            <input type="submit" value="Log In" />
                        </Col>
                    </form>
                </Row>
            </Container>
        );
    }
}
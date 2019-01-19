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

    handleSubmit = (event: any): void => {
        event.preventDefault();

        try {
            AuthService.login(this.state.username, this.state.password);
            navigate(`/app/profile`);
        }
        catch (err) {
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
                    <form method="post" onSubmit={ this.handleSubmit }>
                        <Col>
                            <label>
                                Username
                                <input type="text" name="username" onChange={ this.handleUpdate } />
                            </label>
                        </Col>
                        <Col>
                            <label>
                                Password
                                <input type="password" name="password" onChange={ this.handleUpdate } />
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
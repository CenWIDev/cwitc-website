import React, { Component, ReactNode } from 'react';
import { navigate } from 'gatsby';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import { Button } from './../button/button';
import AuthService, { LoginProvider } from './../../services/auth';

type LoginProps = {
    path: string;
};

export default class Login extends Component {

    public props: LoginProps;

    handleSubmit = async (provider: LoginProvider): Promise<void> => {
        await AuthService.login(provider);
        navigate(`/app/profile`);
    }

    public render(): ReactNode {
        if (AuthService.isLoggedIn()) {
            navigate(`/app/profile`);
        }

        return (
            <Container>
                <Row>
                    <Col sm={ 6 } smOffset={ 3 }>
                        <h1>Log in</h1>
                        <Button onClick={ async () => await this.handleSubmit(LoginProvider.github) }>Login with GitHub</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
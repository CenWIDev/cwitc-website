import React from 'react';
import Layout from '../components/layout';
import Icon from './../components/icon/icon';

const NotFoundPage = () => (
    <Layout path="/404">
        <div className="container mt-4">
            <div className="row">
                <div className="col d-flex flex-column align-items-center">
                    <Icon name="zap" />
                    <h1>Whoops! 404</h1>
                    <p>This page doesn't exist</p>
                </div>
            </div>
        </div>
    </Layout>
);

export default NotFoundPage;

import React from 'react';
import Layout from '../components/layout';
import NotFound from '../components/not-found/notFound';

const NotFoundPage = () => (
    <Layout path="/404">
        <NotFound />
    </Layout>
);

export default NotFoundPage;

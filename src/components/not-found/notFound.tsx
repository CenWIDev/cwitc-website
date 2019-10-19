import React from 'react';
import Icon from '../icon/icon';

const NotFound = () => (
    <div className="container mt-4">
        <div className="row">
            <div className="col d-flex flex-column align-items-center">
                <Icon name="zap" />
                <h1>Whoops! 404</h1>
                <p>This page doesn't exist</p>
            </div>
        </div>
    </div>
);

NotFound.defaultProps = {
    default: true
};

export default NotFound;

import React from 'react';
import Icon from '../icon/icon'

const browser = typeof window !== 'undefined' && window;

const NotFound = () => (
    browser ?
    <div className="404-container container mt-4">
        <div className="row">
            <div className="col d-flex flex-column align-items-center">
                <Icon name="zap" />
                <h1>Whoops! 404</h1>
                <p>This page doesn't exist</p>
            </div>
        </div>
    </div> : null
);

NotFound.defaultProps = {
    default: true
};

export default NotFound;

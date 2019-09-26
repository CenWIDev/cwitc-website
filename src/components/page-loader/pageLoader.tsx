import React from 'react';

const PageLoader = () => (
    <div className="container">
        <div className="row justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
);

export default PageLoader;
import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

export type RegistrationRedirectProps = {
    registrationUrl: string
}

const RegistrationRedirect = ({ registrationUrl }: RegistrationRedirectProps & RouteComponentProps): React.ReactElement => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.location.href = registrationUrl;
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center mt-5">
                    <h1>Redirecting to Whova...</h1>
                </div>
            </div>
        </div>
    );
};

export default RegistrationRedirect;
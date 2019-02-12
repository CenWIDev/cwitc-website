import React, { ReactNode } from 'react';
import { LoginProvider } from '../../../services/auth';

import './login-button.scss'

const LoginButton = ({ provider, displayText = provider, providerEnabled, children, onClick }: LoginButtonProps) => {
    return providerEnabled ? (
        <div className="row justify-content-center">
            <span
                className={ `${ provider.toLowerCase() } social-button col-12 col-md-8 btn` }
                onClick={ async () => await onClick(provider) }>
                <span className="social-button-icon">{ children }</span>
                <span className="social-button-text">{ displayText }</span>
                <div />
            </span>
        </div>
    ) : null;
};

export type LoginButtonProps = {
    displayText?: string;
    provider: LoginProvider;
    providerEnabled: boolean;
    children: ReactNode;
    onClick: Function;
};

export default LoginButton;
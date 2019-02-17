import React, { ReactNode } from 'react';
import { ILoginProvider } from '../../../services/authentication';

import './login-button.scss'

const LoginButton = ({ provider, displayText = provider.providerName, disabled = false, providerEnabled, children, onClick }: LoginButtonProps) => {
    const onButtonClick = async () => {
        if (!disabled) {
            await onClick(provider);
        }
    };

    return providerEnabled ? (
        <div className="row justify-content-center">
            <span
                className={ `${ provider.providerName.toLowerCase() } social-button d-flex align-items-center col-12 col-md-8 btn ${ disabled ? 'disabled' : '' }` }
                onClick={ async () => await onButtonClick() }>
                <span className="social-button-icon">{ children }</span>
                <span className="social-button-text">{ displayText }</span>
                <div />
            </span>
        </div>
    ) : null;
};

export type LoginButtonProps = {
    displayText?: string;
    disabled?: boolean;
    provider: ILoginProvider;
    providerEnabled: boolean;
    children: ReactNode;
    onClick: Function;
};

export default LoginButton;
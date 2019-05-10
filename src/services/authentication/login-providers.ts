export interface LoginProvider {
    providerId: string;
    providerName: LoginProviderName;
}

export type LoginProviderName = 'GitHub' | 'Facebook' | 'Twitter' | 'Google';

export class LoginProviderNames {
    public static github: 'GitHub' = 'GitHub';
    public static facebook: 'Facebook' = 'Facebook';
    public static twitter: 'Twitter' = 'Twitter';
    public static google: 'Google' = 'Google';
}

export class LoginProviders  {
    public static github: LoginProvider = {
        providerId: 'github.com',
        providerName: LoginProviderNames.github
    };

    public static facebook: LoginProvider = {
        providerId: 'facebook.com',
        providerName: LoginProviderNames.facebook
    };

    public static twitter: LoginProvider = {
        providerId: 'twitter.com',
        providerName: LoginProviderNames.twitter
    };

    public static google: LoginProvider = {
        providerId: 'google.com',
        providerName: LoginProviderNames.google
    };

    public static list: LoginProvider[] = [
        LoginProviders.github,
        LoginProviders.facebook,
        LoginProviders.twitter,
        LoginProviders.google
    ];
};
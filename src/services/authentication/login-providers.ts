export interface ILoginProvider {
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
    public static github: ILoginProvider = {
        providerId: 'github.com',
        providerName: LoginProviderNames.github
    };

    public static facebook: ILoginProvider = {
        providerId: 'facebook.com',
        providerName: LoginProviderNames.facebook
    };

    public static twitter: ILoginProvider = {
        providerId: 'twitter.com',
        providerName: LoginProviderNames.twitter
    };

    public static google: ILoginProvider = {
        providerId: 'google.com',
        providerName: LoginProviderNames.google
    };

    public static list: ILoginProvider[] = [
        LoginProviders.github,
        LoginProviders.facebook,
        LoginProviders.twitter,
        LoginProviders.google
    ];
};
import React from 'react';
import styled from 'styled-components';

import { FacebookIcon, TwitterIcon, GitHubIcon, LinkedInIcon } from './../icon';

const FooterWrapper = styled.footer`
    margin-top: 3vw;
    padding: 5vw 0 10vw;
    color: ${ props => props.theme.white };
    background-color: ${ props => props.theme.dark };
`;

const SocialLink = styled.a`
    svg {
        height: 50px;
        fill: ${ props => props.theme.white };
    }
`;

const AddressWrapper = styled.div`
    margin-bottom: 1rem;

    p {
        margin-bottom: 0;
    }
`;

const Footer = (props: FooterProps) => (
    <FooterWrapper>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-5 col-lg-4 d-flex justify-content-between mb-3">
                    <SocialLink href={ props.facebookUrl } target="_blank" rel="noopener">
                        <FacebookIcon />
                    </SocialLink>
                    <SocialLink href={ `https://twitter.com/${ props.twitterUsername }` } target="_blank" rel="noopener">
                        <TwitterIcon />
                    </SocialLink>
                    <SocialLink href={ props.linkedInUrl } target="_blank" rel="noopener">
                        <LinkedInIcon />
                    </SocialLink>
                    <SocialLink href={ props.githubUrl } target="_blank" rel="noopener">
                        <GitHubIcon />
                    </SocialLink>
                </div>
                <div className="col-sm-12 col-md-5">
                    <AddressWrapper>
                        <p>{ props.addressLine1 }</p>
                        <p>{ props.addressLine2 }</p>
                        <p>{ props.cityStatePostalCode }</p>
                        <a href={` mailto:${ props.contactEmailAddress } `}>{ props.contactEmailAddress }</a>
                    </AddressWrapper>
                    <p>&copy; { (new Date()).getFullYear() } { props.siteName }</p>
                </div>
            </div>
        </div>
    </FooterWrapper>
);

export type FooterProps = {
    addressLine1: string,
    addressLine2: string,
    cityStatePostalCode: string,
    contactEmailAddress: string,
    facebookUrl: string,
    twitterUsername: string,
    linkedInUrl: string,
    githubUrl: string,
    siteName: string
};

export default Footer;
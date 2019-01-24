import React from 'react';
import styled from 'styled-components';

import { FacebookIcon, TwitterIcon, GitHubIcon, LinkedInIcon } from './../icon';
import { color } from './../../styles/variables';

const FooterWrapper = styled.footer`
    margin-top: 3vw;
    padding: 5vw 0 10vw;
    color: ${ color.white };
    background-color: ${ color.dark };
`;

const SocialLink = styled.a`
    svg {
        height: 50px;
        fill: ${ color.white };
    }
`;

const AddressWrapper = styled.div`
    margin-bottom: 1rem;
`;

const Footer = (props: FooterProps) => (
    <FooterWrapper>
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-sm-5 d-flex justify-content-between">
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
                <div className="col-sm-6">
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
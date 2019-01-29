import React from 'react';
import { FacebookIcon, TwitterIcon, GitHubIcon, LinkedInIcon } from './../icon';

import "./footer.scss";

const Footer = (props: FooterProps) => (
    <footer className="footer-wrapper">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-5 col-lg-4 d-flex justify-content-between mb-3">
                    <a className="social-link" href={ props.facebookUrl } target="_blank" rel="noopener">
                        <FacebookIcon />
                    </a>
                    <a className="social-link" href={ `https://twitter.com/${ props.twitterUsername }` } target="_blank" rel="noopener">
                        <TwitterIcon />
                    </a>
                    <a className="social-link" href={ props.linkedInUrl } target="_blank" rel="noopener">
                        <LinkedInIcon />
                    </a>
                    <a className="social-link" href={ props.githubUrl } target="_blank" rel="noopener">
                        <GitHubIcon />
                    </a>
                </div>
                <div className="col-sm-12 col-md-5">
                    <div className="address-wrapper">
                        <p>{ props.addressLine1 }</p>
                        <p>{ props.addressLine2 }</p>
                        <p>{ props.cityStatePostalCode }</p>
                        <a href={` mailto:${ props.contactEmailAddress } `}>{ props.contactEmailAddress }</a>
                    </div>
                    <p>&copy; { (new Date()).getFullYear() } { props.siteName }</p>
                </div>
            </div>
        </div>
    </footer>
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
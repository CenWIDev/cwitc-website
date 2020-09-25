import React from 'react';

import './job-listing.scss';
import RichText from '../richText/richText';
import { Document } from '@contentful/rich-text-types';

export const JobListing = ({ logoUrl, companyName, title, applicationLink, description }: JobListingProps) => {

    return (
        <div className="job-listing col-11 col-lg-8">
            <div className="job-listing_logo">
                <img
                    src={ logoUrl }
                    alt={ companyName + ' logo'}/>
            </div>
            <div className="job-listing_header">
                <h2 className="job-listing_title">{ title }</h2>
                <a href={ applicationLink } target="_blank" rel="noopener noreferrer" className="job-listing_link">
                    Apply at { companyName }
                </a>
            </div>
            <div className="job-listing_body">
                <RichText richText={description} />
            </div>
            <a href={ applicationLink} target="_blank" rel="noopener noreferrer" className="job-listing_link mt-3">View the complete job description</a>
        </div>
    );
};
export default JobListing;

export type JobListingProps = {
    logoUrl: string,
    companyName: string,
    title: string;
    applicationLink: string,
    description: Document
};
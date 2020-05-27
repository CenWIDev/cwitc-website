import React from 'react';

import './job-listing.scss';
import RichText from '../richText/richText';

export const JobListing = ({ listing }) => {
    const { applicationLink, company, description, title } = listing;

    return (
        <div className="job-listing">
            <img
                className="job-listing_logo"
                src={ company['en-US'].fields.logo['en-US'].fields.file['en-US'].url }
                alt={ company['en-US'].fields.name['en-US'] + ' logo'}></img>
            <div className="job-listing_header">
                <h2 className="job-listing_title">{ title['en-US'] }</h2>
                <span className="job-listing_subtitle">Posted by: { company['en-US'].fields.name['en-US'] }</span>
            </div>
            <div className="job-listing_body">
                <RichText richText={description['en-US']}></RichText>
            </div>
            <div className="job-listing_footer">
                <a href={ applicationLink['en-US'] } target="_blank" rel="noopener noreferrer" className="btn btn-primary">Apply</a>
            </div>
        </div>
    );
};
export default JobListing;
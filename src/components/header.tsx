import React from 'react';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';

type HeaderNavigationPage = {
    slug: string;
    navigationText: string;
};

const Header = () => (
    <StaticQuery
        query={graphql`
            query NavigationQuery {
                contentfulGlobalSiteSettings {
                    headerLogo {
                        resize(width: 500) {
                            src
                        }
                    }
                    headerNavigationPages {
                        navigationText
                        slug
                    }
                }
            }
        `}
        render={({ contentfulGlobalSiteSettings }) => (
            <div className="navbar nav-bar-light bg-light justify-content-between">
                <img src={ contentfulGlobalSiteSettings.headerLogo.resize.src }></img>
                <ul className="nav">
                    {contentfulGlobalSiteSettings.headerNavigationPages.map(({ slug, navigationText }: HeaderNavigationPage) => (
                        <li className="nav-item" key={ slug }>
                            <Link to={ slug } className="nav-link">{ navigationText }</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    />
);

export default Header;

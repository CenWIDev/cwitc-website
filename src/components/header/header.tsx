import React from 'react';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';

import { HeaderLogo, NavigationMenuButton, NavigationWrapper } from './styled';

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
            <header className="bg-dark">
                <div className="container">
                    <div className="navbar justify-content-between">
                        <HeaderLogo src={ contentfulGlobalSiteSettings.headerLogo.resize.src }></HeaderLogo>
                        <NavigationWrapper className="nav">
                            {contentfulGlobalSiteSettings.headerNavigationPages.map(({ slug, navigationText }: HeaderNavigationPage) => (
                                <li className="nav-item" key={ slug }>
                                    <Link to={ slug } className="nav-link">{ navigationText }</Link>
                                </li>
                            ))}
                        </NavigationWrapper>
                        <NavigationMenuButton className="btn btn-outline-light" type="button">
                            <span>Menu</span>
                        </NavigationMenuButton>
                    </div>
                </div>
            </header>
        )}
    />
);

export default Header;

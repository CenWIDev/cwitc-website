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
            <header>
                <div>
                    <div>
                        <HeaderLogo src={ contentfulGlobalSiteSettings.headerLogo.resize.src }></HeaderLogo>
                        <NavigationWrapper>
                            {contentfulGlobalSiteSettings.headerNavigationPages.map(({ slug, navigationText }: HeaderNavigationPage) => (
                                <li key={ slug }>
                                    <Link to={ slug }>{ navigationText }</Link>
                                </li>
                            ))}
                        </NavigationWrapper>
                        <NavigationMenuButton type="button">
                            <span>Menu</span>
                        </NavigationMenuButton>
                    </div>
                </div>
            </header>
        )}
    />
);

export default Header;

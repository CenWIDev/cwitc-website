import React from 'react';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';

import { Container } from './../layout/container';
import { HeaderWrapper, HeaderLogo, NavigationMenuButton, NavigationItems } from './styled';

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
            <HeaderWrapper>
                <Container>
                    <HeaderLogo src={ contentfulGlobalSiteSettings.headerLogo.resize.src } />
                    <NavigationItems>
                        {contentfulGlobalSiteSettings.headerNavigationPages.map(({ slug, navigationText }: HeaderNavigationPage) => (
                            <li key={ slug }>
                                <Link to={ slug }>{ navigationText }</Link>
                            </li>
                        ))}
                    </NavigationItems>
                    <NavigationMenuButton type="button">
                        <span>Menu</span>
                    </NavigationMenuButton>
                </Container>
            </HeaderWrapper>
        )}
    />
);

export default Header;

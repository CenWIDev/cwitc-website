import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import { Container } from './../layout/container';
import { HeaderWrapper, HeaderLogo, NavigationItems } from './styled';

type HeaderNavigationPage = {
    slug: string;
    navigationText: string;
};

type HeaderProps = {
    useHero: boolean;
};

const Header = ({ useHero }: HeaderProps) => (
    <StaticQuery
        query={graphql`
            query NavigationQuery {
                contentfulGlobalSiteSettings {
                    headerLogo {
                        fixed(width: 500) {
                            src
                        }
                    }
                    headerNavigationPages {
                        navigationText
                        slug
                    }
                    homePageHeroImage {
                        fixed(width: 2541) {
                            src
                        }
                    }
                }
            }
        `}
        render={({ contentfulGlobalSiteSettings }) => (
            <HeaderWrapper useHero={ useHero } image={contentfulGlobalSiteSettings.homePageHeroImage.fixed.src}>
                <Container>
                    <Link to="/">
                        <HeaderLogo src={ contentfulGlobalSiteSettings.headerLogo.fixed.src } />
                    </Link>
                    <NavigationItems>
                        {contentfulGlobalSiteSettings.headerNavigationPages.map(({ slug, navigationText }: HeaderNavigationPage) => (
                            <li key={ slug }>
                                <Link to={ slug }>{ navigationText }</Link>
                            </li>
                        ))}
                    </NavigationItems>
                    {/* <NavigationMenuButton type="button">
                        <span>Menu</span>
                    </NavigationMenuButton> */}
                </Container>
            </HeaderWrapper>
        )}
    />
);

export default Header;

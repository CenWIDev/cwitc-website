import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Hero } from './../hero/hero';
import { HeaderWrapper } from './header-wrapper';
import { Navigation } from './../navigation/navigation';

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
                <Navigation
                    logoSource={contentfulGlobalSiteSettings.headerLogo.fixed.src}
                    navigationItems={contentfulGlobalSiteSettings.headerNavigationPages} />
                <Hero />
            </HeaderWrapper>
        )}
    />
);

export default Header;

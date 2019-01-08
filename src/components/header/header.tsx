import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Hero, HeroConfig } from './../hero/hero';
import { HeaderWrapper } from './header-wrapper';
import { Navigation } from './../navigation/navigation';

type HeaderProps = {
    useHero: boolean;
};

const Header = ({ useHero }: HeaderProps) => (
    <StaticQuery
        query={graphql`
            query NavigationQuery {
                global: contentfulGlobalSiteSettings {
                    conferenceDate: conferenceStartDateTime(formatString: "LL")
                    startTime: conferenceStartDateTime(formatString: "LT")
                    endTime: conferenceEndDateTime(formatString: "LT")
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
                hero: contentfulHomePageHero {
                    heading
                    description {
                      description
                    }
                    primaryButtonText
                    secondaryButtonText
                  }
            }
        `}
        render={({ global, hero }) => {
            const heroConfig: HeroConfig = {
                heading: hero.heading,
                description: hero.description.description,
                conferenceDate: global.conferenceDate,
                startTime: global.startTime,
                endTime: global.endTime,
                primaryButtonText: hero.primaryButtonText,
                secondaryButtonText: hero.secondaryButtonText
            };

            return (
                <HeaderWrapper useHero={ useHero } image={global.homePageHeroImage.fixed.src}>
                    <Navigation
                        logoSource={global.headerLogo.fixed.src}
                        navigationItems={global.headerNavigationPages} />
                    <Hero config={ heroConfig } />
                </HeaderWrapper>
            );
        }}
    />
);

export default Header;

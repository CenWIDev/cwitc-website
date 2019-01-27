import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Hero, { HeroConfig } from './../hero/hero';
import { Navigation } from './../navigation/navigation';

import "./header.scss";

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
                    subheading
                    description {
                        description
                    }
                    primaryButton {
                        childContentfulRichText {
                            html
                        }
                    }
                    secondaryButton {
                        childContentfulRichText {
                            html
                        }
                    }
                }
            }
        `}
        render={({ global, hero }) => {
            const heroConfig: HeroConfig = {
                heading: hero.heading,
                subheading: hero.subheading,
                description: hero.description.description,
                conferenceDate: global.conferenceDate,
                startTime: global.startTime,
                endTime: global.endTime,
                primaryButtonHtml: hero.primaryButton.childContentfulRichText.html,
                secondaryButtonHtml: hero.secondaryButton.childContentfulRichText.html
            };

            return (
                <header
                    className={`header-wrapper ${ useHero ? 'hero' : '' }`}
                    style={{
                        backgroundImage: useHero ? `url(${ global.homePageHeroImage.fixed.src })`: ''
                    }}>
                    <Navigation
                        logoSource={ global.headerLogo.fixed.src }
                        navigationItems={ global.headerNavigationPages } />
                    { useHero ? <Hero config={ heroConfig } /> : null }
                </header>
            );
        }}
    />
);

export default Header;

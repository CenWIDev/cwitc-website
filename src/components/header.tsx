import React from 'react';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';
import styled  from 'styled-components';

type HeaderNavigationPage = {
    slug: string;
    navigationText: string;
};

const HeaderLogo = styled.img`
    height: 5vw;
`;

const NavigationWrapper = styled.ul`
    a {
        color: ${ props => props.theme.brandWhite };

        &:hover {
            color: ${ props => props.theme.brandGray };
        }
    }
`;

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
                    </div>
                </div>
            </header>
        )}
    />
);

export default Header;

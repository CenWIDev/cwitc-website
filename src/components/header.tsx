import React from 'react';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';
import styled  from 'styled-components';

type HeaderNavigationPage = {
    slug: string;
    navigationText: string;
};

const HeaderWrapper = styled.header`
    background-color: ${ props => props.theme.brandDark };
`;

const HeaderLogo = styled.img`
    height: 5vw;
`;

const NavigationWrapper = styled.ul`
    a { color: white; }

    a:hover { color: lightgrey; }
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
            <HeaderWrapper>
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
            </HeaderWrapper>
        )}
    />
);

export default Header;

import { createGlobalStyle } from 'styled-components';
import reboot from 'styled-reboot';

const rebootCss = reboot({
    paragraphMarginBottom: '0'
});

const GlobalStyle = createGlobalStyle`
    ${ rebootCss }
`;

export default GlobalStyle;
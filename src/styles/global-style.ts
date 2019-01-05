import { createGlobalStyle } from 'styled-components';
import reboot from 'styled-reboot';

const rebootCss = reboot();

const GlobalStyle = createGlobalStyle`
    ${ rebootCss }
`;

export default GlobalStyle;
import styled from 'styled-components';
import { mediaMaxWidth } from '../../styles/utilities';

export const Container = styled.div`
    display: flex;
    margin: 0 auto;
    width: 65vw;

    ${ mediaMaxWidth.xl`width: 80vw;` }
    ${ mediaMaxWidth.md`width: 90vw;` }
`;
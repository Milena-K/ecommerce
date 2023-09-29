import { styled } from "styled-components";
import { Link } from 'react-router-dom';

const StyledHeader = styled.div`
    padding: 2rem 3.6rem;
    display: flex;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

export default StyledHeader

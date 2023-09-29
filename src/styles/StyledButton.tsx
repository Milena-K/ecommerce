import { styled } from "styled-components";

export const StyledButton = styled.button`
    border: none;
    border-radius: .6rem;
    padding: 1rem 1.5rem;
    margin-right: 2.5rem;
    background-color: #FCF8F3;
    &:hover,
    &.active {
        background: #B88E2F;
        color: white;
    }
`

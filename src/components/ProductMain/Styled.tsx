import { styled } from "styled-components";

export const StyledSelectedImg = styled.div<{
    $img?: string
}>`
    width: 30vw;
    height: 40vh;
    margin-left: 2rem;
    background-size: contain;
    background-color: #F9F1E7;
    background-image: url(${props => props.$img});
    background-position: center;
    background-repeat: no-repeat;
`

const StyledProductPictureDiv = styled.div<{
  $img: string
}>`
    height: 100%;
    background-size: cover;
    background-image: url(${props => props.$img});
    background-position: center;
    background-repeat: no-repeat;
`

export default StyledProductPictureDiv

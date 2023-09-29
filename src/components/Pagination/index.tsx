import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { StyledButton } from "styles/StyledButton"
import "./style.scss"

type Props = {
    onPress: (page: number) => void,
    prodPerPage: number,
    totalNumOfProd: number,
    numOfProducts: number,
    currentPage: number,
}

const Pagination: FC<Props> = ({ onPress, prodPerPage, totalNumOfProd, numOfProducts, currentPage }) => {
  const lastPage = Math.ceil(totalNumOfProd / prodPerPage)
  const [buttons, setButtons] = useState<ReactNode[]>([])

  const moveButtons = useCallback(() => {
    const btns = []
    let fromP = currentPage;
    const toP = Math.ceil(numOfProducts / prodPerPage);
    if(toP === 1) {
        btns.push(
          <StyledButton onClick={() => onPress(1)}
                  className={`pagination-button active`}
                  key={1}> {1} </StyledButton>
        )
      return btns
    }

    if(currentPage > 1) {
      fromP = currentPage - 1
    }
    for (let i = fromP; (i <= fromP + 2) && (i <= toP ); i++) {
        btns.push(
          <StyledButton onClick={() => onPress(i)}
                  className={`pagination-button ${currentPage === i ? 'active' : ''}`}
                  key={i}> {i} </StyledButton>
        )
    }
    return btns
  },[currentPage, lastPage, numOfProducts])

  useEffect(() => {
    if (lastPage !== 0 ) {
      if(numOfProducts !== 0){
        setButtons(moveButtons())
      }
    }
  }, [lastPage, numOfProducts, currentPage])

  return (
    <div className="pagination">
      <StyledButton onClick={() => onPress(-1)}>
          Previous
      </StyledButton>
      <StyledButton onClick={() => onPress(1)}>
          &lt;&lt;
      </StyledButton>
      {
        buttons
      }
      <StyledButton onClick={() => onPress(lastPage)}>
          &gt;&gt;
      </StyledButton>
      <StyledButton onClick={() => onPress(0)}>
          Next
      </StyledButton>
    </div>
  )
}

export default Pagination

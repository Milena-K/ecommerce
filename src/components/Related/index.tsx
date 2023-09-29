import { useAppSelector } from "hooks/hooks"
import "./style.scss"
import { RootState } from "redux/store"
import { useDetailsPageContext } from "pages/detailspage/context"
import Card from "components/Card"
import { Product } from "definitions"
import { useState, useEffect } from "react"

const Related = () => {
  const { product } = useDetailsPageContext()
  const related = useAppSelector((state: RootState) => state.products.products.filter((p) => p.category === product?.category))
  const [moreRelated, setMoreRelated] = useState<Product[]>([])

  useEffect(() => {
    if(related.length > 0) {
      setMoreRelated(related)
    }
  }, [related.length])

  const handleShowMore = () => {
      const more = [...moreRelated, ...moreRelated]
      setMoreRelated(more)
  }

  return (
    <div className="related">
      <h3 className="title-md">Related Products</h3>
      <div className="related__products">
        {
          moreRelated.map((prod) => {
            if(prod.id === product?.id) return null
            return <Card product={prod} key={prod.id} />
          })
        }
      </div>
      <div className="related__showMore">
        <button className="btn-line-primary btn-sm" onClick={handleShowMore}>Show More</button>
      </div>
    </div>
  )
}

export default Related

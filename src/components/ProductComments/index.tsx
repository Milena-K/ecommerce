import { useDetailsPageContext } from "pages/detailspage/context"
import { MouseEvent, useState } from "react"
import "./style.scss"

const ProductComments = () => {
  const { productComments, product } = useDetailsPageContext()
  const [activeTab, setActiveTab] = useState('description')

  const handleTabChange = (e: MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    if (element.textContent?.includes('Description')) {
        setActiveTab('description')
    }else {
        setActiveTab('reviews')
    }
  }

  return (
    <div className="comments">
      <div className="comments__tabs">
        <div className={`comments__title ${activeTab === 'description' ? 'active' : ''}`}
             onClick={(e) => handleTabChange(e)}>
            Description
        </div>
        <div className={`comments__title ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={(e) => handleTabChange(e)}>
          Reviews [ {productComments?.length} ]
        </div>
      </div>
      <div className={`comments__tab ${activeTab === 'description' ? 'active' : ''}`}>
        {
          product?.description
        }
      </div>
      <div className={`comments__tab ${activeTab === 'reviews' ? 'active' : ''}`}>
        {
          productComments ? productComments.map((comment) => (
            <p key={comment.id}>{ comment.body }</p>
          )
        ): null}
      </div>
    </div>
  )
}

export default ProductComments

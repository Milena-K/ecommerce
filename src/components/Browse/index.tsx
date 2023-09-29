import Dining from "../../assets/image 106.png"
import Living from "../../assets/image 100.png"
import Bedroom from "../../assets/image 101.png"
import "./style.scss"

const Browse = () => {
  const categoryTitles = ["Dining", "Living", "Bedroom"]
  const categoryImages = [Dining, Living, Bedroom]
  return (
    <div className="browse">
      <div className="browse__top">
        <h2 className="title_md">Browse the Range</h2>
        <p className="text_md">
            Interdum consectetur libero, id faucibus nisl tincidunt eget nullam.
        </p>
      </div>
      <div className="categories">
        {
          categoryTitles.map((category, index) => (
            <div className="category" key={index}>
              <div className="category__img">
                <img alt={category}
                     src={categoryImages[index]} />
              </div>
              <h3 className="category__title title_sm">{category}</h3>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Browse

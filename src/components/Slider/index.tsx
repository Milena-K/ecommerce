import { FC, MouseEvent, useState } from "react"
import Img1 from "../../assets/slider_1.png"
import Img2 from "../../assets/slider_2.png"
import Img3 from "../../assets/bedroom-1.png"
import Next from "../../assets/next.png"
import "./style.scss"

const Slider: FC = () => {
  const [current, setCurrent] = useState(0)
  const images = [Img1, Img2, Img3, Img2]

  const nextSlide = () => {
      setCurrent( current === images.length - 1 ? 0 : current + 1)
  }
  const anySlide = (index: number) => {
      setCurrent(index)
  }
  const nextImg = (index: number) => {
    if (index + 1 >= images.length) {
      return <img className="next" src={images[0]} alt="bedroom" />
    }
    return <img className="next" src={images[index+1]} alt="bedroom" />
  }

  const currentImages = () => {
    return images.map((image, index) => (
      index === current &&
        <div className="slider__img active" key={index}>
          <img alt="bedroom" src={image} className='current' />
          {nextImg(index)}
        </div>

    ))
  }

  return (
      <div className="slider">
        {currentImages()}
        <div className="slider__circles">
        {
          images.map((image, index) => (
            <button className={`circle ${index === current? 'active': ''}`}
                    key={index}
                    onClick={() => anySlide(index)}/>
          ))
        }
        </div>
        <button className="slider__next" onClick={nextSlide}>
            <img src={Next} alt="right arrow"  />
        </button>
      </div>
  )
}

export default Slider

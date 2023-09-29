import G1 from "../../assets/gallery-1.png"
import G2 from "../../assets/gallery-2.png"
import G3 from "../../assets/gallery-3.png"
import G4 from "../../assets/gallery-4.png"
import G5 from "../../assets/gallery-5.png"
import G6 from "../../assets/gallery-6.png"
import G7 from "../../assets/gallery-7.png"
import G8 from "../../assets/gallery-8.png"
import G9 from "../../assets/gallery-9.png"
import "./style.scss"

const Gallery = () => {
  const images = [G1, G2, G3, G4, G5, G6, G7, G8, G9]

  return (
  <>
    <div className="gallery__title">
      <h3 className="gallery__title--sm">Share your setup with</h3>
      <h2 className="gallery__title--lg">#FuniroFurniture</h2>
    </div>
    <div className="gallery">
      {
        images.map((image, index) => (
            <div className={`gallery__img gallery__img--${index+1}`} key={index}>
              <img alt="room" src={image} />
            </div>
        ))
      }
    </div>
  </>
  )
}

export default Gallery

import "./style.scss"
import { banners } from "./banners"
import Trophy from "../../assets/trophy 1.svg"
import Warranty from "../../assets/guarantee.svg"
import Package from "../../assets/shipping.svg"
import Support from "../../assets/customer-support.svg"
const bannerImg = [Trophy, Warranty, Package, Support]

const Banner = () => {
  return (
    <div className="banner">
      {banners.map((banner, index) => (
          <div className="banner__item" key={banner.id}>
          <div className="banner__item-image">
            <img src={bannerImg[index]} alt={banner.alt} />
          </div>
          <div className="banner__details">
            <div className="banner__details-title title-md">
                {banner.title}
            </div>
            <div className="banner__details-description text-md">
                {banner.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Banner

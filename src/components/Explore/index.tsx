import Slider from "components/Slider"
import { FC } from "react"
import "./style.scss"
import Bedroom from "../../assets/bedroom-1.png"
import Arrow from "../../assets/Right 16px.svg"

const Explore: FC = () => {
    return (
        <div className="explore">
            <div className="explore__text">
                <h1 className="title-big">50+ Beautiful rooms inspiration</h1>
                <p className="text-md">
Our designer already made a lot of beautiful prototipe of rooms that inspire you                </p>
                <button className="btn-full btn-sm">Explore more</button>
            </div>
            <div className="room">
                <div className="room__img">
                    <img src={Bedroom} alt="bedroom" />
                </div>
                <div className="room__box">
                    <div className="room__title">
                        <h3 className="title-sm">01 <hr/> Bed Room</h3>
                        <h2 className="title-md">Inner Peace</h2>
                    </div>
                    <button>
                        <img src={Arrow} alt="" />
                    </button>
                </div>
            </div>
            <div className="slider">
                <Slider />
            </div>
        </div>
    )
}

export default Explore

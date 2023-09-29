import { FC } from "react";
import "./style.scss"
import { StyledLink } from "components/Header/Styles";

const LandingHome: FC = () => {
    return (
        <div className="landing">
            <div className="landing__info">
                <p className="landing__info-arrival">New Arrival</p>
                <h1 className="landing__info-title">Discover Our New Collection</h1>
                <p className="landing__info-text">
                    Nullam vehicula ipsum a arcu cursus vitae congue mauris. Ultrices mi tempus imperdiet nulla malesuada pellentesque.
                </p>
                <StyledLink to="/shop" className="landing__info-buy">
                    buy now
                </StyledLink>
            </div>
        </div>
    )
}

export default LandingHome

import { StyledLink } from "components/Header/Styles"
import { useState } from "react"
import "./style.scss"

const Footer = () => {
    const [email, setEmail] = useState("")

    return (
        <div className="footer">
            <h3 className="company-name">Funiro.</h3>
            <div className="footer__company-info">
                <p className="text-sm">
                    400 University Drive Suite 200 Coral Gables,
                </p>
                <p className="text-sm">
                    FL 33134 USA
                </p>
            </div>

            <h3 className="footer__title--links footer__title">Links</h3>
            <div className="footer__links">
                <StyledLink className="footer__link" to="/">Home</StyledLink>
                <StyledLink className="footer__link" to="/shop">Shop</StyledLink>
                <StyledLink className="footer__link" to="/about">About</StyledLink>
                <StyledLink className="footer__link" to="/contact">Contact</StyledLink>
            </div>

            <h3 className="footer__title--help footer__title">Help</h3>
            <div className="footer__help">
                <a className="footer__link" href="/">Payment Options</a>
                <a className="footer__link" href="/">Returns</a>
                <a className="footer__link" href="/">Privacy Policies</a>
            </div>

            <h3 className="footer__title--newsletter footer__title">Newsletter</h3>
            <div className="footer__newsletter">
                <input type="email"
                       name="email"
                       value={email}
                       onChange={(e) => setEmail(e.currentTarget.value)}
                    placeholder="Enter Your Email Address"
                />

                <button className="subscribe">Subscribe</button>
            </div>
            <div className="footer__copyright">
                <hr />
                <p className="text-sm">
                    2023 furino. All rights reverved
                </p>
            </div>
        </div>
    )
}

export default Footer

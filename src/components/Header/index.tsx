import { FC, useState } from "react"
import StyledHeader, { StyledLink } from "./Styles"
import Logo from "../../assets/Meubel House_Logos-05.png"
import Profile from "../../assets/mdi_account-alert-outline.svg"
import LoggedIn from "../../assets/person-circle-outline.svg"
import Search from "../../assets/akar-icons_search.svg"
import Heart from "../../assets/akar-icons_heart.svg"
import Cart from "../../assets/ant-design_shopping-cart-outlined.svg"
import "./style.scss"
import LoginModal from "components/LoginModal"
import { useAppSelector } from "hooks/hooks"
import { RootState } from "redux/store"
import LogoutModal from "components/LogoutModel"
import CartModal from "components/CartModal"

const Header: FC = () => {
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
    const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false)
    const [openCartModal, setOpenCartModal] = useState<boolean>(false)
    const isAuthenticated = useAppSelector((state: RootState) => state.user.isAuthenticated)

    const handleProfile = ( ) => {
       if (isAuthenticated) {
           setOpenLogoutModal(true)
       }else {
           setOpenLoginModal(true)
       }
    }
    return (
        <StyledHeader className="header">
            <StyledLink to="/" className="logo">
                    <img className="logo__img" alt="logo" src={Logo} />
                    <p className="logo__name"> Furniro </p>
            </StyledLink>
            <div className="nav">
                <StyledLink to="">
                    <button className="nav__item">Home</button>
                </StyledLink>
                <StyledLink to="shop">
                    <button className="nav__item">Shop</button>
                </StyledLink>
                <StyledLink to="blog">
                    <button className="nav__item">Blog</button>
                </StyledLink>
                <StyledLink to="contact">
                    <button className="nav__item">Contact</button>
                </StyledLink>
            </div>
            <div className="user">
                <button className="user__item" onClick={handleProfile}>
                    { isAuthenticated ?
                        <img className="user__item--profile" alt="profile" src={LoggedIn} />
                        : <img className="user__item--profile" alt="profile" src={Profile} />
                    }
                </button>
                <button className="user__item">
                    <img className="user__item--search" alt="search" src={Search} />
                </button>
                <button className="user__item">
                    <img className="user__item--favorites" alt="heart" src={Heart} />
                </button>
                <button className="user__item" onClick={() => setOpenCartModal(true)}>
                    <img className="user__item--cart" alt="cart" src={Cart} />
                </button>
            </div>
            { openLoginModal && <LoginModal closeModal={() => setOpenLoginModal(false)} /> }
            { openLogoutModal && <LogoutModal closeModal={() => setOpenLogoutModal(false)} /> }
            { openCartModal && <CartModal closeModal={() => setOpenCartModal(false)} /> }
        </StyledHeader>
    )
}

export default Header

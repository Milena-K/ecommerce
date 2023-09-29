import { FC } from "react"
import "./style.scss"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { logoutUser } from "redux/userSlice"
import { RootState } from "redux/store"
import { emptyCart } from "redux/cartSlice"

type Props = {
    closeModal: () => void
}

const LogoutModal: FC<Props> = ({ closeModal }) => {
    const dispatch = useAppDispatch()
    const username = useAppSelector(( state: RootState ) => state.user.user?.username)
    const handleLogout = () => {
        closeModal()
        dispatch(logoutUser())
        dispatch(emptyCart())
        window.localStorage.clear()
    }

    return (
      <>
        <div className="overlay" onClick={closeModal} />
        <div className="logout">
            <h3 className="title-md">Hi, { username }</h3>
            <p>are you sure you want to log out?</p>
            <div className="btns">
                <button className="yes-btn" onClick={handleLogout}>Logout</button>
                <button className="no-btn" onClick={closeModal}>Cancel</button>
            </div>
        </div>
      </>
    )
}

export default LogoutModal

import { useLocation, useParams } from "react-router-dom"
import Logo from "../../assets/Meubel House_Logos-05.png"
import "./style.scss"
import { useMemo } from "react"

const Landing = () => {
  const location = useLocation()
  const pageName = useMemo(() => {
    let pageName = location.pathname.slice(1)
    pageName = pageName[0].toUpperCase() + pageName.slice(1)
    return pageName
  }, [location.pathname])

  return (
    <div className="land">
      <div className="land__content">
        <div className="land__logo">
            <img src={Logo} alt="" />
        </div>
        <h1 className="land__page-name"> {pageName} </h1>
        <p className="bread-crumbs">
              <span className="bold">Home <span className="gt">&gt;</span> </span>{pageName}
        </p>
      </div>
    </div>
  )
}

export default Landing

import Browse from "components/Browse";
import Explore from "components/Explore";
import OurProducts from "components/OurProducts";
import "./style.scss";
import { FC } from "react";
import Gallery from "components/Gallery";
import LandingHome from "components/LandingHome";

export const HomePage: FC = () => {
  return (
      <div className="homepage">
      <LandingHome />
      <Browse />
      <OurProducts />
      <Explore />
      <Gallery />
    </div>
  );
};

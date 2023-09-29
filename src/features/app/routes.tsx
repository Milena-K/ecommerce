/* import { Counter } from "features/counter/Counter"; */
import BlogPage from "pages/blogpage";
import { BlogPageContext, BlogPageProvider } from "pages/blogpage/Context";
import CartPage from "pages/cartpage";
import CheckoutPage from "pages/checkoutpage";
import ContactPage from "pages/contactpage";
import { DetailsPage } from "pages/detailspage";
import { DetailsPageProvider } from "pages/detailspage/context";
import { HomePage } from "pages/homepage";
import ShopPage from "pages/shoppage";
import { RouteProps } from "react-router-dom";

export const PageRoutes: RouteProps[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/item/:id",
    element: <DetailsPageProvider><DetailsPage /></DetailsPageProvider>,
  },
  {
    path: "/shop",
    element: <ShopPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/blog",
    element: <BlogPageProvider><BlogPage /></BlogPageProvider>,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
];

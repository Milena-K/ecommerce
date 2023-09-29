import Breadcrumbs from "components/Breadcrumbs";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDetailsPageContext } from "./context";
import ProductMain from "components/ProductMain";
import { fetchCommentsByProductId, fetchProductById } from "api";
import ProductComments from "components/ProductComments";
import Related from "components/Related";

export const DetailsPage: FC = () => {
  const { id } = useParams<{id: string}>()
  const { setProduct, setProductComments } = useDetailsPageContext()

  useEffect( () => {
    if(id) {
      fetchProductById(id)
        .then((product) => setProduct(product))
      fetchCommentsByProductId(id)
        .then((comments) => setProductComments(comments))
    }
  }, [id])

  return (
    <>
      <Breadcrumbs />
      <ProductMain />
      <ProductComments />
      <Related />
    </>
  );
};

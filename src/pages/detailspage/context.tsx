import { Comment, Product } from "definitions";
import { ReactNode, createContext, useContext, useState } from "react";

type DetailsContextType = {
  productComments: Comment[] | null,
  setProductComments: (comments: Comment[]) => void
  product: Product | null,
  setProduct: (product: Product) => void
}

export const DetailsPageContext = createContext<DetailsContextType | null>(null)

export const DetailsPageProvider = ({ children }: {children: ReactNode}) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [productComments, setProductComments] = useState<Comment[] | null>(null)
  const value = {
    product, setProduct,
    productComments, setProductComments,
  }

  return (
    <DetailsPageContext.Provider value={value}>
      {children}
    </DetailsPageContext.Provider>
  )
}

export default DetailsPageContext;

export const useDetailsPageContext = () => {
  const detailsPageContext = useContext(DetailsPageContext);

  if (!detailsPageContext) {
    throw new Error(
      "useDetailsPageContext has to be used within <DetailsPageContext.Provider>"
    );
  }

  return detailsPageContext;
};

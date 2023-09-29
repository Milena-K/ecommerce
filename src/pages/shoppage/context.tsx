import { FC, createContext, useContext, useState } from "react";

export type ShopPageContextType = {
    filterCategories: {
        filter: string,
        setFilter: (filter: string) => void
    },
    numOfProdPerPage: {
        prodPerPage: number,
        setProdPerPage: (prodPerPage: number) => void
    },
    sortBy: {
        sort: string,
        setSort: (sort: string) => void
    }
    pageNumber: {
        currentPage: number,
        setCurrentPage: (page: number) => void
    }
}

export const ShopPageContext = createContext<ShopPageContextType | null>(null)
export const ShopPageProvider = ({ children }:{children: React.ReactNode}) => {
    const [filter, setFilter] = useState("Show All")
    const [sort, setSort] = useState("Default")
    const [prodPerPage, setProdPerPage] = useState(17)
    const [currentPage, setCurrentPage] = useState(1)
    const contextValue: ShopPageContextType = {
        sortBy: {sort, setSort},
        filterCategories: {filter, setFilter},
        numOfProdPerPage: {prodPerPage, setProdPerPage},
        pageNumber: {currentPage, setCurrentPage}
    }

    return <ShopPageContext.Provider value={contextValue}>
        {children}
    </ShopPageContext.Provider>

}

export const useShopPageContext = () => {
  const shopPageContext = useContext(ShopPageContext);

  if (!shopPageContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  return shopPageContext;
};

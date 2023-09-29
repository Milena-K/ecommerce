import Banner from "components/Banner"
import Filter from "components/Filter"
import Landing from "components/Landing"
import ShopProducts from "components/ShopProducts"
import { ShopPageContext, ShopPageContextType, ShopPageProvider } from "./context"
import { useState } from "react"

const ShopPage = () => {
    return (
        <div className="shop">
            <Landing/>
            <ShopPageProvider>
                <Filter />
                <ShopProducts />
            </ShopPageProvider>
            <Banner />
        </div>
    )
}

export default ShopPage

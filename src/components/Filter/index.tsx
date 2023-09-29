import { useCallback, MouseEvent, useEffect, useState } from "react"
import FilterImg from "../../assets/system-uicons_filtering.svg"
import "./style.scss"
import { fetchProductCategories } from "api"
import { useShopPageContext } from "pages/shoppage/context"
import { useAppSelector } from "hooks/hooks"
import { RootState } from "redux/store"

const Filter = () => {
  const { sortBy, filterCategories, numOfProdPerPage, pageNumber } = useShopPageContext()
  const { sort, setSort } = sortBy
  const { filter, setFilter } = filterCategories
  const { currentPage } = pageNumber
  const { prodPerPage, setProdPerPage } = numOfProdPerPage
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const totalNumProd = useAppSelector((state: RootState) => state.products.total)
  const products = useAppSelector((state: RootState) => state.products.products)
  const sortOptions = ["Default", "From A to Z", "From Z to A", "Lowest price", "Highest price"]

  const numProdPerCat = () => {
    let number = totalNumProd
    if(filter !== "Show All") {
      number = products.filter(p => p.category === filter).length
    }
    return number
  }

  useEffect(() => {
    getProductCategories()
  },[])

  const categoryOptions = useCallback(() => {
    return categories.map((cat, index) => (
      <div className={`option product-option ${filter === cat ? 'active' : ''}`} key={index}>
        <label className={`option product-label`} htmlFor="ch3">{cat}</label>
        <input className="option product-label" readOnly type="radio" name="sort" defaultValue={cat} id="ch3" />
      </div>
      ))
  }, [filter, categories])

  const getProductCategories = useCallback(async () => {
    fetchProductCategories().then(data => {
      const cat = ["Show All", ...data]
      setCategories(cat)
    });
  }, [categories])

  const handleFilterMenu = (e: MouseEvent) => {
    const element = (e.target as Element)
    const className = element.className
    const value = element.textContent
    if (className.includes("filter")) {
      setShowFilterMenu(!showFilterMenu)
      return;
    }
    if (className.includes("option")) {
      setShowFilterMenu(false)
      if (value) {
        setFilter(value)
      }
    }
  }

  const handleSort = (e: MouseEvent) => {
    const element = (e.target as Element)
    const className = element.className
    const value = element.textContent
    if (className === "filter__sort-value") {
      setShowSortMenu(!showSortMenu)
      return;
    }
    if (className === "filter__sort-label" || className === "filter__sort-option") {
      setShowSortMenu(false)
      if (value)
        setSort(value)
    }
  }


  const changeShowValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.currentTarget.value)
    if (number) {
      setProdPerPage(number)
    }else {
      setProdPerPage(0)
    }

  }
  const resultText = (): string => {
    let topItemIndex = (currentPage-1)*prodPerPage + 1
    let lastItemIndex = (currentPage)*prodPerPage
    if(lastItemIndex > numProdPerCat()) {
      lastItemIndex = numProdPerCat()
    }else if(lastItemIndex > totalNumProd) {
      lastItemIndex = totalNumProd
    }else if(prodPerPage === 1) {
      lastItemIndex = 1
    }else if(prodPerPage === 0) {
      lastItemIndex = 0
      topItemIndex = 0
    }
    const text = `Showing ${topItemIndex}-${lastItemIndex} of ${numProdPerCat()} results`
    return text
  }

  return (
    <div className="filter">
      <div className="filter__left">
        <button className="filter__left-category"
                onClick={() => { setShowFilterMenu(!showFilterMenu)}}>
          <img src={FilterImg} alt="filter" className="filter__svg" />
          <p className="filter__title"> Filter </p>
        </button>
        <div className="filter__left-products">
          <p className="filter__title--sm">{ resultText() }</p>
          {
            filter !== '' &&
            <p className="filter__title--sm">Filter by {filter}</p>
          }
        </div>
      </div>

      <div className={`product__categories ${showFilterMenu ? 'active' : 'hidden'}`}
           onClick={(e) => handleFilterMenu(e)}>
        { categoryOptions() }
      </div>

      <div className="filter__right">
        <div className="filter__right-show">
          <p className="filter__title"> Show </p>
          <input className="filter__input" type="number" name="numberOfProductsPerPage" value={prodPerPage} onChange={(e) => changeShowValue(e)} />
        </div>
        <div className="filter__right-sort">
            <span className="filter__title"> Sort by </span>
            <button className="filter__sort-value" onClick={(e) => handleSort(e)}>{sort}</button>
            <div className={`filter__sort ${showSortMenu ? 'active' : 'hidden'}`} onClick={(e) => handleSort(e)}>
              {
                sortOptions.map((option, index) => (
                  <div className="filter__sort-option" key={index}>
                    <label className="filter__sort-label" htmlFor={`ch${index}`}>{option}</label>
                    <input className="filter__sort-label" readOnly type="radio" name="sort" defaultValue={option} id={`ch${index}`}/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
  )
}

export default Filter

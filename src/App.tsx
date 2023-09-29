import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageRoutes } from "./features/app/routes";
import GlobalStyle from "styles/config";
import "./App.css";
import Header from "components/Header";
import "index.css";
import Footer from "components/Footer";
import { fetchProducts } from "redux/productsSlice";
import { RootState } from "redux/store";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { setUser } from "redux/userSlice";
import { setCart } from "redux/cartSlice";

function App() {
  const dispatch = useAppDispatch()
  const prodStatus = useAppSelector((state: RootState) => state.products.status)

  useEffect(() => {
    if(prodStatus === 'idle') {
      dispatch(fetchProducts())
    }
  }, [prodStatus, dispatch])

  useEffect(() =>  {
    const data = window.localStorage.getItem("success-response")
    if (data) {
      const userData = JSON.parse(data)
      dispatch(setUser(userData))
      dispatch(setCart(userData.id))
    }

  }, [window.localStorage])

  return (
    <div className="App">
    <GlobalStyle />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Routes>
            {PageRoutes.map((route, idx) => (
              <Route {...route} key={idx} />
            ))}
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

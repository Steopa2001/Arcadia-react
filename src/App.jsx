import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToTopNotFound from "../components/ScrollToTop";
import DefaultLayout from "../layouts/DefaultLayout";
import Homepage from "../pages/Homepage";
import BoardGames from "../pages/BoardGames";
import DetailProductPage from "../pages/DetailProductPage";
import Cart from "../pages/Cart";
import WishList from "../pages/WishList";
import AllProducts from "../pages/AllProducts";
import PromoPage from "../pages/PromoPage";
import OurChoiches from "../pages/OurChoiches";
import CollectiblesPage from "../pages/CollectiblesPage";
import CardistryPage from "../pages/CardistryPage";
import ModelPage from "../pages/ModelPage";
import NotFoundPage from "../pages/NotFoundPage";
import CartContext from "./contexts/cartContext";

// 💬 importiamo Aria (il chatbot)
import Chatbot from "../components/Chatbot";

function App() {
  const [numberCart, setNumberCart] = useState(() => {
    const saved = localStorage.getItem("numberCart");
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("numberCart", numberCart);
  }, [numberCart]);

  return (
    <CartContext.Provider value={{ numberCart, setNumberCart }}>
      <BrowserRouter>
        <ScrollToTopNotFound />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Homepage />} />
            <Route
              path="/dettaglio-prodotto/:slug"
              element={<DetailProductPage />}
            />
            <Route path="/giochi-da-tavolo" element={<BoardGames />} />
            <Route path="/carrello-prodotti" element={<Cart />} />
            <Route path="/wishlist-prodotti" element={<WishList />} />
            <Route path="/tutti-prodotti" element={<AllProducts />} />
            <Route path="/promo-prodotti" element={<PromoPage />} />
            <Route path="/prodotti-preferiti" element={<OurChoiches />} />
            <Route
              path="/carte-collezionabili"
              element={<CollectiblesPage />}
            />
            <Route path="/cardistry" element={<CardistryPage />} />
            <Route path="/modellismo" element={<ModelPage />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Route>
        </Routes>

        {/* 💬 Aria sempre visibile in basso a destra */}
        <Chatbot />
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;

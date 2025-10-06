import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/carte-collezionabili" element={<CollectiblesPage />} />
          <Route path="/cardistry" element={<CardistryPage />} />
          <Route path="/modellismo" element={<ModelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

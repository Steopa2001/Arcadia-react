import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Homepage from "../pages/Homepage";
import BoardGames from "../pages/BoardGames";
import DetailProductPage from "../pages/DetailProductPage";
import Cart from "../pages/Cart";
import WishList from "../pages/WishList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/dettaglio-prodotto" element={<DetailProductPage />} />
          <Route path="/giochi-da-tavolo" element={<BoardGames />} />
          <Route path="/carrello-prodotti" element={<Cart />} />
          <Route path="/wishlist-prodotti" element={<WishList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

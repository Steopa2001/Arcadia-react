import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Homepage from "../pages/Homepage";
import BoardGames from "../pages/BoardGames";
import DetailProductPage from "../pages/DetailProductPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  element={<DefaultLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/giochi-da-tavolo" element = {<BoardGames/>}/>
          <Route path ="/dettaglio-prodotto" element = {<DetailProductPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

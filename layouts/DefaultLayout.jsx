import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import CartContext from "../src/contexts/cartContext";
import { useContext } from "react";

const DefaultLayout = () => {

  const { numberCart } = useContext(CartContext);

  return (
    <>
      <Header />

      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;

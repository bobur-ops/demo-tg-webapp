import React from "react";
import "./Home.css";
import { CiMenuBurger } from "react-icons/ci";
import ProductList from "./components/ProductList";
import { useGlobalStore } from "../../context/globalContext";

const Home = () => {
  const { products } = useGlobalStore();

  return (
    <div className="home">
      <div className="home-top">
        <CiMenuBurger fontSize={18} />
        Мои заказы
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default Home;

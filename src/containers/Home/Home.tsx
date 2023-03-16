import React from "react";
import "./Home.css";
import { FiShoppingCart } from "react-icons/fi";
import ProductList from "./components/ProductList";
import { useGlobalStore } from "../../context/globalContext";

const Home = () => {
  const { products } = useGlobalStore();

  return (
    <div className="home">
      <a href="/chart" className="home-top">
        <FiShoppingCart fontSize={18} />
        Корзина
      </a>
      <ProductList products={products} />
    </div>
  );
};

export default Home;

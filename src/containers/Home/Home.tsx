import React from "react";
import "./Home.css";
import { FiShoppingCart } from "react-icons/fi";
import ProductList from "./components/ProductList";
import { useGlobalStore } from "../../context/globalContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { products } = useGlobalStore();

  return (
    <div className="home">
      <Link to="/chart" className="home-top">
        <FiShoppingCart fontSize={18} />
        Корзина
      </Link>
      <ProductList products={products} />
      <button>
        <Link to={"/demo"}>Go to demo page</Link>
      </button>
    </div>
  );
};

export default Home;

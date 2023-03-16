import React from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();

  return <div>Product ID {id}</div>;
};

export default ProductPage;

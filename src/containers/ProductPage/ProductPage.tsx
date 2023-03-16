import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalStore } from "../../context/globalContext";
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const { getProduct } = useGlobalStore();

  const product = getProduct(id as string);

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product?.img} alt="Product" />
      </div>
      <div className="product-info">
        <div className="product-title">{product?.title}</div>
      </div>
    </div>
  );
};

export default ProductPage;

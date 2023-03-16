import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Addon from "../../components/Addon/Addon";
import { useGlobalStore } from "../../context/globalContext";
import { useTelegram } from "../../utils/useTelegram";
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const { getProduct } = useGlobalStore();
  const { tg } = useTelegram();
  const product = getProduct(id as string);

  useEffect(() => {
    tg.MainButton.setParams({
      text: `Купить ${product?.price}}`,
    });
    tg.MainButton.show();
  }, []);

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product?.img} alt="Product" />
      </div>
      <div className="product-info">
        <div className="product-title">{product?.title}</div>
        <div className="product-description">
          <div className="label">Описание</div>
          <div className="desc">
            Сливочный кофейный напиток с добавлением авторской лаванды
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

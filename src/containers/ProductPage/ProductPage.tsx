import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Addon from "../../components/Addon/Addon";
import { useGlobalStore } from "../../context/globalContext";
import { getFormatPrice } from "../../utils";
import { useTelegram } from "../../utils/useTelegram";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const { getProduct, addToChart } = useGlobalStore();
  const { tg } = useTelegram();
  const product = getProduct(id as string);
  const navigate = useNavigate();

  const onSendData = useCallback(() => {
    const chart = localStorage.chart;
    if (chart !== null || chart) {
      localStorage.chart = JSON.stringify([product, ...JSON.parse(chart)]);
    } else {
      localStorage.chart = JSON.stringify([product]);
    }
    navigate("/chart");
  }, [product]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: `Купить ${getFormatPrice(product?.price as string)}`,
    });
    tg.MainButton.show();
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

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
        <button style={{ marginTop: "20px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Вернуться на главный экран
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ProductPage;

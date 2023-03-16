import React from "react";
import { getFormatPrice } from "../../../utils";
interface ProductItemProps {
  img: string;
  title: string;
  price: string;
  id: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ img, title, price, id }) => {
  return (
    <a href={`/product/${id}`} className="product-item">
      <div className="product-item__img">
        <img src={img} alt="" />
      </div>
      <div className="product-item__title">{title}</div>
      <div className="product-item__price">{getFormatPrice(price)}</div>
    </a>
  );
};

export default ProductItem;

import React from "react";
import ProductItem from "./ProductItem";
interface IProductList {
  products: IProduct[];
}

const ProductList: React.FC<IProductList> = ({ products }) => {
  return (
    <div className="product-list">
      {products?.map((item) => (
        <ProductItem
          key={item.id}
          img={item.img}
          price={item.price}
          title={item.title}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default ProductList;

import { createContext, useContext } from "react";
import * as React from "react";
import { Products } from "../constants/data";

interface IGlobalContext {
  products: IProduct[];
  chart: IProduct[];
  addToChart: (product: IProduct) => void;
  getProduct: (id: string | number) => IProduct | undefined;
  clearChart: () => void;
}

const StoreContext = createContext<IGlobalContext | null>(null);

type StoreProviderType = {
  children: React.ReactNode;
};

export const GlobalContextProvider: React.FC<StoreProviderType> = ({
  children,
}) => {
  const products: IProduct[] = Products;
  const [chart, setChart] = React.useState<IProduct[]>([]);

  const addToChart = (product: IProduct) => {
    if (chart.some((item) => item.id === product.id)) {
      setChart(chart.filter((item) => item.id !== product.id));
    } else {
      setChart((prev) => [product, ...prev]);
    }
  };

  const getProduct = (id: number | string) => {
    const product = products.find((item) => item.id == id);

    return product;
  };

  const clearChart = () => setChart([]);

  return (
    <StoreContext.Provider
      value={{ chart, products, addToChart, getProduct, clearChart }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useGlobalStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useProductContext must be called within ProductContext.Provider"
    );
  }

  return context;
};

import { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Chart from "./containers/Chart/Chart";
import Home from "./containers/Home/Home";
import ProductPage from "./containers/ProductPage/ProductPage";
import { GlobalContextProvider } from "./context/globalContext";
import { useTelegram } from "./utils/useTelegram";

const DemoPage = () => {
  const { tg, initDataUnsafe, onClose } = useTelegram();

  const sendData = useCallback(async () => {
    await fetch("https://web-app-demo.herokuapp.com/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initDataUnsafe),
    });

    onClose();
  }, [initDataUnsafe]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });

    tg.MainButton.show();
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", sendData);
    return () => {
      tg.offEvent("mainButtonClicked", sendData);
    };
  }, [sendData]);

  return (
    <div>
      <button>Send data</button>
      {JSON.stringify(initDataUnsafe)}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="chart" element={<Chart />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="demo" element={<DemoPage />} />
        </Routes>
      </GlobalContextProvider>
    </div>
  );
};

export default App;

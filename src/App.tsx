import { Route, Routes } from "react-router-dom";
import Chart from "./containers/Chart/Chart";
import Home from "./containers/Home/Home";
import ProductPage from "./containers/ProductPage/ProductPage";
import { GlobalContextProvider } from "./context/globalContext";

const App = () => {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="chart" element={<Chart />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Routes>
      </GlobalContextProvider>
    </div>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";

import { Product } from "./pages/Product";
import { ListProducts } from "./pages/ListProducts";
import { DefaultLayout } from "./layout/DefaultLayout";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { PaymentFailure } from "./pages/PaymentFailure";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<ListProducts />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/failure" element={<PaymentFailure />} />
      </Route>
    </Routes>
  );
};
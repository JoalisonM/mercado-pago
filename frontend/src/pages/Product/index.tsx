import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { IPaymentFormData } from "@mercadopago/sdk-react/bricks/payment/type";

import { Image } from "../../components/Image";
import { useProducts } from "../../hooks/useProducts";
import { ProductContent, ImageContainer, ProductContainer, ProductDetails } from "./styles";

export const Product = () => {
  const location = useLocation();
  const { id, name, price, imageUrl} = location.state;
  const { createPayment, payment, createPreference, preference } = useProducts();

  initMercadoPago(`${import.meta.env.VITE_MERCADO_PAGO_PUBIC_KEY}`, { locale: "pt-BR" });

  const initialization = preference && {
    amount: price,
    preference: preference.id,
  };

  useEffect(() => {
    createPreference({
      id: id,
      title: name,
      unit_price: price,
      success_url: `http://127.0.0.1:5173/product/${id}/success`,
      failure_url: `http://127.0.0.1:5173/product/${id}/failure`,
    });
  }, [name, price, imageUrl]);

  console.log("preference: ", preference);

  const onSubmitProduct = async ({ formData }: IPaymentFormData) => {
    console.log("formData: ", formData);
    const response = await createPayment({
      payment_data: formData
    });

    if(response) {
      console.log("response: ", response);
    }

    // window.location.href = preference.back_urls.success;
  };

  return (
    <ProductContainer>
      <ProductContent>
        <ImageContainer>
          <Image imageUrl={imageUrl} />
        </ImageContainer>

        <footer>
          <strong>{name}</strong>
          <span>
            {
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(price)
            }
          </span>
        </footer>
      </ProductContent>
      <ProductDetails>
        <Payment
          initialization={initialization}
          customization={{
            enableReviewStep: true,
            paymentMethods: {
              bankTransfer: "all",
              creditCard: "all",
            },
          }}
          onSubmit={onSubmitProduct}
        />
      </ProductDetails>
    </ProductContainer>
  );
};

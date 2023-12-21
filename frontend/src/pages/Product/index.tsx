import { useEffect, useState, useRef } from "react";
import * as Toast from '@radix-ui/react-toast';
import { useLocation, useNavigate } from "react-router-dom";
import { initMercadoPago, Payment, StatusScreen } from "@mercadopago/sdk-react";
import { IPaymentFormData } from "@mercadopago/sdk-react/bricks/payment/type";

import { Image } from "../../components/Image";
import { useProducts } from "../../hooks/useProducts";
import { ProductContent, ImageContainer, ProductContainer, ProductDetails, ToastRoot, ToastViewport, StatusContainer } from "./styles";

type PaymentType = {
  id: string;
}

export const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, price, imageUrl} = location.state;

  const timerRef = useRef(0);

  const [openPaymentStatus, setOpenPaymentStatus] = useState(false);
  const [payment, setPayment] = useState<PaymentType | null>(null);
  const { createPayment, createPreference, preference } = useProducts();

  initMercadoPago(`${import.meta.env.VITE_MERCADO_PAGO_PUBIC_KEY_DEV}`, { locale: "pt-BR" });

  const initialization = preference && {
    amount: price,
    preferenceId: preference.id,
  };

  useEffect(() => {
    createPreference({
      id: id,
      title: name,
      unit_price: price,
      success_url: `localhost:5173/success`,
      failure_url: `localhost:5173/failure`,
      pending_url: `localhost:5173/failure`,
    });
  }, [name, price, imageUrl]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const onPaymentStatus = () => {
    setOpenPaymentStatus(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpenPaymentStatus(true);
    }, 100);

  }

  const onSubmitProduct = async ({ formData }: IPaymentFormData) => {
    const response = await createPayment({ payment_data: formData});


    if(response) {
      setPayment(response);

      onPaymentStatus();
    }
  };

  return (
    <>
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
                creditCard: "all",
              },
            }}
            onSubmit={onSubmitProduct}
          />
        </ProductDetails>
      </ProductContainer>

      <Toast.Provider duration={8000}>
        <ToastRoot open={openPaymentStatus} onOpenChange={setOpenPaymentStatus}>
          <StatusContainer>
            {payment && (
              <StatusScreen
                initialization={{
                  paymentId: payment.id,
                }}
              />
            )}
          </StatusContainer>
        </ToastRoot>
        <ToastViewport />
      </Toast.Provider>
    </>
  );
};

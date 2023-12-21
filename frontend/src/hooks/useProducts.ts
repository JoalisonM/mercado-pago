import { useCallback, useState } from "react";

import { Product } from "../api/product";

type PreferenceProps = {
  id: string;
  collector_id: string;
  items: [
    {
      title: string;
      currency_id: string;
      quantity: number;
      unit_price: number;
    },
  ];
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  date_created: string;
}

type CreatePreferenceInput = {
  id: string;
  title: string;
  unit_price: number;
  success_url: string;
  failure_url: string;
  pending_url: string;
}

export const useProducts = () => {
  const [payment, setPayment] = useState({});
  const [preference, setPreference] = useState<PreferenceProps>({} as PreferenceProps);

  const createPayment = useCallback(async (items: any) => {
    try {
      const response = await Product.payment(items);

      if (response) {
        setPayment(payment);
      }

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const createPreference = useCallback(async (items: CreatePreferenceInput) => {
    try {
      const response = await Product.preference(items);

      if (response) {
        setPreference(response.data);
      }

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    payment,
    preference,
    createPayment,
    createPreference,
  };
};

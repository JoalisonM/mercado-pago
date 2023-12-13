import { api } from "../lib/axios";

const paymentsUrl = "/products/payment";
const preferencesUrl = "/products/preference";

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
  };
  date_created: string;
}

type CreatePreferenceInput = {
  id: string;
  title: string;
  unit_price: number;
  success_url: string;
  failure_url: string;
}

export const Product = {
  payment(items: any) {
    return api.post(paymentsUrl, items);
  },

  preference(items: CreatePreferenceInput) {
    return api.post<PreferenceProps>(preferencesUrl, items);
  },
};

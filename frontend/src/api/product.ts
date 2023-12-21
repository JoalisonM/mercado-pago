import { api } from "../lib/axios";

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

const paymentsUrl = "/products/payment";
const preferencesUrl = "/products/preference";

export const Product = {
  payment(items: any) {
    return api.post(paymentsUrl, items);
  },

  preference(items: CreatePreferenceInput) {
    return api.post<PreferenceProps>(preferencesUrl, items);
  },
};

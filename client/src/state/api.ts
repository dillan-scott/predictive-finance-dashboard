import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TradingDay } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Data"],
  endpoints: (build) => ({
    fetchStockData: build.query<Array<TradingDay>, string>({
      query: (ticker) => `/data/fetch?ticker=${ticker}`,
      providesTags: ["Data"],
    }),
  }),
});

export const { useFetchStockDataQuery } = api;

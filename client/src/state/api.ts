import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Candle, Ticker } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Data"],
  endpoints: (build) => ({
    fetchStockData: build.query<Array<Candle>, Ticker>({
      query: ({ ticker }) => `/data/fetch?ticker=${ticker}`,
      providesTags: ["Data"],
    }),
  }),
});

export const { useFetchStockDataQuery } = api;

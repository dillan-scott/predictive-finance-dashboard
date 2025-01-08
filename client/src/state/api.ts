import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Prediction, TradingDay } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Data", "ML"],
  endpoints: (build) => ({
    fetchStockData: build.query<Array<TradingDay>, string>({
      query: (ticker) => `/data/fetch?ticker=${ticker}`,
      providesTags: ["Data"],
    }),
    trainModel: build.mutation<number, void>({
      query: () => "/ml/train",
      invalidatesTags: ["ML"],
    }),
    predictTomorrow: build.query<Prediction, string>({
      query: (ticker) => `/ml/predict?ticker=${ticker}`,
      providesTags: ["ML"],
    }),
  }),
});

export const {
  useFetchStockDataQuery,
  useTrainModelMutation,
  usePredictTomorrowQuery,
} = api;

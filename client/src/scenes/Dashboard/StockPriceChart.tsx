import { useMemo } from "react";
import { useTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import { ApexOptions } from "apexcharts";
import DashboardBox from "@/components/DashboardBox";
import { useFetchStockDataQuery, usePredictTomorrowQuery } from "@/state/api";

type Props = { ticker: string; ema9: boolean; ema21: boolean; ema50: boolean };

const StockPriceChart = ({ ticker, ema9, ema21, ema50 }: Props) => {
  const { palette } = useTheme();

  const { data } = useFetchStockDataQuery(ticker);
  const { data: predictionData } = usePredictTomorrowQuery(ticker);

  const candleData = useMemo(() => {
    return (
      data?.map((d) => ({
        x: new Date(d.Date),
        y: [d.Open, d.High, d.Low, d.Close],
      })) || []
    );
  }, [data]);

  const seriesData = useMemo(() => {
    const res = [];
    res.push({ name: "candle", data: candleData });

    if (ema9) {
      const ema9Data =
        data?.map((d) => ({
          x: new Date(d.Date),
          y: d.EMA_9 === "null" ? null : d.EMA_9,
        })) || [];

      res.push({
        name: "EMA 9",
        data: ema9Data,
        type: "line",
        color: palette.secondary.main,
      });
    }

    if (ema21) {
      const ema21Data =
        data?.map((d) => ({
          x: new Date(d.Date),
          y: d.EMA_21 === "null" ? null : d.EMA_21,
        })) || [];

      res.push({
        name: "EMA 21",
        data: ema21Data,
        type: "line",
        color: palette.tertiary.main,
      });
    }

    if (ema50) {
      const ema50Data =
        data?.map((d) => ({
          x: new Date(d.Date),
          y: d.EMA_50 === "null" ? null : d.EMA_50,
        })) || [];

      res.push({
        name: "EMA 50",
        data: ema50Data,
        type: "line",
        color: palette.quaternary.main,
      });
    }

    return res;
  }, [data, candleData, ema9, ema21, ema50]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        animations: { enabled: false },
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: 3,
      },
      title: {
        text: `${ticker} (1d) - Tomorrow price will be ${
          predictionData?.prediction ? "UP" : "DOWN"
        }`,
        align: "center",
        style: {
          color: palette.grey[200],
          fontSize: "20px",
          fontFamily: "inherit",
          fontWeight: 700,
        },
      },
      tooltip: { enabled: true },
      xaxis: {
        type: "category",
        labels: {
          style: { fontSize: "14px", colors: palette.grey[500] },
          formatter: function (val) {
            return dayjs(val).format("DD-MM-YYYY");
          },
        },
      },
      yaxis: {
        labels: {
          style: { fontSize: "14px", colors: palette.grey[500] },
        },
        tooltip: { enabled: true },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: palette.primary[600],
            downward: palette.grey[300],
          },
          wick: { useFillColor: true },
        },
      },
      legend: {
        show: false,
      },
    }),
    [ticker]
  );

  return (
    <DashboardBox gridArea="a" p="1rem 1.5rem 0rem 1.25rem">
      <ReactApexChart
        type="candlestick"
        series={seriesData}
        options={options}
        height="100%"
      />
    </DashboardBox>
  );
};

export default StockPriceChart;

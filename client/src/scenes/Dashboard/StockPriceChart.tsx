import { useMemo } from "react";
import { useTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import { ApexOptions } from "apexcharts";
import DashboardBox from "@/components/DashboardBox";
import { useFetchStockDataQuery } from "@/state/api";

type Props = { ticker: string; ema9: boolean; ema21: boolean; ema50: boolean };

const StockPriceChart = ({ ticker, ema9, ema21, ema50 }: Props) => {
  const { palette } = useTheme();

  const { data } = useFetchStockDataQuery({ ticker });
  console.log(data);

  const candleData = useMemo(() => {
    return (
      data?.map((d) => ({
        x: new Date(d.Date),
        y: [d.Open, d.High, d.Low, d.Close],
      })) || []
    );
  }, [data]);

  const ema9Data = useMemo(() => {
    return (
      data?.map((d) => ({
        x: new Date(d.Date),
        y: d.EMA_9,
      })) || []
    );
  }, [data]);

  const ema21Data = useMemo(() => {
    return (
      data?.map((d) => ({
        x: new Date(d.Date),
        y: d.EMA_21,
      })) || []
    );
  }, [data]);

  const ema50Data = useMemo(() => {
    return (
      data?.map((d) => ({
        x: new Date(d.Date),
        y: d.EMA_50,
      })) || []
    );
  }, [data]);

  const seriesData = [];
  seriesData.push({ name: "candle", data: candleData });
  if (ema9)
    seriesData.push({
      name: "EMA 9",
      data: ema9Data,
      type: "line",
      color: palette.secondary.main,
    });
  if (ema21)
    seriesData.push({
      name: "EMA 21",
      data: ema21Data,
      type: "line",
      color: palette.tertiary.main,
    });
  if (ema50)
    seriesData.push({
      name: "EMA 50",
      data: ema50Data,
      type: "line",
      color: palette.quaternary.main,
    });

  const options: ApexOptions = {
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
      text: ticker,
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
        formatter: function (val) {
          return val.toFixed(2);
        },
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
  };

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

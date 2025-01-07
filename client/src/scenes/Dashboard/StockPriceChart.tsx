import DashboardBox from "@/components/DashboardBox";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import { useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useFetchStockDataQuery } from "@/state/api";
import { useMemo } from "react";

type Props = { ticker: string };

const StockPriceChart = ({ ticker }: Props) => {
  const { palette } = useTheme();

  const { data } = useFetchStockDataQuery({ ticker });

  const formattedData = useMemo(() => {
    return (
      data &&
      data.map((d) => {
        return {
          x: new Date(d.Date),
          y: [d.Open, d.High, d.Low, d.Close],
        };
      })
    );
  }, [data]);

  const seriesData = [
    {
      name: "candle",
      data: formattedData || [],
    },
  ];

  const options: ApexOptions = {
    title: {
      text: ticker,
      align: "center",
      style: {
        color: palette.grey[300],
        fontSize: "18px",
        fontFamily: "inherit",
        fontWeight: 600,
      },
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      labels: {
        style: { fontSize: "12px", colors: palette.grey[500] },
        formatter: function (val) {
          return dayjs(val).format("DD-MM-YYYY");
        },
      },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", colors: palette.grey[500] },
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: palette.primary[600],
          downward: palette.grey[300],
        },
        wick: {
          useFillColor: true,
        },
      },
    },
  };

  return (
    <DashboardBox gridArea="a" p="1rem 1.5rem">
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

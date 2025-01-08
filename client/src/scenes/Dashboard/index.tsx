import DashboardBox from "@/components/DashboardBox";
import { Box } from "@mui/material";
import StockPriceChart from "./StockPriceChart";
import { useState } from "react";
import ChartOptions from "./ChartOptions";

const gridTemplate = `
  "a a b"
  "a a d"
  "c c d"
`;

const Dashboard = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>("AAPL");
  const [ema9, setEma9] = useState<boolean>(false);
  const [ema21, setEma21] = useState<boolean>(false);
  const [ema50, setEma50] = useState<boolean>(false);

  return (
    <Box
      width="100%"
      height="95%"
      display="grid"
      gap="1.5rem"
      sx={{
        gridTemplateColumns: "repeat(3, minmax(450px, 1fr))",
        gridTemplateRows: "repeat(3, minmax(350px, 1fr))",
        gridTemplateAreas: gridTemplate,
      }}
    >
      <StockPriceChart
        ticker={selectedTicker}
        ema9={ema9}
        ema21={ema21}
        ema50={ema50}
      />
      <ChartOptions
        selectedTicker={selectedTicker}
        setSelectedTicker={setSelectedTicker}
        setEma9={setEma9}
        setEma21={setEma21}
        setEma50={setEma50}
      />
      <DashboardBox gridArea="c">SENTIMENT ANALYSIS</DashboardBox>
      <DashboardBox gridArea="d">PORTFOLIO MANAGE & ANALYSIS?</DashboardBox>
    </Box>
  );
};

export default Dashboard;

import DashboardBox from "@/components/DashboardBox";
import { Box } from "@mui/material";
import StockPriceChart from "./StockPriceChart";
import { SetStateAction, useState } from "react";
import ChartOptions from "./ChartOptions";

const gridTemplate = `
  "a a b"
  "a a d"
  "c c d"
`;

const Dashboard = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>("AAPL");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={{
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, minmax(385px, 1fr))",
        gridTemplateAreas: gridTemplate,
      }}
    >
      <StockPriceChart ticker={selectedTicker} />
      <ChartOptions
        selectedTicker={selectedTicker}
        setSelectedTicker={setSelectedTicker}
      />
      <DashboardBox gridArea="c">SENTIMENT ANALYSIS</DashboardBox>
      <DashboardBox gridArea="d">PORTFOLIO MANAGE & ANALYSIS?</DashboardBox>
    </Box>
  );
};

export default Dashboard;

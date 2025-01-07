import DashboardBox from "@/components/DashboardBox";
import SearchBar from "@/components/SearchBar";
import { Typography } from "@mui/material";

type Props = {
  selectedTicker: string;
  setSelectedTicker: React.Dispatch<React.SetStateAction<string>>;
};

function ChartOptions({
  selectedTicker: selectedTicker,
  setSelectedTicker: setSelectedTicker,
}: Props) {
  // Mock tickers list
  const availableTickers = [
    "AAPL",
    "GOOGL",
    "AMZN",
    "TSLA",
    "MSFT",
    "NFLX",
    "SPY",
  ];

  return (
    <DashboardBox gridArea="b" p="1rem 1.5rem">
      <Typography variant="h4" sx={{ textAlign: "center" }} mb="1rem">
        CHART OPTIONS
      </Typography>
      <SearchBar
        selected={selectedTicker}
        setSelected={setSelectedTicker}
        options={availableTickers}
      />
    </DashboardBox>
  );
}

export default ChartOptions;

import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import SearchBar from "@/components/SearchBar";
import { FormControlLabel, Switch, Typography, useTheme } from "@mui/material";

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

type Props = {
  selectedTicker: string;
  setSelectedTicker: React.Dispatch<React.SetStateAction<string>>;
  setEma9: React.Dispatch<React.SetStateAction<boolean>>;
  setEma21: React.Dispatch<React.SetStateAction<boolean>>;
  setEma50: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChartOptions({
  selectedTicker,
  setSelectedTicker,
  setEma9,
  setEma21,
  setEma50,
}: Props) {
  const { palette } = useTheme();

  const switchStyle = (color: string) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: color,
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: color,
    },
    "& .MuiSwitch-switchBase": {
      color: palette.grey[500],
    },
    "&:hover .MuiSwitch-switchBase": {
      color: palette.grey[300],
    },
  });

  return (
    <DashboardBox
      gridArea="b"
      p="1rem 1.5rem"
      sx={{ color: palette.grey[300] }}
    >
      <Typography variant="h3" sx={{ textAlign: "center" }} mb="1rem">
        CHART OPTIONS
      </Typography>

      <Typography variant="h4" sx={{ mt: "1.5rem", mb: "0.5rem" }}>
        Select a Ticker
      </Typography>
      <SearchBar
        selected={selectedTicker}
        setSelected={setSelectedTicker}
        options={availableTickers}
      />

      <Typography variant="h4" sx={{ mt: "1.5rem", mb: "0.25rem" }}>
        Select EMAs to Display
      </Typography>
      <FlexBetween>
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => setEma9(e.target.checked)}
              sx={switchStyle(palette.secondary.main)}
            />
          }
          label="EMA 9"
        />
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => setEma21(e.target.checked)}
              sx={switchStyle(palette.tertiary.main)}
            />
          }
          label="EMA 21"
        />
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => setEma50(e.target.checked)}
              sx={switchStyle(palette.quaternary.main)}
            />
          }
          label="EMA 50"
        />
      </FlexBetween>
    </DashboardBox>
  );
}

export default ChartOptions;

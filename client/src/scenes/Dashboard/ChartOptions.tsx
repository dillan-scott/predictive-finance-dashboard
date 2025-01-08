import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import SearchBar from "@/components/SearchBar";
import { useTrainModelMutation } from "@/state/api";
import {
  Button,
  FormControlLabel,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { availableTickers } from "@/constants";

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

  const [trainModel] = useTrainModelMutation();

  const handleRetrain = () => {
    trainModel();
  };

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
      p="1.5rem 1.5rem"
      sx={{ color: palette.grey[300] }}
    >
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        CHART OPTIONS
      </Typography>

      <Typography variant="h4" sx={{ mt: "0.25rem", mb: "0.5rem" }}>
        Select a Ticker
      </Typography>
      <SearchBar
        selected={selectedTicker}
        setSelected={setSelectedTicker}
        options={availableTickers}
      />

      <Typography variant="h4" sx={{ mt: "1.25rem" }}>
        Select EMAs to Display
      </Typography>
      <FlexBetween margin="0.25rem 0.5rem">
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
      <FlexBetween mt="1rem">
        <Typography variant="h4">Retrain the Random Forest model</Typography>
        <Button
          sx={{
            padding: "0.25rem 0.75em",
            fontSize: "14px",
            color: palette.grey[300],
            backgroundColor: palette.background.default,
            "&:hover": {
              backgroundColor: palette.grey[800],
            },
          }}
          onClick={handleRetrain}
        >
          Retrain
        </Button>
      </FlexBetween>
    </DashboardBox>
  );
}

export default ChartOptions;

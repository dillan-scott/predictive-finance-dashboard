import { Autocomplete, TextField, useTheme } from "@mui/material";

type Props = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  options: Record<string, string>;
};

const SearchBar = ({
  selected: selectedTicker,
  setSelected: setSelectedTicker,
  options: availableTickers,
}: Props) => {
  const { palette } = useTheme();
  return (
    <Autocomplete
      value={selectedTicker}
      onChange={(_, newValue: string | null) => {
        if (newValue) {
          setSelectedTicker(newValue);
        }
      }}
      options={Object.keys(availableTickers)}
      sx={{
        width: "100%",
        marginBottom: "0.5rem",
        "& .MuiOutlinedInput-root": {
          height: "3rem",
          color: palette.grey[300],
          backgroundColor: palette.background.default,
          borderRadius: "8px",
          "& fieldset": {
            borderColor: palette.grey[500],
          },
          "&:hover fieldset": {
            borderColor: palette.primary.main,
          },
          "&.Mui-focused fieldset": {
            borderColor: palette.primary.main,
          },
        },
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default SearchBar;

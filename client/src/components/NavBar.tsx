// import { Link, useLocation } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { useTheme, Typography } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

const NavBar = () => {
  const { palette } = useTheme();
  // const location = useLocation();
  // const currentPath = location.pathname;

  return (
    <FlexBetween mb="0.75rem" p="0.5rem 0rem" color={palette.grey[300]}>
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          PRODUCT NAME
        </Typography>
      </FlexBetween>

      {/* <FlexBetween gap="2rem">
        <Box>
          <Link
            to="/"
            style={{
              color: currentPath === "/" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            dashboard
          </Link>
        </Box>
      </FlexBetween> */}
    </FlexBetween>
  );
};

export default NavBar;

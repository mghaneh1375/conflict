import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function Header({ navigate }) {
  const location = useLocation();
  return (
    <Grid
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      width={"100%"}
      padding={"10px"}
      borderBottom={"1px solid"}
      sx={{ backgroundColor: "#ccc" }}
    >
      <FontAwesomeIcon
        onClick={() => navigate("/dashboard")}
        cursor={"pointer"}
        color="red"
        icon={faArrowLeft}
        size="2x"
      />
      <Typography variant="h4">{location.pathname.substring(1)}</Typography>
    </Grid>
  );
}

export default Header;

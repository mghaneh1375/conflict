import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { _GET } from "../../services/Fetch";
import { routes } from "../../services/API";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { dispatchStateContext, globalStateContext } from "../../App";

function DuplicateUserMailRecords() {
  const [data, setData] = useState();

  const useGlobalState = () => [
    useContext(globalStateContext),
    useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    dispatch({ loading: true });
    Promise.all([_GET(routes.duplicateUserMailRecords, state.token)]).then(
      (res) => {
        dispatch({ loading: false });
        if (res[0] != null) setData(res[0]);
      }
    );
  }, []);

  const navigate = useNavigate();

  return (
    <Grid display={"flex"} flexDirection={"column"}>
      <Header navigate={navigate} />
      {data && (
        <Typography textAlign={"center"} marginTop={"10px"} variant="h5">
          {"total count: " + data.length}
        </Typography>
      )}

      <Grid
        padding={"20px"}
        display={"flex"}
        flexDirection={"row"}
        gap={"50px"}
        rowGap={"20px"}
        flexWrap={"wrap"}
      >
        {data &&
          data.map((record, index) => {
            return (
              <Card sx={{ minWidth: 275, maxWidth: 275 }} key={index}>
                <CardContent>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    mail: {record}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Fix</Button>
                </CardActions> */}
              </Card>
            );
          })}
      </Grid>
    </Grid>
  );
}

export default DuplicateUserMailRecords;

import { _GET, _POST } from "../../services/Fetch";
import { routes } from "../../services/API";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dispatchStateContext, globalStateContext } from "../../App";
import { useContext } from "react";

function Dashboard() {
  const useGlobalState = () => [
    useContext(globalStateContext),
    useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [data, setData] = useState();
  const [mailAddress, setMailAddress] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ loading: true });
    Promise.all([_GET(routes.getConflictsCount, state.token)]).then((res) => {
      dispatch({ loading: false });
      if (res[0] != null) setData(res[0]);
    });
  }, []);

  return (
    <Grid padding={"20px"} display={"flex"} flexDirection={"column"}>
      <Grid
        padding={"20px"}
        display={"flex"}
        flexDirection={"row"}
        gap={"50px"}
        rowGap={"20px"}
        flexWrap={"wrap"}
      >
        {data &&
          Object.keys(data).map((key, index) => {
            return (
              <Card sx={{ minWidth: 275 }} key={index}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {key}
                  </Typography>

                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                    variant="h1"
                  >
                    {data[key]}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      if (key === "currTermDuplicate")
                        navigate("/currTermDuplicates");
                      else if (key === "OSDTransactionConflicts")
                        navigate("/OSDTransactionConflicts");
                      else if (key === "duplicateUserMailRecords")
                        navigate("/duplicateUserMailRecords");
                      else if (key === "conflictInClassesWithPassed")
                        navigate("/conflictInClassesWithPassed");
                      else if (key === "conflictPassedWithClass")
                        navigate("/conflictInPassedWithClasses");
                    }}
                    size="small"
                  >
                    Learn More
                  </Button>
                  <Button size="small">Auto Fix</Button>
                </CardActions>
              </Card>
            );
          })}
      </Grid>
      <Grid
        display={"flex"}
        flexDirection={"row"}
        gap={"10px"}
        justifyContent={"center"}
      >
        <Grid alignItems={"end"} display={"flex"}>
          <Button
            onClick={async () => {
              await _POST(routes.clearCache, undefined, undefined);
            }}
            variant="contained"
          >
            Clear Cache
          </Button>
        </Grid>
        <Grid display={"flex"} flexDirection={"column"} gap={"10px"}>
          <Input
            onChange={(event) => {
              setMailAddress(event.target.value);
            }}
            name="mail"
            placeholder="Mail address"
            type="mail"
          />
          <Button
            onClick={async () => {
              if (mailAddress === undefined || mailAddress.length === 0) {
                dispatch({
                  showError: true,
                  errMsg: "Please enter mail address",
                });
                return;
              }
              dispatch({ loading: true });
              const res = await _POST(
                routes.checkMail + "?mailAddress=" + mailAddress,
                undefined,
                undefined
              );
              dispatch({ loading: false });
              if (res !== null) {
                dispatch({ showSuccess: true });
              }
            }}
            variant="contained"
          >
            Check Mail
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { _GET, _POST } from "../../services/Fetch";
import { routes } from "../../services/API";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { dispatchStateContext, globalStateContext } from "../../App";

function ConflictInClassesWithPassed() {
  const [data, setData] = useState();

  const useGlobalState = () => [
    useContext(globalStateContext),
    useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    dispatch({ loading: true });
    Promise.all([_GET(routes.conflictInClassesWithPassed, state.token)]).then(
      (res) => {
        dispatch({ loading: false });
        if (res[0] != null)
          setData(
            res[0].map((record) => {
              return {
                ...record,
                show: true,
              };
            })
          );
      }
    );
  }, []);

  const removeFromClass = async (classId, userId) => {
    dispatch({ loading: true });
    const res = await _POST(
      routes.removeUserFromClass + classId + "/" + userId,
      undefined,
      state.token
    );
    dispatch({ loading: false });
    if (res === null) return;
    setData(
      data.map((record) => {
        if (record.userId === userId && record.classInfo.classId === classId)
          return {
            ...record,
            show: false,
          };

        return record;
      })
    );
    dispatch({ showSuccess: true });
  };

  const addClassToPassed = async (classId, userId) => {
    dispatch({ loading: true });
    const res = await _POST(
      routes.addClassToPassed + classId + "/" + userId,
      undefined,
      state.token
    );
    dispatch({ loading: false });
    if (res === null) return;

    dispatch({ showSuccess: true });
    setData(
      data.map((record) => {
        if (record.userId === userId && record.classInfo.classId === classId)
          return {
            ...record,
            show: false,
          };

        return record;
      })
    );
  };

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
            if (!record.show) return <></>;
            return (
              <Card sx={{ minWidth: 275 }} key={index}>
                <CardContent>
                  <Typography variant="h4" color="text.secondary" gutterBottom>
                    {record.userName}
                  </Typography>

                  <Typography color="text.secondary" variant="h5">
                    class: {record.classInfo.name}
                  </Typography>
                  <Typography color="text.secondary" variant="h6">
                    term: {record.classInfo.term}
                  </Typography>
                  <Typography color="text.secondary" variant="body1">
                    teacher: {record.classInfo.teacher}
                  </Typography>
                  <Typography color="text.secondary" variant="body1">
                    schedule: {record.classInfo.schedule}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 1.5,
                      borderBottom: "1px solid",
                      paddingBottom: "6px",
                    }}
                    color="text.secondary"
                    variant="body1"
                  >
                    createdAt: {record.classInfo.createdAt}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() =>
                      dispatch({
                        showDialog: true,
                        dialogTitle:
                          "Add " +
                          record.classInfo.name +
                          " to passed of " +
                          record.userName,
                        dialogMsg: "Are you sure about it?",
                        dialogOnAccept: () =>
                          addClassToPassed(
                            record.classInfo.classId,
                            record.userId
                          ),
                      })
                    }
                    size="small"
                  >
                    Add to passed
                  </Button>
                  <Button
                    onClick={() =>
                      dispatch({
                        showDialog: true,
                        dialogTitle:
                          "Remove " +
                          record.userName +
                          " from " +
                          record.classInfo.name +
                          " class",
                        dialogMsg: "Are you sure about it?",
                        dialogOnAccept: () =>
                          removeFromClass(
                            record.classInfo.classId,
                            record.userId
                          ),
                      })
                    }
                    size="small"
                  >
                    remove from class
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </Grid>
    </Grid>
  );
}

export default ConflictInClassesWithPassed;

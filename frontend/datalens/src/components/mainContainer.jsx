import { Stack, Box, Typography, Chip } from "@mui/material";
import VisualAreaChart from "./charts/visualAreaChart";
import SimpleLineChart from "./charts/simpleLineChart";
import MixedChart from "./charts/mixedChart";
import { useDispatch } from "react-redux";
import { setCategoryFilter } from "../redux_store/features/dashboardSlice";
import { useSelector } from "react-redux";
const MainContainer = () => {
  const dispatch = useDispatch();
  const categoryFilter = useSelector((state)=>{
    return state.dashboardStore.categoryFilter;
  });
  return (
    <Box p={1}>
      <Box>
        <Typography
          variant="p"
          component="p"
          sx={{
            color: "#08105d",
            fontSize: "1.8rem",
            fontWeight: "700",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          Risk Analysis
        </Typography>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          sx={{
            "@media screen and (max-width: 900px)": {
              flexDirection: "column"
            },
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "400px",
              "@media screen and (max-width: 900px)": {
                width: "100%"
              },
            }}
          >
            <Typography
              variant="p"
              component="p"
              sx={{
                color: "#08105d",
                fontSize: "1.2rem",
                fontWeight: "700",
                textAlign: "center",
                padding: "0.8rem",
              }}
            >
              Start Years 2016-2050
            </Typography>
            <VisualAreaChart />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "400px",
              "@media screen and (max-width: 900px)": {
                width: "100%"
              },
            }}
          >
            <Typography
              variant="p"
              component="p"
              sx={{
                color: "#08105d",
                fontSize: "1.2rem",
                fontWeight: "700",
                textAlign: "center",
                padding: "0.8rem",
              }}
            >
              End Years 2016-2051
            </Typography>
            <SimpleLineChart />
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{ width: "100%", height: "400px", margin: "4rem auto 2rem auto" }}
      >
        <Typography
          variant="p"
          component="p"
          sx={{
            color: "#08105d",
            fontSize: "1.8rem",
            fontWeight: "700",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          {categoryFilter} Wise Analysis
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Stack direction="row" spacing={1}>
            <Chip
              label="sector"
              sx={{ fontSize: "1rem", fontWeight: "700", color: "#08105d" }}
              onClick={() => dispatch(setCategoryFilter("sector"))}
            />
            <Chip
              label="country"
              sx={{ fontSize: "1rem", fontWeight: "700", color: "#08105d" }}
              onClick={() => dispatch(setCategoryFilter("country"))}
            />
            <Chip
              label="topic"
              sx={{ fontSize: "1rem", fontWeight: "700", color: "#08105d" }}
              onClick={() => dispatch(setCategoryFilter("topic"))}
            />
            <Chip
              label="pestle"
              sx={{ fontSize: "1rem", fontWeight: "700", color: "#08105d" }}
              onClick={() => dispatch(setCategoryFilter("pestle"))}
            />
            <Chip
              label="region"
              sx={{ fontSize: "1rem", fontWeight: "700", color: "#08105d" }}
              onClick={() => dispatch(setCategoryFilter("region"))}
            />
          </Stack>
        </Stack>
        <MixedChart />
      </Box>
    </Box>
  );
};
export default MainContainer;

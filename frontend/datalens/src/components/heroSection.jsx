import {
  Chip,
  Stack,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import DataUsageRoundedIcon from "@mui/icons-material/DataUsageRounded";
import GasMeterRoundedIcon from "@mui/icons-material/GasMeterRounded";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DangerousIcon from "@mui/icons-material/Dangerous";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import BoltIcon from "@mui/icons-material/Bolt";
import Divider from "@mui/material/Divider";
import UsageChart from "./charts/usagebarChart";
import { useSelector } from "react-redux";
const Hero = () => {
  const swotData = useSelector((state) => {
    return state.dashboardStore.swotData;
  });
  const usageTime = useSelector((state) => {
    return state.dashboardStore.usageTime;
  });
  const apiCallsCount = useSelector(
    (state) => state.dashboardStore.apiCallsCount
  );

  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="space-between"
      sx={{
        padding: "2.8rem 1rem",
        margin: "auto",
        "@media screen and (max-width: 900px)": {
          flexDirection: "column",
          alignItems:"center"
        }
      }}
    >
      <Box component="div">
        <Typography
          variant="p"
          component="p"
          sx={{
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            margin: "0.5rem",
            color: "#08105d",
          }}
        >
          Welcome Back,
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontSize: "2.2rem",
              fontWeight: "700",
              marginLeft: "0.5rem",
              color: "#08105d",
            }}
          >
            User
          </Typography>
          <WavingHandRoundedIcon
            sx={{ marginLeft: "0.5rem", color: "#08105d", fontSize: "2rem" }}
          />
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{
            width: "70%",
            margin: "0.5rem",
            color: "#08105d",
            fontSize: "1.2rem",
          }}
        >
          "You're doing great this week! Let's maintain the momentum and aim for
          some fantastic rewards!
        </Typography>
        <Box sx={{ height: "30vh", margin: "0 auto" }}>
          <UsageChart />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ margin: "1rem 0.5rem 1rem 0.5rem" }}
        >
          <Stack direction="row" alignItems="center">
            <Avatar
              sx={{ bgcolor: "#7367f0", width: "4rem", height: "4rem" }}
              variant="square"
            >
              <ComputerRoundedIcon sx={{ fontSize: "2rem" }} />
            </Avatar>
            <Box component="div" ml={1}>
              <Typography
                variant="p"
                component="p"
                sx={{ fontSize: "1.2rem", fontWeight: "600", color: "#08105d" }}
              >
                Minutes Spent
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{ fontSize: "1.5rem", color: "#08105d", fontWeight: "700" }}
              >
                {usageTime} Minutes
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Avatar
              sx={{ bgcolor: "#7367f0", width: "4rem", height: "4rem" }}
              variant="square"
            >
              <DataUsageRoundedIcon sx={{ fontSize: "2rem" }} />
            </Avatar>
            <Box component="div" ml={1}>
              <Typography
                variant="p"
                component="p"
                sx={{ fontSize: "1.2rem", fontWeight: "600", color: "#08105d" }}
              >
                Usage
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#08105d",
                }}
              >
                {Math.round(
                  (Math.round((apiCallsCount / 1000) * 100) +
                    Math.round((usageTime / 60) * 100)) /
                    2
                )}
                %
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Avatar
              sx={{ bgcolor: "#7367f0", width: "4rem", height: "4rem" }}
              variant="square"
            >
              <GasMeterRoundedIcon sx={{ fontSize: "2rem" }} />
            </Avatar>
            <Box component="div" ml={1}>
              <Typography
                variant="p"
                component="p"
                sx={{ color: "#08105d", fontSize: "1.2rem", fontWeight: "600" }}
              >
                API Calls
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#08105d",
                }}
              >
                {apiCallsCount}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Divider orientation="vertical" flexItem className="hero_divider"/>
      <Box component="div"
      >
        <Typography
          varaint="p"
          component="p"
          sx={{
            color: "#08105d",
            fontWeight: "700",
            fontSize: "1.8rem",
            textAlign: "center",
            padding: "0.5rem",
          }}
        >
          Swot Analysis
        </Typography>
        <List sx={{
          overflowY: "scroll",
          height: "62vh",
          scrollbarWidth: "1rem",
          margin: "auto",
        }}>
          {swotData
            ? Object.keys(swotData).map((swotItem) => {
                return (
                  <ListItem key={swotItem} sx={{ display: "block" }}>
                    <Stack className="list_title" direction="row">
                      <ListItemText>
                        <Typography
                          variant="p"
                          component="p"
                          sx={{ color: "#08105d", fontWeight: "600" }}
                        >
                          {swotItem}
                        </Typography>
                      </ListItemText>
                    </Stack>
                    <Stack direction="row">
                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={1}
                        class="list_icons"
                      >
                        <Chip
                          icon={<BoltIcon style={{ color: "#08105d" }} />}
                          label={`Strengths ${swotData[swotItem].strengths}`}
                          sx={{
                            margin: "0.2rem",
                            color: "#08105d",
                            backgroundColor: "#f2f2f2",
                            fontWeight: "600",
                          }}
                        />
                        <Chip
                          icon={<HandshakeIcon style={{ color: "#08105d" }} />}
                          label={`Opportunities ${swotData[swotItem].opportunities}`}
                          sx={{
                            margin: "0.2rem",
                            color: "#08105d",
                            backgroundColor: "#f2f2f2",
                            fontWeight: "600",
                          }}
                        />
                        <Chip
                          icon={
                            <ReportProblemIcon style={{ color: "#08105d" }} />
                          }
                          label="Weaknesses 4"
                          sx={{
                            margin: "0.2rem",
                            color: "#08105d",
                            backgroundColor: "#f2f2f2",
                            fontWeight: "600",
                          }}
                        />
                        <Chip
                          icon={<DangerousIcon style={{ color: "#08105d" }} />}
                          label="threats 6"
                          sx={{
                            margin: "0.2rem",
                            color: "#08105d",
                            backgroundColor: "#f2f2f2",
                            fontWeight: "600",
                          }}
                        />
                      </Stack>
                    </Stack>
                  </ListItem>
                );
              })
            : null}
        </List>
      </Box>
    </Stack>
  );
};
export default Hero;

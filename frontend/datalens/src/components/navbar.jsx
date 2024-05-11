import {
  Stack,
  Avatar,
  Box,
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import logoImg from "../images/logo.png";
import accountImg from "../images/account.avif";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useState } from "react";

const Navbar = () => {
    const [menuToggle, setMenuToggle] = useState(false);
  return (
    <Box component="nav">
      <Stack
      sx={{position: "sticky", boxShadow: "rgba(0,0,0,0.2) 0 4px 20px 0"}}
      justifyContent="space-between"
      direction="row"
      alignItems="center"
      p={1}
    >
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        spacing={5}
      >
        <IconButton aria-label="menubar" onClick={()=>setMenuToggle(!menuToggle)}>
          <MenuRoundedIcon sx={{color:"#08105d"}}/>
        </IconButton>
        <Avatar
          alt="logo"
          src={logoImg}
          variant="square"
          sx={{ width: "3rem", height: "3rem" }}
        />
        <Typography
          component="p"
          sx={{ fontWeight: "700", fontSize: "1.5rem", lineHeight: "1.5rem", color:"#08105d"}}
        >
          DashBoard
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton aria-label="language">
          <TranslateIcon sx={{color:"#08105d"}}/>
        </IconButton>
        <IconButton aria-label="mode">
          <LightModeIcon sx={{color:"#08105d"}}/>
        </IconButton>
        <IconButton aria-label="setting">
          <SettingsSuggestIcon sx={{color:"#08105d"}}/>
        </IconButton>
        <IconButton aria-label="notification">
          <Badge
            color="secondary"
            variant="dot"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <NotificationsIcon sx={{color:"#08105d"}}/>
          </Badge>
        </IconButton>
        <IconButton aria-label="account">
          <Badge
            color="secondary"
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              alt="person"
              src={accountImg}
              sx={{ width: "1.6rem", height: "1.6rem", objectFit: "contain" }}
            />
          </Badge>
        </IconButton>
      </Stack>
    </Stack>
    <Drawer open={menuToggle} onClose={()=>setMenuToggle(!menuToggle)}>
    <Box compoenent="div" role="presentation" sx={{ width: "16rem" }}>
        <Stack alignItems="center" direction="row" justifyContent="left">
        <IconButton onClick={()=>setMenuToggle(!menuToggle)}>
          <CancelRoundedIcon sx={{color:"#08105d"}}/>
        </IconButton>
      </Stack>
      <List>
        {[
          { itemName: "DashBoard", icon: <DashboardCustomizeRoundedIcon sx={{color:"#08105d"}}/> },
          { itemName: "MailBox", icon: <EmailRoundedIcon sx={{color:"#08105d"}}/> },
          { itemName: "Settings", icon: <SettingsRoundedIcon sx={{color:"#08105d"}}/> },
          { itemName: "Support", icon: <SupportAgentRoundedIcon sx={{color:"#08105d"}}/> },
          { itemName: "User", icon: <PersonRoundedIcon sx={{color:"#08105d"}}/> },
        ].map((text, index) => {
          return (
            <ListItem key={`key_${index}_${text.itemName}`} disablePadding>
              <ListItemButton>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.itemName} sx={{color:"#08105d"}}/>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
    </Drawer>
    </Box>
  );
};
export default Navbar;

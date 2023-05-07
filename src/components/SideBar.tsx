import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CloseIcon from "@mui/icons-material/Close";

type Anchor = "Menu";

export default function Drawser() {
  const [menuOpen, setMenuOpen] = React.useState({
    Menu: false,
  });
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const toggleMenu =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      setMenuOpen({ ...menuOpen, Menu: open });
    };

  // content that gets rendered when menu opens
  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: 400,
        height: "100vh",
        // border: "1px solid red",
        position: "absolute",
        top: 0,
        right: 0,
        color: "whitesmoke",
        fontSize: "1.2rem",
      }}
      role="presentation"
    >
      <Tabs
        sx={{}}
        value={currentTab}
        onChange={handleTabChange}
        aria-label="icon tabs example"
      >
        <Tab icon={<PlaceOutlinedIcon />} aria-label="Pins" />
        <Tab icon={<FavoriteIcon />} aria-label="Visits" />
        <Tab icon={<PersonPinIcon />} aria-label="Discover" />
        <Tab
          onClick={toggleMenu(anchor, false)}
          icon={<CloseIcon />}
          aria-label="Close"
        />
      </Tabs>
    </Box>
  );

  console.log(menuOpen["Menu"]);
  return (
    <>
      {!menuOpen["Menu"] && (
        <Button
          sx={{
            position: "absolute",
            top: 0,
            right: 30,
            color: "whitesmoke",
            fontSize: "1.2rem",
          }}
          onClick={toggleMenu("Menu", true)}
        >
          Menu
        </Button>
      )}
      {menuOpen["Menu"] && list("Menu")}
    </>
  );
}

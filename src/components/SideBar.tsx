import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CloseIcon from "@mui/icons-material/Close";
import FavoritePin from "./FavoritePin";
import Typography from "@mui/material/Typography";
import { Pin } from "../types/types";

type Anchor = "Menu";

const pinColors = [
  "red",
  "green",
  "yellow",
  "blue",
  "purple",
  "black",
  "orange",
  "orangered",
];

interface DrawerProps {
  setPinColor: (color: string) => void;
  placedPin: Pin[] | [];
  handleDeletePin: any;
}

export default function Drawser({
  setPinColor,
  placedPin,
  handleDeletePin,
}: DrawerProps) {
  const [menuOpen, setMenuOpen] = useState({ Menu: false });
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [selectedPin, setSelectedPin] = useState<number>(0);

  const handleGridItemClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setSelectedPin(index);
  };

  useEffect(() => {
    setPinColor(pinColors[selectedPin]);
  }, [selectedPin]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const toggleMenu =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      setMenuOpen({ ...menuOpen, Menu: open });
    };

  //create pin if currentpintab is not null and left click over a path occurs
  //lift state up and make sure it only creates when clicked on paths

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
        // sx={{ border: "1px solid black" }}
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
      {/* 
        click on pin
        onclick start event to create pin with location of mouse
        dragable, on drag event, move the pin location
        add pins to array
        render all pins of that array at specific locations
      */}
      {currentTab === 0 && (
        <>
          <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
            Available Pins
          </Typography>
          <Grid container columns={8}>
            <Grid
              onClick={(e) => handleGridItemClick(e, 0)}
              item
              xs={2}
              className={selectedPin === 0 ? "selected" : ""}
            >
              <PlaceOutlinedIcon sx={{ color: "red" }} />
            </Grid>
            <Grid
              onClick={(e) => handleGridItemClick(e, 1)}
              item
              xs={2}
              className={selectedPin === 1 ? "selected" : ""}
            >
              <PlaceOutlinedIcon sx={{ color: "green" }} />
            </Grid>
            <Grid
              onClick={(e) => handleGridItemClick(e, 2)}
              item
              xs={2}
              className={selectedPin === 2 ? "selected" : ""}
            >
              <PlaceOutlinedIcon sx={{ color: "yellow" }} />
            </Grid>
            <Grid
              onClick={(e) => handleGridItemClick(e, 3)}
              item
              xs={2}
              className={selectedPin === 3 ? "selected" : ""}
            >
              <PlaceOutlinedIcon sx={{ color: "blue" }} />
            </Grid>
            <Grid
              onClick={(e) => handleGridItemClick(e, 4)}
              item
              xs={2}
              className={selectedPin === 4 ? "selected" : ""}
            >
              <PlaceOutlinedIcon sx={{ color: "purple" }} />
            </Grid>
            <Grid
              onClick={(e) => handleGridItemClick(e, 5)}
              item
              xs={2}
              className={selectedPin === 5 ? "selected" : ""}
            >
              <PlaceOutlinedIcon sx={{ color: "black" }} />
            </Grid>
            <Grid
              onClick={(e) => handleGridItemClick(e, 6)}
              item
              xs={2}
              className={selectedPin === 6 ? "selected" : ""}
            >
              <PlaceOutlinedIcon sx={{ color: "orange" }} />
            </Grid>
            <Grid
              onClick={(e) => handleGridItemClick(e, 7)}
              item
              xs={2}
              className={selectedPin === 7 ? "selected" : ""}
            >
              <PlaceOutlinedIcon sx={{ color: "orangered" }} />
            </Grid>
          </Grid>
        </>
      )}
      {currentTab === 1 && (
        <FavoritePin placedPin={placedPin} deletePin={handleDeletePin} />
      )}
    </Box>
  );

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

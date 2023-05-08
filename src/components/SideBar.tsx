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
import Pin from "./Pin";
import Draggable from "react-draggable";

type Anchor = "Menu";

type Pin = {
  x?: number;
  y?: number;
  color?: string;
  positioning?: string;
};

export default function Drawser() {
  const [menuOpen, setMenuOpen] = useState({ Menu: false });
  const [currentTab, setCurrentTab] = useState(0);
  const [pins, setPins] = useState<Pin[]>([]);
  const [currentPin, setCurrentPin] = useState<Pin | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleGridItemClick = (event: React.MouseEvent, index: number) => {
    setSelected(index);
    let mouseX = event.nativeEvent.clientX - 200;
    let mouseY = event.nativeEvent.clientY + 100;
    let color = "violet";
    let pin: Pin = { x: mouseX, y: mouseY, color: color };
    setCurrentPin(pin);
  };

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
  function handleCreatePin(e: React.MouseEvent | any) {
    e.stopPropagation();

    if (
      e.nativeEvent.target?.attributes?.role?.value === "presentation" &&
      currentPin != null
    ) {
      console.log(
        "mouseup click",
        e.nativeEvent.target?.attributes?.role?.value
      );
      setPins([...pins, currentPin as Pin]);
    }
  }

  const mapPins = pins.map((pin, index) => {
    let thePosition = pin.positioning || "static";
    return (
      <Draggable key={index}>
        <PlaceOutlinedIcon
          sx={{
            position: "absolute",
            top: pin.y,
            left: pin.x,
            color: pin.color,
          }}
        />
      </Draggable>
    );
  });

  // content that gets rendered when menu opens
  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: 400,
        height: "100vh",
        border: "1px solid red",
        position: "absolute",
        top: 0,
        right: 0,
        color: "whitesmoke",
        fontSize: "1.2rem",
      }}
      role="presentation"
      onClick={handleCreatePin}
    >
      <Tabs
        sx={{ border: "1px solid black" }}
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
        <Grid container columns={8}>
          <Grid
            onClick={(e) => handleGridItemClick(e, 0)}
            item
            xs={2}
            className={selected === 0 ? "selected" : ""}
          >
            <PlaceOutlinedIcon sx={{ color: "red" }} />
          </Grid>
          <Grid
            onClick={(e) => handleGridItemClick(e, 1)}
            item
            xs={2}
            className={selected === 1 ? "selected" : ""}
          >
            <PlaceOutlinedIcon sx={{ color: "green" }} />
          </Grid>
          <Grid
            onClick={(e) => handleGridItemClick(e, 2)}
            item
            xs={2}
            className={selected === 2 ? "selected" : ""}
          >
            <PlaceOutlinedIcon sx={{ color: "yellow" }} />
          </Grid>
          <Grid
            onClick={(e) => handleGridItemClick(e, 3)}
            item
            xs={2}
            className={selected === 3 ? "selected" : ""}
          >
            <PlaceOutlinedIcon sx={{ color: "blue" }} />
          </Grid>
          <Grid
            onClick={(e) => handleGridItemClick(e, 4)}
            item
            xs={2}
            className={selected === 4 ? "selected" : ""}
          >
            <PlaceOutlinedIcon sx={{ color: "purple" }} />
          </Grid>
          <Grid
            onClick={(e) => handleGridItemClick(e, 5)}
            item
            xs={2}
            className={selected === 5 ? "selected" : ""}
          >
            <PlaceOutlinedIcon sx={{ color: "black" }} />
          </Grid>
          <Grid
            onClick={(e) => handleGridItemClick(e, 6)}
            item
            xs={2}
            className={selected === 6 ? "selected" : ""}
          >
            <PlaceOutlinedIcon sx={{ color: "orange" }} />
          </Grid>
          <Grid
            onClick={(e) => handleGridItemClick(e, 7)}
            item
            xs={2}
            className={selected === 7 ? "selected" : ""}
          >
            <PlaceOutlinedIcon sx={{ color: "orangered" }} />
          </Grid>
        </Grid>
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

      {mapPins && mapPins}
    </>
  );
}

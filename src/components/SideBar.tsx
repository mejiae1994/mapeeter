import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CloseIcon from "@mui/icons-material/Close";
import LabelIcon from "@mui/icons-material/Label";
import FavoritePin from "./FavoritePin";
import Typography from "@mui/material/Typography";
import { Pin, PinTemplate } from "../types/types";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ColorRadioGroup from "./ColorRadioGroup";
import CreateIcon from "@mui/icons-material/Create";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Divider from "@mui/material/Divider";
import PinTemplateContainer from "./PinTemplateContainer";
import Popup from "./Popup";
import useLocalStorage from "../hooks/useLocalStorageHook";

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
  setCurrentTemplate: (template: PinTemplate | undefined) => void;
  placedPin: Pin[] | [];
  handleDeletePin: any;
  setHighlight: any;
  selectedPinTemplate: any;
}

export default function Drawser({
  setCurrentTemplate,
  placedPin,
  handleDeletePin,
  setHighlight,
  selectedPinTemplate,
}: DrawerProps) {
  const [menuOpen, setMenuOpen] = useState({ Menu: true });
  const [currentTab, setCurrentTab] = useState<number>(0);

  //Create Pin Template
  const [labelName, setLabelName] = useState<string>("");
  const [selectedColor, setSelectedColor] = React.useState("red");
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessaage] = useState("");
  const [popupColor, setPopupColor] = useState("");

  //pin templates
  //load state from localstorage
  const [thePinTemplates, setThePinTemplates, deleteThePinTemplates] =
    useLocalStorage<PinTemplate>("templates");

  function handleCreatePinTemplate(event: React.MouseEvent) {
    event.preventDefault();

    if (!labelName) {
      setPopupMessaage("Empty Label Name");
      setPopupColor("red");
      setPopup(true);
      return;
    }
    let newPinTemplate: PinTemplate = {
      color: selectedColor,
      label: labelName,
    };

    // setPinTemplate([...pinTemplate, newPinTemplate]);
    setThePinTemplates(newPinTemplate);
    setLabelName("");
    setPopupMessaage("Template Created");
    setPopupColor("green");
    setPopup(true);
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (!popup) return;
    const timer = setTimeout(() => {
      setPopup(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [popup]);

  const toggleMenu =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      setMenuOpen({ ...menuOpen, Menu: open });
    };

  //create pin if currentpintab is not null and left click over a path occurs
  //lift state up and make sure it only creates when clicked on paths
  const deleteTemplate = (e: React.MouseEvent, pinToDelete: PinTemplate) => {
    if (
      selectedPinTemplate?.label === pinToDelete.label ||
      thePinTemplates.length === 1
    ) {
      setCurrentTemplate(undefined);
    }
    deleteThePinTemplates(pinToDelete);
  };

  // content that gets rendered when menu opens
  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: 400,
        height: "100vh",
        position: "absolute",
        top: 0,
        right: 0,
        color: "black",
        fontSize: "1.2rem",
        border: "1px solid black",
        backgroundColor: "whitesmoke",
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

      {currentTab === 0 && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
              Create Pin Template
            </Typography>
            <Typography sx={{ mt: 1, mb: 1 }} variant="body1" component="span">
              Select Color:
            </Typography>
            <div
              style={{
                maxWidth: "12rem",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "auto",
              }}
            >
              <ColorRadioGroup
                pinColors={pinColors}
                selectedColor={selectedColor}
                selectColor={(color: string) => setSelectedColor(color)}
              />
            </div>
            <TextField
              label="Label Name"
              value={labelName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLabelName(event.target.value);
              }}
              id="filled-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LabelIcon />
                  </InputAdornment>
                ),
              }}
              variant="filled"
            />
            <Button
              sx={{ color: "black" }}
              variant="outlined"
              startIcon={<CreateIcon />}
              onClick={handleCreatePinTemplate}
            >
              Create Pin
            </Button>
          </div>
          <Divider variant="middle" />
          {/* pin templates */}
          <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
            Your Pin Templates
          </Typography>
          <PinTemplateContainer
            deletePinTemplate={deleteTemplate}
            pinTemplates={thePinTemplates}
            setCurrentPinTemplate={setCurrentTemplate}
            selectedPinTemplate={selectedPinTemplate}
          />
        </>
      )}
      {currentTab === 1 && (
        <FavoritePin
          placedPin={placedPin}
          deletePin={handleDeletePin}
          setHighlight={setHighlight}
        />
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
            color: "black",
            fontSize: "1.2rem",
          }}
          onClick={toggleMenu("Menu", true)}
        >
          Menu
        </Button>
      )}
      {menuOpen["Menu"] && list("Menu")}
      {popup && (
        <Popup message={popupMessage}>
          <CheckCircleIcon sx={{ color: popupColor }} />
        </Popup>
      )}
    </>
  );
}

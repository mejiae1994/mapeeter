import React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { PinTemplate } from "../types/types";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";

//change any to function for deletePin
type PinTemplateProps = {
  pinTemplates: PinTemplate[] | [];
  deletePinTemplate?: any;
  setCurrentPinTemplate: any;
  selectedPinTemplate: any;
};

export default function PinTemplateContainer({
  pinTemplates,
  deletePinTemplate,
  setCurrentPinTemplate,
  selectedPinTemplate,
}: PinTemplateProps) {
  const mapPins = pinTemplates?.map((pin, index) => {
    return (
      <div key={index}>
        <ListItemButton
          onClick={() => {
            setCurrentPinTemplate(pin);
          }}
          selected={selectedPinTemplate?.label === pin.label}
        >
          <ListItemIcon>{createPin(pin)}</ListItemIcon>
          <ListItemText sx={{ color: "black" }} primary={pin.label} />
          <ListItemIcon
            aria-label="delete"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              deletePinTemplate(e, pin);
            }}
          >
            <DeleteIcon />
          </ListItemIcon>
        </ListItemButton>
        <Divider variant="middle" />
      </div>
    );
  });

  //add return type later
  function createPin(pin: PinTemplate): JSX.Element {
    return (
      <PlaceOutlinedIcon
        sx={{
          color: pin.color,
        }}
      />
    );
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <List dense={true} component="nav" aria-label="pin template list">
          {mapPins.length > 0 ? mapPins : <h5>No Placed Pins</h5>}
        </List>
      </Grid>
    </>
  );
}

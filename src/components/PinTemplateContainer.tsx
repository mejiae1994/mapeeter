import React from "react";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { PinTemplate } from "../types/types";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

//change any to function for deletePin
interface PinTemplateProps {
  pinTemplates: PinTemplate[] | [];
  deletePin?: any;
  setCurrentPinTemplate: any;
}

export default function PinTemplateContainer({
  pinTemplates,
  deletePin,
  setCurrentPinTemplate,
}: PinTemplateProps) {
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

  const mapPins = pinTemplates?.map((pin, index) => {
    return (
      <div key={index}>
        <ListItem
          onClick={() => {
            setSelectedRow(index);
            setCurrentPinTemplate(pin);
          }}
          sx={{
            backgroundColor: selectedRow === index ? "#ffdf" : "",
            cursor: "pointer",
          }}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e: React.MouseEvent) => {
                deletePin(e, pin);
              }}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemIcon>{createPin(pin)}</ListItemIcon>
          <ListItemText sx={{ color: "black" }} primary={pin.label} />
        </ListItem>
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

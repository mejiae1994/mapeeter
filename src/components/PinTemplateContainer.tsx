import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { PinTemplate } from "../types/types";
import ListItemIcon from "@mui/material/ListItemIcon";

//change any to function for deletePin
interface PinTemplateProps {
  pinTemplates: PinTemplate[] | [];
  deletePin?: any;
}

export default function PinTemplateContainer({
  pinTemplates,
  deletePin,
}: PinTemplateProps) {
  const mapPins = pinTemplates?.map((pin, index) => {
    return (
      <ListItem
        key={index}
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

  console.log(pinTemplates);
  return (
    <>
      <Grid item xs={12} md={6}>
        <List dense={true}>
          {mapPins.length > 0 ? mapPins : <h5>No Placed Pins</h5>}
        </List>
      </Grid>
    </>
  );
}

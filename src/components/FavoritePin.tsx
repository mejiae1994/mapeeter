import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { Pin } from "../types/types";

//change any to function for deletePin
type FavoritePinProps = {
  placedPins: Pin[] | [];
  deletePin: (e: React.MouseEvent, pin: Pin) => void;
  setHighlight: (highlightedPin: string) => void;
};

export default function FavoritePin({
  placedPins,
  deletePin,
  setHighlight,
}: FavoritePinProps) {
  const mapPins = placedPins?.map((pin, index) => {
    return (
      <ListItem
        onMouseOver={() => setHighlight(pin.pinId)}
        onMouseLeave={() => setHighlight("")}
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
        <ListItemAvatar>
          <Avatar>{createPin(pin)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ color: "black" }}
          primary={pin.countryName}
          secondary={`Coordinates: x: ${pin.x} y: ${pin.y}`}
        />
      </ListItem>
    );
  });

  //add return type later
  function createPin(pin: Pin) {
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
      <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
        Your Placed Pins
      </Typography>
      <Grid item xs={12} md={6} sx={{ height: "100%" }}>
        <List
          sx={{
            overflowY: "auto",
            height: "90%",
          }}
          dense={true}
        >
          {mapPins.length > 0 ? mapPins : <h5>No Placed Pins</h5>}
        </List>
      </Grid>
    </>
  );
}

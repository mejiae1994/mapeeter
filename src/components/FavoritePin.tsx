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

export default function FavoritePin({
  placedPin,
}: {
  placedPin: Pin[] | undefined;
}) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const mapPins = placedPin?.map((pin, index) => {
    return (
      <ListItem
        key={index}
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>{createPin(pin)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="country placeholder"
          secondary={secondary ? "Secondary text" : null}
        />
      </ListItem>
    );
  });

  //add return type later
  function createPin(pin: Pin) {
    console.log(pin);
    return (
      <PlaceOutlinedIcon
        sx={{
          color: pin.color,
        }}
      />
    );
  }

  console.log(placedPin);
  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 0.5 }} variant="h6" component="div">
        Your Pins
      </Typography>
      <List dense={dense}>{mapPins ? mapPins : <h5>No Placed Pins</h5>}</List>
    </Grid>
  );
}

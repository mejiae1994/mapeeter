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

interface FavoritePinProps {
  placedPin: Pin[] | [];
  deletePin: any;
}

export default function FavoritePin({
  placedPin,
  deletePin,
}: FavoritePinProps) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const mapPins = placedPin?.map((pin, index) => {
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
        <ListItemAvatar>
          <Avatar>{createPin(pin)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={pin.countryName}
          secondary={secondary ? "Secondary text" : null}
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
        Your Pins
      </Typography>
      <Grid item xs={12} md={6}>
        <List dense={dense}>
          {mapPins.length > 0 ? mapPins : <h5>No Placed Pins</h5>}
        </List>
      </Grid>
    </>
  );
}

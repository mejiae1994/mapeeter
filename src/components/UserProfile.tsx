import { useState } from "react";
import Button from "@mui/material/Button";
import profileImg from "../assets/profile.png";
import FormHelperText from "@mui/material/FormHelperText";
import HandshakeIcon from "@mui/icons-material/Handshake";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  ImageList,
  ImageListItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";

const dummyData = {
  profilePic: "https://example.com/profile-pic.jpg",
  username: "@JohnDoe",
  following: 102,
  followers: 548,
  trips: 10,
  comments: 10,
  countryBadges: [
    {
      country: "United States",
      badge: "https://example.com/usa-badge.jpg",
    },
    {
      country: "France",
      badge: "https://example.com/france-badge.jpg",
    },
    {
      country: "Japan",
      badge: "https://example.com/japan-badge.jpg",
    },
  ],
};

export default function PinUserModal() {
  const [state, setState] = useState({
    pins: false,
    username: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        backgroundColor: "#fff",
        borderRadius: "1rem",
        padding: "1rem",
        overflow: "auto",
        height: "90%",
      }}
    >
      <div
        className="user-main"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          style={{
            width: "10rem",
            height: "10rem",
            borderRadius: "5rem",
            objectFit: "contain",
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.1)",
          }}
          src={profileImg}
          alt="profile image"
        />
      </div>
      <div
        className="follow"
        style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
      >
        <Typography variant="h6">{dummyData.username}</Typography>
      </div>
      <div
        className="stats"
        style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
      >
        <div className="follower-count" style={{ textAlign: "center" }}>
          <Typography variant="subtitle1">Followers</Typography>
          <span style={{ color: "#1976d2" }}>{dummyData.followers}</span>
        </div>
        <div className="follower-count" style={{ textAlign: "center" }}>
          <Typography variant="subtitle1">Following</Typography>
          <span style={{ color: "#1976d2" }}>{dummyData.following}</span>
        </div>
      </div>
      <Divider />
      <div
        className="Preferences"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Preferences</Typography>
        <div
          className="badges-list"
          style={{
            display: "flex",
            gap: ".5rem",
            justifyContent: "center",
          }}
        >
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.pins}
                    onChange={handleChange}
                    name="pins"
                  />
                }
                label="Hide Your Pins"
              />
              <TextField
                onChange={handleChange}
                helperText="Change your username"
                id="username"
                label="username"
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>
      <Divider />
      <div
        className="Trips"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Trips</Typography>

        <ImageList cols={2} rowHeight={164} sx={{ overflow: "hidden" }}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

import { useState } from "react";
import Button from "@mui/material/Button";
import profileImg from "../assets/profile.png";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Modal, Typography } from "@mui/material";
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

type UserProps = {
  childOpen: true | false;
  setChildOpen: any;
};

export default function PinUserModal({ childOpen, setChildOpen }: UserProps) {
  return (
    <>
      <Modal open={childOpen} onClose={setChildOpen}>
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            width: "22rem",
            backgroundColor: "#fff",
            borderRadius: "1rem",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "1rem",
          }}
        >
          <div
            className="user-main"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              style={{
                width: "15rem",
                height: "15rem",
                borderRadius: "10rem",
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
            <Button
              variant="outlined"
              startIcon={<HandshakeIcon />}
              onClick={() => console.log("following", dummyData.username)}
            >
              Follow
            </Button>
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
            <div className="trips-count" style={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Trips</Typography>
              <span style={{ color: "#1976d2" }}>{dummyData.trips}</span>
            </div>
            <div className="comments-count" style={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Comments</Typography>
              <span style={{ color: "#1976d2" }}>{dummyData.comments}</span>
            </div>
          </div>

          <div
            className="badges"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Typography variant="subtitle1">
              Country Badges Collected
            </Typography>
            <div
              className="badges-list"
              style={{
                display: "flex",
                gap: ".5rem",
                justifyContent: "flex-start",
                overflowX: "scroll",
              }}
            >
              <LocalPoliceOutlinedIcon
                fontSize="large"
                sx={{ color: "blue" }}
              />
              <LocalPoliceOutlinedIcon
                fontSize="large"
                sx={{ color: "cyan" }}
              />
              <LocalPoliceOutlinedIcon fontSize="large" sx={{ color: "red" }} />
              <LocalPoliceOutlinedIcon fontSize="large" sx={{ color: "red" }} />
              <LocalPoliceOutlinedIcon fontSize="large" sx={{ color: "red" }} />
              <LocalPoliceOutlinedIcon fontSize="large" sx={{ color: "red" }} />
              <LocalPoliceOutlinedIcon fontSize="large" sx={{ color: "red" }} />
              <LocalPoliceOutlinedIcon fontSize="large" sx={{ color: "red" }} />
              <LocalPoliceOutlinedIcon fontSize="large" sx={{ color: "red" }} />
              <LocalPoliceOutlinedIcon fontSize="large" sx={{ color: "red" }} />
              <LocalPoliceOutlinedIcon fontSize="large" sx={{ color: "red" }} />
              <LocalPoliceOutlinedIcon
                fontSize="large"
                sx={{ color: "purple" }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

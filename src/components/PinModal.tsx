import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Modal from "@mui/material/Modal";
import { Pin } from "../types/types";
import Comment from "./Comment";
import { useState } from "react";
import PinUserModal from "./PinUserModal";

interface PinModalProps {
  open: true | false;
  handleCloseModal: () => void;
  pin: Pin | undefined;
}

export default function PinModal({
  open,
  handleCloseModal,
  pin,
}: PinModalProps) {
  const [childOpen, setChildOpen] = useState(false);

  const style: any = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={style}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar
                onClick={() => setChildOpen(!childOpen)}
                sx={{ bgcolor: red[500], cursor: "pointer" }}
                aria-label="recipe"
              >
                KO
              </Avatar>
            }
            title={pin?.countryName}
            subheader={pin?.timestamp}
          />
          <CardMedia
            component="img"
            height="194"
            image="https://images.pexels.com/photos/8264573/pexels-photo-8264573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Bogota, Colombia"
          />
          {/* comment goes here */}
          <CardContent
            sx={{
              "&:last-child": {
                padding: ".5rem",
              },
              "&&": {
                padding: ".5rem", // Additional selector with double ampersand
              },
            }}
          >
            <Comment
              comment={
                pin?.comment
                  ? pin.comment
                  : "No comment, add a comment by clicking the vertical icon. No comment, add a comment by clicking the vertical icon. No comment, add a comment by clicking the vertical icon"
              }
            />
          </CardContent>
        </Card>
        <PinUserModal
          childOpen={childOpen}
          setChildOpen={() => setChildOpen(false)}
        />
      </div>
    </Modal>
  );
}

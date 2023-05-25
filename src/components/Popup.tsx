import { Box } from "@mui/material";

type PopupProps = {
  message: string;
  children: JSX.Element;
};

const style = {
  display: "flex",
  justifyContent: "space-between",
  gap: ".5rem",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: "50%",
  width: "auto",
  paddingInline: ".8rem",
  height: 30,
  borderRadius: ".4rem",
  backgroundColor: "whitesmoke",
};

export default function Popup({ message, children }: PopupProps) {
  return (
    <Box sx={style}>
      {children}
      <span>{message}</span>
    </Box>
  );
}

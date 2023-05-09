import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Draggable, { DraggableCore } from "react-draggable";
import { Pin } from "../types/types";

export default function Pin({ x, y, color, positioning }: Pin) {
  let thePosition = positioning ? positioning : "static";
  return (
    <Draggable>
      <PlaceOutlinedIcon
        sx={{
          position: { thePosition },
          top: y,
          right: x,
          color: color,
        }}
      />
    </Draggable>
  );
}

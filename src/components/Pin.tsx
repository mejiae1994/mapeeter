import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Draggable, { DraggableCore } from "react-draggable";

type Pin = {
  x?: number;
  y?: number;
  color: string;
  positioning?: string;
};

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

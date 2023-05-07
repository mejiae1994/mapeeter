import * as React from "react";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

type Pin = {
  x: number;
  y: number;
  color: string;
};

export default function Pin({ x, y, color }: Pin) {
  return (
    <svg
      style={{ position: "absolute", top: y, right: x, backgroundColor: color }}
      data-testid="PlaceOutlinedIcon"
    ></svg>
  );
}

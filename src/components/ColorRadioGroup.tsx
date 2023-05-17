import * as React from "react";
import Box from "@mui/material/Box";

export default function ColorRadioGroup() {
  const [selectedColor, setSelectedValue] = React.useState("red");

  const pinColors = [
    "red",
    "green",
    "yellow",
    "blue",
    "purple",
    "black",
    "orange",
    "orangered",
  ];

  console.log(selectedColor);
  return (
    <>
      {pinColors.map((color) => {
        return (
          <Box
            aria-label={color}
            onClick={() => {
              setSelectedValue(color);
            }}
            key={color}
            sx={{
              display: "inline-flex",
              width: "3rem",
              height: "3rem",
              boxSizing: "border-box",
              backgroundColor: color,
              border: selectedColor === color ? "1px solid white" : "",
              opacity: selectedColor === color ? [0.9] : "",
              cursor: "pointer",
            }}
          />
        );
      })}
    </>
  );
}

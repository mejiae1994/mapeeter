import Box from "@mui/material/Box";

interface ColorRadioGroupProps {
  pinColors: string[];
  selectedColor: string;
  selectColor: (color: string) => void;
}

export default function ColorRadioGroup({
  pinColors,
  selectedColor,
  selectColor,
}: ColorRadioGroupProps) {
  return (
    <>
      {pinColors.map((color) => {
        return (
          <Box
            aria-label={color}
            onClick={() => selectColor(color)}
            key={color}
            sx={{
              display: "inline-flex",
              width: "3rem",
              height: "3rem",
              boxSizing: "border-box",
              backgroundColor: color,
              border: selectedColor === color ? "2px solid white" : "",
              opacity: selectedColor === color ? [0.9] : "",
              cursor: "pointer",
            }}
          />
        );
      })}
    </>
  );
}

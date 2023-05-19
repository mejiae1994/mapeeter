import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";

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
              position: "relative",
              width: "3rem",
              height: "3rem",
              boxSizing: "border-box",
              backgroundColor: color,
              border: selectedColor === color ? "2px solid white" : "",
              opacity: selectedColor === color ? [0.9] : "",
              cursor: "pointer",
            }}
          >
            {selectedColor === color && (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CheckIcon
                  sx={{
                    color: "white",
                  }}
                />
              </div>
            )}
          </Box>
        );
      })}
    </>
  );
}

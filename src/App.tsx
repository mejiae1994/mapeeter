import React, { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Drawer from "./components/SideBar";
import useLocalStorage from "./hooks/useLocalStorageHook";
import { Pin } from "./types/types";

function App() {
  const [currentPinColor, setCurrentPinColor] = useState<string>("");
  const [pins, setPins, deletePins] = useLocalStorage("pins");
  const [highlightedPin, setHighlightedPin] = useState("");

  const handleDeletePin = (e: React.MouseEvent, pinToDelete: Pin) => {
    deletePins(pinToDelete);
  };

  return (
    <div>
      <Map
        highlight={highlightedPin}
        pinColor={currentPinColor}
        setMapPin={(pin: Pin) => setPins(pin)}
        placedPin={pins}
      />
      <Drawer
        setHighlight={setHighlightedPin}
        setPinColor={(color: string) => {
          setCurrentPinColor(color);
        }}
        placedPin={pins}
        handleDeletePin={handleDeletePin}
      />
    </div>
  );
}

export default App;

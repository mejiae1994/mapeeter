import React, { useState } from "react";
import "./App.css";
import SvgMap from "./components/SvgMap";
import Drawer from "./components/SideBar";
import useLocalStorage from "./hooks/useLocalStorageHook";
import { Pin, PinTemplate } from "./types/types";

function App() {
  const [currentPinTemplate, setCurrentPinTemplate] = useState<
    PinTemplate | undefined
  >(undefined);
  const [pins, setPins, deletePins] = useLocalStorage("pins");
  const [highlightedPin, setHighlightedPin] = useState("");

  const handleDeletePin = (e: React.MouseEvent, pinToDelete: Pin) => {
    deletePins(pinToDelete);
  };

  console.log(
    `${currentPinTemplate ? currentPinTemplate : "there are not templates"}`
  );
  return (
    <div className="App">
      <SvgMap
        highlight={highlightedPin}
        pinTemplate={currentPinTemplate}
        setMapPin={(pin: Pin) => setPins(pin)}
        placedPin={pins}
      />
      <Drawer
        setHighlight={setHighlightedPin}
        setTemplate={(template: PinTemplate) => {
          setCurrentPinTemplate(template);
        }}
        placedPin={pins}
        handleDeletePin={handleDeletePin}
      />
    </div>
  );
}

export default App;

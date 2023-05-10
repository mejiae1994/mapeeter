import React, { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Drawer from "./components/SideBar";
import useLocalStorage from "./hooks/useLocalStorageHook";
import { Pin } from "./types/types";

function App() {
  //App will probably handle the creation of pins by lifting state up, maintain a list of pins with positions to be passed into the Map component
  //push pin into array only after being dropped into place?

  const [currentPinColor, setCurrentPinColor] = useState<string>("");
  const [pins, setPins, deletePins] = useLocalStorage("pins");

  const handleDeletePin = (e: React.MouseEvent, pinToDelete: Pin) => {
    deletePins(pinToDelete);
  };

  return (
    <div>
      <Map
        pinColor={currentPinColor}
        setMapPin={(pin: Pin) => setPins(pin)}
        placedPin={pins}
      />
      <Drawer
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

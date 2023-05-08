import React, { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Drawer from "./components/SideBar";

type Pin = {
  x?: number;
  y?: number;
  color: string;
  positioning?: string;
};

function App() {
  //App will probably handle the creation of pins by lifting state up, maintain a list of pins with positions to be passed into the Map component
  //push pin into array only after being dropped into place?
  const [currentPin, setCurrentPin] = useState<Pin | null>(null);

  function handleCurrentPin(event: React.MouseEvent): void {
    console.log(event);
  }

  return (
    <div>
      <Map />
      <Drawer />
    </div>
  );
}

export default App;

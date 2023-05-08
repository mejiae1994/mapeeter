import { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Drawer from "./components/SideBar";

function App() {
  //App will probably handle the creation of pins by lifting state up, maintain a list of pins with positions to be passed into the Map component
  //push pin into array only after being dropped into place?

  const [currentPinColor, setCurrentPinColor] = useState<string>("");

  return (
    <div>
      <Map pinColor={currentPinColor} />
      <Drawer
        setPinColor={(color: string) => {
          setCurrentPinColor(color);
        }}
      />
    </div>
  );
}

export default App;

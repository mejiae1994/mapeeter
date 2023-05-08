import React, { useEffect, useRef, useState } from "react";
import paths from "../assets/path.json";
import Pin from "./Pin";
import Draggable from "react-draggable";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import useLocalStorage from "../hooks/useLocalStorageHook";

type Position = {
  x: number;
  y: number;
};

type Pin = {
  x?: number;
  y?: number;
  color: string;
  positioning?: string;
};

interface MapProps {
  pinColor: string;
}

export default function Map({ pinColor }: MapProps) {
  const [hover, setHover] = useState<Position>({ x: 0, y: 0 });
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [currentPin, setCurrentPin] = useState<Pin | null>(null);
  const [pins, setPins] = useLocalStorage("pins");

  //handling on country hover display name of country
  function handleCountryName(
    e: React.MouseEvent<SVGElement>,
    pathName: string | null,
    pathClass: string | null
  ): void {
    e.stopPropagation();
    let clientX = e.clientX + 20;
    let clientY = e.clientY + 20;
    setHover({ ...hover, x: clientX, y: clientY });
    let countryName: string | null = pathName || pathClass;
    setCurrentCountry(countryName as string);
    // console.log(pathName || pathClass);
  }

  function handleCreatePin(e: React.MouseEvent): void {
    e.stopPropagation();
    if (!pinColor) {
      return;
    }

    let pin: Pin = {
      x: e.clientX - 10,
      y: e.clientY - 10,
      color: pinColor,
      positioning: "absolute",
    };

    setPins("pins", pin);
  }

  // reading json data for paths to be rendered inside svg
  const pathElements = paths.map((path, index) => (
    <path
      onMouseMove={(e) => handleCountryName(e, path.name, path.class)}
      onMouseLeave={() => {
        setCurrentCountry("");
      }}
      onClick={handleCreatePin}
      d={path.d}
      key={index}
      id={path.id ? path.id : undefined}
      className={path.class ? path.class : undefined}
      name={path.name ? path.name : undefined}
    />
  ));

  //rendering the map pins
  const mapPins = pins?.map((pin, index) => {
    let thePosition = pin.positioning || "static";
    return (
      <Draggable key={index}>
        <PlaceOutlinedIcon
          sx={{
            position: "absolute",
            top: pin.y,
            left: pin.x,
            color: pin.color,
          }}
        />
      </Draggable>
    );
  });

  console.log(pinColor);
  return (
    <>
      <svg
        baseProfile="tiny"
        fill="#ececec"
        height="100%"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".2"
        version="1.2"
        viewBox="0 -50 2000 1400"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {...pathElements}
      </svg>
      {mapPins && mapPins}
      {currentCountry && (
        <h2
          style={{
            color: "black",
            opacity: 0.8,
            position: "absolute",
            top: hover.y || 20,
            left: hover.x || 20,
          }}
        >
          {currentCountry}
        </h2>
      )}
    </>
  );
}

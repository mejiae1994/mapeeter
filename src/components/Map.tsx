import React, { useEffect, useRef, useState } from "react";
import paths from "../assets/path.json";
import Draggable from "react-draggable";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { Pin } from "../types/types";

type Position = {
  x: number;
  y: number;
};

interface MapProps {
  pinColor: string;
  setMapPin: (pin: Pin) => void;
  placedPin: Pin[] | undefined;
  highlight: string;
}

export default function Map({
  pinColor,
  setMapPin,
  placedPin,
  highlight,
}: MapProps) {
  const [hover, setHover] = useState<Position>({ x: 0, y: 0 });
  const [currentCountry, setCurrentCountry] = useState<string>("");
  // const [currentPin, setCurrentPin] = useState<Pin | null>(null);

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
  }

  function handleCreatePin(
    e: React.MouseEvent,
    pathName: string | null,
    pathClass: string | null
  ): void {
    e.stopPropagation();
    if (!pinColor) {
      return;
    }

    let country: string = (pathName || pathClass) as string;
    let xCord = e.clientX - 10;
    let yCord = e.clientY - 10;
    let pinName = `${xCord}${yCord}`;

    let pin: Pin = {
      x: xCord,
      y: yCord,
      pinId: pinName,
      color: pinColor,
      countryName: country,
      positioning: "absolute",
    };

    setMapPin(pin);
  }

  // reading json data for paths to be rendered inside svg
  const pathElements = paths.map((path, index) => (
    <path
      onMouseMove={(e) => handleCountryName(e, path.name, path.class)}
      onMouseLeave={() => {
        setCurrentCountry("");
      }}
      onClick={(e) => handleCreatePin(e, path.name, path.class)}
      d={path.d}
      key={index}
      id={path.id ? path.id : undefined}
      className={path.class ? path.class : undefined}
      name={path.name ? path.name : undefined}
    />
  ));

  //rendering the map pins
  const mapPins = placedPin?.map((pin, index) => {
    let thePosition = pin.positioning || "static";
    return (
      <Draggable key={index} onStart={() => false}>
        <PlaceOutlinedIcon
          sx={{
            position: "absolute",
            top: pin.y,
            left: pin.x,
            color: pin.color,
            backgroundColor: highlight === pin.pinId ? "grey" : "transparent",
            opacity: highlight === pin.pinId ? 0.4 : 1,
            borderRadius: highlight === pin.pinId ? "1rem" : "",
          }}
        />
      </Draggable>
    );
  });

  return (
    <>
      <svg
        baseProfile="tiny"
        fill="#ececec"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".2"
        version="1.2"
        viewBox="0 -50 2000 1400"
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

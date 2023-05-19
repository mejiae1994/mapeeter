import React, { useEffect, useRef, useState } from "react";
import paths from "../assets/path.json";
import { Button } from "@mui/material";
import { Pin, PinTemplate } from "../types/types";
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_AUTO } from "react-svg-pan-zoom";
import PinModal from "./PinModal";

type Position = {
  x: number;
  y: number;
};

interface MapProps {
  pinTemplate: PinTemplate | undefined;
  setMapPin: (pin: Pin) => void;
  placedPin: Pin[] | undefined;
  highlight: string;
}

//@ts-ignore
function precisionRound(number, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export default function SvgMap({
  pinTemplate,
  setMapPin,
  placedPin,
  highlight,
}: MapProps) {
  const [hover, setHover] = useState<Position>({ x: 0, y: 0 });
  const [currentCountry, setCurrentCountry] = useState<string>("");

  //react-svg-pan-zoom
  const Viewer = useRef(null);
  const [transform, setTransform] = useState(null);
  const [tool, setTool] = useState(TOOL_AUTO);
  const [value, setValue] = useState(INITIAL_VALUE);
  const [scaleFactorMin, setScaleFactorMin] = useState(1);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const [translatedMouse, setTranslatedMouse] = useState({ x: 0, y: 0 });
  const scaleFactorMax = 6;

  //pin modal
  const [open, setOpen] = React.useState(false);
  const [clickedPin, setClickedPin] = useState<Pin | undefined>();
  const handleOpenModal = (e: React.MouseEvent, pin: Pin) => {
    e.preventDefault();
    setClickedPin(pin);
    setOpen(true);
  };
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    //@ts-ignore
    Viewer?.current?.fitToViewer();
  }, []);

  //set max zoom in/out
  const lockToBoundaries = (v: any) => {
    setTransform(v);
    const zoomFactor = v.a || v.d;
    const scaledMaxHeight = v.SVGHeight * zoomFactor - v.viewerHeight;
    const scaledMaxWidth = v.SVGWidth * zoomFactor - v.viewerWidth;

    const heightRatio = precisionRound(v.viewerHeight / v.SVGHeight, 2);
    const widthRatio = precisionRound(v.viewerWidth / v.SVGWidth, 2);
    setScaleFactorMin(Math.max(heightRatio, widthRatio));
    setValue({
      ...v,
      // eslint-disable-next-line no-nested-ternary
      e: v.e > 0 ? 0 : v.e < 0 - scaledMaxWidth ? 0 - scaledMaxWidth : v.e,
      // limit up/down panning to within the SVG
      // eslint-disable-next-line no-nested-ternary
      f: v.f > 0 ? 0 : v.f < 0 - scaledMaxHeight ? 0 - scaledMaxHeight : v.f,
    });
  };
  //handling on country hover display name of country
  function handleCountryName(
    e: React.MouseEvent<SVGElement>,
    pathName: string | null,
    pathClass: string | null
  ): void {
    e.stopPropagation();
    setMouseCoord({ ...mouseCoord, x: e.clientX, y: e.clientY });
    let translated = getTransformedPoint(e.clientX, e.clientY);
    setTranslatedMouse({
      ...translatedMouse,
      x: translated.x,
      y: translated.y,
    });
    let clientX = e.clientX + 20;
    let clientY = e.clientY + 20;
    setHover({ ...hover, x: clientX, y: clientY });
    let countryName: string | null = pathName || pathClass;
    setCurrentCountry(countryName as string);
    // console.log(pathName || pathClass);
  }

  function getTransformedPoint(x: number, y: number) {
    const originalPoint = new DOMPoint(x, y);
    const transformNode = new DOMMatrix([
      transform?.a,
      transform?.b,
      transform?.c,
      transform?.d,
      transform?.e,
      transform?.f,
    ]);
    return transformNode.invertSelf().transformPoint(originalPoint);
  }

  function getCurrentDate(): string {
    const newDate = new Date();
    const dateString = newDate.toLocaleString();
    return dateString;
  }

  function handleCreatePin(
    e: React.MouseEvent,
    pathName: string | null,
    pathClass: string | null
  ): void {
    // if (panning) return;
    e.stopPropagation();
    if (!pinTemplate) {
      return;
    }

    let coord = getTransformedPoint(e.clientX, e.clientY);

    let country: string = (pathName || pathClass) as string;
    let pinName = `${coord.x}${coord.y}`;

    let a = (transform ? 1 / transform.a : 1) * 10;
    let pin: Pin = {
      x: coord.x - 12,
      y: coord.y - 12,
      pinId: pinName,
      color: pinTemplate.color,
      countryName: country,
      positioning: "absolute",
      timestamp: getCurrentDate(),
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

  function normalizeValue(value, min, max, rangeMin, rangeMax) {
    const normalizedValue = (value - min) / (max - min);
    const scaledValue = (rangeMax - rangeMin) * normalizedValue + rangeMin;
    return scaledValue;
  }

  const baseValue = 2;
  const minValue = transform?.a || 1;
  // const minValue = 1;
  const maxValue = 5.8;
  const rangeMin = 12;
  const rangeMax = 11;

  const scaledValue = normalizeValue(
    baseValue,
    minValue,
    maxValue,
    rangeMin,
    rangeMax
  );

  //rendering the map pins
  const mapPins = placedPin?.map((pin, index) => {
    return (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        viewBox="0 0 24 24"
        height="24"
        transform={`translate(${pin.x}, ${pin.y})`}
        onClick={(e) => handleOpenModal(e, pin)}
      >
        <foreignObject width="100%" height="100%">
          <div
            style={{
              cursor: "pointer",
              width: "100%",
              height: "100%",
              opacity: highlight === pin.pinId ? 0.6 : 1,
              borderRadius: highlight === pin.pinId ? "1rem" : "",
              backgroundColor: highlight === pin.pinId ? "grey" : "transparent",
            }}
          >
            <svg width="100%" height="100%">
              <path
                fill={pin.color}
                d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"
              />
            </svg>
          </div>
        </foreignObject>
      </svg>
    );
  });

  return (
    <>
      <ReactSVGPanZoom
        customMiniature={() => <></>}
        detectAutoPan={false}
        SVGBackground="rgb(78, 164, 222)"
        style={{
          fill: "white",
          stroke: "black",
          strokeWidth: ".4",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
        ref={Viewer}
        width={2048}
        height={1400}
        scaleFactorOnWheel={1.05}
        tool={tool}
        onChangeTool={setTool}
        scaleFactorMin={scaleFactorMin - 0.001}
        scaleFactorMax={scaleFactorMax}
        value={value}
        onChangeValue={setValue}
        customToolbar={() => <></>}
        onZoom={(e) => {
          lockToBoundaries(e);
        }}
        onPan={(e) => {
          lockToBoundaries(e);
        }}
      >
        <svg
          baseProfile="tiny"
          version="1.2"
          xmlns="http://www.w3.org/2000/svg"
          width={2048}
          height={1400}
        >
          {...pathElements}
          {mapPins && mapPins}
        </svg>
      </ReactSVGPanZoom>
      {/* <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          fontSize: "2rem",
          color: "black",
          maxWidth: "50vw",
        }}
      >
        {`X: ${mouseCoord.x} Y: ${mouseCoord.y} tX: ${translatedMouse.x} tY: ${translatedMouse.y} VScale: ${transform?.a} HScale: ${transform?.d} `}
      </div> */}
      <PinModal
        open={open}
        handleCloseModal={handleCloseModal}
        pin={clickedPin}
      />
      <Button
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
          color: "black",
        }}
        variant="outlined"
        onClick={() => {
          //@ts-ignore
          Viewer.current.reset();
        }}
      >
        Reset View
      </Button>
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

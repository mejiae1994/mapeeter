import React, { useEffect, useRef, useState } from "react";
import paths from "../assets/path.json";
import Draggable from "react-draggable";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { Pin } from "../types/types";
import {
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  TOOL_PAN,
  TOOL_AUTO,
  fitSelection,
  zoomOnViewerCenter,
  fitToViewer,
} from "react-svg-pan-zoom";

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

export default function SvgMap({
  pinColor,
  setMapPin,
  placedPin,
  highlight,
}: MapProps) {
  const [hover, setHover] = useState<Position>({ x: 0, y: 0 });
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [panning, setPanning] = useState(false);
  //react-svg-pan-zoom
  const start = [0, 0];
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_AUTO);
  const [value, setValue] = useState(INITIAL_VALUE);
  const [scaleFactorMin, setScaleFactorMin] = useState(1);
  const scaleFactorMax = 1.25;

  useEffect(() => {
    // Viewer.current.pan(...start);
    Viewer.current.fitToViewer();
  }, []);

  /* Read all the available methods in the documentation */
  // const _zoomOnViewerCenter1 = () => Viewer.current.zoomOnViewerCenter(1.1);
  // const _fitSelection1 = () => Viewer.current.fitSelection(40, 40, 200, 200);
  // const _fitToViewer1 = () => Viewer.current.fitToViewer();

  //@ts-ignore
  function precisionRound(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  const lockToBoundaries = (v) => {
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
    let clientX = e.clientX + 20;
    let clientY = e.clientY + 20;
    setHover({ ...hover, x: clientX, y: clientY });
    let countryName: string | null = pathName || pathClass;
    setCurrentCountry(countryName as string);
    // console.log(pathName || pathClass);
  }

  function handleCreatePin(
    e: React.MouseEvent,
    pathName: string | null,
    pathClass: string | null
  ): void {
    // if (panning) return;
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
      name: pinName,
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
      <Draggable key={index}>
        <PlaceOutlinedIcon
          sx={{
            position: "absolute",
            top: pin.y,
            left: pin.x,
            color: pin.color,
            backgroundColor: highlight === pin.name ? "grey" : "transparent",
            opacity: highlight === pin.name ? 0.4 : 1,
            borderRadius: highlight === pin.name ? "1rem" : "",
          }}
        />
      </Draggable>
    );
  });

  return (
    <>
      <ReactSVGPanZoom
        SVGBackground="rgb(78, 164, 222)"
        // SVGBackground="blue"
        style={{
          fill: "white",
          stroke: "black",
          strokeWidth: ".4",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
        detectAutoPan={false}
        ref={Viewer}
        width={2048}
        height={1400}
        tool={tool}
        onChangeTool={setTool}
        scaleFactorMin={scaleFactorMin}
        value={value}
        onChangeValue={setValue}
        customToolbar={() => <></>}
        onZoom={(e) => {
          lockToBoundaries(e);
        }}
        onPan={(e) => {
          setPanning(true);
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
        </svg>
      </ReactSVGPanZoom>
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

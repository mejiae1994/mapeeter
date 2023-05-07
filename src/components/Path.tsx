import React, { useEffect, useRef, useState } from "react";
import paths from "../assets/path.json";

type Position = {
  x: number;
  y: number;
};

export default function Path() {
  const [path, setPath] = useState<any>([]);
  const [hover, setHover] = useState<Position>({ x: 0, y: 0 });
  const [currentCountry, setCurrentCountry] = useState<string>("");

  function handlePathClick(e: React.MouseEvent<SVGElement>): void {
    e.stopPropagation();
    let currentPath: SVGElement = e.currentTarget;
    let pathName: null | string = currentPath.getAttribute("name");
    let pathClass: null | string = currentPath.getAttribute("class");
    console.log(pathName || pathClass);
  }
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

  const pathElements = paths.map((path, index) => (
    <path
      onClick={handlePathClick}
      onMouseMove={(e) => handleCountryName(e, path.name, path.class)}
      onMouseLeave={() => {
        setCurrentCountry("");
      }}
      d={path.d}
      key={index}
      id={path.id ? path.id : undefined}
      className={path.class ? path.class : undefined}
      name={path.name ? path.name : undefined}
    />
  ));

  console.log(hover);
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

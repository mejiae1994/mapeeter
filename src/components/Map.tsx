import React, { useRef } from "react";
import { ReactSVG } from "react-svg";
import worldSvg from "../assets/world.svg";

export default function Map() {
  const svgRef = useRef<HTMLDivElement>(null);

  const handleCountryClick = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    let currentPath: SVGElement = event.currentTarget;
    let pathName: null | string = currentPath.getAttribute("name");
    let pathClass: null | string = currentPath.getAttribute("class");
    console.log(pathName || pathClass);
  };

  const handleSvgLoad = () => {
    const svgElement = svgRef.current?.querySelector("svg") as SVGElement;
    const svgPaths = svgElement?.querySelectorAll("path");

    if (svgPaths) {
      svgPaths.forEach((path: any) => {
        path.addEventListener("click", handleCountryClick);
      });
    }
  };

  return (
    <div className="map" ref={svgRef}>
      <ReactSVG src={worldSvg} afterInjection={handleSvgLoad} />
    </div>
  );
}

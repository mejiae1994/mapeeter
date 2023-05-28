import { useState } from "react";
import theSVG from "../assets/pin.svg";
import {
  MapContainer,
  Popup,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";

const pinIcon = new Icon({
  iconUrl: theSVG,
  iconSize: [24, 24],
});

type LeafPin = {
  lat: number;
  lng: number;
};

function LocationMarker() {
  const [pins, setPins] = useState<LeafPin[] | []>([]);

  const map = useMapEvents({
    click: (e) => {
      let newPin: LeafPin = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setPins((previous) => {
        return [...previous, newPin];
      });
    },
  });

  const pinList = pins.map((pin, index) => (
    <Marker key={index} position={[pin.lat, pin.lng]} icon={pinIcon}></Marker>
  ));

  return <> {pinList}</>;
}

export default function LeafMap() {
  const position: LatLngExpression = [37.160317, -5.671875];

  return (
    <MapContainer center={position} minZoom={3} maxZoom={12} zoom={3}>
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/attribution">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

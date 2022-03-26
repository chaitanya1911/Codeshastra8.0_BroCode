import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import { useCallback, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

function DraggableMarker({ formData, setloc }) {
  const center = {
    lat: 19.2307,
    lng: 72.8567,
  };
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setloc(marker.getLatLng().lat, marker.getLatLng().lng);
          console.log(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      icon={myIcon}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}
const center = [
  [19.2307, 72.8567],
  [19, 72],
  [11.059821, 78.387451],
  [17.123184, 79.208824],
  [29.065773, 76.040497],
  // [,],
];
const desc = [["maha"], ["del"], ["del"], ["del"], ["x"]];

const myIcon = L.icon({
  iconUrl: require("../images/marker-icon-2x.png"),
  iconSize: [40, 50],
});

function DragableMarkerMap({ formData, setloc }) {
  return (
    <MapContainer
      style={{ height: "400px", width: "100%" }}
      center={[20.5937, 78.9629]}
      zoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker
        formData={formData}
        setloc={setloc}
        icon={myIcon}
      ></DraggableMarker>
    </MapContainer>
  );
}
export default DragableMarkerMap;

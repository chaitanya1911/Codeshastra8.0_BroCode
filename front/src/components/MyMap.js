import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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

function MyMap() {
  return (
    <MapContainer
      style={{ height: "400px", width: "500px" }}
      center={[20.5937, 78.9629]}
      zoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {center.map((mark, index) => {
        return (
          <Marker position={mark} icon={myIcon}>
            <Popup>{desc[index]}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
export default MyMap;

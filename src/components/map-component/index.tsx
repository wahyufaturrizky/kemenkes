import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = () => {
  return (
    <MapContainer
      center={[-2.548926, 118.0148634]} // Center of Indonesia
      zoom={5} // Zoom level
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {/* <Marker position={[-6.2087634, 106.845599]}>
        <Popup>Jakarta, the capital of Indonesia.</Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default MapComponent;

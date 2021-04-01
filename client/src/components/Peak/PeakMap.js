import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export default function PeakMap({ position, height }) {
  return (
    <MapContainer center={position} zoom={10} style={{ height }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}></Marker>
    </MapContainer>
  );
}

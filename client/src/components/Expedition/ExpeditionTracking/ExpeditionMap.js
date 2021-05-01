import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from 'react-leaflet';

// MapContainer props are immutable, so in order to update the center
// dynamically, we need to have a child element.
function ChangeCenter({ center }) {
  const map = useMap();
  map.setView(center);

  return null;
}

export default function ExpeditionMap({ peak, track, height }) {
  const center = getCenter(peak, track);

  return (
    <MapContainer center={center} zoom={14} style={{ height }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeCenter center={center} />
      {track && (
        <Polyline
          positions={track.locations.map((location) => [
            location.latitude,
            location.longitude,
          ])}
        />
      )}
      <Marker position={center} />
    </MapContainer>
  );
}

function getCenter(peak, track) {
  if (track && track.locations.length > 0) {
    const lastLocation = track.locations[track.locations.length - 1];
    return [lastLocation.latitude, lastLocation.longitude];
  } else {
    return [peak.latitude, peak.longitude];
  }
}

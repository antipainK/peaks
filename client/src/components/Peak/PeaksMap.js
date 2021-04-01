import { Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function PeaksMap({ peaks, height }) {
  return (
    <MapContainer center={[50.08, 18.55]} zoom={7} style={{ height }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {peaks.map((peak) => {
        const position = [peak.latitude, peak.longitude];

        return (
          <Marker key={peak.id} position={position}>
            <Popup>
              <Typography variant="body2" component="div" gutterBottom>
                {peak.name}
              </Typography>
              <Link component={RouterLink} to={`/peaks/${peak.id}`}>
                Więcej
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

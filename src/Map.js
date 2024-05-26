// src/MapComponent.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = ({ locations }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const polylinePositions = locations.map(location => [parseFloat(location.latitude), parseFloat(location.longitude)]);

  const handleMarkerClick = (location) => {
    setSelectedPoint(location);
  };

  return (
    <MapContainer center={[12.9294916, 74.9173533]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={polylinePositions} color="blue" />
      {locations.map((location, index) => (
        <Marker key={index} position={[parseFloat(location.latitude), parseFloat(location.longitude)]} icon={getMarkerIcon(location.speed)} onClick={() => handleMarkerClick(location)}>
          <Popup>
            <div>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
              <p>Speed: {location.speed}</p>
              <p>Reach Time: {new Date(location.reachTime).toLocaleString()}</p>
              <p>End Time: {new Date(location.endTime).toLocaleString()}</p>
              <p>Stoppage Duration: {location.stoppageDuration} milliseconds</p>
              {/* {selectedPoint === location && (
                <>
                  {location.reachTime && <p>Reach Time: {new Date(location.reachTime).toLocaleString()}</p>}
                  {location.endTime && <p>End Time: {new Date(location.endTime).toLocaleString()}</p>}
                  {location.stoppageDuration && <p>Stoppage Duration: {location.stoppageDuration} milliseconds</p>}
                </>
              )} */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const getMarkerIcon = (speed) => {
  if (parseInt(speed) === 0) {
    return L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41],
    });
  } else {
    return L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41],
    });
  }
};

export default MapComponent;

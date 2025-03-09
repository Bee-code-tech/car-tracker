'use client'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
// Initialize icon options for client-side only
const initializeIcons = () => {
  // Use a function to ensure this only runs on client
  L.Icon.Default.prototype.options.iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
  L.Icon.Default.prototype.options.iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
  L.Icon.Default.prototype.options.shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
  
  return {
    greenIcon: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }),
    
    redIcon: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }),
    
    blueIcon: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  };
};

interface MapProps {
  coordinates: {
    origin: [number, number];
    current: [number, number];
    destination: [number, number];
  };
  positions: [number, number][];
}

const Map = ({ coordinates, positions }: MapProps) => {
  // Initialize icons only on client
  const { greenIcon, redIcon, blueIcon } = initializeIcons();
  
  return (
    <MapContainer 
      center={[coordinates.current[0], coordinates.current[1]]} 
      zoom={6} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Origin marker */}
      <Marker 
        position={coordinates.origin}
        icon={greenIcon}
      >
        <Popup>
          <div>
            <h3 className="font-bold">Origin</h3>
            <p>Detroit, MI</p>
          </div>
        </Popup>
      </Marker>
      
      {/* Current location marker */}
      <Marker 
        position={coordinates.current}
        icon={blueIcon}
      >
        <Popup>
          <div>
            <h3 className="font-bold">Current Location</h3>
            <p>Indianapolis, IN</p>
          </div>
        </Popup>
      </Marker>
      
      {/* Destination marker */}
      <Marker 
        position={coordinates.destination}
        icon={redIcon}
      >
        <Popup>
          <div>
            <h3 className="font-bold">Destination</h3>
            <p>Chicago, IL</p>
          </div>
        </Popup>
      </Marker>
      
      {/* Route line */}
      <Polyline 
        positions={positions}
        color="#3b82f6"
        weight={4}
        opacity={0.7}
      />
    </MapContainer>
  );
};

export default Map;
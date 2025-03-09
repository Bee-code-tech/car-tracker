'use client'
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
L.Icon.Default.prototype.options.iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
L.Icon.Default.prototype.options.iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
L.Icon.Default.prototype.options.shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

// Custom icons
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Mock data for our tracking
const trackingData = {
  orderId: "TRK-23891457",
  status: "in-transit",
  estimatedDelivery: "March 12, 2025",
  currentLocation: "Indianapolis, IN",
  destination: "Chicago, IL",
  distance: "189 miles",
  timeRemaining: "2 hours 45 minutes",
  vehicle: {
    type: "Sedan",
    model: "Tesla Model 3",
    licensePlate: "EV-2023",
    driver: "John Smith",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1561729955-89a6a6d8ff43?auto=format&fit=crop&q=80&w=800",
        alt: "Tesla Model 3 Front"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800",
        alt: "Tesla Model 3 Side"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1593941707882-a5bfcf637281?auto=format&fit=crop&q=80&w=800",
        alt: "Tesla Model 3 Interior"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800",
        alt: "Tesla Model 3 Rear"
      }
    ]
  },
  coordinates: {
    origin: [42.331429, -83.045753] as [number, number], // Detroit
    current: [39.768403, -86.158068] as [number, number], // Indianapolis
    destination: [41.878113, -87.629799] as [number, number] // Chicago
  },
  trackingHistory: [
    { 
      status: "Order Placed", 
      location: "Detroit, MI", 
      time: "March 8, 10:30 AM", 
      completed: true,
      details: "Your order has been received and is being processed."
    },
    { 
      status: "Vehicle Assigned", 
      location: "Detroit, MI", 
      time: "March 8, 11:15 AM", 
      completed: true,
      details: "Driver John Smith has been assigned to your delivery."
    },
    { 
      status: "In Transit", 
      location: "Indianapolis, IN", 
      time: "March 9, 2:45 PM", 
      completed: true,
      details: "Your vehicle is en route to the destination."
    },
    { 
      status: "Approaching Destination", 
      location: "Gary, IN", 
      time: "March 9, 4:30 PM", 
      completed: false,
      details: "Your vehicle is approximately 1 hour away from the destination."
    },
    { 
      status: "Delivered", 
      location: "Chicago, IL", 
      time: "March 9, 5:30 PM", 
      completed: false,
      details: "Delivery will be confirmed once the vehicle reaches its destination."
    }
  ]
};

const CarTrackingPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeImage, setActiveImage] = useState(trackingData.vehicle.images[0]);
  
  // Create route line positions
  const positions = [
    trackingData.coordinates.origin,
    trackingData.coordinates.current,
    trackingData.coordinates.destination
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Track Your Vehicle</h1>
          <p className="text-sm md:text-base text-gray-600">Order ID: {trackingData.orderId}</p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="h-64 md:h-80 w-full">
            <MapContainer 
              center={[trackingData.coordinates.current[0], trackingData.coordinates.current[1]]} 
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
                position={trackingData.coordinates.origin}
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
                position={trackingData.coordinates.current}
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
                position={trackingData.coordinates.destination}
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
          </div>
        </div>

        {/* Car Gallery */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Vehicle Gallery</h2>
          
          <div className="mb-4">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={activeImage.url} 
                alt={activeImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {trackingData.vehicle.images.map((image) => (
              <div 
                key={image.id}
                className={`aspect-w-4 aspect-h-3 rounded-md overflow-hidden cursor-pointer border-2 ${activeImage.id === image.id ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setActiveImage(image)}
              >
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Estimated Delivery</h2>
            <p className="text-xl md:text-2xl font-bold text-blue-600">{trackingData.estimatedDelivery}</p>
            <p className="text-xs md:text-sm text-gray-600">Time remaining: {trackingData.timeRemaining}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Current Location</h2>
            <p className="text-xl md:text-2xl font-bold text-blue-600">{trackingData.currentLocation}</p>
            <p className="text-xs md:text-sm text-gray-600">Distance to destination: {trackingData.distance}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Status</h2>
            <p className="text-xl md:text-2xl font-bold text-blue-600 capitalize">{trackingData.status.replace('-', ' ')}</p>
            <p className="text-xs md:text-sm text-gray-600">Destination: {trackingData.destination}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Tracking Timeline</h2>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm md:text-base text-blue-600 hover:text-blue-800"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          
          <div className="relative">
            {trackingData.trackingHistory.map((step, index) => (
              <div key={index} className="mb-6 md:mb-8 flex">
                <div className="flex flex-col items-center mr-3 md:mr-4">
                  <div className={`rounded-full h-6 w-6 md:h-8 md:w-8 flex items-center justify-center ${step.completed ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    {step.completed ? (
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : (
                      <div className="w-2 h-2 bg-gray-100 rounded-full"></div>
                    )}
                  </div>
                  {index < trackingData.trackingHistory.length - 1 && (
                    <div className="h-14 md:h-16 w-0.5 bg-blue-500"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm md:text-base font-bold ${step.completed ? 'text-blue-600' : 'text-gray-500'}`}>{step.status}</h3>
                  <div className="mt-1">
                    {step.location && <p className="text-xs md:text-sm text-gray-600">Location: {step.location}</p>}
                    {step.time && <p className="text-xs md:text-sm text-gray-600">Time: {step.time}</p>}
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{step.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Details */}
        {showDetails && (
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Vehicle Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4 text-sm md:text-base">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Vehicle Type</p>
                <p className="font-semibold">{trackingData.vehicle.type}</p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Model</p>
                <p className="font-semibold">{trackingData.vehicle.model}</p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">License Plate</p>
                <p className="font-semibold">{trackingData.vehicle.licensePlate}</p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Driver</p>
                <p className="font-semibold">{trackingData.vehicle.driver}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CarTrackingPage;
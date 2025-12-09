import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt, FaSearchLocation, FaCrosshairs } from "react-icons/fa";
import { toast } from "react-toastify";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icon for service coverage
const serviceIcon = new L.Icon({
  iconUrl: "/map-marker.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Custom icon for current location
const currentLocationIcon = new L.Icon({
  iconUrl: "/current-location.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Dhaka coordinates (Bangladesh)
const defaultCenter = [23.8103, 90.4125];
const defaultZoom = 11;

// Major service coverage areas in Bangladesh
const serviceAreas = [
  {
    id: 1,
    name: "Dhaka City",
    position: [23.8103, 90.4125],
    radius: 5000,
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "Gulshan",
    position: [23.794, 90.4154],
    radius: 3000,
    color: "#10B981",
  },
  {
    id: 3,
    name: "Banani",
    position: [23.7937, 90.4064],
    radius: 2000,
    color: "#8B5CF6",
  },
  {
    id: 4,
    name: "Dhanmondi",
    position: [23.7465, 90.376],
    radius: 3000,
    color: "#F59E0B",
  },
  {
    id: 5,
    name: "Uttara",
    position: [23.8759, 90.3795],
    radius: 4000,
    color: "#EF4444",
  },
  {
    id: 6,
    name: "Mirpur",
    position: [23.8223, 90.3654],
    radius: 3500,
    color: "#EC4899",
  },
  {
    id: 7,
    name: "Savar",
    position: [23.8567, 90.26],
    radius: 6000,
    color: "#14B8A6",
  },
  {
    id: 8,
    name: "Narayanganj",
    position: [23.6238, 90.5],
    radius: 7000,
    color: "#8B5CF6",
  },
  {
    id: 9,
    name: "Gazipur",
    position: [23.9999, 90.4203],
    radius: 8000,
    color: "#F59E0B",
  },
  {
    id: 10,
    name: "Tangail",
    position: [24.253, 89.9167],
    radius: 10000,
    color: "#10B981",
  },
];

// Decorator locations
const decoratorLocations = [
  {
    id: 1,
    name: "Rahim Decor",
    position: [23.78, 90.4167],
    specialty: "Wedding",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Karim Designs",
    position: [23.76, 90.39],
    specialty: "Home",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Style Masters",
    position: [23.79, 90.42],
    specialty: "Corporate",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Dream Decor",
    position: [23.82, 90.37],
    specialty: "Birthday",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Elegant Events",
    position: [23.74, 90.41],
    specialty: "All",
    rating: 4.5,
  },
];

// Map events handler component
function MapEvents({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });
  return null;
}

// Center reset component
function ResetCenterView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, defaultZoom);
    }
  }, [center, map]);
  return null;
}

// Search location component
function SearchLocation() {
  const [searchQuery, setSearchQuery] = useState("");
  const map = useMap();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        map.setView([lat, lon], 13);
        toast.success(`Location found: ${data[0].display_name}`);
      } else {
        toast.error("Location not found");
      }
    } catch (error) {
      toast.error("Error searching location");
    }
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar bg-white p-2 rounded shadow">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search location..."
            className="input input-xs input-bordered"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="btn btn-xs btn-primary">
            <FaSearchLocation />
          </button>
        </div>
      </div>
    </div>
  );
}

const MapComponent = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [showServiceAreas, setShowServiceAreas] = useState(true);
  const [showDecorators, setShowDecorators] = useState(true);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setCenter([latitude, longitude]);
          toast.success("Your location found");
        },
        (error) => {
          toast.error("Unable to get your location");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  // Handle map click
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    toast(`Map clicked at: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  };

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Check if user is within service area
  useEffect(() => {
    if (userLocation) {
      const [userLat, userLon] = userLocation;
      const isInServiceArea = serviceAreas.some((area) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          area.position[0],
          area.position[1]
        );
        return distance <= area.radius / 1000; // Convert radius to km
      });

      if (!isInServiceArea) {
        toast(
          "You are outside our primary service area. Contact us for special arrangements.",
          { duration: 5000 }
        );
      }
    }
  }, [userLocation]);

  return (
    <div className="relative">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <div className="bg-white rounded-lg shadow-lg p-3">
          <h3 className="font-bold mb-2 text-sm">Map Controls</h3>
          <div className="space-y-2">
            <button
              onClick={getCurrentLocation}
              className="btn btn-sm btn-primary w-full"
            >
              <FaCrosshairs className="mr-2" />
              My Location
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setShowServiceAreas(!showServiceAreas)}
                className={`btn btn-sm ${
                  showServiceAreas ? "btn-success" : "btn-outline"
                }`}
              >
                Areas
              </button>
              <button
                onClick={() => setShowDecorators(!showDecorators)}
                className={`btn btn-sm ${
                  showDecorators ? "btn-info" : "btn-outline"
                }`}
              >
                Decorators
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-lg p-3">
          <h3 className="font-bold mb-2 text-sm">Legend</h3>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Service Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Decorator Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Your Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={center}
        zoom={defaultZoom}
        className="h-[500px] w-full rounded-lg"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Service Coverage Areas */}
        {showServiceAreas &&
          serviceAreas.map((area) => (
            <Circle
              key={area.id}
              center={area.position}
              pathOptions={{
                fillColor: area.color,
                color: area.color,
                fillOpacity: 0.2,
                weight: 2,
              }}
              radius={area.radius}
              eventHandlers={{
                click: () => {
                  setSelectedArea(area);
                  toast(`Service area: ${area.name}`);
                },
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{area.name}</h3>
                  <p className="text-sm">
                    Coverage radius: {(area.radius / 1000).toFixed(1)} km
                  </p>
                  <p className="text-sm">
                    We provide full service in this area
                  </p>
                  <button
                    className="btn btn-xs btn-primary mt-2"
                    onClick={() => setCenter(area.position)}
                  >
                    Center Map
                  </button>
                </div>
              </Popup>
            </Circle>
          ))}

        {/* Decorator Locations */}
        {showDecorators &&
          decoratorLocations.map((decorator) => (
            <Marker
              key={decorator.id}
              position={decorator.position}
              icon={serviceIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{decorator.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(decorator.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-1 text-sm">{decorator.rating}</span>
                  </div>
                  <p className="text-sm">Specialty: {decorator.specialty}</p>
                  <p className="text-sm">Available for booking</p>
                  <button className="btn btn-xs btn-primary mt-2">
                    Book This Decorator
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* User's Current Location */}
        {userLocation && (
          <Marker position={userLocation} icon={currentLocationIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">Your Location</h3>
                <p className="text-sm">
                  Lat: {userLocation[0].toFixed(4)}, Lng:{" "}
                  {userLocation[1].toFixed(4)}
                </p>
                <p className="text-sm">We can serve at your location!</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Map Events Handler */}
        <MapEvents onMapClick={handleMapClick} />

        {/* Reset Center View */}
        <ResetCenterView center={center} />

        {/* Search Location */}
        <SearchLocation />
      </MapContainer>

      {/* Service Area Information */}
      {selectedArea && (
        <div className="mt-4 p-4 bg-base-100 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{selectedArea.name}</h3>
              <p className="text-sm text-gray-600">
                Coverage: {(selectedArea.radius / 1000).toFixed(1)} km radius
              </p>
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setSelectedArea(null)}
            >
              ✕
            </button>
          </div>
          <div className="mt-2">
            <p className="text-sm">
              We provide full decoration services in this area including:
            </p>
            <ul className="list-disc list-inside text-sm mt-1 ml-2">
              <li>Home decoration</li>
              <li>Wedding ceremony setup</li>
              <li>Corporate event decoration</li>
              <li>On-site consultation</li>
            </ul>
          </div>
        </div>
      )}

      {/* Service Coverage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="stat bg-base-200 rounded-lg p-4">
          <div className="stat-title">Coverage Area</div>
          <div className="stat-value text-primary">8 Cities</div>
          <div className="stat-desc">Across Bangladesh</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-4">
          <div className="stat-title">Active Decorators</div>
          <div className="stat-value text-secondary">45+</div>
          <div className="stat-desc">Ready to serve</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-4">
          <div className="stat-title">Service Radius</div>
          <div className="stat-value text-accent">100km</div>
          <div className="stat-desc">Maximum coverage</div>
        </div>
      </div>

      {/* Coverage Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Service Coverage Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-1">Primary Service Areas:</h4>
            <ul className="text-sm space-y-1">
              <li>• Dhaka City and surrounding areas</li>
              <li>• Gazipur Industrial Zone</li>
              <li>• Savar EPZ Area</li>
              <li>• Narayanganj District</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Extended Service:</h4>
            <ul className="text-sm space-y-1">
              <li>• Special arrangements available for outside coverage</li>
              <li>• Minimum booking: ৳50,000 for extended areas</li>
              <li>• Advance booking required: 7 days minimum</li>
              <li>• Contact: +880 1711-XXXXXX for inquiries</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;

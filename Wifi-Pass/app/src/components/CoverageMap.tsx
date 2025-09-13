import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import redXIcon from "./redIcon";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function FlyToLocation({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12, { duration: 1.5 });
    }
  }, [coords]);
  return null;
}

function LocationPicker({ onConfirm }: { onConfirm: (coords: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onConfirm([lat, lng]);
    },
  });
  return null;
}

export default function CoverageMap() {
  const [zip, setZip] = useState("");
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [confirmedCoords, setConfirmedCoords] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleZipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zip) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=USA&format=json&limit=1`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
        setError(null);
      } else {
        setError("No results found for that ZIP code.");
      }
    } catch (err: any) {
      setError("Failed to fetch location. Check internet or CORS settings.");
    }
  };

  return (
    <div className="relative w-full">
      {/* Map with shorter height */}
      <MapContainer
        center={coords || [37.0902, -95.7129]}
        zoom={coords ? 12 : 4}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToLocation coords={coords} />
  {confirmedCoords && <Marker position={confirmedCoords} icon={redXIcon} />}
        <LocationPicker onConfirm={(c) => setConfirmedCoords(c)} />
      </MapContainer>

      {/* Bottom section with ZIP box + View Plans */}
      <div className="mt-4 flex flex-col items-center gap-4">
        <form
          onSubmit={handleZipSubmit}
          className="bg-black bg-opacity-70 px-3 py-2 rounded flex items-center gap-2"
        >
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter ZIP"
            className="px-2 py-1 rounded text-black"
          />
          <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">
            Go
          </button>
        </form>
        {error && (
          <div className="bg-red-600 text-white px-3 py-1 rounded shadow">{error}</div>
        )}

        {confirmedCoords && (
          <div className="flex flex-col items-center bg-black bg-opacity-80 px-4 py-3 rounded shadow-lg">
            <span className="text-white mb-2">Location confirmed ✅</span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => router.push("/passes")}
            >
              View Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

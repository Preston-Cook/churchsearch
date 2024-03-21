import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export default function Map({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-2xl mx-auto z-0">
      <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} />
      </MapContainer>
    </div>
  );
}

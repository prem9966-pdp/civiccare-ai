"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { MapPin, Phone, Navigation, Landmark, Activity } from 'lucide-react';

// Fix Leaflet marker icon issue
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Hospital {
  _id: string;
  name: string;
  type: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  specialty: string;
  mapLink: string;
  latitude: number;
  longitude: number;
}

interface LeafletMapProps {
  hospitals: Hospital[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

// Map Controller Component to handle centering and zooming
function MapController({ activeHospital, hospitals }: { activeHospital?: Hospital, hospitals: Hospital[] }) {
  const map = useMap();

  useEffect(() => {
    if (activeHospital) {
      map.flyTo([activeHospital.latitude, activeHospital.longitude], 15, {
        duration: 1.5
      });
    } else if (hospitals.length > 0) {
      // Auto-fit bounds if no specific hospital is active
      const bounds = L.latLngBounds(hospitals.map(h => [h.latitude, h.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [activeHospital, hospitals, map]);

  return null;
}

export default function LeafletMap({ hospitals, activeId, onSelect }: LeafletMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  const activeHospital = hospitals.find(h => h._id === activeId);
  const defaultCenter: [number, number] = [20.5937, 78.9629]; // Center of India

  return (
    <div className="relative h-full w-full rounded-[40px] overflow-hidden border-4 border-white shadow-inner">
      <MapContainer
        center={activeHospital ? [activeHospital.latitude, activeHospital.longitude] : defaultCenter}
        zoom={activeHospital ? 15 : 5}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ZoomControl position="topright" />
        
        <MapController activeHospital={activeHospital} hospitals={hospitals} />

        {hospitals.map((hospital) => (
          <Marker
            key={hospital._id}
            position={[hospital.latitude, hospital.longitude]}
            eventHandlers={{
              click: () => onSelect(hospital._id),
            }}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `<div class="marker-container ${activeId === hospital._id ? 'active' : ''}">
                      <div class="marker-pulse"></div>
                      <div class="marker-pin ${hospital.type === 'government' ? 'govt' : 'private'}">
                        ${hospital.type === 'government' ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'}
                      </div>
                    </div>`,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            })}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest",
                    hospital.type === 'government' ? "bg-emerald-50 text-emerald-600" : "bg-primary/5 text-primary"
                  )}>
                    {hospital.type}
                  </span>
                </div>
                <h3 className="font-black text-primary text-sm leading-tight mb-1">{hospital.name}</h3>
                <p className="text-[10px] text-slate-500 flex items-center mb-3">
                  <MapPin className="h-3 w-3 mr-1 text-primary" /> {hospital.area}, {hospital.city}
                </p>
                <div className="flex gap-2">
                  <a 
                    href={`tel:${hospital.phone}`}
                    className="flex-1 flex items-center justify-center p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                  <a 
                    href={hospital.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center p-2 rounded-lg bg-primary text-white hover:shadow-lg transition-all"
                  >
                    <Navigation className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom Styles for Leaflet Markers */}
      <style jsx global>{`
        .leaflet-container {
            font-family: inherit;
        }
        .marker-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .marker-container.active {
            transform: scale(1.3) translateY(-10px);
            z-index: 1000 !important;
        }
        .marker-pin {
            width: 32px;
            height: 32px;
            background: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: 2px solid white;
            color: #1e293b;
        }
        .marker-pin.govt {
            background: #10b981;
            color: white;
        }
        .marker-pin.private {
            background: #3b82f6;
            color: white;
        }
        .marker-container.active .marker-pin {
            border-color: #3b82f6;
            box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
        }
        .marker-pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(59, 130, 246, 0.4);
            border-radius: 50%;
            animation: pulse 2s infinite;
            display: none;
        }
        .marker-container.active .marker-pulse {
            display: block;
        }
        @keyframes pulse {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2.5); opacity: 0; }
        }
        .custom-popup .leaflet-popup-content-wrapper {
            border-radius: 20px;
            padding: 4px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .custom-popup .leaflet-popup-content {
            margin: 0;
        }
        .custom-popup .leaflet-popup-tip-container {
            display: none;
        }
      `}</style>
    </div>
  );
}

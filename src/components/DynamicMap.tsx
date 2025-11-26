"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { MOCK_MATCHES } from "@/data/mocks";

// Icono personalizado para evitar problemas con los assets de Leaflet en bundlers
const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function DynamicMap() {
    // Solucionamos el problema de los iconos en entornos de bundlers
    useEffect(() => {
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        // @ts-ignore
        L.Icon.Default.mergeOptions({
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
    }, []);

    // Partidos con coordenadas desde el mock
    const matchesWithCoords = MOCK_MATCHES.filter(
        (match) => typeof match.lat === "number" && typeof match.lng === "number"
    );

    // Coordenadas de Hualqui, Biobío, Chile (fallback)
    const defaultCenter: [number, number] = [-36.967, -72.867];
    const center: [number, number] =
        matchesWithCoords.length > 0
            ? [matchesWithCoords[0].lat as number, matchesWithCoords[0].lng as number]
            : defaultCenter;

    return (
        <div className="map-wrapper">
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&amp;copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {matchesWithCoords.map((match) => (
                    <Marker
                        key={match.id}
                        position={[match.lat as number, match.lng as number]}
                        icon={defaultIcon}
                    >
                        <Popup>
                            <strong>{match.title}</strong>
                            <br />
                            {match.location} – {match.date}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

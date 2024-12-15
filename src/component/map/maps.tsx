import { useEffect, useRef } from "react";
import "./maps.css";

// Déclarations Leaflet comme dans ton code
declare global {
	interface Window {
		L: {
			map: (el: HTMLElement) => LeafletMap;
			tileLayer: (url: string, options: TileLayerOptions) => TileLayer;
			marker: (coords: [number, number], options?: MarkerOptions) => Marker;
			icon: (options: IconOptions) => Icon;
		};
	}
}

// Types Leaflet
interface LeafletMap {
	setView: (coords: [number, number], zoom: number) => LeafletMap;
	remove: () => void;
}

interface TileLayer {
	addTo: (map: LeafletMap) => void;
}

interface TileLayerOptions {
	maxZoom: number;
	attribution: string;
}

interface Marker {
	addTo: (map: LeafletMap) => Marker;
	bindPopup: (content: string) => Marker;
	on: (event: string, callback: () => void) => void;
}

interface MarkerOptions {
	icon: Icon;
}

interface IconOptions {
	iconUrl: string;
	iconSize: [number, number];
	iconAnchor: [number, number];
	popupAnchor: [number, number];
	shadowUrl?: string;
	shadowSize?: [number, number];
}

// Propriétés du composant
interface MapsProps {
	activeFilter: string | null;
	setActiveSiteId: (id: string) => void;
	activeSiteId: string;
}

function Maps({ activeFilter, setActiveSiteId, activeSiteId }: MapsProps) {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const mapInstance = useRef<LeafletMap | null>(null);

	// Constantes globales
	const ZOOM_LEVEL = 13;
	const TILE_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const MAP_ATTRIBUTION =
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	// Localisations des sites
	const locations = [
		{ id: "1", name: "Goutte", coords: [21.011523, -11.103842], type: "Eau" },
		{ id: "2", name: "Source", coords: [21.002124, -11.09058], type: "Eau" },
		{ id: "3", name: "Puits", coords: [21.031523, -11.123842], type: "Eau" },
		{ id: "4", name: "Bunker Alpha", coords: [21.038498, -11.084229], type: "Bunker" },
		{ id: "5", name: "Bunker Bravo", coords: [20.989784, -11.121737], type: "Bunker" },
		{ id: "6", name: "Bunker Charlie", coords: [21.015505, -11.054188], type: "Bunker" },
		{ id: "7", name: "Bunker Delta", coords: [21.021915, -11.090924], type: "Bunker" },
		{ id: "8", name: "Station Électrique 1", coords: [20.999159, -11.058394], type: "Electricité" },
		{ id: "9", name: "Station Électrique 2", coords: [21.021514, -11.10088], type: "Electricité" },
	];

	// Icônes par défaut
	const defaultIcon = window.L?.icon({
		iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
		shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],
	});

	const redIcon = window.L?.icon({
		iconUrl: "/assets/images/map-marker-red.svg",
		shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],
	});

	useEffect(() => {
		const L = window.L;
		if (!L || !mapRef.current) return;

		// Suppression de la carte précédente
		if (mapInstance.current) {
			mapInstance.current.remove();
			mapInstance.current = null;
		}

		// Initialisation de la carte
		mapInstance.current = L.map(mapRef.current).setView(
			locations[0].coords,
			ZOOM_LEVEL
		);

		L.tileLayer(TILE_LAYER_URL, {
			maxZoom: ZOOM_LEVEL,
			attribution: MAP_ATTRIBUTION,
		}).addTo(mapInstance.current);

		// Ajout des marqueurs filtrés
		locations
			.filter((loc) => !activeFilter || loc.type === activeFilter)
			.forEach((location) => {
				const marker = L.marker(location.coords, {
					icon: location.id === activeSiteId ? redIcon : defaultIcon,
				});
				marker
					.addTo(mapInstance.current!)
					.bindPopup(location.name)
					.on("click", () => setActiveSiteId(location.id));
			});

		// Nettoyage de la carte
		return () => {
			if (mapInstance.current) {
				mapInstance.current.remove();
				mapInstance.current = null;
			}
		};
	}, [activeFilter, activeSiteId, locations, setActiveSiteId]);

	return (
		<div className="map_container">
			<div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }} />
		</div>
	);
}

export default Maps;

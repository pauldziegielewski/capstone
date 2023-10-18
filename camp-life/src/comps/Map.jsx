import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ latitude, longitude }) {
  const mapRef = useRef(null); // Create a ref to hold the map instance
  const markerRef = useRef(null); // Create a ref to hold the marker instance

  useEffect(() => {
    // Create a map container if latitude and longitude are provided
    if (latitude && longitude) {
      if (!mapRef.current) {
        // Initialize the map only if the ref is available
        mapRef.current = L.map("map-container").setView([latitude, longitude], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);

        // Create a marker and add it to the map
        markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
      } else {
        // Update the map view if the ref already exists
        mapRef.current.setView([latitude, longitude], 10);

        // Update the marker position
        markerRef.current.setLatLng([latitude, longitude]);
      }
    }
  }, [latitude, longitude]);

  return <div id="map-container" style={{ height: "400px" }}></div>;
}

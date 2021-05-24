import React from 'react'
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = () => {
    return(
    <div>
        <MapContainer
        center={[51.0, 19.0]}
        zoom={4}
        >
        <TileLayer 
        url='https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png' 
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
        </MapContainer>
    </div>)
}

export default MapView
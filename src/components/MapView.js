import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const MapView = ({socket}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.on('FLIGHTS', (vuelos) => {setData(vuelos)});
        socket.emit('FLIGHTS');
    }, [])

    return(
    <div>
        <MapContainer
        center={[0.0, 0.0]}
        zoom={1.5}
        >
        <TileLayer 
        url='https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png' 
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
        {
            data.map((flight) => 
            <div>
                <Marker position={flight.origin}>
                <Popup>
                    Origen del vuelo {flight.code}
                </Popup>
                </Marker>
                <Marker position={flight.destination}>
                <Popup>
                    Destino del vuelo {flight.code}
                </Popup>
                </Marker>
                <Polyline pathOptions={{ color: getRandomColor() }} positions={[flight.origin, flight.destination]} />
            </div>
        )}
        </MapContainer>
    </div>)
}

export default MapView
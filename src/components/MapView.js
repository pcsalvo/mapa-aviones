import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Rectangle, Popup, Circle } from "react-leaflet";
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
    const [pos, setPos] = useState([]);


    useEffect(() => {
        socket.on('FLIGHTS', (vuelos) => {setData(vuelos)});
        socket.on('POSITION', (position) => {
            setPos((pos) => [...pos, position]);
        })
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
                <Circle center={flight.origin} radius={200}>
                <Popup>
                    Origen del vuelo {flight.code}
                </Popup>
                </Circle>
                <Circle center={flight.destination} radius={200}>
                <Popup>
                    Destino del vuelo {flight.code}
                </Popup>
                </Circle>
                <Polyline key={flight.code} pathOptions={{ color: getRandomColor() }} positions={[flight.origin, flight.destination]} />
            </div>
        )}

        {
            pos.map((posit) => 
            <div>
                <Rectangle time={1} bounds={[posit.position, [posit.position[0]+1,posit.position[1]+1]]} pathOptions={{ color: 'black' }}>
                <Popup>
                    Vuelo {posit.code}
                </Popup>
                </Rectangle>
            </div>
        )}
        </MapContainer>
    </div>)
}

export default MapView
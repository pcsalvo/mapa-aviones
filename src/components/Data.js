import React, { useEffect, useState } from 'react'

const InfoVuelo = ({socket}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.on('FLIGHTS', (vuelos) => {setData(vuelos)});
        socket.emit('FLIGHTS');
    }, [])

    return(
    <div className='InfoVuelos'>
        <h2>Información de los Vuelos</h2>
        <div className='InfoGral'>
            {
            data.map((flight) => 
            <div className='InfoGral2' key={flight.code}>
                <div className='title-info'>
                    <h3>Vuelo: {flight.code} - {flight.airline}</h3>
                </div>
                <div className='body-info'>
                    <p>Origen: {flight.origin}</p>
                    <p>Destino: {flight.destination}</p>
                    <p>Avión: {flight.plane}</p>
                    <p>Asientos: {flight.seats}</p>
                    <p>Pasajeros: {flight.passengers.length}</p>
                    <p>Detalle:</p>
                    {
                        flight.passengers.map((psj) => 
                        <div className='Pasajeros'>
                        <p>* {psj.name} - {psj.age} años</p>
                        </div>
                        )}
                </div>
            </div>)}
        </div>
    </div>)
}

export default InfoVuelo
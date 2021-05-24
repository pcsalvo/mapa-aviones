import './App.css';
import MapView from './components/MapView';
import InfoVuelo from './components/Data';
import Chat from './components/Chat';
import { useState } from 'react';
import socket from "./components/Socket";


function App() {
  const [name, setName] = useState(""); 
  const [registrado, setRegistrado] = useState(false);
  
  
  const registrar = (e) => {
    e.preventDefault();
    if (name !== "") {
      setRegistrado(true);
      
    }
  }

  return (
    <div>
      {
        !registrado &&
        <div>
          <p>Para poder acceder al mapa, te debes registrar con un nombre</p>
          <form onSubmit={registrar}>
              <label htmlFor="">Escriba su nombre</label>
              <input value={name} onChange={e => setName(e.target.value)}></input>
              <button>Enviar</button>
          </form>
        </div>
      }
      {
        registrado &&
        <>
          <h1>Mapa de Aviones</h1>
          <div className='general-elements'>
            <div className='_left'>
              <MapView socket={socket}/>
              <InfoVuelo socket={socket}/>
            </div>
            <div className='_right'>
              <Chat name={name} socket={socket}/>
            </div>
        </div></>
      }
    </div>
  );
}

export default App;
 
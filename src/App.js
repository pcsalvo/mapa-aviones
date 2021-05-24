import logo from './logo.svg';
import './App.css';
import MapView from './components/MapView';
import InfoVuelo from './components/Data';
import Chat from './components/Chat';

function App() {
  return (
    <div>
      <h1>Mapa de Aviones</h1>
      <MapView/>
      <Chat/>
      <InfoVuelo/>
    </div>
  );
}

export default App;
 
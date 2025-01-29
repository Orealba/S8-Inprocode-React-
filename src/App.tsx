import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from '../src/Components/Navbar';
import './App.css';
import { Welcome } from './Pages/Welcome';
import { Mapa } from './Pages/Mapa';
import { Calendario } from './Pages/Calendario';
import { Grafico } from './Pages/Grafico';
import { Usuarios } from './Pages/Usuarios';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Welcome />}
          />
          <Route
            path="/mapa"
            element={<Mapa />}
          />
          <Route
            path="/grafico"
            element={<Grafico />}
          />
          <Route
            path="/calendario"
            element={<Calendario />}
          />

          <Route
            path="/usuarios"
            element={<Usuarios />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import "./App.scss";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mascotas from "../src/pages/Mascotas";
import Clientes from "../src/pages/Clientes";
import Citas from "../src/pages/Citas";
import Facturacion from "../src/pages/Facturacion";

function App() {
  return (
    <Router>
      <div className="flex">
        <SideBar />
        <div className="content w-100">
          <NavigationBar />
          <Routes>
            <Route exact path="/" element={<Clientes />} />
            <Route exact path="/mascotas" element={<Mascotas />} />
            <Route exact path="/citas" element={<Citas />} />
            <Route exact path="/facturacion" element={<Facturacion />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

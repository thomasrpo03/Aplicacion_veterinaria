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
import AddClientes from "./pages/AddClientes";
import AddMascotas from "./pages/AddMascotas";
import AddCitas from "./pages/AddCitas";
import EditMascotas from "./pages/EditMascotas";

function App() {
  return (
    <Router>
      <div className="flex">
        <SideBar />
        <div className="content w-100">
          <NavigationBar />
          <Routes>
            <Route exact path="/" element={<Mascotas />} />
            <Route exact path="/clientes" element={<Clientes />} />
            <Route exact path="/citas" element={<Citas />} />
            <Route exact path="/facturacion" element={<Facturacion />} />
            <Route exact path="/addclientes" element={<AddClientes />} />
            <Route exact path="/addmascotas" element={<AddMascotas />} />
            <Route exact path="/addcitas" element={<AddCitas />} />
            <Route exact path="/editmascotas/:id" element={<EditMascotas />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

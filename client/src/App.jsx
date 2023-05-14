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
import Login from "../src/pages/Login";

function App() {
  const isLoginPage = window.location.pathname === "/";

  const MainContent = () => (
    <div className="flex">
      <SideBar />
      <div className="content w-100">
        <NavigationBar />
        <Routes>
          <Route exact path="/clientes" element={<Clientes />} />
          <Route exact path="/mascotas" element={<Mascotas />} />
          <Route exact path="/citas" element={<Citas />} />
          <Route exact path="/facturacion" element={<Facturacion />} />
        </Routes>
      </div>
    </div>
  );

  return (
    <Router>
      {isLoginPage ? (
        <Login />
      ) : (
        <MainContent />
      )}
    </Router>
  );
}

export default App;

import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaRegCalendarAlt, FaFileInvoiceDollar } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { SiDatadog } from "react-icons/si";

const SideBar = () => {
  return (
    <div className="sidebar bg-light sticky-top">
      <ul>
        <li style={{ display: "flex", justifyContent: "center" }}>
          <SiDatadog className="" style={{ fontSize: "100px" }} />
        </li>
        <li>
          <NavLink to="/" exact className="text-dark rounded py-2 w-100 d-inline-block px-3" activeClassName="active">
            <FaHome/> Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/clientes" exact className="text-dark rounded py-2 w-100 d-inline-block px-3" activeClassName="active">
            <MdPets /> Clientes
          </NavLink>
        </li>
        <li>
          <NavLink to="/citas" exact className="text-dark rounded py-2 w-100 d-inline-block px-3" activeClassName="active">
            <FaRegCalendarAlt /> Citas
          </NavLink>
        </li>
        <li>
          <NavLink to="facturacion" exact className="text-dark rounded py-2 w-100 d-inline-block px-3" activeClassName="active">
            <FaFileInvoiceDollar /> Facturación
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;

import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegCalendarAlt, FaFileInvoiceDollar } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import Gato from '../assets/Gato2.png'

const SideBar = () => {
  return (
    <div className="sidebar bg-light sticky-top">
      <ul>
        <li style={{ display: "flex", justifyContent: "center" }}>
          <img src={Gato} alt="" />
        </li>
        <li>
          <NavLink to="/" exact className="text-dark rounded py-2 w-100 d-inline-block px-3" activeClassName="active">
          <BsFillPersonFill /> Clientes
          </NavLink>
        </li>
        <li>
          <NavLink to="/mascotas" exact className="text-dark rounded py-2 w-100 d-inline-block px-3" activeClassName="active">
          <MdPets />Mascotas
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

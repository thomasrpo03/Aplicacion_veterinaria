import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="sticky-top">
      <Navbar color="light" light expand="md" >
        <NavbarBrand href="/" style={{ fontSize: '1.7rem', textAlign: 'center', fontWeight: 'bold' }}>Veterinaria Pelusa's Cat</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ fontSize: '1.3rem'}}>
                Thomas Restrepo
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  Opciones
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;

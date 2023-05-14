import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
} from "reactstrap";
import axios from "axios";
import Gato2 from "../assets/Gato3.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/users", {
        user,
        password,
      });
      if (response.data.success) {
        window.location.href = "http://localhost:5173/clientes";
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.error,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#000000",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Ocurrió un error al iniciar sesion",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#000000",
      });
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#e5e5e5" }}>
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-4 order-2 order-md-1">
          <img src={Gato2} alt="Gato" className="img-fluid" />
        </div>
        <div className="col-md-5 order-1 order-md-2">
          <Card className="shadow-lg">
            <CardBody>
              <CardTitle className="text-center mb-4 h3 fw-bold">
                Veterinaria Pelusa's Cat
              </CardTitle>
              <Form onSubmit={handleSubmit} className="px-4">
                <FormGroup>
                  <Label for="user">Usuario</Label>
                  <Input
                    type="text"
                    name="user"
                    id="user"
                    placeholder="Ingrese su usuario"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Contraseña</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Button color="dark" block>
                  Iniciar sesión
                </Button>
              </Form>
            </CardBody>
            <CardFooter className="text-center">
              <a
                href="https://github.com/thomasrpo03"
                className="text-decoration-none"
                target="_blank"
              >
                <FaGithub size={30} color="black" className="hover-dark" />
              </a>
              <a
                href="https://www.linkedin.com/in/thomas-restrepo03/"
                target="_blank"
                className="text-decoration-none"
              >
                <FaLinkedin
                  size={30}
                  color="black"
                  className="hover-dark ms-3"
                />
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;

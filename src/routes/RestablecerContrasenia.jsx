import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const RestablecerContrasenia = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState({});

  useEffect(() => {
    fetch(`http://localhost/ProyectoCupones/Empresas.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => setEmpresa(data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataBody = {
      action: "contraseña",
      email: email,
      contrasenia_antigua: oldPassword,
      contrasenia_nueva: newPassword
    };

    console.log(dataBody);
    // Aquí puedes validar las credenciales
    fetch(`http://localhost/ProyectoCupones/Empresas.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
      })
        .then(response => response.json())
        .then(data => validarLogin(data.resultado))
      .catch(error => console.error('Error:', error));


      
  };

  const validarLogin = (hecho) => {
    if (hecho) {
      alert("Restablecimiento de contraseña exitoso");
      navigate(`/`);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div class="container login-container">
      <div class="col-md-6 login-form-1 container">
        <h1>{empresa.nombre}</h1>
        <h3>Cambio contraseña</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Contraseña temporal"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Nueva Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input type="submit" class="btnSubmit" value="Restablecer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestablecerContrasenia;

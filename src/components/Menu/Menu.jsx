import { Link } from "react-router-dom";
import "./Menu.css";

export default function Menu({ id }) {
  return (
    <nav className="menu navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        
        <Link to={`/home/${id}`} className="navbar-brand">CuponesUsuarioAdmin</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={`/home/${id}`} className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={`/cupones/${id}`} className="nav-link active">Cupones</Link>
            </li>
            <li className="nav-item">
              <Link to={`/perfil/${id}`} className="nav-link active">Perfil</Link>
            </li>
          </ul>
          <div className="d-flex" role="search">
          <Link to={"/"} className="nav-link active">  <button type="button" class="btn btn-danger">Cerrar sesión</button></Link>
          </div>
        </div>
      </div>
    </nav>
  );
}



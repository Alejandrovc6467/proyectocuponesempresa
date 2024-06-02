
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer container">
    <footer className="py-3 my-4">

      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><p className="nav-link px-2 text-body-secondary">Home</p></li>
        <li className="nav-item"><p className="nav-link px-2 text-body-secondary">Cupones</p> </li>
        <li className="nav-item"><p className="nav-link px-2 text-body-secondary">Perfil</p> </li>
      </ul>
      <p className="text-center text-body-secondary">&copy; 2024 Universiad de Costa Rica</p>
    </footer>
  </div>
  );
}

import { Link, Outlet } from "react-router-dom";
import { NavButton } from "../components/Nav/navButton";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm fixed-top navbar-red bg-warning">
        <div className="container-fluid">
          <a className="navbar-brand" as={Link} to="/">
            Tienda Mia
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavButton redirectTo="/tienda" inputName="Tienda" />
              </li>

              <li className="nav-item">
                <NavButton redirectTo="/productos" inputName="Productos" />
              </li>
              <li className="nav-item">
                <NavButton redirectTo="/clientes" inputName="Clientes" />
              </li>
              <li className="nav-item">
                <NavButton redirectTo="/logs" inputName="Logs" />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="p-4 container-fluid mt-5">
        <Outlet></Outlet>
      </section>
    </>
  );
};
export default NavBar;

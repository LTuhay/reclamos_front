import { NavLink } from "react-router-dom";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
import HomeCarousel from "../../Components/HomeCarousel";

export const HomePage = () => {

  return (
    <>
      <div
        className="container-fluid my-4 home-page"
        style={{ backgroundColor: "white", color: "black" }}
      >
        <div className="row">
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="contacto"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Contacto
              </button>
              <div className="dropdown-menu" aria-labelledby="contacto">
                <div className="dropdown-item">Telefono : +54 1123456789</div>
                <div className="dropdown-item">
                  Email : gestoraconsorcio@gmail.com
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-8">
            <header
              className="navbar navbar-expand-lg navbar-light"
              style={{ backgroundColor: "#E4C9B0" }}
            >
              <div className="container">
                <a className="navbar-brand" href="/">
                  <span className="mr-2">
                    <HomeWorkTwoToneIcon />
                  </span>
                </a>
                <button className="btn btn-primary ml-right">
                  <NavLink className="nav-link" to="/login">
                    Ingresar
                  </NavLink>
                </button>
              </div>
            </header>
            <div>
              <HomeCarousel />
            </div>
            <footer>Gestora Consorcios S.A.</footer>
          </div>
        </div>
      </div>
    </>
  );
};
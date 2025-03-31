import "bootstrap/dist/css/bootstrap.min.css";
import { ShoppingCart, Search, LogOut, ShoppingBag, UserIcon } from "lucide-react";
import { Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useContext, useEffect, useState } from "react";
import './Navbar.css';

function Navbar({ setShowLogin }) {
  const location = useLocation(); // Get current route
  const navigate = useNavigate();
  const { cartItems, token, setToken } = useContext(StoreContext);
  const [userCartCount, setUserCartCount] = useState(0);

  // Update Cart Count When Logged In
  useEffect(() => {
    if (token) {
      const totalItems = Object.values(cartItems).reduce((total, qty) => total + qty, 0);
      setUserCartCount(totalItems);
    } else {
      setUserCartCount(0);
    }
  }, [cartItems, token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken('');
    navigate("/");
  };

  const orders = () => {
    navigate("/myorders");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-danger fs-3" to="/">
          🍕 Tanishk's Bistro
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a
                className={`nav-link px-3 fw-semibold ${location.hash === "#home"
                    ? "text-danger border-bottom border-2 fw-bold"
                    : "text-dark"
                  }`}
                href="/"
              >
                Home
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link px-3 fw-semibold ${location.hash === "#food-display"
                    ? "text-danger border-bottom border-2 fw-bold"
                    : "text-dark"
                  }`}
                href="#food-display"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("food-display")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Menu
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link px-3 fw-semibold ${location.hash === "#contact"
                    ? "text-danger border-bottom border-2 fw-bold"
                    : "text-dark"
                  }`}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>


          {/* Right Section */}
          <div className="d-flex align-items-center">
            {/* Search Icon */}
            <Search className="me-3 text-danger" size={22} />

            {/* Cart Icon */}
            <div className="position-relative me-3">
              <Link to="/cart">
                <ShoppingCart size={24} className="text-danger" />
              </Link>
              {userCartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {userCartCount}
                </span>
              )}
            </div>

            {/* Sign-in or Profile */}
            {!token ? (
              <Button onClick={() => setShowLogin(true)} variant="contained" color="error">
                Sign In
              </Button>
            ) : (
              <div className="navbar-profile position-relative">
                <UserIcon size={24} className="cursor-pointer" />
                <ul className="nav-profile-dropdown">
                  <li onClick={orders}>
                    <ShoppingBag size={20} /> My Orders
                  </li>
                  <hr />
                  <li onClick={logout} className="logout-btn">
                    <LogOut size={20} /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

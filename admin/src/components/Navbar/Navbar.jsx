import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand logo fw-bold text-danger fs-3" to="/">
                    🍕 Tanishk's Bistro
                </Link>
                <img className='profile' src="./images/tanishk.png" alt="" />
            </div>
        </div>
    )
}

export default Navbar

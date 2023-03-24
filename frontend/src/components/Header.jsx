import "./Header.css";

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<div className="fixing">
			<header className="header_n">
			<h2>E-<span style={{color:"black",fontWeight:"normal"}}  >Commerce</span></h2>
			<nav ref={navRef}  >
				<Link onClick={showNavbar} to="/">Home</Link>
				<Link onClick={showNavbar} to="/private">Private Page</Link>
				<Link onClick={showNavbar} to="/login">Login</Link>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header >
		</div>
	);
}

export default Header;
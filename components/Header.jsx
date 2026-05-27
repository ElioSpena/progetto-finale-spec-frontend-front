import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { SlGameController } from "react-icons/sl";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "header-scrolled" : "header"}>
      <Link to="/">
        <SlGameController className="logo" />
      </Link>
      <nav>
        <NavLink to="/favorites">
          <FaHeartCircleCheck className="favorites-link" />
        </NavLink>
      </nav>
    </header>
  );
}

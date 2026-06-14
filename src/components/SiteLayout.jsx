import { useEffect, useState } from "react";
import { ChevronDown, Instagram, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

function ScrollAndReveal() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    reveals.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
    setPortfolioOpen(false);
  };

  return (
    <header className="site-header">
      <Link className="brand-mark" to="/" onClick={closeMenu}>
        <span>somi</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/about">About</NavLink>
        <div
          className="nav-dropdown"
          onMouseEnter={() => setPortfolioOpen(true)}
          onMouseLeave={() => setPortfolioOpen(false)}
        >
          <button
            type="button"
            onClick={() => setPortfolioOpen((open) => !open)}
            aria-expanded={portfolioOpen}
          >
            Portfolio <ChevronDown size={14} />
          </button>
          {portfolioOpen && (
            <div className="dropdown-panel">
              <NavLink to="/video-portfolio">Video Portfolio</NavLink>
              <NavLink to="/photo-portfolio">Photo Portfolio</NavLink>
              <NavLink to="/our-clients">Our Clients</NavLink>
            </div>
          )}
        </div>
        <NavLink to="/our-clients">Our Clients</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <NavLink to="/services" onClick={closeMenu}>
          Services
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
        <span>Portfolio</span>
        <NavLink to="/video-portfolio" onClick={closeMenu}>
          Video Portfolio
        </NavLink>
        <NavLink to="/photo-portfolio" onClick={closeMenu}>
          Photo Portfolio
        </NavLink>
        <NavLink to="/our-clients" onClick={closeMenu}>
          Our Clients
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h2>somi the agency</h2>
        <div className="footer-socials" aria-label="Social links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            f
          </a>
        </div>
      </div>
      <div className="footer-contact">
        <Link to="/contact">Contact</Link>
        <a href="mailto:info@somiagency.co">info@somiagency.co</a>
      </div>
    </footer>
  );
}

export default function SiteLayout({ children }) {
  return (
    <div className="somi-site">
      <ScrollAndReveal />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

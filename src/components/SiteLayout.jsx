import { useEffect, useState } from "react";
import { ChevronDown, Instagram, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useContent } from "../lib/content";

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
  const { navigation, siteSettings } = useContent();
  const links = [...(navigation.headerLinks || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
  const closeMenu = () => {
    setMenuOpen(false);
    setPortfolioOpen(false);
  };

  return (
    <header className="site-header">
      <Link className="brand-mark" to="/" onClick={closeMenu}>
        <span>{siteSettings.brandName || "somi"}</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) =>
          link.isDropdown ? (
            <div
              className="nav-dropdown"
              key={link.label}
              onMouseEnter={() => setPortfolioOpen(true)}
              onMouseLeave={() => setPortfolioOpen(false)}
            >
              <button type="button" onClick={() => setPortfolioOpen((open) => !open)} aria-expanded={portfolioOpen}>
                {link.label} <ChevronDown size={14} />
              </button>
              {portfolioOpen && (
                <div className="dropdown-panel">
                  {(link.children || []).map((child) => (
                    <NavLink key={child.path} to={child.path}>{child.label}</NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink key={link.path} to={link.path}>{link.label}</NavLink>
          ),
        )}
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
        {links.map((link) =>
          link.isDropdown ? (
            <div key={link.label}>
              <span>{link.label}</span>
              {(link.children || []).map((child) => (
                <NavLink key={child.path} to={child.path} onClick={closeMenu}>{child.label}</NavLink>
              ))}
            </div>
          ) : (
            <NavLink key={link.path} to={link.path} onClick={closeMenu}>{link.label}</NavLink>
          ),
        )}
      </div>
    </header>
  );
}

function Footer() {
  const { siteSettings } = useContent();
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h2>{siteSettings.footerBrand || "somi the agency"}</h2>
        <div className="footer-socials" aria-label="Social links">
          <a href={siteSettings.instagramUrl || "https://instagram.com"} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href={siteSettings.facebookUrl || "https://facebook.com"} target="_blank" rel="noreferrer" aria-label="Facebook">
            f
          </a>
        </div>
      </div>
      <div className="footer-contact">
        <Link to="/contact">Contact</Link>
        <a href={`mailto:${siteSettings.footerEmail || siteSettings.primaryEmail}`}>{siteSettings.footerEmail || siteSettings.primaryEmail}</a>
      </div>
    </footer>
  );
}

export default function SiteLayout({ children }) {
  const { siteSettings } = useContent();

  useEffect(() => {
    const theme = siteSettings.theme || {};
    Object.entries(theme).forEach(([key, value]) => {
      if (value) document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [siteSettings.theme]);

  return (
    <div className="somi-site">
      <ScrollAndReveal />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

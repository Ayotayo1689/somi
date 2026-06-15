import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import Marquee from "../components/Marquee";
import { useContent, usePage } from "../lib/content";

function ServicePreview({ page, services }) {
  const previewItems = page.servicePreviewItems?.length
    ? page.servicePreviewItems
    : (page.servicePreviewLabels || []).map((label, index) => ({ label, image: services[index]?.image }));

  return (
    <section className="home-services">
      <div className="home-service-grid">
        {previewItems.slice(0, 4).map((item, index) => (
          <Link className="home-service-card reveal" key={item.label || index} to="/services">
            <img src={item.image || services[index]?.image} alt="" />
            <span>{item.label || services[index]?.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HomeAbout({ page }) {
  const about = page.aboutPreview || {};
  return (
    <section className="home-about reveal">
      <div className="home-about-image">
        <img src={about.image} alt="Agency team planning a brand campaign" />
      </div>
      <div className="home-about-copy">
        <h2>
          {about.title}
          <em> {about.highlightedTitle}</em>
        </h2>
        {(about.paragraphs || []).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link className="soft-button dark" to={about.buttonUrl || "/about"}>
          {about.buttonText || "Learn more"}
        </Link>
      </div>
    </section>
  );
}

function HomeClients({ page, clients }) {
  const trusted = page.trustedSection || {};
  const logoClients = clients.filter((client) => client.showInTrustedStrip).map((client) => client.name);
  return (
    <section className="home-trusted reveal">
      <h2>
        {trusted.title} <em>{trusted.highlightedWord}</em> {trusted.suffix}
      </h2>
      <div className="home-client-strip">
        {logoClients.map((client) => (
          <span key={client}>{client}</span>
        ))}
      </div>
    </section>
  );
}

function HomePortfolio({ page, portfolio }) {
  const preview = page.portfolioPreview || {};
  const items = portfolio.filter((item) => item.type === "photo" && item.isActive !== false).slice(0, 5);
  return (
    <section className="home-portfolio reveal">
      <div className="home-portfolio-backdrop" style={{ backgroundImage: `linear-gradient(rgba(20, 53, 3, 0.08), rgba(20, 53, 3, 0.08)), url(${preview.backgroundImage})` }} />
      <button className="portfolio-arrow left" type="button" aria-label="Previous portfolio item">
        &larr;
      </button>
      <div className="portfolio-rail">
        {items.map((item) => (
          <article className="portfolio-shot" key={item.id || item.title}>
            <img src={item.image || item.thumbnail} alt="" />
          </article>
        ))}
      </div>
      <button className="portfolio-arrow right" type="button" aria-label="Next portfolio item">
        &rarr;
      </button>
      <div className="portfolio-button-row">
        <Link className="portfolio-button" to={preview.buttonUrl || "/photo-portfolio"}>
          {preview.buttonText || "View our portfolio"}
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const page = usePage("home");
  const { services, clients, portfolio } = useContent();
  const hero = page.hero || {};

  return (
    <>
      <section className="home-hero reveal">
        <div className="home-hero-copy">
          <h1>
            {hero.title}
            <em> {hero.highlightedTitle}</em>
          </h1>
          <p>{hero.description}</p>
          <Link className="soft-button" to={hero.buttonUrl || "/about"}>
            {hero.buttonText || "Learn more"}
          </Link>
        </div>

        <div className="home-hero-video">
          <img
            src={hero.image}
            alt="SOMI homepage brand video"
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      <Marquee label={page.servicesMarqueeTitle || "Our Services"} />
      <ServicePreview page={page} services={services.filter((service) => service.isActive !== false)} />
      <HomeAbout page={page} />
      <HomeClients page={page} clients={clients} />
      <HomePortfolio page={page} portfolio={portfolio} />
      <ContactSection />
    </>
  );
}

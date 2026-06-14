import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import Marquee from "../components/Marquee";
import BrandImg from "../asset/insta.jpg";
import {
  imagePool,
  logoClients,
  portfolioShowcase,
  serviceCards,
} from "../data/siteData";

function ServicePreview() {
  const labels = [
    "The brand subscription",
    "Content Days",
    "Social media management",
    "Strategy Deck",
  ];

  return (
    <section className="home-services">
      <div className="home-service-grid">
        {serviceCards.slice(0, 4).map((service, index) => (
          <Link className="home-service-card reveal" key={service.title} to="/services">
            <img src={service.image} alt="" />
            <span>{labels[index]}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HomeAbout() {
  return (
    <section className="home-about reveal">
      <div className="home-about-image">
        <img src={imagePool[2]} alt="Agency team planning a brand campaign" />
      </div>
      <div className="home-about-copy">
        <h2>
          Meet SOMI,
          <em> the founders of sticky brands.</em>
        </h2>
        <p>
          SOMI was born from a desire to help brands move from being seen to
          being remembered. With strategy, content, and creative direction, we
          shape digital presence that lands where it matters most.
        </p>
        <p>
          Whether it is a visual identity, a campaign, or social media built for
          consistency, every choice is intentional and every touchpoint has a
          role.
        </p>
        <Link className="soft-button dark" to="/about">
          Learn more
        </Link>
      </div>
    </section>
  );
}

function HomeClients() {
  return (
    <section className="home-trusted reveal">
      <h2>
        Trusted by <em>brands</em> globally.
      </h2>
      <div className="home-client-strip">
        {logoClients.map((client) => (
          <span key={client}>{client}</span>
        ))}
      </div>
    </section>
  );
}

function HomePortfolio() {
  return (
    <section className="home-portfolio reveal">
      <div className="home-portfolio-backdrop" />
      <button className="portfolio-arrow left" type="button" aria-label="Previous portfolio item">
        &larr;
      </button>
      <div className="portfolio-rail">
        {portfolioShowcase.map((item, index) => (
          <article className="portfolio-shot" key={item}>
            <img src={imagePool[index % imagePool.length]} alt="" />
          </article>
        ))}
      </div>
      <button className="portfolio-arrow right" type="button" aria-label="Next portfolio item">
        &rarr;
      </button>
      <div className="portfolio-button-row">
        <Link className="portfolio-button" to="/photo-portfolio">
          View our portfolio
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section className="home-hero reveal">
        <div className="home-hero-copy">
          <h1>
            Brands made
            <em> unforgettable.</em>
          </h1>
          <p>
            We create strategic, scroll-stopping brand identities and content
            systems that transform your digital presence and turn attention
            into growth.
          </p>
          <Link className="soft-button" to="/about">
            Learn more
          </Link>
        </div>

        <div className="home-hero-video">
          <img
            src={BrandImg}
            alt="SOMI homepage brand video"
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      <Marquee label="Our Services" />
      <ServicePreview />
      <HomeAbout />
      <HomeClients />
      <HomePortfolio />
      <ContactSection />
    </>
  );
}

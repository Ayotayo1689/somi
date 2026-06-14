import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Instagram,
  Mail,
  Menu,
  X,
} from "lucide-react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const serviceCards = [
  {
    title: "Graphic Design",
    copy: "Visual identity, layouts, branded materials, social graphics, and campaign-ready assets.",
    includes: ["Identity assets", "Social templates", "Brand layouts"],
    image:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Social Media Management",
    copy: "Strategy, scheduling, community management, growth reporting, and always-on presence.",
    includes: ["Content calendars", "Captions", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Video Editing",
    copy: "Short-form, long-form, ads, launches, reels, TikToks, and campaign video systems.",
    includes: ["Reels", "TikToks", "Campaign edits"],
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Brand Strategy & Analysis",
    copy: "Positioning, competitor analysis, messaging frameworks, audits, and clarity sessions.",
    includes: ["Audits", "Messaging", "Positioning"],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Content Creation",
    copy: "Photography direction, copywriting, creative storytelling, and original campaign content.",
    includes: ["Creative direction", "Copywriting", "Storytelling"],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Ads & Advertisement",
    copy: "Paid social, display campaigns, creative testing, and performance-focused growth systems.",
    includes: ["Paid social", "Testing", "Reporting"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "PR & Communications",
    copy: "Press, media outreach, launch narratives, and public-facing brand communication.",
    includes: ["Press stories", "Media outreach", "Narratives"],
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Campaign Direction",
    copy: "End-to-end campaign planning, coordination, creative direction, launch, and delivery.",
    includes: ["Planning", "Coordination", "Delivery"],
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
  },
];

const photoProjects = [
  "Identity shoot",
  "Founder portraits",
  "Product launch",
  "Lifestyle stills",
  "Event story",
  "Campaign flatlays",
  "Social content",
  "Editorial set",
  "Brand refresh",
  "Retail campaign",
  "Launch detail",
  "Team culture",
];

const videoProjects = [
  "Launch Reel",
  "Campaign Film",
  "Founder Story",
  "UGC Series",
  "Product Demo",
  "Event Recap",
];

const clients = [
  {
    name: "Early-stage Founders",
    quote:
      "For founders building from scratch who need identity, strategy, and presence shaped together.",
  },
  {
    name: "Growing SMEs",
    quote:
      "For businesses ready to elevate how they appear, compete, and communicate online.",
  },
  {
    name: "Product & Lifestyle Brands",
    quote:
      "For brands that rely on visual storytelling, content quality, and consistent output.",
  },
  {
    name: "Established Businesses",
    quote:
      "For teams that need a refresh, new energy, or sharper direction without starting over.",
  },
  {
    name: "Personal Brands",
    quote:
      "For creators, speakers, and entrepreneurs whose digital presence must match their reputation.",
  },
  {
    name: "Launch Teams",
    quote:
      "For businesses bringing a product, event, campaign, or new offer into the market.",
  },
];

const logoClients = [
  "KIVA & CO",
  "MORI",
  "Lumi Lagos",
  "LOOKFANTASTIC",
  "BROWERA",
  "LEDDA",
  "THE GREEN ROOM",
];

const portfolioShowcase = [
  "Brand Box",
  "Pearl Detail",
  "Campaign Object",
  "Launch Product",
  "Lifestyle Crop",
];

const zServices = [
  {
    title: "The Content Subscription",
    image:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=900&q=80",
    copy:
      "Constantly running out of content to post on socials? Our content shoots ensure you have a steady stream of high-quality and intentional content to post in line with your internal goals and industry trends.",
    included: [
      "Ongoing strategy in line with your monthly goals",
      "Creative direction & trend research",
      "10 fully edited photos per month",
      "10 fully edited Reels/TikToks per month",
      "Monthly brainstorming session",
      "Monthly competitor analysis",
      "Full usage rights",
      "Access to team faces",
    ],
  },
  {
    title: "Content days",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    copy:
      "Receive a day's worth of raw footage that is yours to edit and use however you like. Perfect for businesses that need a versatile bank of raw content.",
    included: [
      "Pre-content planning session",
      "Raw photos & videos for your content bank",
      "Authentic footage of your product or service",
      "Full usage rights",
      "Option to add edited photos and Reels",
    ],
    link: "Find out more.",
  },
  {
    title: "Social Media Management",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
    copy:
      "Let us take social media off your plate and craft a strategy that drives real results. Includes strategy, content calendar creation, captions, posting and engagement.",
    included: [
      "Full management of your Instagram /TikTok",
      "Strategy",
      "Feed & story creation",
      "Trend research",
      "Caption writing",
      "Hashtag research",
      "Scheduling",
      "Community Management",
      "Option to add monthly content shoot",
    ],
  },
  {
    title: "Strategy Deck",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    copy:
      "Not ready for full management yet? Our personalised strategy deck gets you unstuck and gives you everything you need to confidently take control of your content.",
    included: [
      "Profile Audit",
      "Content Pillars",
      "Content Types You Need to Post",
      "6 Personalised Templates",
      "Feed Plan",
      "2 Content Plan with tailored prompts",
    ],
  },
];

const imagePool = [
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
];

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

function Marquee({ label }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={`${label}-${index}`}>
            {label} <b>*</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function PageHero({ eyebrow, title, copy, image, compact = false }) {
  return (
    <section className={`page-hero section-shell reveal ${compact ? "compact" : ""}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
      {image && (
        <div className="page-hero-media">
          <img src={image} alt="" />
        </div>
      )}
    </section>
  );
}

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

function Home() {
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
          <video
            src="/simi-home.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="SOMI homepage brand video"
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
        ←
      </button>
      <div className="portfolio-rail">
        {portfolioShowcase.map((item, index) => (
          <article className="portfolio-shot" key={item}>
            <img src={imagePool[index % imagePool.length]} alt="" />
          </article>
        ))}
      </div>
      <button className="portfolio-arrow right" type="button" aria-label="Next portfolio item">
        →
      </button>
      <div className="portfolio-button-row">
        <Link className="portfolio-button" to="/photo-portfolio">
          View our portfolio
        </Link>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <>
      <section className="services-page-hero">
        <div>
          <h1>Our Services</h1>
          <h2>Strategic content creation & social media management</h2>
        </div>
        <p>
          Ready to take your content to the next level & grow on socials?
          Whether you need captivating photo and video content, strategic social
          media management, or a combination of both, we are here to help you
          achieve your goals and start seeing real results!
        </p>
      </section>

      <section className="z-service-grid">
        {zServices.map((service) => (
          <article className="z-service-card reveal" key={service.title}>
            <img src={service.image} alt="" />
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
            <strong>WHAT'S INCLUDED:</strong>
            <ul>
              {service.included.map((item) => (
                <li key={item}>~ {item}</li>
              ))}
            </ul>
            {service.link && <Link to="/contact">{service.link}</Link>}
          </article>
        ))}
      </section>

      <div className="services-enquire">
        <Link to="/contact">Enquire to work with us</Link>
      </div>

      <section className="content-portfolio-block reveal">
        <svg className="snake-text content-snake-text" viewBox="0 0 1500 360" aria-hidden="true">
          <path
            id="contentSnakeTextPath"
            d="M -220 210 C 95 110, 230 230, 470 160 S 810 30, 1020 130 S 1315 300, 1700 160"
          />
          <text>
            <textPath href="#contentSnakeTextPath" startOffset="-35%">
              Content Creation Portfolio&nbsp;&nbsp; Content Creation Portfolio&nbsp;&nbsp;
              Content Creation Portfolio&nbsp;&nbsp; Content Creation Portfolio&nbsp;&nbsp;
              Content Creation Portfolio&nbsp;&nbsp; Content Creation Portfolio&nbsp;&nbsp;
              Content Creation Portfolio&nbsp;&nbsp; Content Creation Portfolio&nbsp;&nbsp;
              <animate
                attributeName="startOffset"
                from="-35%"
                to="10%"
                dur="14s"
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>
        <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80" alt="" />
        <div>
          <p>
            Our content creation packages are ideal for clients seeking fresh,
            high-quality content for their social channels. From relatable
            short-form videos to aesthetic, professional stills, we offer both
            photo and video options to fit your content needs.
          </p>
          <Link to="/photo-portfolio">Content Creation Portfolio</Link>
        </div>
      </section>

      <section className="social-results-block reveal">
        <svg className="snake-text" viewBox="0 0 1500 360" aria-hidden="true">
          <path
            id="snakeTextPath"
            d="M -220 270 C 90 210, 195 105, 430 145 S 780 245, 990 135 S 1290 -10, 1700 70"
          />
          <text>
            <textPath href="#snakeTextPath" startOffset="-10%">
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              <animate
                attributeName="startOffset"
                from="-35%"
                to="10%"
                dur="14s"
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>
        <div>
          <p>
            For businesses looking to elevate their social media presence and
            hand over the daily task of running their socials. If you're
            struggling with your strategy or not seeing sales through social
            media, this is for you!
          </p>
          <Link to="/contact">Work with us!</Link>
        </div>
        <div className="results-collage">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index}>
              <b>{index % 2 ? "Accounts reached" : "Profile activity"}</b>
              <strong>{[9305, 103644, 42151, 7564][index % 4].toLocaleString()}</strong>
            </span>
          ))}
        </div>
      </section>

      <section className="services-final-cta reveal">
        <img src={imagePool[2]} alt="" />
        <h2>Got something else in mind?</h2>
        <Link to="/contact">If none of these options are quite right for you, get in touch!</Link>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <section className="about-header">
        <div className="about-header-copy reveal">
          <h1>
            Say <em>hello</em> to <span>SOMI</span>
          </h1>
          <p>Hello! We are the creative founders behind SOMI Agency.</p>
          <p>
            Here is a little backstory: we have always been drawn to helping
            people and brands communicate better. From making films for friends
            to documenting ideas, campaigns, launches, and everyday moments,
            creating content is second nature to us.
          </p>
          <p>
            As we began offering <strong>brand strategy</strong> and{" "}
            <strong>social media management</strong> services independently, we
            noticed the same thing with many clients: they were overwhelmed by
            creating content that really <em>sticks</em> and speaks to their
            audience.
          </p>
          <p>
            After a few strategy sessions and late-night chats, we knew it was
            time to build something that delivered exactly what brands needed:
            creative direction, content, and systems that attract the right
            people and build <em>real</em> connections.
          </p>
          <p>
            And so, SOMI was born. An agency run by passionate creatives
            dedicated to helping brands produce authentic, engaging content that
            sparks conversations and builds trust.
          </p>
          <p>We are so excited to have you here. Here is to making brands stick!</p>
        </div>
        <div className="about-header-image reveal">
          <img src={imagePool[0]} alt="SOMI founders" />
        </div>
      </section>
      <section className="story section-shell reveal">
        <p>
          SOMI was created by two creatives naturally drawn to helping brands
          grow. We do not just execute tasks. We partner at a strategic level so
          every visual, caption, campaign, and touchpoint has a clear job.
        </p>
        <p>
          Our mission is to provide creative vision, strategic clarity, and
          execution excellence for ambitious brands at every stage of their
          journey.
        </p>
      </section>
      <section className="values section-shell">
        {["Bold & Decisive", "Warm & Collaborative", "Creative & Intentional", "Sharp & Professional"].map(
          (value) => (
            <article className="value-card reveal" key={value}>
              <h3>{value}</h3>
              <p>
                Strong ideas, human communication, polished delivery, and
                creative choices backed by strategy.
              </p>
            </article>
          ),
        )}
      </section>
      <PortfolioStrip />
    </>
  );
}

function PortfolioTeaser() {
  return (
    <section className="portfolio-choice section-shell">
      <Link className="choice-card reveal" to="/photo-portfolio">
        <span>Photo Portfolio</span>
        <ArrowUpRight size={24} />
      </Link>
      <Link className="choice-card reveal" to="/video-portfolio">
        <span>Video Portfolio</span>
        <ArrowUpRight size={24} />
      </Link>
    </section>
  );
}

function PhotoPortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Photo examples"
        copy="A visual wall for brand shoots, campaigns, social content, launch assets, and editorial direction."
        compact
      />
      <Marquee label="Photo Examples" />
      <section className="masonry section-shell">
        {photoProjects.map((project, index) => (
          <article className="masonry-card reveal" key={project}>
            <img src={imagePool[index % imagePool.length]} alt="" />
            <span>{project}</span>
          </article>
        ))}
      </section>
      <section className="next-page section-shell reveal">
        <h2>View our video portfolio</h2>
        <Link className="primary-button" to="/video-portfolio">
          Explore videos <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}

function VideoPortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Video examples"
        copy="Short-form, campaign, launch, and story-led video concepts for brands that need movement with meaning."
        compact
      />
      <Marquee label="Video Portfolio" />
      <section className="video-grid section-shell">
        {videoProjects.map((project, index) => (
          <article className="video-card reveal" key={project}>
            <div className="video-frame">
              <img src={imagePool[(index + 2) % imagePool.length]} alt="" />
              <span>Play</span>
            </div>
            <h3>{project}</h3>
          </article>
        ))}
      </section>
      <section className="next-page section-shell reveal">
        <h2>View our photo portfolio</h2>
        <Link className="primary-button" to="/photo-portfolio">
          Explore photos <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}

function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our clients"
        title="Built for brands that are ready to grow."
        copy="SOMI works with founders, SMEs, lifestyle brands, established businesses, personal brands, and launch teams."
        image={imagePool[4]}
      />
      <section className="review-grid section-shell">
        {clients.map((client) => (
          <article className="review-card reveal" key={client.name}>
            <div className="review-image">
              <img src={imagePool[clients.indexOf(client) % imagePool.length]} alt="" />
            </div>
            <h3>{client.name}</h3>
            <p>{client.quote}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Want to work with us?"
        title="Let's chat."
        copy="Drop your details below and we will shape the next step with you."
        image={imagePool[5]}
        compact
      />
      <ContactSection />
    </>
  );
}

function ContactTeaser() {
  return (
    <section className="contact-teaser section-shell reveal">
      <h2>Got something else in mind?</h2>
      <Link className="primary-button" to="/contact">
        Get in touch <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact section-shell">
      <div className="contact-copy reveal">
        <p className="eyebrow">Contact</p>
        <h2>Tell us what you want to make stick.</h2>
        <p>
          Whether you need identity, content, ads, PR, campaign direction, or a
          long-term creative partner, start here.
        </p>
        <div className="contact-links">
          <a href="mailto:hello@somiagency.com">
            <Mail size={18} /> hello@somiagency.com
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram size={18} /> Instagram
          </a>
        </div>
      </div>
      <form className="contact-form reveal">
        <label>
          Name
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          Project type
          <select defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option>Brand strategy</option>
            <option>Social media management</option>
            <option>Content creation</option>
            <option>Campaign execution</option>
          </select>
        </label>
        <label>
          Message
          <textarea placeholder="What should SOMI help you make stick?" />
        </label>
        <button type="button" className="primary-button">
          Send enquiry <ArrowUpRight size={18} />
        </button>
      </form>
    </section>
  );
}

function PortfolioStrip() {
  return (
    <section className="masonry section-shell">
      {photoProjects.slice(0, 6).map((project, index) => (
        <article className="masonry-card reveal" key={project}>
          <img src={imagePool[index % imagePool.length]} alt="" />
          <span>{project}</span>
        </article>
      ))}
    </section>
  );
}

function AppShell() {
  return (
    <div className="somi-site">
      <ScrollAndReveal />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/video-portfolio" element={<VideoPortfolioPage />} />
          <Route path="/photo-portfolio" element={<PhotoPortfolioPage />} />
          <Route path="/our-clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;

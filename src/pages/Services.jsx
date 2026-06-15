import { Link } from "react-router-dom";
import { useContent, usePage } from "../lib/content";

function SnakeText({ id, label, className = "" }) {
  return (
    <svg className={`snake-text ${className}`} viewBox="0 0 1500 360" aria-hidden="true">
      <path id={id} d="M -220 210 C 95 110, 230 230, 470 160 S 810 30, 1020 130 S 1315 300, 1700 160" />
      <text>
        <textPath href={`#${id}`} startOffset="-35%">
          {Array.from({ length: 8 }).map(() => `${label}  `).join("")}
          <animate attributeName="startOffset" from="-35%" to="10%" dur="14s" repeatCount="indefinite" />
        </textPath>
      </text>
    </svg>
  );
}

export default function Services() {
  const page = usePage("services");
  const { services, stats } = useContent();
  const hero = page.hero || {};
  const contentPortfolioBlock = page.contentPortfolioBlock || {};
  const socialResultsBlock = page.socialResultsBlock || {};
  const finalCta = page.finalCta || {};

  return (
    <>
      <section className="services-page-hero">
        <div>
          <h1>{hero.title}</h1>
          <h2>{hero.subtitle}</h2>
        </div>
        <p>{hero.description}</p>
      </section>

      <section className="z-service-grid">
        {services.filter((service) => service.isActive !== false).map((service) => (
          <article className="z-service-card reveal" key={service.title}>
            <img src={service.image} alt="" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <strong>WHAT'S INCLUDED:</strong>
            <ul>
              {(service.included || []).map((item) => (
                <li key={item}>~ {item}</li>
              ))}
            </ul>
            {service.linkText && <Link to={service.linkUrl || "/contact"}>{service.linkText}</Link>}
          </article>
        ))}
      </section>

      <div className="services-enquire">
        <Link to={page.enquireCta?.url || "/contact"}>{page.enquireCta?.text || "Enquire to work with us"}</Link>
      </div>

      <section className="content-portfolio-block reveal">
        <SnakeText id="contentSnakeTextPath" label={contentPortfolioBlock.marqueeText || "Content Creation Portfolio"} className="content-snake-text" />
        <img src={contentPortfolioBlock.image} alt="" />
        <div>
          <p>{contentPortfolioBlock.description}</p>
          <Link to={contentPortfolioBlock.buttonUrl || "/photo-portfolio"}>{contentPortfolioBlock.buttonText}</Link>
        </div>
      </section>

      <section className="social-results-block reveal">
        <SnakeText id="snakeTextPath" label={socialResultsBlock.marqueeText || "Social Management Results"} />
        <div>
          <p>{socialResultsBlock.description}</p>
          <Link to={socialResultsBlock.buttonUrl || "/contact"}>{socialResultsBlock.buttonText}</Link>
        </div>
        <div className="results-collage">
          {stats.filter((stat) => stat.isActive !== false).slice(0, 8).map((stat) => (
            <span key={stat.id || stat.label}>
              <b>{stat.label}</b>
              <strong>{Number(stat.value || 0).toLocaleString()}{stat.suffix || ""}</strong>
            </span>
          ))}
        </div>
      </section>

      <section className="services-final-cta reveal p-2">
        <img src={finalCta.image} alt="" />
        <h2 className="font-font">
          <em>{finalCta.title}</em>
        </h2>
        <Link to={finalCta.buttonUrl || "/contact"}>{finalCta.buttonText}</Link>
      </section>
    </>
  );
}

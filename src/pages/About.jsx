import PortfolioStrip from "../components/PortfolioStrip";
import { usePage } from "../lib/content";

export default function About() {
  const page = usePage("about");
  const hero = page.hero || {};

  return (
    <>
      <section className="about-header">
        <div className="about-header-copy reveal">
          <h1>
            {hero.titlePrefix} <em>{hero.emphasizedWord}</em> to <span>{hero.brandName}</span>
          </h1>
          {(hero.paragraphs || []).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about-header-image reveal">
          <img src={hero.image} alt="SOMI founders" />
        </div>
      </section>
      <section className="story section-shell reveal">
        {(page.story?.paragraphs || []).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      <section className="values section-shell">
        {(page.values || []).map((value) => (
          <article className="value-card reveal" key={value.title}>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </article>
        ))}
      </section>
      <PortfolioStrip />
    </>
  );
}

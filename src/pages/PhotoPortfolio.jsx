import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";
import PageHero from "../components/PageHero";
import { useContent, usePage } from "../lib/content";

export default function PhotoPortfolio() {
  const page = usePage("photo-portfolio");
  const { portfolio } = useContent();
  const projects = portfolio.filter((item) => item.type === "photo" && item.isActive !== false);

  return (
    <>
      <PageHero
        eyebrow={page.hero?.eyebrow}
        title={page.hero?.title}
        copy={page.hero?.description}
        image={page.hero?.image}
        compact
      />
      <Marquee label={page.marqueeTitle || "Photo Examples"} />
      <section className="masonry section-shell">
        {projects.map((project) => (
          <article className="masonry-card reveal" key={project.id || project.title}>
            <img src={project.image} alt={project.alt || ""} />
            <span>{project.title}</span>
          </article>
        ))}
      </section>
      <section className="next-page section-shell reveal">
        <h2 className="font-font">
          <em>{page.nextPageCta?.title}</em>
        </h2>
        <Link className="primary-button" to={page.nextPageCta?.buttonUrl || "/video-portfolio"}>
          {page.nextPageCta?.buttonText} <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}

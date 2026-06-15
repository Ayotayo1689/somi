import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";
import PageHero from "../components/PageHero";
import { useContent, usePage } from "../lib/content";

export default function VideoPortfolio() {
  const page = usePage("video-portfolio");
  const { portfolio } = useContent();
  const videos = portfolio.filter((item) => item.type === "video" && item.isActive !== false);

  return (
    <>
      <PageHero
        eyebrow={page.hero?.eyebrow}
        title={page.hero?.title}
        copy={page.hero?.description}
        image={page.hero?.image}
        compact
      />
      <Marquee label={page.marqueeTitle || "Video Portfolio"} />
      <section className="video-grid section-shell">
        {videos.map((project) => (
          <article className="video-card reveal" key={project.id || project.title}>
            <div className="video-frame">
              <img src={project.thumbnail || project.image} alt="" />
              <span>Play</span>
            </div>
            <h3>{project.title}</h3>
          </article>
        ))}
      </section>
      <section className="next-page section-shell reveal">
        <h2 className="font-font">
          <em>{page.nextPageCta?.title}</em>
        </h2>
        <Link className="primary-button" to={page.nextPageCta?.buttonUrl || "/photo-portfolio"}>
          {page.nextPageCta?.buttonText} <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}

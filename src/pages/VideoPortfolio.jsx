import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";
import PageHero from "../components/PageHero";
import { imagePool, videoProjects } from "../data/siteData";

export default function VideoPortfolio() {
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
        <h2 className="font-font">
          <em>View our photo portfolio</em>
        </h2>
        <Link className="primary-button" to="/photo-portfolio">
          Explore photos <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}

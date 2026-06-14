import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";
import PageHero from "../components/PageHero";
import { imagePool, photoProjects } from "../data/siteData";

export default function PhotoPortfolio() {
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
        <h2 className="font-font">
          <em>View our video portfolio</em>
        </h2>
        <Link className="primary-button" to="/video-portfolio">
          Explore videos <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}

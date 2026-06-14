import { imagePool, photoProjects } from "../data/siteData";

export default function PortfolioStrip() {
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

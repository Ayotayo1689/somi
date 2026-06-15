import { useContent } from "../lib/content";

export default function PortfolioStrip() {
  const { portfolio } = useContent();
  const projects = portfolio.filter((project) => project.type === "photo" && project.isActive !== false).slice(0, 6);

  return (
    <section className="masonry section-shell">
      {projects.map((project) => (
        <article className="masonry-card reveal" key={project.id || project.title}>
          <img src={project.image} alt="" />
          <span>{project.title}</span>
        </article>
      ))}
    </section>
  );
}

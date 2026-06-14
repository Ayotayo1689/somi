export default function PageHero({ eyebrow, title, copy, image, compact = false }) {
  return (
    <section className={`page-hero section-shell reveal ${compact ? "compact" : ""}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="font-font mb-6">
          <em>{title}</em>
        </h1>
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

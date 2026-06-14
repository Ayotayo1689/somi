import PageHero from "../components/PageHero";
import { clients, imagePool } from "../data/siteData";

export default function Clients() {
  return (
    <>
      <PageHero
        eyebrow="Our clients"
        title="Built for brands that are ready to grow."
        copy="SOMI works with founders, SMEs, lifestyle brands, established businesses, personal brands, and launch teams."
        image={imagePool[4]}
      />
      <section className="review-grid section-shell">
        {clients.map((client, index) => (
          <article className="review-card reveal" key={client.name}>
            <div className="review-image">
              <img src={imagePool[index % imagePool.length]} alt="" />
            </div>
            <h3>{client.name}</h3>
            <p>{client.quote}</p>
          </article>
        ))}
      </section>
    </>
  );
}

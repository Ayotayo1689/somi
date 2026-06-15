import PageHero from "../components/PageHero";
import { useContent, usePage } from "../lib/content";

export default function Clients() {
  const page = usePage("clients");
  const { clients } = useContent();
  const visibleClients = clients.filter((client) => client.showOnClientsPage !== false && client.isActive !== false);

  return (
    <>
      <PageHero
        eyebrow={page.hero?.eyebrow}
        title={page.hero?.title}
        copy={page.hero?.description}
        image={page.hero?.image}
      />
      <section className="review-grid section-shell">
        {visibleClients.map((client) => (
          <article className="review-card reveal" key={client.name}>
            <div className="review-image">
              <img src={client.image || client.logo || page.hero?.image} alt="" />
            </div>
            <h3>{client.name}</h3>
            <p>{client.quote}</p>
          </article>
        ))}
      </section>
    </>
  );
}

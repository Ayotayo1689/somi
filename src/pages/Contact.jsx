import ContactSection from "../components/ContactSection";
import PageHero from "../components/PageHero";
import { usePage } from "../lib/content";

export default function Contact() {
  const page = usePage("contact");

  return (
    <>
      <PageHero
        eyebrow={page.hero?.eyebrow}
        title={page.hero?.title}
        copy={page.hero?.description}
        image={page.hero?.image}
        compact
      />
      <ContactSection section={page.contactSection} />
    </>
  );
}

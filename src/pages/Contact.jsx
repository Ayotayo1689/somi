import ContactSection from "../components/ContactSection";
import PageHero from "../components/PageHero";
import { imagePool } from "../data/siteData";

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Want to work with us?"
        title="Let's chat."
        copy="Drop your details below and we will shape the next step with you."
        image={imagePool[5]}
        compact
      />
      <ContactSection />
    </>
  );
}

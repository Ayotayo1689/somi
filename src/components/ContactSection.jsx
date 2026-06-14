import { ArrowUpRight, Instagram, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="contact section-shell">
      <div className="contact-copy reveal ">
        <p className="eyebrow">Contact</p>
        <h2 className="font-font">
          <em>Tell us what you want to make stick.</em>
        </h2>
        <p>
          Whether you need identity, content, ads, PR, campaign direction, or a
          long-term creative partner, start here.
        </p>
        <div className="contact-links">
          <a href="mailto:hello@somiagency.com">
            <Mail size={18} /> hello@somiagency.com
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram size={18} /> Instagram
          </a>
        </div>
      </div>
      <form className="contact-form reveal">
        <label>
          Name
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          Project type
          <select defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option>Brand strategy</option>
            <option>Social media management</option>
            <option>Content creation</option>
            <option>Campaign execution</option>
          </select>
        </label>
        <label>
          Message
          <textarea placeholder="What should SOMI help you make stick?" />
        </label>
        <button type="button" className="primary-button">
          Send enquiry <ArrowUpRight size={18} />
        </button>
      </form>
    </section>
  );
}

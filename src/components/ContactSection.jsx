import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../lib/api";
import { usePage } from "../lib/content";

export default function ContactSection({ section }) {
  const contactPage = usePage("contact");
  const content = section || contactPage.contactSection || {};
  const [form, setForm] = useState({ name: "", email: "", projectType: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await api.createEnquiry({ ...form, sourcePage: window.location.pathname });
      setForm({ name: "", email: "", projectType: "", message: "" });
      toast.success("Enquiry sent");
    } catch (error) {
      toast.error(error.message || "Could not send enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact section-shell">
      <div className="contact-copy reveal ">
        <p className="eyebrow">{content.eyebrow || "Contact"}</p>
        <h2 className="font-font">
          <em>{content.title}</em>
        </h2>
        <p>{content.description}</p>
        <div className="contact-links">
          <a href={`mailto:${content.email}`}>
            <Mail size={18} /> {content.email}
          </a>
          <a href={content.instagramUrl || "https://instagram.com"} target="_blank" rel="noreferrer">
            <Instagram size={18} /> Instagram
          </a>
        </div>
      </div>
      <form className="contact-form reveal" onSubmit={submitForm}>
        <label>
          Name
          <input name="name" type="text" placeholder="Your name" value={form.name} onChange={updateField} required />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={updateField} required />
        </label>
        <label>
          Project type
          <select name="projectType" value={form.projectType} onChange={updateField} required>
            <option value="" disabled>
              Choose one
            </option>
            {(content.projectTypes || []).map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Message
          <textarea name="message" placeholder="What should SOMI help you make stick?" value={form.message} onChange={updateField} required />
        </label>
        <button type="submit" className="primary-button" disabled={submitting}>
          {submitting ? "Sending..." : content.submitButtonText || "Send enquiry"} <ArrowUpRight size={18} />
        </button>
      </form>
    </section>
  );
}

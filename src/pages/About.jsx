import PortfolioStrip from "../components/PortfolioStrip";
import { imagePool } from "../data/siteData";

export default function About() {
  return (
    <>
      <section className="about-header">
        <div className="about-header-copy reveal">
          <h1>
            Say <em>hello</em> to <span>SOMI</span>
          </h1>
          <p>Hello! We are the creative founders behind SOMI Agency.</p>
          <p>
            Here is a little backstory: we have always been drawn to helping
            people and brands communicate better. From making films for friends
            to documenting ideas, campaigns, launches, and everyday moments,
            creating content is second nature to us.
          </p>
          <p>
            As we began offering <strong>brand strategy</strong> and{" "}
            <strong>social media management</strong> services independently, we
            noticed the same thing with many clients: they were overwhelmed by
            creating content that really <em>sticks</em> and speaks to their
            audience.
          </p>
          <p>
            After a few strategy sessions and late-night chats, we knew it was
            time to build something that delivered exactly what brands needed:
            creative direction, content, and systems that attract the right
            people and build <em>real</em> connections.
          </p>
          <p>
            And so, SOMI was born. An agency run by passionate creatives
            dedicated to helping brands produce authentic, engaging content that
            sparks conversations and builds trust.
          </p>
          <p>We are so excited to have you here. Here is to making brands stick!</p>
        </div>
        <div className="about-header-image reveal">
          <img src={imagePool[0]} alt="SOMI founders" />
        </div>
      </section>
      <section className="story section-shell reveal">
        <p>
          SOMI was created by two creatives naturally drawn to helping brands
          grow. We do not just execute tasks. We partner at a strategic level so
          every visual, caption, campaign, and touchpoint has a clear job.
        </p>
        <p>
          Our mission is to provide creative vision, strategic clarity, and
          execution excellence for ambitious brands at every stage of their
          journey.
        </p>
      </section>
      <section className="values section-shell">
        {["Bold & Decisive", "Warm & Collaborative", "Creative & Intentional", "Sharp & Professional"].map(
          (value) => (
            <article className="value-card reveal" key={value}>
              <h3>{value}</h3>
              <p>
                Strong ideas, human communication, polished delivery, and
                creative choices backed by strategy.
              </p>
            </article>
          ),
        )}
      </section>
      <PortfolioStrip />
    </>
  );
}

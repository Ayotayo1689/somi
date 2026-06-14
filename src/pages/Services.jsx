import { Link } from "react-router-dom";
import { imagePool, zServices } from "../data/siteData";

export default function Services() {
  return (
    <>
      <section className="services-page-hero">
        <div>
          <h1>Our Services</h1>
          <h2>Strategic content creation & social media management</h2>
        </div>
        <p>
          Ready to take your content to the next level & grow on socials?
          Whether you need captivating photo and video content, strategic social
          media management, or a combination of both, we are here to help you
          achieve your goals and start seeing real results!
        </p>
      </section>

      <section className="z-service-grid">
        {zServices.map((service) => (
          <article className="z-service-card reveal" key={service.title}>
            <img src={service.image} alt="" />
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
            <strong>WHAT'S INCLUDED:</strong>
            <ul>
              {service.included.map((item) => (
                <li key={item}>~ {item}</li>
              ))}
            </ul>
            {service.link && <Link to="/contact">{service.link}</Link>}
          </article>
        ))}
      </section>

      <div className="services-enquire">
        <Link to="/contact">Enquire to work with us</Link>
      </div>

      <section className="content-portfolio-block reveal">
        <svg className="snake-text content-snake-text" viewBox="0 0 1500 360" aria-hidden="true">
          <path
            id="contentSnakeTextPath"
            d="M -220 210 C 95 110, 230 230, 470 160 S 810 30, 1020 130 S 1315 300, 1700 160"
          />
          <text>
            <textPath href="#contentSnakeTextPath" startOffset="-35%">
              Content Creation Portfolio&nbsp;&nbsp; Content Creation Portfolio&nbsp;&nbsp;
              Content Creation Portfolio&nbsp;&nbsp; Content Creation Portfolio&nbsp;&nbsp;
              Content Creation Portfolio&nbsp;&nbsp; Content Creation Portfolio&nbsp;&nbsp;
              Content Creation Portfolio&nbsp;&nbsp; Content Creation Portfolio&nbsp;&nbsp;
              <animate
                attributeName="startOffset"
                from="-35%"
                to="10%"
                dur="14s"
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>
        <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80" alt="" />
        <div>
          <p>
            Our content creation packages are ideal for clients seeking fresh,
            high-quality content for their social channels. From relatable
            short-form videos to aesthetic, professional stills, we offer both
            photo and video options to fit your content needs.
          </p>
          <Link to="/photo-portfolio">Content Creation Portfolio</Link>
        </div>
      </section>

      <section className="social-results-block reveal">
        <svg className="snake-text" viewBox="0 0 1500 360" aria-hidden="true">
          <path
            id="snakeTextPath"
            d="M -220 270 C 90 210, 195 105, 430 145 S 780 245, 990 135 S 1290 -10, 1700 70"
          />
          <text>
            <textPath href="#snakeTextPath" startOffset="-10%">
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              Social Management Results&nbsp;&nbsp; Social Management Results&nbsp;&nbsp;
              <animate
                attributeName="startOffset"
                from="-35%"
                to="10%"
                dur="14s"
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>
        <div>
          <p>
            For businesses looking to elevate their social media presence and
            hand over the daily task of running their socials. If you're
            struggling with your strategy or not seeing sales through social
            media, this is for you!
          </p>
          <Link to="/contact">Work with us!</Link>
        </div>
        <div className="results-collage">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index}>
              <b>{index % 2 ? "Accounts reached" : "Profile activity"}</b>
              <strong>{[9305, 103644, 42151, 7564][index % 4].toLocaleString()}</strong>
            </span>
          ))}
        </div>
      </section>

      <section className="services-final-cta reveal p-2">
        <img src={imagePool[2]} alt="" />
        <h2 className="font-font">
          <em>Got something else in mind?</em>
        </h2>
        <Link to="/contact"> get in touch!</Link>
      </section>
    </>
  );
}

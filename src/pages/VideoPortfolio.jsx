import { useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";
import PageHero from "../components/PageHero";
import { useContent, usePage } from "../lib/content";

export default function VideoPortfolio() {
  const page = usePage("video-portfolio");
  const { portfolio } = useContent();
  const videoRefs = useRef({});
  const [playingId, setPlayingId] = useState("");
  const videos = portfolio.filter((item) => item.type === "video" && item.isActive !== false);

  const toggleVideo = async (project) => {
    const id = project.id || project.title;
    const video = videoRefs.current[id];
    if (!video || !project.videoUrl) return;

    if (playingId === id && !video.paused) {
      video.pause();
      setPlayingId("");
      return;
    }

    Object.entries(videoRefs.current).forEach(([key, item]) => {
      if (key !== id) item?.pause();
    });

    try {
      await video.play();
      setPlayingId(id);
    } catch {
      setPlayingId("");
    }
  };

  return (
    <>
      <PageHero
        eyebrow={page.hero?.eyebrow}
        title={page.hero?.title}
        copy={page.hero?.description}
        image={page.hero?.image}
        compact
      />
      <Marquee label={page.marqueeTitle || "Video Portfolio"} />
      <section className="video-grid section-shell">
        {videos.map((project) => (
          <article className="video-card reveal" key={project.id || project.title}>
            <div className="video-frame">
              {project.videoUrl ? (
                <video
                  ref={(node) => {
                    if (node) videoRefs.current[project.id || project.title] = node;
                  }}
                  src={project.videoUrl}
                  poster={project.thumbnail || project.image}
                  playsInline
                  preload="metadata"
                  onPause={() => {
                    const id = project.id || project.title;
                    setPlayingId((current) => (current === id ? "" : current));
                  }}
                  onEnded={() => setPlayingId("")}
                />
              ) : (
                <img src={project.thumbnail || project.image} alt="" />
              )}
              <button
                type="button"
                className="video-play-toggle"
                onClick={() => toggleVideo(project)}
                disabled={!project.videoUrl}
                aria-label={playingId === (project.id || project.title) ? `Pause ${project.title}` : `Play ${project.title}`}
              >
                {playingId === (project.id || project.title) ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" />}
              </button>
            </div>
            <h3>{project.title}</h3>
          </article>
        ))}
      </section>
      <section className="next-page section-shell reveal">
        <h2 className="font-font">
          <em>{page.nextPageCta?.title}</em>
        </h2>
        <Link className="primary-button" to={page.nextPageCta?.buttonUrl || "/photo-portfolio"}>
          {page.nextPageCta?.buttonText} <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}

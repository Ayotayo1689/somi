export default function Marquee({ label }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={`${label}-${index}`}>
            {label} <b>*</b>
          </span>
        ))}
      </div>
    </div>
  );
}

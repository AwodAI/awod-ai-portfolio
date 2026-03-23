const FIT_CARDS = [
  {
    title: "Best fit clients",
    copy: [
      "Teams that value clear direction, fast feedback, and strong visual quality.",
      "Projects with clear goals and realistic timelines.",
    ],
    className: "",
  },
  {
    title: "Not the right fit",
    copy: [
      "Volume-only requests with no quality standards.",
      "Projects without basic briefing clarity.",
    ],
    className: "about-fit-card-alt",
  },
] as const;

const EXPECTATION_PILLARS = [
  "Direct communication",
  "Fast iteration loops",
  "High quality control",
  "Founder-level accountability",
] as const;

export function CollaborationFitSection() {
  return (
    <section className="section guided-section about-fit-section">
      <div className="shell about-fit-shell">
        <header className="page-section-head">
          <p className="home-chapter-tag">Chapter 02</p>
          <p className="section-kicker">Collaboration Fit</p>
          <h2 className="section-title">How collaboration works.</h2>
        </header>
        <div className="about-fit-layout">
          <div className="about-fit-stack">
            {FIT_CARDS.map((card) => (
              <article
                className={`about-fit-card ${card.className}`.trim()}
                key={card.title}
              >
                <h3>{card.title}</h3>
                {card.copy.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
          <article className="about-fit-card about-fit-card-pillars">
            <h3>What you can expect</h3>
            <div className="about-pillars" aria-label="Working style">
              {EXPECTATION_PILLARS.map((pillar) => (
                <span key={pillar}>
                  {pillar}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

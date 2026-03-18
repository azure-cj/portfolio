"use client";

const SERVICES = [
  { n: "01", title: "Web Development",       desc: "Responsive and scalable web apps built for performance and growth.",                 tag: "development" },
  { n: "02", title: "Full Stack Development", desc: "End-to-end solutions from database architecture to polished UI.",                    tag: "development" },
  { n: "03", title: "Mobile Development",     desc: "Cross-platform mobile applications for Android and iOS.",                            tag: "mobile"      },
  { n: "04", title: "UI/UX Design",           desc: "User-centered interfaces and experiences that drive engagement.",                    tag: "design"      },
  { n: "05", title: "E-Commerce",             desc: "Scalable online store solutions that convert visitors to customers.",                tag: "commerce"    },
  { n: "06", title: "API Development",        desc: "RESTful and GraphQL API design built for reliability and scale.",                    tag: "backend"     },
];

export default function Services() {
  return (
    <section
      id="services"
      className="px-6 py-28 md:px-16 lg:px-24"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <p className="font-jetbrains text-xs tracking-widest mb-4"
            style={{ color: "var(--muted)" }}>
            [ WHAT WE DO ]
          </p>
          <h2
            className="font-syne font-black text-5xl leading-tight text-[#f5f5f5]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Our{" "}
            <span className="word-highlight">Expertise</span>
            {" "}&amp;
            <br />
            Services.
          </h2>
          <p className="mt-4 max-w-sm text-sm" style={{ color: "var(--muted)" }}>
            We offer end-to-end digital solutions — from concept to launch.
          </p>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ n, title, desc, tag }) => (
            <li
              key={n}
              className="group relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-glow)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {/* Watermark number */}
              <span
                className="font-syne font-black text-6xl select-none"
                style={{ color: "rgba(185,255,75,0.08)" }}
                aria-hidden="true"
              >
                {n}
              </span>

              {/* Title */}
              <h3 className="font-syne font-bold text-xl text-[#f5f5f5] mt-4">
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                {desc}
              </p>

              {/* Tag */}
              <span
                className="mt-5 inline-block w-fit rounded-full px-3 py-1 font-jetbrains text-xs"
                style={{
                  background: "var(--accent-dim)",
                  color: "var(--accent)",
                }}
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

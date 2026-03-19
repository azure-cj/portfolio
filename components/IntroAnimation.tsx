"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

interface IntroAnimationProps {
  onDismiss: () => void;
}

const BLOCKS = [
  { top: "18%", left: "12%", size: 52, color: "accent",  delay: 0   },
  { top: "14%", left: "58%", size: 36, color: "dark",    delay: 80  },
  { top: "58%", left: "18%", size: 44, color: "subtle",  delay: 160 },
  { top: "22%", left: "72%", size: 60, color: "accent",  delay: 240 },
  { top: "68%", left: "62%", size: 32, color: "dark",    delay: 320 },
  { top: "42%", left: "8%",  size: 28, color: "subtle",  delay: 400 },
  { top: "72%", left: "38%", size: 48, color: "dark",    delay: 480 },
  { top: "8%",  left: "38%", size: 40, color: "subtle",  delay: 560 },
] as const;

function blockStyle(color: string): React.CSSProperties {
  if (color === "accent") return { background: "#b9ff4b", boxShadow: "0 0 24px rgba(185,255,75,0.4)" };
  if (color === "dark")   return { background: "#0f0f0f", border: "1px solid rgba(185,255,75,0.3)" };
  return { background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" };
}

export default function IntroAnimation({ onDismiss }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"enter" | "idle" | "exit">("enter");

  /* Enable dismiss after 2.5s */
  useEffect(() => {
    const t = setTimeout(() => setPhase("idle"), 2500);
    return () => clearTimeout(t);
  }, []);

  function handleDismiss() {
    if (phase !== "idle") return;
    setPhase("exit");
    setTimeout(() => onDismiss(), 800);
  }

  return (
    <>
      <style>{`
        .intro-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: #0a0a0a;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .intro-exit {
          animation: overlayFade 0.5s ease-out 0.3s forwards;
          pointer-events: none;
        }
        .block-enter {
          opacity: 0;
          animation: blockSnap 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .block-exit {
          animation: blockScatter 0.4s ease-in forwards;
        }
        @keyframes blockSnap {
          from { opacity:0; transform:scale(0.2); }
          to   { opacity:1; transform:scale(1);   }
        }
        @keyframes blockScatter {
          from { opacity:1; transform:scale(1); }
          to   { opacity:0; transform:scale(0) rotate(90deg) translate(60px,-60px); }
        }
        @keyframes overlayFade {
          from { opacity:1; }
          to   { opacity:0; }
        }
        .name-wrapper {
          display:flex; flex-direction:column; align-items:center; gap:12px;
        }
        .name-row { display:flex; overflow:hidden; }
        .name-node {
          font-family:'JetBrains Mono',monospace;
          font-size:clamp(3rem,8vw,6rem); font-weight:900; color:#f5f5f5;
          opacity:0;
          animation:slideFromLeft 0.6s cubic-bezier(0.16,1,0.3,1) 1.4s forwards;
        }
        .name-shift {
          font-family:'JetBrains Mono',monospace;
          font-size:clamp(3rem,8vw,6rem); font-weight:900; color:#b9ff4b;
          opacity:0;
          animation:slideFromRight 0.6s cubic-bezier(0.16,1,0.3,1) 1.4s forwards;
        }
        .name-tagline {
          font-family:'JetBrains Mono',monospace; font-size:0.7rem;
          letter-spacing:0.25em; text-transform:uppercase; color:#52525b;
          opacity:0; animation:fadeSlideUp 0.4s ease 1.9s forwards;
        }
        .load-bar-track {
          width:120px; height:2px; background:#1a1a1a;
          border-radius:2px; overflow:hidden;
          opacity:0; animation:fadeIn 0.1s ease 2.0s forwards;
        }
        .load-bar-fill {
          height:100%; width:0%; background:#b9ff4b;
          box-shadow:0 0 8px rgba(185,255,75,0.6); border-radius:2px;
          animation:loadBar 0.9s linear 2.0s forwards;
        }
        .enter-btn {
          display:inline-flex; align-items:center; gap:8px;
          border:1px solid rgba(185,255,75,0.4);
          color:#ffffff; background:transparent;
          font-family:'JetBrains Mono',monospace;
          font-size:0.75rem; letter-spacing:0.2em; text-transform:uppercase;
          padding:12px 28px; border-radius:999px; cursor:pointer;
          opacity:0; animation:fadeSlideUp 0.4s ease 2.6s forwards;
          transition:all 0.2s ease; margin-top:2rem;
        }
        .enter-btn:hover:not(:disabled) {
          background:rgba(185,255,75,0.1);
          border-color:#b9ff4b;
          box-shadow:0 0 20px rgba(185,255,75,0.2);
        }
        .enter-btn:disabled {
          pointer-events:none; opacity:0.4;
        }
        @keyframes slideFromLeft {
          from { opacity:0; transform:translateX(-50px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideFromRight {
          from { opacity:0; transform:translateX(50px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes loadBar {
          from { width:0%; }
          to   { width:100%; }
        }
        @keyframes fadeIn {
          to { opacity:1; }
        }
      `}</style>

      <div className={`intro-overlay${phase === "exit" ? " intro-exit" : ""}`} aria-hidden="true">
        {/* Blocks */}
        {BLOCKS.map((b, i) => (
          <div
            key={i}
            className={phase === "exit" ? "block-exit" : "block-enter"}
            style={{
              position: "absolute",
              top: b.top, left: b.left,
              width: b.size, height: b.size,
              borderRadius: 6,
              animationDelay: phase === "exit" ? `${i * 30}ms` : `${b.delay}ms`,
              ...blockStyle(b.color),
            }}
          />
        ))}

        {/* Brand + button */}
        <div className="name-wrapper" style={{ position: "relative", zIndex: 10 }}>
          <div className="name-row">
            <span className="name-node">Node</span>
            <span className="name-shift">Shift</span>
          </div>
          <p className="name-tagline">Full Stack Development Studio</p>
          <div className="load-bar-track">
            <div className="load-bar-fill" />
          </div>
          <button
            className="enter-btn"
            onClick={handleDismiss}
            disabled={phase !== "idle"}
            aria-label="Enter site"
          >
            Click to Continue
            <ArrowRight size={14} color="#b9ff4b" />
          </button>
        </div>
      </div>
    </>
  );
}

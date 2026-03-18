"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About",    href: "/about"    },
  { label: "Projects", href: "/projects" },
  { label: "Skills",   href: "/#skills"  },
  { label: "Contact",  href: "/#contact" },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      const doc  = document.documentElement;
      const max  = doc.scrollHeight - doc.clientHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] transition-all duration-75"
        style={{
          width: `${scrollPct}%`,
          background: "var(--accent)",
          boxShadow: "0 0 8px var(--accent-glow)",
        }}
      />

      <nav
        className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-6"
        style={{ background: "rgba(10,10,10,0.85)" }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 font-syne text-lg font-bold text-[#f5f5f5] transition-opacity hover:opacity-80"
        >
          <span style={{ color: "var(--accent)" }}>·</span>
          NodeShift
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href.replace("/#", "/"));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "font-jetbrains text-sm transition-colors duration-200",
                    isActive
                      ? "text-[#f5f5f5] border-b-2"
                      : "text-zinc-500 hover:text-[#f5f5f5]",
                  ].join(" ")}
                  style={isActive ? { borderColor: "var(--accent)" } : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hire Me CTA */}
        <Link
          href="/#contact"
          className="hidden rounded-full px-4 py-2 font-jetbrains text-sm transition-all duration-200 md:block"
          style={{
            border: "1px solid var(--accent)",
            color: "var(--accent)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--accent)";
            (e.currentTarget as HTMLElement).style.color = "#0a0a0a";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--accent)";
          }}
        >
          Hire Us
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:text-[#f5f5f5] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <ul
          className="flex flex-col px-6 py-4 md:hidden"
          style={{ background: "#0a0a0a", borderTop: "1px solid var(--border)" }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block py-3 font-jetbrains text-sm text-zinc-400 transition-colors hover:text-[#f5f5f5]"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="inline-block rounded-full px-4 py-2 font-jetbrains text-sm"
              style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}
            >
              Hire Us
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

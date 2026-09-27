"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Banner } from "@/constants/banners";

/**
 * Hero section — dark background dengan cursor ambience light effect.
 * Client component karena butuh mouse tracking.
 */
export function Hero({ banner }: { banner: Banner }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let rafId = 0;
    let hovered = false;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (!hovered) {
        hovered = true;
        glow.style.opacity = "1";
      }
    };
    const onLeave = () => {
      hovered = false;
      glow.style.opacity = "0";
    };

    const tick = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;
      rafId = requestAnimationFrame(tick);
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-[640px] md:min-h-[720px] flex items-end hero-bg-dark overflow-hidden"
    >
      <div className="absolute inset-0 industrial-grid opacity-60" />
      <div ref={glowRef} className="hero-cursor-glow" />
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 720"
      >
        <path
          className="cable-line"
          d="M0,560 C 300,480 500,620 760,540 C 1020,460 1200,560 1440,500"
        />
        <path
          className="cable-line"
          d="M0,620 C 320,660 520,540 780,600 C 1040,660 1240,600 1440,640"
        />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(69, 150, 241, 0.18), transparent 55%)",
        }}
      />
      <div
        className="hero-glow"
        style={{
          top: "10%",
          right: "8%",
          width: 340,
          height: 340,
          background: "var(--color-secondary)",
        }}
      />
      <div
        className="hero-glow"
        style={{
          bottom: "5%",
          left: "5%",
          width: 280,
          height: 280,
          background: "var(--color-primary)",
          animationDelay: "2s",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-40 pb-20 md:pb-28 w-full">
        <div className="max-w-2xl reveal">
          <div className="flex items-center gap-2 mb-6">
            <span
              className="h-px w-8"
              style={{ background: "var(--color-primary)" }}
            />
            <span className="text-[13px] font-semibold tracking-wide text-white/70 uppercase">
              {banner.eyebrow}
            </span>
          </div>
          <h1 className="text-[34px] leading-[1.15] sm:text-5xl sm:leading-[1.12] md:text-[56px] md:leading-[1.08] font-extrabold text-white tracking-tight">
            {banner.title}
          </h1>
          <p className="mt-6 text-[15.5px] md:text-lg text-white/70 leading-relaxed max-w-xl">
            {banner.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Link href={banner.ctaPrimary.href} className="btn btn-primary">
              {banner.ctaPrimary.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {banner.ctaSecondary && (
              <Link href={banner.ctaSecondary.href} className="btn btn-outline">
                {banner.ctaSecondary.label}
              </Link>
            )}
          </div>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-3 gap-6 max-w-xl border-t border-white/10 pt-8 reveal">
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-white">
              1992
            </p>
            <p className="text-xs md:text-sm text-white/50 mt-1">Established</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-white">
              SUPREME
            </p>
            <p className="text-xs md:text-sm text-white/50 mt-1">
              Cable Distributor
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-white">
              Indonesia
            </p>
            <p className="text-xs md:text-sm text-white/50 mt-1">
              Service Coverage
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

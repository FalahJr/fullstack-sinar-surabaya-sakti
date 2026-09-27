"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveal-on-scroll: adds `.is-visible` ke elements dengan class `.reveal`
 * ketika masuk viewport. Client component tapi ringan (single observer).
 *
 * Re-run setiap kali `pathname` berubah karena root layout tidak remount
 * saat client-side navigation — tanpa dependency ini, elemen `.reveal` di
 * halaman baru tidak pernah ter-observe dan tetap opacity:0 (bug: konten
 * blank saat navigasi balik ke halaman yang sudah pernah dibuka).
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");

    // Auto-stagger dari posisi sibling
    els.forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      const siblings = Array.from(parent.children).filter(
        (c): c is HTMLElement =>
          c instanceof HTMLElement && c.classList.contains("reveal"),
      );
      if (siblings.length > 1) {
        const idx = siblings.indexOf(el);
        el.style.setProperty("--reveal-delay", `${Math.min(idx * 90, 540)}ms`);
      }
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}

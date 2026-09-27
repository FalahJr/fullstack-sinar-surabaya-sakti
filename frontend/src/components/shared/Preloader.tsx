"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Preloader — logo + progress bar. Auto-hide setelah page load.
 * Client component karna butuh timer & DOM manipulation.
 */
export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    document.body.classList.add("preloader-active");

    if (document.readyState === "complete") {
      loadedRef.current = true;
    } else {
      const onLoad = () => {
        loadedRef.current = true;
      };
      window.addEventListener("load", onLoad, { once: true });
    }

    let raf = 0;
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        const target = loadedRef.current ? 100 : 88;
        const inc = loadedRef.current ? 14 : Math.random() * 9 + 3;
        return Math.min(prev + inc, target);
      });
    }, 90);

    const safety = window.setTimeout(() => {
      loadedRef.current = true;
    }, 5000);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(safety);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && !hidden) {
      const t = window.setTimeout(() => {
        setHidden(true);
        document.body.classList.remove("preloader-active");
        window.setTimeout(() => setRemoved(true), 800);
      }, 250);
      return () => window.clearTimeout(t);
    }
  }, [progress, hidden]);

  if (removed) return null;

  return (
    <div
      id="preloader"
      className={hidden ? "preloader-hide" : ""}
      aria-hidden="true"
    >
      <div className="preloader-logo">
        <span className="preloader-mark">S</span>
        <span>
          <span className="preloader-name block">SINAR SURABAYASAKTI</span>
          <span className="preloader-sub block">SUPREME Cable Distributor</span>
        </span>
      </div>
      <div className="preloader-progress">
        <div className="preloader-bar">
          <div
            className="preloader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="preloader-pct">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}

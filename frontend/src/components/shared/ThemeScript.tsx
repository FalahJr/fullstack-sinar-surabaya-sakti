"use client";

/**
 * ThemeScript — inline script inject di <head> untuk apply theme
 * SEBELUM first paint (mencegah FOUC/flash saat dark mode aktif).
 */
export function ThemeScript() {
  const code = `
    (function () {
      try {
        var t = localStorage.getItem('theme');
        if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

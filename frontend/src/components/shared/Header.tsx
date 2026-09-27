"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { navigation, routes } from "@/config/routes";
import { cn } from "@/lib/utils";

/** Determine if link is active based on current pathname */
function isActive(pathname: string, href?: string, id?: string): boolean {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  if (id === "products") return pathname.startsWith("/products");
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const headerClass = cn(
    "fixed top-0 left-0 right-0 z-50",
    isHome && !scrolled ? "header-transparent" : "header-solid",
  );

  return (
    <>
      <header id="site-header" className={headerClass}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-[76px]">
            <Link
              href={routes.home}
              className="flex items-center gap-3 shrink-0"
            >
              <span
                className="w-10 h-10 rounded-sm flex items-center justify-center font-extrabold text-white text-lg"
                style={{ background: "var(--color-primary)" }}
              >
                S
              </span>
              <span className="brand-name leading-tight">
                <span className="block font-bold text-[15px] tracking-tight">
                  SINAR SURABAYASAKTI
                </span>
                <span className="block text-[11px] font-medium opacity-70 -mt-0.5">
                  SUPREME Cable Distributor
                </span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navigation.main.map((item) => {
                if ("children" in item) {
                  return (
                    <div key={item.id} className="relative group">
                      <button
                        type="button"
                        className="nav-link py-2 flex items-center gap-1"
                      >
                        {item.label}
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                        <div className="nav-dropdown">
                          {item.children.map((child) => {
                            const isPrimary =
                              "primary" in child && child.primary;
                            return (
                              <div key={child.href}>
                                {isPrimary && (
                                  <div
                                    className="my-1 h-px mx-3"
                                    style={{
                                      background: "var(--color-line)",
                                    }}
                                  />
                                )}
                                <Link
                                  href={child.href}
                                  className={isPrimary ? "font-semibold" : ""}
                                >
                                  {child.label}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "nav-link py-2",
                      isActive(pathname, item.href, item.id) &&
                        "font-semibold nav-active",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <Link href={routes.contact} className="btn btn-primary">
                Hubungi Kami
              </Link>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                className="p-2 -mr-2"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu
                  className="w-6 h-6"
                  style={{
                    color: isHome && !scrolled ? "#fff" : "var(--color-ink)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay + panel */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "mobile-menu fixed top-0 right-0 h-full w-[82%] max-w-sm z-50 shadow-2xl",
          mobileOpen && "open",
        )}
      >
        <div className="h-full flex flex-col">
          <div
            className="flex items-center justify-between h-[76px] px-5 border-b"
            style={{ borderColor: "var(--color-line)" }}
          >
            <span className="font-bold text-sm">MENU</span>
            <button
              type="button"
              className="p-2 -mr-2"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1 text-[15px]">
            <Link href={routes.home} className="py-3 border-b font-medium">
              Home
            </Link>
            <Link href={routes.about} className="py-3 border-b font-medium">
              About Us
            </Link>
            <Link
              href={routes.companyProfile}
              className="py-3 border-b font-medium"
            >
              Company Profile
            </Link>
            <Link
              href={routes.visionMission}
              className="py-3 border-b font-medium"
            >
              Vision & Mission
            </Link>
            <Link
              href={routes.productsByCategory("kabel-listrik")}
              className="py-3 border-b font-medium"
            >
              Kabel Listrik
            </Link>
            <Link
              href={routes.productsByCategory("kabel-telekomunikasi")}
              className="py-3 border-b font-medium"
            >
              Kabel Telekomunikasi
            </Link>
            <Link href={routes.downloads} className="py-3 border-b font-medium">
              Download Center
            </Link>
            <Link href={routes.contact} className="py-3 border-b font-medium">
              Contact
            </Link>
            <Link
              href={routes.contact}
              className="btn btn-primary mt-6 justify-center"
            >
              Hubungi Kami
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}

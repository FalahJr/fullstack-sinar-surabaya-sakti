import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** className merger — combine clsx + tailwind-merge untuk kelola classes. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Absolute URL helper — untuk metadata & canonical URLs */
export function absoluteUrl(path: string, base?: string): string {
  const origin = base || process.env.NEXT_PUBLIC_SITE_URL || "";
  if (!origin) return path;
  return `${origin.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

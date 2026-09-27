"use client";

import { useState } from "react";
import { Download, FileText, Info } from "lucide-react";
import type { DownloadDocument } from "@/types";
import { downloadCategories } from "@/constants/downloads";
import { cn } from "@/lib/utils";

interface Props {
  documents: DownloadDocument[];
}

export function DownloadsExplorer({ documents }: Props) {
  const [active, setActive] = useState<string>("All");

  const list =
    active === "All"
      ? documents
      : documents.filter((d) => d.category === active);

  return (
    <>
      <section
        className="py-10 border-b"
        style={{ borderColor: "var(--color-line)" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-wrap gap-2">
            {downloadCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={cn(
                  "tab-btn px-4 py-2 text-sm font-semibold rounded-sm border transition-colors",
                  active === cat
                    ? "text-white"
                    : "text-[var(--color-ink-soft)] border-[var(--color-line)] hover:border-[var(--color-ink)]",
                )}
                style={
                  active === cat
                    ? {
                        background: "var(--color-primary)",
                        borderColor: "var(--color-primary)",
                      }
                    : undefined
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          {list.length === 0 ? (
            <p className="text-center text-sm text-[var(--color-ink-soft)] py-16">
              No documents found.
            </p>
          ) : (
            <div className="space-y-3">
              {list.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between gap-4 card-surface rounded-xl px-5 py-4 hover:border-[var(--color-primary)] transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className="w-11 h-11 shrink-0 rounded-sm flex items-center justify-center"
                      style={{ background: "rgba(224,13,48,0.08)" }}
                    >
                      <FileText
                        className="w-5 h-5"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[15px] truncate">
                        {doc.title}
                      </p>
                      <p className="text-xs text-[var(--color-ink-soft)] mt-0.5">
                        {doc.category} &middot; {doc.fileType}
                      </p>
                    </div>
                  </div>
                  <a
                    href={doc.fileUrl}
                    className="btn btn-outline-dark shrink-0 !py-2 !px-4 text-xs"
                    download
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                </div>
              ))}
            </div>
          )}

          <div
            className="mt-10 flex items-start gap-3 border border-dashed rounded-sm p-5"
            style={{ borderColor: "var(--color-line)" }}
          >
            <Info
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: "var(--color-secondary)" }}
            />
            <p className="text-sm text-[var(--color-ink-soft)]">
              File pada halaman ini masih berupa placeholder. Tautan unduhan
              resmi akan ditambahkan setelah dokumen tersedia dari PT Sinar
              Surabayasakti.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

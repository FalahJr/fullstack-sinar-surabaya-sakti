import {
  Factory,
  HardHat,
  Network,
  RadioTower,
  Store,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icons: LucideIcon[] = [HardHat, Store, Zap, RadioTower, Factory, Network];

interface Props {
  industries: string[];
}

export function Industries({ industries }: Props) {
  return (
    <section className="py-20 md:py-24 text-white section-dark-bg">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-xl reveal">
          <p
            className="eyebrow mb-3"
            style={{ color: "var(--color-accent-yellow)" }}
          >
            Industries
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Serving Diverse Industries
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((ind, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={ind}
                className="border border-white/10 rounded-sm p-5 flex flex-col items-center text-center gap-3 hover:border-white/30 transition-colors reveal"
              >
                <Icon
                  className="w-6 h-6"
                  style={{ color: "var(--color-secondary)" }}
                />
                <span className="text-xs font-medium text-white/80">{ind}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import type { WhyChooseUsItem } from "@/types";

interface Props {
  items: WhyChooseUsItem[];
}

export function WhyChooseUs({ items }: Props) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-xl reveal">
          <p className="eyebrow mb-3">Why Us</p>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Why Choose Sinar Surabayasakti?
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="lift-card card-surface rounded-xl p-6 reveal"
            >
              <span className="num-badge text-2xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-bold text-[15px]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

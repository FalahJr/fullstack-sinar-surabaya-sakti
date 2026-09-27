"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const params = useSearchParams();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  // Prefill from ?product=... query param
  useEffect(() => {
    const product = params.get("product");
    if (product) {
      setForm((prev) => ({
        ...prev,
        subject: `Product Inquiry: ${product}`,
        message: `Halo, saya ingin menanyakan informasi lebih lanjut mengenai produk ${product}.`,
      }));
    }
  }, [params]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitted(false);
    if (!validate()) return;
    // TODO: POST ke API backend Laravel. Sementara demo saja.
    setSubmitted(true);
    setForm(initial);
  };

  return (
    <div className="card-surface rounded-xl p-6 md:p-8">
      <h2 className="text-lg font-extrabold mb-6">Send us a message</h2>
      <form
        onSubmit={onSubmit}
        noValidate
        className="grid sm:grid-cols-2 gap-5"
      >
        <Field
          label="Name"
          required
          value={form.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
        />
        <Field
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
        />
        <Field
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => update("phone", v)}
        />
        <Field
          label="Subject"
          required
          value={form.subject}
          onChange={(v) => update("subject", v)}
          error={errors.subject}
        />
        <div className="sm:col-span-2">
          <label className="text-sm font-medium block mb-2" htmlFor="message">
            Message <span style={{ color: "var(--color-primary)" }}>*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="form-field w-full px-4 py-2.5 text-sm resize-none"
          />
          {errors.message && (
            <p
              className="text-xs mt-1.5"
              style={{ color: "var(--color-primary)" }}
            >
              {errors.message}
            </p>
          )}
        </div>
        <div className="sm:col-span-2 flex items-center gap-4 mt-2">
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
          {submitted && (
            <p
              className="text-sm font-medium flex items-center gap-2"
              style={{ color: "#16A34A" }}
            >
              <CheckCircle2 className="w-4 h-4" /> Message form validated. (Demo
              — belum terhubung ke backend.)
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  type = "text",
  value,
  onChange,
  error,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const id = label.toLowerCase();
  return (
    <div className="sm:col-span-1">
      <label className="text-sm font-medium block mb-2" htmlFor={id}>
        {label}{" "}
        {required && <span style={{ color: "var(--color-primary)" }}>*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-field w-full px-4 py-2.5 text-sm"
      />
      {error && (
        <p className="text-xs mt-1.5" style={{ color: "var(--color-primary)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

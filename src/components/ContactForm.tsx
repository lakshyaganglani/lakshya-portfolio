"use client";

import { useState, type FormEvent } from "react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(v: typeof values): Errors {
    const e: Errors = {};
    if (!v.name.trim()) e.name = "Name is required.";
    if (!v.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!v.message.trim()) {
      e.message = "Message is required.";
    } else if (v.message.trim().length < 10) {
      e.message = "Message should be at least 10 characters.";
    }
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    try {
      // No backend wired yet — replace with a real endpoint (API route,
      // Formspree, Resend, etc.) when ready to receive submissions.
      await new Promise((res) => setTimeout(res, 700));
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  function field<K extends keyof typeof values>(key: K) {
    return {
      value: values[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((v) => ({ ...v, [key]: e.target.value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
      },
    };
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-signal-dim bg-signal/10 p-6">
        <p className="font-display font-semibold text-signal mb-1">Message sent.</p>
        <p className="text-sm text-text-muted">
          Thanks for reaching out — I&apos;ll reply as soon as I can.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-mono text-signal hover:text-signal-dim transition-colors"
        >
          send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text mb-1.5">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...field("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`w-full rounded-md border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-faint focus:outline-none transition-colors ${
            errors.name ? "border-danger" : "border-border focus:border-signal-dim"
          }`}
          placeholder="Jane Doe"
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...field("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full rounded-md border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-faint focus:outline-none transition-colors ${
            errors.email ? "border-danger" : "border-border focus:border-signal-dim"
          }`}
          placeholder="jane@company.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-danger">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...field("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full resize-none rounded-md border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-faint focus:outline-none transition-colors ${
            errors.message ? "border-danger" : "border-border focus:border-signal-dim"
          }`}
          placeholder="What are you working on?"
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-danger">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-signal px-5 py-2.5 text-sm font-semibold text-bg hover:bg-signal-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-danger">
          Something went wrong sending that. Try again, or email me directly.
        </p>
      )}
    </form>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50 sm:p-8"
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-white/20 bg-white/50 px-4 py-3 text-foreground outline-none ring-cyan-500/30 transition focus:ring-2 dark:border-white/10 dark:bg-slate-950/50"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="w-full rounded-xl border border-white/20 bg-white/50 px-4 py-3 text-foreground outline-none ring-cyan-500/30 transition focus:ring-2 dark:border-white/10 dark:bg-slate-950/50"
          placeholder="+91 ..."
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full resize-y rounded-xl border border-white/20 bg-white/50 px-4 py-3 text-foreground outline-none ring-cyan-500/30 transition focus:ring-2 dark:border-white/10 dark:bg-slate-950/50"
          placeholder="Trip dates, route, or questions..."
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:from-cyan-400 hover:to-teal-500"
      >
        Send message
      </button>
      {sent && (
        <p className="text-center text-sm font-medium text-teal-600 dark:text-teal-400" role="status">
          Thanks — we&apos;ll get back to you shortly.
        </p>
      )}
    </motion.form>
  );
}

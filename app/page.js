"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const HEADLINE = "The writer is still you.";

export default function Home() {
  const reduceMotion = useReducedMotion();

  const letters = HEADLINE.split("");

  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const email = form.email.value;

    try {
      const res = await fetch("https://formspree.io/f/xlgqnvbq", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("submitted");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* HERO */}
      <section className="w-full max-w-4xl px-6 pt-24 pb-20 flex flex-col items-center text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative w-40 h-40 sm:w-52 sm:h-52 mb-10"
        >
          <Image
            src="/images/sage_emblem_transparent.png"
            alt="Sage emblem"
            fill
            priority
            className="object-contain drop-shadow-[0_0_28px_rgba(217,201,160,0.25)]"
          />
        </motion.div>

        <h1
          className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl md:text-6xl leading-tight tracking-wide text-champagne-bright"
          aria-label={HEADLINE}
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : 0.6 + i * 0.035,
                ease: "easeOut",
              }}
              aria-hidden="true"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: reduceMotion ? 0 : 2.4 }}
          className="mt-6 max-w-xl font-[family-name:var(--font-body)] text-lg sm:text-xl text-dim italic"
        >
          Sage coaches your writing. She listens, questions, and offers
          suggestions to help you go deeper. She never writes a word for you.
        </motion.p>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: reduceMotion ? 0 : 2.9 }}
          className="mt-4 font-[family-name:var(--font-ui)] text-sm tracking-[0.2em] uppercase text-silver"
        >
          by Cognition &amp; Chaos
        </motion.p>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full max-w-3xl px-6 py-16 border-t border-white/10">
        <h2 className="font-[family-name:var(--font-ui)] text-2xl sm:text-3xl text-champagne mb-8 text-center">
          Talk it through, or write it out.
        </h2>
        <div className="grid sm:grid-cols-2 gap-8 font-[family-name:var(--font-body)] text-dim text-base sm:text-lg">
          <div className="text-center sm:text-left">
            <h3 className="text-parchment font-[family-name:var(--font-ui)] text-lg mb-2">
              Voice
            </h3>
            <p>
              Read a scene aloud, talk through a stuck chapter, or think out
              loud about a revision. Sage listens and responds in her own
              voice, in real time.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-parchment font-[family-name:var(--font-ui)] text-lg mb-2">
              Text
            </h3>
            <p>
              Paste a draft or upload a chapter. Sage reads closely, asks the
              question that actually moves the piece forward, and offers
              suggestions, never a rewrite.
            </p>
          </div>
        </div>
      </section>

      {/* SCREENSHOT */}
      <section className="w-full max-w-3xl px-6 py-16 border-t border-white/10 flex flex-col items-center text-center">
        <span className="font-[family-name:var(--font-ui)] text-xs tracking-[0.3em] uppercase text-champagne mb-2">
          Sage 1.0 Is Live
        </span>
        <span className="font-[family-name:var(--font-ui)] text-xs tracking-[0.2em] uppercase text-dim mb-6">
          Sage, running on your own desktop
        </span>
        <div className="relative w-full rounded-xl border border-white/10 shadow-[0_0_40px_rgba(217,201,160,0.15)] overflow-hidden">
          <Image
            src="/images/sage-desktop-screenshot.png"
            alt="Sage desktop app"
            width={1114}
            height={901}
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* COMING SOON / WAITLIST */}
      <section className="w-full max-w-lg px-6 py-16 border-t border-white/10 flex flex-col items-center text-center">
        <span className="font-[family-name:var(--font-ui)] text-xs tracking-[0.3em] uppercase text-champagne mb-3">
          Now in Beta
        </span>
        <p className="font-[family-name:var(--font-body)] text-dim mb-8">
          Sage 1.0 is live. We&apos;re opening beta access to a small group
          of writers first, leave your email and we&apos;ll get you set up.
        </p>
        {status === "submitted" ? (
          <div className="w-full bg-white/5 border border-white/15 rounded-md px-4 py-3 text-parchment font-[family-name:var(--font-body)]">
            You&apos;re on the list. We&apos;ll be in touch to get you started.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              required
              suppressHydrationWarning
              placeholder="you@example.com"
              disabled={status === "loading"}
              className="flex-1 bg-white/5 border border-white/15 rounded-md px-4 py-3 text-parchment placeholder:text-dim/60 font-[family-name:var(--font-body)] focus:outline-none focus:border-champagne/60 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-champagne text-background font-[family-name:var(--font-ui)] font-semibold px-6 py-3 rounded-md hover:bg-champagne-bright transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending…" : "Notify me"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-dim font-[family-name:var(--font-body)]">
            Something went wrong. Mind trying again?
          </p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="w-full max-w-4xl px-6 py-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-dim text-sm font-[family-name:var(--font-ui)]">
        <span>&copy; {new Date().getFullYear()} Cognition &amp; Chaos LLC</span>
        <a
          href="https://soulogos.com"
          className="hover:text-champagne transition-colors"
        >
          soulogos.com
        </a>
      </footer>
    </main>
  );
}

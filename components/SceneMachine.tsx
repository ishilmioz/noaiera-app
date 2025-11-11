"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COPY } from "../lib/copyDeck";
import AmbientAudio from "./AmbientAudio";

type Scene = "intro" | "ritual" | "manifesto" | "final";
type Lines = readonly string[];


const LINE_MS = 5000;
const ENTER_EXIT_MS = 1000; 
const SCENE_TAIL_MS = 1500;

export default function SceneMachine() {
  const prefersReduced = usePrefersReducedMotion();
  const [scene, setScene] = useState<Scene>("intro");

  const gotoNext = () => {
    setScene((s) =>
      s === "intro" ? "ritual" :
      s === "ritual" ? "manifesto" :
      s === "manifesto" ? "final" :
      "final"
    );
  };

return (
  <div
    aria-live="off"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "grid",
      placeItems: "center",
      textAlign: "center",
      overflow: "hidden",
      background: "black" 
    }}
  >
      
      <AmbientAudio scene={scene} />

      
      <div
  aria-hidden
  style={{
    position: "fixed",
    inset: 0,
    zIndex: -3,
    backgroundImage: 'url("/background.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: "blur(2px) brightness(80%)" // hafif yumuşatma + karartma
  }}
/>

<div
  aria-hidden
  style={{
    position: "fixed",
    inset: 0,
    zIndex: -2,
    pointerEvents: "none",
    background:
      "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.9) 100%)"
  }}
/>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full max-w-[80ch] px-6"
        >
          {scene === "intro" && (
            <SingleLineSequencer
              lines={COPY.intro}
              perLine={LINE_MS}
              onDone={gotoNext}
            />
          )}

          {scene === "ritual" && (
            <SingleLineSequencer
              lines={COPY.ritual}
              perLine={LINE_MS}
              onDone={gotoNext}
            />
          )}

          {scene === "manifesto" && (
            <SingleLineSequencer
              lines={COPY.manifesto}
              perLine={LINE_MS}
              onDone={gotoNext}
            />
          )}

          {scene === "final" && <Final />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


function SingleLineSequencer({
  lines,
  perLine = LINE_MS,
  onDone,
}: {
  lines: Lines;
  perLine?: number;
  onDone?: () => void;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let mounted = true;

    function schedule(i: number) {
      if (!mounted) return;

      if (i >= lines.length - 1) {
        const t = setTimeout(() => {
          if (!mounted) return;
          const tail = setTimeout(() => onDone && onDone(), SCENE_TAIL_MS);
          return () => clearTimeout(tail);
        }, perLine);
        return () => clearTimeout(t);
      }

      const t = setTimeout(() => {
        if (!mounted) return;
        setIdx(i + 1);
        schedule(i + 1);
      }, perLine);
      return () => clearTimeout(t);
    }

    setIdx(0);
    const cleanup = schedule(0);

    return () => {
      mounted = false;
      if (typeof cleanup === "function") cleanup();
    };
  }, [lines, perLine, onDone]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={idx}
        className="h-display text-lg md:text-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: ENTER_EXIT_MS / 1000,         
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {lines[idx]}
      </motion.div>
    </AnimatePresence>
  );
}


function Final() {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="h-display text-xl md:text-2xl">Tamam. Sahte dünyana geri dön. Çünkü reklamlar seni çok özledi.</div>
      
      <motion.div
        aria-hidden
        className="fixed inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.9, ease: "easeIn" }}
        style={{ background: "var(--bg)" }}
      />
    </motion.div>
  );
}


function BreathingBackground({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(120% 120% at 50% 50%, var(--bg) 0%, var(--bg-2) 100%)",
          zIndex: -1,
        }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background:
          "radial-gradient(120% 120% at 50% 50%, var(--bg) 0%, var(--bg-2) 100%)",
        willChange: "transform, opacity, filter",
      }}
      initial={false}
      animate={{ opacity: [1, 0.985, 1], scale: [1, 1.012, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} 
    />
  );
}


function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

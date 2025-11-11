"use client";
import { useEffect, useRef } from "react";

type AmbientAudioProps = {
  scene: "intro" | "ritual" | "manifesto" | "final";
  src?: string;
};

export default function AmbientAudio({ scene, src="/audio/ambiencemusic.wav" }: AmbientAudioProps){
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);


  useEffect(() => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      ctxRef.current = new Ctx({ latencyHint: "playback" });
      gainRef.current = ctxRef.current.createGain();
      gainRef.current.gain.value = 0.0; // start silent
      gainRef.current.connect(ctxRef.current.destination);

      // autoplay güvenlik: ilk etkileşimde devreye girsin
      const resume = () => {
        if (ctxRef.current?.state === "suspended") {
          ctxRef.current.resume().catch(() => {});
        }
      };
      window.addEventListener("pointerdown", resume, { once: true });
      window.addEventListener("keydown", resume, { once: true });
    }
  }, []);


  useEffect(() => {
    (async () => {
      if (startedRef.current) return;
      const ctx = ctxRef.current, g = gainRef.current;
      if (!ctx || !g) return;
      try {
        const res = await fetch(src);
        const arr = await res.arrayBuffer();
        const buf = await ctx.decodeAudioData(arr);

        const node = ctx.createBufferSource();
        node.buffer = buf;
        node.loop = true;
        node.connect(g);
        node.start(0);

        
        const t = ctx.currentTime;
        g.gain.setValueAtTime(0.0, t);
        g.gain.linearRampToValueAtTime(0.22, t + 4.0);

        startedRef.current = true;
      } catch(e) {
        
      }
    })();
  }, [src]);

  
  useEffect(() => {
    const ctx = ctxRef.current, g = gainRef.current;
    if (!ctx || !g) return;
    const t = ctx.currentTime;
    g.gain.cancelScheduledValues(t);

    if (scene === "intro") {
      g.gain.linearRampToValueAtTime(0.20, t + 2.0);
    } else if (scene === "ritual" || scene === "manifesto") {
      g.gain.linearRampToValueAtTime(0.25, t + 2.0);
    } else if (scene === "final") {
      g.gain.linearRampToValueAtTime(0.0, t + 1.0); 
    }
  }, [scene]);

  return null;
}
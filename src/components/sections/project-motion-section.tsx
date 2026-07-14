"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";

type ProjectMotionSectionProps = {
  title: string;
  poster: string;
  images: string[];
  videoSrc?: string;
  eyebrow: string;
  heading: string;
  support: string;
};

function uniqueImages(images: string[]) {
  const seen = new Set<string>();
  return images.filter((src) => {
    if (!src || seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}

export function ProjectMotionSection({
  title,
  poster,
  images,
  videoSrc,
  eyebrow,
  heading,
  support,
}: ProjectMotionSectionProps) {
  const frames = uniqueImages([poster, ...images]).slice(0, 5);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (videoSrc || reduceMotion || frames.length < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % frames.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [frames.length, reduceMotion, videoSrc]);

  return (
    <section className="project-detail-motion">
      <div className="site-container">
        <Reveal>
          <div className="project-detail-motion-head">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="project-detail-motion-title">{heading}</h2>
            <p className="project-detail-motion-support">{support}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="project-detail-motion-stage-wrap">
          <div className="project-detail-motion-stage">
            {videoSrc ? (
              <video
                className="project-detail-motion-video"
                src={videoSrc}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={title}
              />
            ) : (
              <div className="project-detail-motion-reel" aria-label={title}>
                {frames.map((src, index) => (
                  <div
                    key={src}
                    className={`project-detail-motion-frame${index === active ? " is-active" : ""}`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 100vw, 1120px"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
                {frames.length > 1 ? (
                  <div className="project-detail-motion-progress" aria-hidden="true">
                    {frames.map((src, index) => (
                      <span
                        key={src}
                        className={index === active ? "is-active" : undefined}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

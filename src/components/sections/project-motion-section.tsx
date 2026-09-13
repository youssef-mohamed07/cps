"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

function cloudinaryDeliveryUrl(src: string, transformation: string) {
  try {
    const url = new URL(src);
    if (url.hostname !== "res.cloudinary.com") return src;

    const version = url.pathname.match(/\/v\d+\//);
    if (!version?.index) return src;

    url.pathname = `${url.pathname.slice(0, version.index)}/${transformation}${url.pathname.slice(version.index)}`;
    return url.toString();
  } catch {
    return src;
  }
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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const optimizedPoster = cloudinaryDeliveryUrl(
    poster,
    "c_limit,w_1280/f_auto/q_auto",
  );
  const optimizedVideo = videoSrc
    ? cloudinaryDeliveryUrl(videoSrc, "c_limit,w_1280/q_auto/f_auto")
    : undefined;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Mirror the browser preference into component state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  useEffect(() => {
    if (!videoSrc) return;

    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") {
      setShouldLoadVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadVideo(true);
        observer.disconnect();
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

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
                ref={videoRef}
                className="project-detail-motion-video"
                src={shouldLoadVideo ? optimizedVideo : undefined}
                poster={optimizedPoster}
                autoPlay={shouldLoadVideo}
                muted
                loop
                playsInline
                preload="none"
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

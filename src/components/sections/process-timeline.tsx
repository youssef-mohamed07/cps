"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/motion/reveal";

export type ProcessTimelineStep = {
  title: string;
  description: string;
};

type ProcessTimelineProps = {
  eyebrow: string;
  title: string;
  support?: string;
  steps: ProcessTimelineStep[];
  id?: string;
  className?: string;
};

export function ProcessTimeline({
  eyebrow,
  title,
  support,
  steps,
  id,
  className,
}: ProcessTimelineProps) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduce) {
      setActive(true);
      return;
    }

    const el = trackRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <section
      id={id}
      className={`process-timeline${className ? ` ${className}` : ""}${active ? " is-active" : ""}`}
    >
      <div className="site-container">
        <Reveal>
          <div className="process-timeline-head">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="process-timeline-title">{title}</h2>
            </div>
            {support ? <p className="process-timeline-support">{support}</p> : null}
          </div>
        </Reveal>

        <div className="process-timeline-stage">
          <span className="process-timeline-line" aria-hidden="true" />
          <ol ref={trackRef} className="process-timeline-track">
            {steps.map((step, index) => {
              const side = index % 2 === 0 ? "start" : "end";
              const delay = `${0.18 + index * 0.28}s`;
              return (
                <li
                  key={step.title}
                  className={`process-timeline-item process-timeline-item--${side}`}
                  style={{ "--step-delay": delay } as CSSProperties}
                >
                  <span className="process-timeline-node" aria-hidden="true" />
                  <div className="process-timeline-content">
                    <article className="process-timeline-card">
                      <span className="process-timeline-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

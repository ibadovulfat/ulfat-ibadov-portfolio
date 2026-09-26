import React, { useEffect, useRef } from "react";

interface ScatterTextProps {
  text: string;
  className?: string;
  /** element to render as */
  as?: "h1" | "h2" | "p" | "span" | "div";
  /** repel radius in px */
  radius?: number;
  /** max displacement in px */
  strength?: number;
}

/**
 * Interactive text: each letter is repelled away from the cursor and springs
 * back to its original position when the cursor leaves. Includes a staggered
 * fade-in on mount. Word-aware, so long text still wraps normally.
 * Pointer interaction is desktop-only; on touch it just fades in.
 */
const ScatterText: React.FC<ScatterTextProps> = ({
  text,
  className = "",
  as = "h1",
  radius = 95,
  strength = 46,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const charRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Staggered reveal on mount
  useEffect(() => {
    charRefs.current.forEach((el, i) => {
      if (!el) return;
      window.setTimeout(() => el.classList.add("in"), 90 + i * 28);
    });
  }, []);

  // Cursor repel / spring-back
  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(hover: none)").matches) return; // skip on touch

    let raf = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const apply = () => {
      raf = 0;
      charRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - mouseX;
        const dy = cy - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          const force = (radius - dist) / radius; // 1 = closest
          const angle = Math.atan2(dy, dx);
          const tx = Math.cos(angle) * force * strength;
          const ty = Math.sin(angle) * force * strength;
          const rot = (dx / radius) * 20 * force;
          el.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`;
          el.style.color = force > 0.45 ? "#ef4444" : "";
        } else if (el.style.transform) {
          el.style.transform = "";
          el.style.color = "";
        }
      });
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const reset = () => {
      mouseX = mouseY = -9999;
      charRefs.current.forEach((el) => {
        if (!el) return;
        el.style.transform = "";
        el.style.color = "";
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [radius, strength]);

  const Tag = as as React.ElementType;
  const words = text.split(" ");
  let idx = -1;

  return (
    <Tag ref={rootRef} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          <span className="scatter-word" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((ch) => {
              idx += 1;
              const at = idx;
              return (
                <span
                  key={at}
                  ref={(el) => (charRefs.current[at] = el)}
                  aria-hidden="true"
                  className="scatter-char"
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
};

export default ScatterText;

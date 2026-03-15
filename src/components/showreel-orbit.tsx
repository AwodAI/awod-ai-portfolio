"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type ShowreelVideo = {
  title: string;
  src: string;
};

type ShowreelOrbitProps = {
  videos: ShowreelVideo[];
};

export function ShowreelOrbit({ videos }: ShowreelOrbitProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef(0);
  const targetOrbitRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const safeVideos = useMemo(() => videos.slice(0, 12), [videos]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!stageRef.current) return;
    let animationFrame = 0;
    const AUTO_SPEED = 0.1;
    const LERP = 0.14;
    const FRICTION = 0.95;

    const tick = () => {
      if (!draggingRef.current) {
        velocityRef.current *= FRICTION;
        const momentumMag = Math.abs(velocityRef.current);
        const autoBlend = Math.max(0, 1 - momentumMag / 0.5);
        targetOrbitRef.current += velocityRef.current + AUTO_SPEED * autoBlend;
      }

      if (Math.abs(targetOrbitRef.current) > 100000) {
        targetOrbitRef.current %= 360;
        orbitRef.current %= 360;
      }

      orbitRef.current += (targetOrbitRef.current - orbitRef.current) * LERP;
      stageRef.current?.style.setProperty("--orbit-rotation", `${orbitRef.current.toFixed(2)}deg`);
      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const scene = sceneRef.current;
    if (!stage || !scene) return;

    const updateOrbitMetrics = () => {
      const width = scene.clientWidth;
      const height = scene.clientHeight;
      const orbitRadius = Math.max(230, Math.min(width * 0.4, 620));
      const orbitOffsetY = Math.max(10, Math.min(height * 0.065, 56));

      stage.style.setProperty("--orbit-radius", `${orbitRadius.toFixed(1)}px`);
      stage.style.setProperty("--orbit-offset-y", `${orbitOffsetY.toFixed(1)}px`);
    };

    updateOrbitMetrics();
    window.addEventListener("resize", updateOrbitMetrics);

    return () => {
      window.removeEventListener("resize", updateOrbitMetrics);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      draggingRef.current = true;
      lastXRef.current = event.clientX;
      velocityRef.current = 0;
      scene.classList.add("is-dragging");
      scene.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = event.clientX - lastXRef.current;
      lastXRef.current = event.clientX;
      const delta = dx * 0.42;
      targetOrbitRef.current += delta;
      velocityRef.current = delta;
    };

    const stopDragging = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      scene.classList.remove("is-dragging");
      if (scene.hasPointerCapture(event.pointerId)) {
        scene.releasePointerCapture(event.pointerId);
      }
    };

    scene.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);

    return () => {
      scene.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };
  }, []);

  useEffect(() => {
    if (!stageRef.current) return;

    const onScroll = () => {
      const stage = stageRef.current;
      const shell = shellRef.current;
      if (!stage || !shell) return;
      const rect = shell.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
      const pitch = (progress - 0.5) * 24;
      const depth = (progress - 0.5) * 90;

      stage.style.setProperty("--scroll-pitch", `${pitch.toFixed(2)}deg`);
      stage.style.setProperty("--depth-shift", `${depth.toFixed(2)}px`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (safeVideos.length === 0) return null;

  const activeVideo = safeVideos[activeIndex] ?? safeVideos[0];
  const activeRatio = ratios[activeVideo.src] ?? 9 / 16;
  const activeOrientation =
    activeRatio >= 1.2 ? "is-landscape" : activeRatio <= 0.82 ? "is-portrait" : "is-square";

  const handleMetadata = (src: string, width: number, height: number) => {
    if (!width || !height) return;
    const ratio = width / height;
    setRatios((prev) => (prev[src] ? prev : { ...prev, [src]: ratio }));
  };

  return (
    <div className="showreel-shell" ref={shellRef}>
      <div className="showreel-sticky" ref={stageRef}>
        <div className="showreel-layout">
          <div className="showreel-scene" ref={sceneRef}>
            <div className="showreel-aura" aria-hidden="true" />
            <p className="showreel-hint">Drag to rotate</p>
            <div className="showreel-orbit" aria-label="3D showreel orbit">
              {safeVideos.map((video, index) => {
                const ratio = ratios[video.src] ?? 9 / 16;
                const orientationClass =
                  ratio >= 1.2 ? "is-landscape" : ratio <= 0.82 ? "is-portrait" : "is-square";
                const style = {
                  "--item-index": String(index),
                  "--item-total": String(safeVideos.length),
                  "--card-ratio": ratio.toString(),
                } as CSSProperties;

                return (
                  <button
                    className={`showreel-orbit-card ${orientationClass} ${activeIndex === index ? "is-active" : ""}`}
                    key={video.src}
                    aria-label={`Showreel video ${index + 1}`}
                    onClick={() => {
                      setActiveIndex(index);
                    }}
                    style={style}
                    type="button"
                  >
                    <video
                      src={video.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(event) =>
                        handleMetadata(
                          video.src,
                          event.currentTarget.videoWidth,
                          event.currentTarget.videoHeight,
                        )
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <article className="showreel-focus">
            <p className="section-kicker">Focused Asset</p>
            <div
              className={`showreel-focus-frame ${activeOrientation}`}
              style={{ aspectRatio: activeRatio.toString() }}
            >
              <video
                className="showreel-focus-player"
                key={activeVideo.src}
                src={activeVideo.src}
                controls
                preload="metadata"
                playsInline
                onLoadedMetadata={(event) =>
                  handleMetadata(
                    activeVideo.src,
                    event.currentTarget.videoWidth,
                    event.currentTarget.videoHeight,
                  )
                }
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

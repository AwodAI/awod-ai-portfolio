"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "motion/react";

type ShowreelVideo = {
  title: string;
  src: string;
};

type ShowreelOrbitProps = {
  videos: ShowreelVideo[];
};

const BASE_VELOCITY = 6;
const DRAG_SENSITIVITY = 0.3;
const DRAG_VELOCITY_SCALE = 0.3;
const BOOST_SPRING = { stiffness: 50, damping: 20, restDelta: 0.01 };
const INTERACTION_THRESHOLD = 0.42;
const SCROLL_LERP = 0.1;

const FORMATION_PRESETS = [
  { x: -404, y: -188, z: -112, rz: -14, rx: 7, scale: 0.88 },
  { x: -254, y: -42, z: 32, rz: 11, rx: -5, scale: 0.92 },
  { x: -112, y: -216, z: -58, rz: -9, rx: 4, scale: 0.96 },
  { x: 74, y: -154, z: 64, rz: 8, rx: -4, scale: 0.9 },
  { x: 246, y: -58, z: -18, rz: -11, rx: 5, scale: 0.94 },
  { x: 404, y: -174, z: 42, rz: 13, rx: -6, scale: 0.89 },
  { x: -338, y: 118, z: 58, rz: 10, rx: -5, scale: 0.91 },
  { x: -148, y: 176, z: -42, rz: -8, rx: 4, scale: 0.95 },
  { x: 44, y: 142, z: 76, rz: 7, rx: -3, scale: 0.98 },
  { x: 232, y: 208, z: -26, rz: -9, rx: 4, scale: 0.93 },
  { x: 398, y: 102, z: 52, rz: 12, rx: -5, scale: 0.9 },
  { x: 0, y: 12, z: 118, rz: 0, rx: 0, scale: 1.02 },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothStep(value: number, start: number, end: number) {
  const progress = clamp((value - start) / (end - start), 0, 1);
  return progress * progress * (3 - 2 * progress);
}

type OrbitCardProps = {
  active: boolean;
  index: number;
  onCardClick: (index: number) => void;
  onMetadata: (src: string, width: number, height: number) => void;
  ratio: number;
  src: string;
  total: number;
};

const OrbitCard = memo(function OrbitCard({
  active,
  index,
  onCardClick,
  onMetadata,
  ratio,
  src,
  total,
}: OrbitCardProps) {
  const preset = FORMATION_PRESETS[index % FORMATION_PRESETS.length];
  const orientationClass =
    ratio >= 1.2 ? "is-landscape" : ratio <= 0.82 ? "is-portrait" : "is-square";
  const style = {
    "--item-index": String(index),
    "--item-total": String(total),
    "--card-ratio": ratio.toString(),
    "--stack-x": `${preset.x}px`,
    "--stack-y": `${preset.y}px`,
    "--stack-z": `${preset.z}px`,
    "--stack-rx": `${preset.rx}deg`,
    "--stack-rz": `${preset.rz}deg`,
    "--stack-scale": preset.scale.toString(),
  } as CSSProperties;

  return (
    <div className="showreel-orbit-card-shell" style={style}>
      <div className="showreel-orbit-card-intro">
        <button
          className={`showreel-orbit-card ${orientationClass} ${active ? "is-active" : ""}`}
          aria-label={`Showreel video ${index + 1}`}
          onClick={() => onCardClick(index)}
          type="button"
        >
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={(event) =>
              onMetadata(src, event.currentTarget.videoWidth, event.currentTarget.videoHeight)
            }
          />
        </button>
      </div>
    </div>
  );
});

export function ShowreelOrbit({ videos }: ShowreelOrbitProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageShellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const safeVideos = useMemo(() => videos.slice(0, 12), [videos]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  const rotation = useMotionValue(0);
  const orbitDeg = useTransform(rotation, (value) => `${value.toFixed(2)}deg`);
  const dragBoost = useSpring(0, BOOST_SPRING);
  const isDraggingRef = useRef(false);
  const isInteractiveRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const targetScrollStateRef = useRef({
    progress: 0,
    orbitOpen: 0,
    orbitReveal: 0,
    introFade: 1,
    pitch: -8,
    depth: 30,
  });
  const currentScrollStateRef = useRef({
    progress: 0,
    orbitOpen: 0,
    orbitReveal: 0,
    introFade: 1,
    pitch: -8,
    depth: 30,
  });

  useAnimationFrame((_time, delta) => {
    if (!isInteractiveRef.current || isDraggingRef.current) return;

    const velocity = BASE_VELOCITY + dragBoost.get();
    rotation.set(rotation.get() + velocity * (delta / 1000));
  });

  const onPanStart = useCallback(() => {
    if (!isInteractiveRef.current) return;
    setIsDragging(true);
    isDraggingRef.current = true;
    dragBoost.jump(0);
  }, [dragBoost]);

  const onPan = useCallback(
    (_: unknown, info: PanInfo) => {
      if (!isInteractiveRef.current) return;
      rotation.set(rotation.get() + info.delta.x * DRAG_SENSITIVITY);
    },
    [rotation],
  );

  const onPanEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (!isInteractiveRef.current) return;
      setIsDragging(false);
      isDraggingRef.current = false;

      const releaseDegPerS = info.velocity.x * DRAG_VELOCITY_SCALE;
      const boost = releaseDegPerS - BASE_VELOCITY;
      dragBoost.jump(boost);
      dragBoost.set(0);
    },
    [dragBoost],
  );

  const onCardClick = useCallback((index: number) => {
    if (!isInteractiveRef.current) return;
    setActiveIndex(index);
  }, []);

  const handleMetadata = useCallback((src: string, width: number, height: number) => {
    if (!width || !height) return;
    const ratio = width / height;
    setRatios((prev) => (prev[src] ? prev : { ...prev, [src]: ratio }));
  }, []);

  useEffect(() => {
    const stageShell = stageShellRef.current;
    const stage = stageRef.current;
    if (!stageShell || !stage) return;

    const applyScrollState = () => {
      const state = currentScrollStateRef.current;

      stage.style.setProperty("--intro-progress", state.progress.toFixed(4));
      stage.style.setProperty("--orbit-open", state.orbitOpen.toFixed(4));
      stage.style.setProperty("--orbit-reveal", state.orbitReveal.toFixed(4));
      stage.style.setProperty("--intro-fade", state.introFade.toFixed(4));
      stage.style.setProperty("--scroll-pitch", `${state.pitch.toFixed(2)}deg`);
      stage.style.setProperty("--depth-shift", `${state.depth.toFixed(2)}px`);

      const nextInteractive = state.orbitOpen >= INTERACTION_THRESHOLD;
      if (isInteractiveRef.current !== nextInteractive) {
        isInteractiveRef.current = nextInteractive;
        setIsInteractive(nextInteractive);
        if (!nextInteractive) {
          setIsDragging(false);
          isDraggingRef.current = false;
          dragBoost.jump(0);
        }
      }
    };

    const animateScrollState = () => {
      const current = currentScrollStateRef.current;
      const target = targetScrollStateRef.current;

      current.progress += (target.progress - current.progress) * SCROLL_LERP;
      current.orbitOpen += (target.orbitOpen - current.orbitOpen) * SCROLL_LERP;
      current.orbitReveal += (target.orbitReveal - current.orbitReveal) * SCROLL_LERP;
      current.introFade += (target.introFade - current.introFade) * SCROLL_LERP;
      current.pitch += (target.pitch - current.pitch) * SCROLL_LERP;
      current.depth += (target.depth - current.depth) * SCROLL_LERP;

      applyScrollState();
      rafRef.current = window.requestAnimationFrame(animateScrollState);
    };

    const updateStageTarget = () => {
      const rect = stageShell.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrollDistance = Math.max(rect.height - viewport, 1);
      const rawProgress = clamp(-rect.top / scrollDistance, 0, 1);
      const orbitOpen = smoothStep(rawProgress, 0.05, 0.68);
      const orbitReveal = smoothStep(rawProgress, 0.03, 0.48);
      const introFade = 1 - smoothStep(rawProgress, 0.14, 0.5);
      const pitch = -8 + orbitReveal * 12;
      const depth = 30 - orbitOpen * 28;

      targetScrollStateRef.current = {
        progress: rawProgress,
        orbitOpen,
        orbitReveal,
        introFade,
        pitch,
        depth,
      };
    };

    updateStageTarget();
    currentScrollStateRef.current = { ...targetScrollStateRef.current };
    applyScrollState();
    rafRef.current = window.requestAnimationFrame(animateScrollState);

    window.addEventListener("scroll", updateStageTarget, { passive: true });
    window.addEventListener("resize", updateStageTarget);
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("scroll", updateStageTarget);
      window.removeEventListener("resize", updateStageTarget);
    };
  }, [dragBoost]);

  useEffect(() => {
    const stage = stageRef.current;
    const scene = sceneRef.current;
    if (!stage || !scene) return;

    const updateOrbitMetrics = () => {
      const width = scene.clientWidth;
      const height = scene.clientHeight;
      const orbitRadius = Math.max(220, Math.min(width * 0.38, 560));
      const orbitOffsetY = Math.max(6, Math.min(height * 0.06, 44));

      stage.style.setProperty("--orbit-radius", `${orbitRadius.toFixed(1)}px`);
      stage.style.setProperty("--orbit-offset-y", `${orbitOffsetY.toFixed(1)}px`);
    };

    updateOrbitMetrics();
    window.addEventListener("resize", updateOrbitMetrics);
    return () => window.removeEventListener("resize", updateOrbitMetrics);
  }, []);

  if (safeVideos.length === 0) return null;

  const activeVideo = activeIndex !== null ? safeVideos[activeIndex] : null;
  const activeRatio = activeVideo ? (ratios[activeVideo.src] ?? 9 / 16) : 9 / 16;
  const activeOrientation =
    activeRatio >= 1.2 ? "is-landscape" : activeRatio <= 0.82 ? "is-portrait" : "is-square";

  return (
    <div className="showreel-shell" ref={shellRef}>
      <div className="showreel-stage-shell" ref={stageShellRef}>
        <div className="showreel-sticky" ref={stageRef}>
          <div className="showreel-layout">
            <motion.div
              className={`showreel-scene ${isDragging ? "is-dragging" : ""} ${!isInteractive ? "is-locked" : ""}`}
              ref={sceneRef}
              onPanStart={onPanStart}
              onPan={onPan}
              onPanEnd={onPanEnd}
            >
              <div className="showreel-aura" aria-hidden="true" />
              <div className="showreel-vignette" aria-hidden="true" />
              <p className="showreel-hint">
                {isInteractive ? "Drag to rotate" : "Scroll to open orbit"}
              </p>
              <motion.div
                className="showreel-orbit"
                aria-label="3D showreel orbit"
                style={{ "--orbit-rotation": orbitDeg } as CSSProperties & Record<string, unknown>}
              >
                {safeVideos.map((video, index) => (
                  <OrbitCard
                    active={activeIndex === index}
                    index={index}
                    key={video.src}
                    onCardClick={onCardClick}
                    onMetadata={handleMetadata}
                    ratio={ratios[video.src] ?? 9 / 16}
                    src={video.src}
                    total={safeVideos.length}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {activeVideo ? (
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
      ) : null}
    </div>
  );
}

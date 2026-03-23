export const site = {
  name: "AWOD.AI",
  title: "Cinematic AI visuals that feel real",
  description:
    "AI-driven video and visual assets for brands, agencies, artists, and founders who need fast, high-quality delivery.",
  siteUrl: "https://awod-ai-portfolio.vercel.app",
  primaryCta: "Book a Call",
  secondaryCta: "See Work",
  calendlyUrl: "https://calendly.com/awodai",
  email: "Awedis.m@web.de",
};

export const bookingDefaults = {
  timezone: "Europe/Berlin (CET/CEST)",
  availability: "Monday to Friday, 10:00-18:00",
  callTypes: ["Discovery Call - 15 minutes", "Creative Strategy Call - 45 minutes"],
};

export const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/awod.ai/",
    value: "@awod.ai",
  },
];

export const seoKeywords = [
  "ai video creator",
  "ai video production",
  "generative ai video",
  "ai commercial production",
  "ai content studio",
  "ai creative direction",
  "cinematic ai video",
  "ai product video",
  "ai ad creatives",
  "short-form video production",
  "ai motion design",
  "ai visuals for brands",
  "veo text-to-video creator",
  "ai video prompt engineering",
  "ai video post-production",
];

export const tickerItems = [
  "Cinematic AI Video",
  "Campaign Visual Production",
  "Creative Direction",
  "Short-Form Production",
  "Brand Consistency",
  "Prompt Workflows",
  "Launch-Ready Assets",
  "Remote Collaboration (EU & Global)",
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "About & Booking" },
];

export const stats = [
  { label: "First concept", value: "24-72h" },
  { label: "Core focus", value: "AI Video + Visuals" },
  { label: "Workflow", value: "Brief -> Concept -> Delivery" },
];

export const trustSignals = [
  {
    label: "Typical First Draft Window",
    value: "24-72h",
    note: "Initial direction is delivered quickly after a clear brief.",
  },
  {
    label: "Delivery Style",
    value: "Platform-ready formats",
    note: "Assets are prepared for the channels where they will be published.",
  },
  {
    label: "Collaboration Model",
    value: "Direct founder communication",
    note: "You work directly with one person from briefing to delivery.",
  },
];

export const decisionPath = [
  {
    title: "See the fit",
    detail: "Review selected work and decide whether the style matches your brand.",
    action: "Open selected cases",
    href: "#portfolio-preview",
  },
  {
    title: "Define the scope",
    detail: "Choose deliverables and timeline so production starts with clear boundaries.",
    action: "Review services",
    href: "/services",
  },
  {
    title: "Start the project",
    detail: "Book one call, align goals, and start production.",
    action: "Book a Call",
    href: "/contact",
  },
];

export const services = [
  {
    title: "AI Commercial Assets",
    description:
      "Campaign visuals and ad videos with clear messaging and consistent art direction.",
    details: [
      "Creative direction and concept",
      "Visual consistency for brand campaigns",
      "Short-form and ad deployment formats",
    ],
  },
  {
    title: "Cinematic Short-Form",
    description:
      "Short-form social assets designed for strong pacing, clarity, and fast iteration.",
    details: [
      "Reels / Shorts visual packages",
      "Fast iteration loops",
      "Platform-first framing and pacing",
    ],
  },
  {
    title: "AI Creative Systems",
    description:
      "Prompt and workflow systems that help teams scale output without losing quality.",
    details: [
      "Prompt architecture",
      "Look and style consistency setup",
      "Repeatable production pipeline",
    ],
  },
];

export type CaseProof = {
  label: string;
  value: string;
};

export type CaseFlowStep = {
  title: string;
  detail: string;
};

export type CaseAssetLink = {
  label: string;
  url: string;
  thumbnailUrl?: string;
  thumbnailAspect?: "portrait" | "landscape" | "square";
  thumbnailSize?: string;
  thumbnailPosition?: string;
};

export type PortfolioCase = {
  name: string;
  industry: string;
  headline: string;
  challenge: string;
  solution: string;
  outcome: string;
  kpis: string[];
  formats: string;
  publicationStatus: string;
  metrics: string;
  process: CaseFlowStep[];
  proof: CaseProof[];
  assetLinks: CaseAssetLink[];
};

export function toCaseAnchor(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const cases: PortfolioCase[] = [
  {
    name: "Cafe de Enrico",
    industry: "Cafe / Hospitality",
    headline: "Social-first brand refresh for a stronger premium visual identity.",
    challenge:
      "The brand needed more modern, high-quality visual assets that matched current platform standards.",
    solution:
      "Creative concept work plus market-aware execution across image and video formats to elevate brand presence.",
    outcome:
      "A stronger visual character across Instagram content with more premium and current-looking outputs.",
    kpis: [
      "4 delivered assets (3 reels + 1 post)",
      "Primary channel: Instagram",
      "Multi-format content pack approved",
    ],
    formats: "Instagram videos and image assets",
    publicationStatus: "Approved for publication",
    metrics:
      "Qualitative impact: stronger brand feel, cleaner visual consistency, and improved content quality perception.",
    process: [
      {
        title: "Creative Direction",
        detail: "Defined a contemporary visual lane aligned to hospitality social trends.",
      },
      {
        title: "Production Sprint",
        detail: "Delivered mixed AI image and short-video assets for fast weekly posting.",
      },
      {
        title: "Polish and Delivery",
        detail: "Finalized edits with platform-aware framing and consistent finish quality.",
      },
    ],
    proof: [
      { label: "Assets Delivered", value: "4" },
      { label: "Reels + Posts", value: "3 + 1" },
      { label: "Primary Channel", value: "Instagram" },
    ],
    assetLinks: [
      {
        label: "Instagram Reel 1",
        url: "https://www.instagram.com/reel/DUYOSmUjAA2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        thumbnailUrl: "/media/thumbnails/cafe-reel-1.jpg",
      },
      {
        label: "Instagram Reel 2",
        url: "https://www.instagram.com/reel/DPthcA6CAuz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        thumbnailUrl: "/media/thumbnails/cafe-reel-2.jpg",
        thumbnailAspect: "landscape",
      },
      {
        label: "Instagram Post",
        url: "https://www.instagram.com/p/DO05pOCiD7a/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        thumbnailUrl: "/media/thumbnails/cafe-post-1.jpg",
      },
      {
        label: "Instagram Reel 3",
        url: "https://www.instagram.com/reel/DOdrRz3iG7g/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        thumbnailUrl: "/media/thumbnails/cafe-reel-3.jpg",
        thumbnailAspect: "square",
      },
    ],
  },
  {
    name: "Pech Fur Dich",
    industry: "Music / Artist",
    headline: "High-impact loop visualizer for a time-sensitive music release.",
    challenge: "Need for a fast visualizer production for a music video release.",
    solution: "Focused production sprint for a loop-based, high-impact visual treatment.",
    outcome: "40-second visualizer loop delivered for music video use.",
    kpis: [
      "40-second final runtime",
      "Single-loop visualizer package",
      "Delivered inside release timeline",
    ],
    formats: "Loop visualizer",
    publicationStatus: "Approved for publication",
    metrics:
      "Qualitative impact: fast release support with a cinematic loop matching the track mood and artist identity.",
    process: [
      {
        title: "Mood Capture",
        detail: "Mapped track emotion and artist identity into a cinematic visual direction.",
      },
      {
        title: "Loop System Build",
        detail: "Produced a seamless loop structure tuned for continuous playback quality.",
      },
      {
        title: "Release Alignment",
        detail: "Delivered final visualizer file inside the launch timeline for publication.",
      },
    ],
    proof: [
      { label: "Runtime", value: "40 Seconds" },
      { label: "Release State", value: "Approved" },
      { label: "Output Type", value: "Music Visualizer" },
    ],
    assetLinks: [
      {
        label: "YouTube Reference",
        url: "https://www.youtube.com/watch?v=risrLD-splI&pp=ygUPcGVjaCBmw7xyIGRpY2gg",
        thumbnailAspect: "landscape",
        thumbnailSize: "135% auto",
        thumbnailPosition: "center center",
      },
    ],
  },
  {
    name: "Kevkutz",
    industry: "Barber / Personal Brand",
    headline: "Short-form AI-enhanced edit built to stop scroll and hold attention.",
    challenge: "Create a short social asset with AI effects for Instagram distribution.",
    solution: "Combined recorded footage with AI-enhanced edit workflow for fast turnaround.",
    outcome: "15-second short-form asset delivered for Instagram.",
    kpis: [
      "15-second final runtime",
      "2 reel variants delivered",
      "Platform-optimized for Instagram Reels",
    ],
    formats: "Short-form social video",
    publicationStatus: "Approved for publication",
    metrics:
      "Qualitative impact: scroll-stopping short-form output with modern AI effects tailored for social attention.",
    process: [
      {
        title: "Footage Selection",
        detail: "Prioritized expressive clips to maximize personality in very short runtime.",
      },
      {
        title: "AI Enhancement",
        detail: "Applied modern AI treatment to increase visual impact without losing authenticity.",
      },
      {
        title: "Social Optimization",
        detail: "Exported platform-ready cut with pacing tuned for short-form retention behavior.",
      },
    ],
    proof: [
      { label: "Runtime", value: "15 Seconds" },
      { label: "Assets Delivered", value: "2 Reels" },
      { label: "Platform", value: "Instagram Reels" },
    ],
    assetLinks: [
      {
        label: "Instagram Reel 1",
        url: "https://www.instagram.com/reel/DUL8kRRiGD2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        thumbnailUrl: "/media/thumbnails/kevkutz-reel-1.jpg",
      },
      {
        label: "Instagram Reel 2",
        url: "https://www.instagram.com/reel/DQ_TRr3CKVf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        thumbnailUrl: "/media/thumbnails/kevkutz-reel-2.jpg",
      },
    ],
  },
];

export const faqs = [
  {
    question: "How much does AI video production cost?",
    answer:
      "Pricing depends on scope, output volume, complexity, and turnaround. We define a clear quote after a short call.",
  },
  {
    question: "Is AI-generated content safe for commercial use?",
    answer:
      "Yes, when rights and licensing are handled correctly. We use commercial-safe workflows and clarify usage before delivery.",
  },
  {
    question: "How long does AI ad or short-form production take?",
    answer:
      "Timelines vary by brief and revision depth. In the call, we quickly filter options and set a realistic production plan.",
  },
  {
    question: "Can you match our brand style and keep characters consistent?",
    answer:
      "Yes. With your brand assets we keep style and characters consistent, and we can also build new assets and brand identity if needed.",
  },
  {
    question: "What do you need from us to start?",
    answer:
      "A clear goal, basic brief, references, and any existing assets. We guide the full setup in a focused kickoff call.",
  },
];

export const showreelVideos = [
  { title: "Video 30", src: "/media/showreel/01-video-30.mp4" },
  { title: "1020", src: "/media/showreel/03-1020-1-.mp4" },
  { title: "Adidas Enhanced", src: "/media/showreel/04-adidas-enhanced.mp4" },
  {
    title: "Breakfast With Big Cats",
    src: "/media/showreel/Breakfast_with_Big_Cats_1.mp4",
  },
  { title: "Puma Enhanced", src: "/media/showreel/06-puma-enhanced.mp4" },
  { title: "Video 10", src: "/media/showreel/07-video-10-kopie.mp4" },
  { title: "Video 8", src: "/media/showreel/08-video-8.mp4" },
  { title: "Video 2", src: "/media/showreel/09-video-2-kopie.mp4" },
  {
    title: "Photorealistic Dark",
    src: "/media/showreel/10-a_photorealistic_dark_202511231541_ly40a.mp4",
  },
  {
    title: "Wideangle Studio",
    src: "/media/showreel/11-a_wideangle_studio_202601051909_nrx2c_1.mp4",
  },
  {
    title: "Kling Image to Video",
    src: "/media/showreel/12-kling_20260211_image_to_video_a_cinemati_924_1_2.mp4",
  },
];

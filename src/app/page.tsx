"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Mail, Instagram, MapPin, ExternalLink, Palette } from "lucide-react";

/* =========================
 * Types
 * =======================*/
type Work = {
  title: string;
  year: string;
  medium: string;
  size: string;
  status: "Available" | "Sold";
  image: string;                // 원본(히어로/라이트박스)
  thumbnail?: string;           // ✅ 카드/그리드 썸네일
  blurDataURL?: string;         // (선택) 원본 blur
  aspect?: string;              // 히어로용 비율 "12/5" 등
  fit?: "contain" | "cover";    // 히어로 object-fit
};

type SoloItem = { year: string; text: string };
type GroupItem = { period: string; text: string };
type AwardItem = { year: string; text: string };

/* =========================
 * Constants
 * =======================*/
const DOMAIN = "https://YOUR-DOMAIN.vercel.app";
const IMG_BASE = "/wm"; // public/wm 폴더 기준

// 상단 PROFILE 상수 교체
const PROFILE = {
  nameEn: "Choi Mijin",
  nameKo: "최미진",
  tagline: "Korean Contemporary Artist | Oil on Canvas",
  degree: "MFA, Repin Academy (Russia)",
  shows: "8 Solo Exhibitions | Exhibited in Korea & Russia",
  bioShortKo:
    "해바라기와 풍경을 모티브로 빛과 생명의 조화를 탐구하며, 자연의 고요한 에너지를 화려한 색감 속에 담아냅니다. 작품은 따뜻함과 균형을 추구하며, 보는 이로 하여금 잠시 멈추어 호흡하고 내면의 평온을 발견하도록 이끕니다.",
  bioShortEn:
    "Exploring light, vitality, and harmony through sunflower and landscape motifs, the artist captures the quiet energy of nature in vivid colors. Each work pursues warmth and balance, inviting viewers to pause, breathe, and find inner calm.",
  email: "bedro1210@naver.com",
  instagram: "https://instagram.com/choimijin.art",
  location: "Korea, Daegu",
};


/* =========================================================
 * BLUR DATAURLS (from: `npm run blur`)
 * 키는 실제 정적 경로와 100% 동일해야 함 (/wm 포함)
 * =======================================================*/
const BLURS: Record<string, string> = {
  [`${IMG_BASE}/IMGL9598 copy - 생명의 태양 2 (Sun of Life 2).jpg`]:
    "data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAKABgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUD/8QAJBAAAgEDAwMFAAAAAAAAAAAAAQIDABEhBBMxE0FxBRUiQrH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EABsRAAICAwEAAAAAAAAAAAAAAAECABEDEiET/9oADAMBAAIRAxEAPwCvDPGCSZU2ngEjybdzR9XDI88MWoVXhB6lsFfF8VJYCzPYblYbT3Ge1ZOie5a34rmJScc5FTPdwNVNRS41Isyxp5mMMfV3Xc2S4u3H2tSsfT8aBbYyf00qjh2K9MO1Xyf/2Q==",
  [`${IMG_BASE}/IMGL9641 copy - 불꽃의 씨앗 (Heart of Flame 1).jpg`]:
    "data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAYABgDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAIFAwQG/8QAIxAAAgIBAwQDAQAAAAAAAAAAAQIAAxEEEiETMUGRBVFhgf/EABkBAAIDAQAAAAAAAAAAAAAAAAACAQMFBv/EABsRAAICAwEAAAAAAAAAAAAAAAABAhEDEiHB/9oADAMBAAIRAxEAPwDoaqqq9PspZiq9gWJ2/n3iCdw5PPiR6ocllIDDhsef5K35DUWV2KiAhieDOPx45Tdem1WqtlqwVQMH2PMTW0jPenUuZcgkEDIJiDWvGEXaMtVZwWcLtYcAADHqSfR6e8A2puwcjntESpzkurhEnZNagMUVgBFGYiIkskkxdmuI/9k=",
  [`${IMG_BASE}/IMGL9647 copy - 청파의 해바라기 (Golden Echoes in Blue).jpg`]:
    "data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAASABgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQF/8QAJxAAAgICAAQFBQAAAAAAAAAAAQIAAwQRBRMxURMhIkFhFTJxgaH/xAAXAQEBAQEAAAAAAAAAAAAAAAAFBAID/8QAIBEAAQQCAQUAAAAAAAAAAAAAAQADBDECMwURE0Fxgf/aAAwDAQACEQMRAD8Az77w9RdrNuSEQb6b9z8SgcMairxUvL2lOYk78ge0jylFGTW5odBWTyoW3/Zs15DY9+Kq0l0yq/VcCSA37nKS440AQbNLLLeDnUEeLWWKqrcdbLAyuToeWgR3iU8Va+7OYbWtUACEnfN3Ou5iXRs+42MihJILTpwBpRcQ6/kaM0+FM307HHMfuI6+24iQ8lr+pLjKHpS5DMbBtifQD1+IiIhG1hEydi//2Q==",

  // 새로 넣은 이미지(값은 나중에 채워도 OK)
  [`${IMG_BASE}/1754143893424 - 비취의 숨결 (Emerald Breath).jpg`]: "",
  [`${IMG_BASE}/1754143905646 - 붉은 숨결 (Scarlet Breath).jpg`]: "",
  [`${IMG_BASE}/1754143901190- 황금 숨결 (Golden Breath).jpg`]: "",
  [`${IMG_BASE}/1754143901190- 황금 숨결 (Golden Breath) - 썸네일.jpg`]: "",
  [`${IMG_BASE}/1754143889828 - 햇살의 파편 (Shards of Sunlight).jpg`]: "",
  [`${IMG_BASE}/IMGL9595 copy - 청해의 화안 (Jade Sunbloom).jpg`]: "",
  [`${IMG_BASE}/IMGL9601 copy - 생명의 태양 1 (Sun of Life 1).jpg`]: "",
  [`${IMG_BASE}/IMGL9616 copy - 비취의 화안 (Emerald Sunbloom).jpg`]: "",
  [`${IMG_BASE}/IMGL9619 copy - 라일락의 화안 (Lilac Sunbloom).jpg`]: "",
  [`${IMG_BASE}/60.5x60.5cm (4) - 불꽃의 씨앗.jpg`]: "",
};

const getBlur = (path: string) => BLURS[path] || undefined;

/* =========================
 * Artworks
 * =======================*/
const ARTWORKS: Work[] = [
  // 기존 3점
  {
    title: "청파의 해바라기 (Golden Echoes in Blue)",
    year: "2024",
    medium: "Oil on Canvas",
    size: "60.0 × 50.0 cm",
    status: "Available",
    image: `${IMG_BASE}/IMGL9647 copy - 청파의 해바라기 (Golden Echoes in Blue).jpg`,
    blurDataURL: getBlur(`${IMG_BASE}/IMGL9647 copy - 청파의 해바라기 (Golden Echoes in Blue).jpg`),
  },
  {
    title: "불꽃의 씨앗 (Heart of Flame Ⅰ)",
    year: "2025",
    medium: "Oil on Canvas",
    size: "150.0 × 150.0 cm",
    status: "Available",
    image: `${IMG_BASE}/IMGL9641 copy - 불꽃의 씨앗 (Heart of Flame 1).jpg`,
    blurDataURL: getBlur(`${IMG_BASE}/IMGL9641 copy - 불꽃의 씨앗 (Heart of Flame 1).jpg`),
  },
  {
    title: "생명의 태양 Ⅱ (Sun of Life II)",
    year: "2024",
    medium: "Oil on Canvas",
    size: "120.0 × 50.0 cm",
    status: "Available",
    image: `${IMG_BASE}/IMGL9598 copy - 생명의 태양 2 (Sun of Life 2).jpg`,
    aspect: "12/5",
    fit: "contain",
    blurDataURL: getBlur(`${IMG_BASE}/IMGL9598 copy - 생명의 태양 2 (Sun of Life 2).jpg`),
  },

 
  {
    title: "햇살의 파편 (Shards of Sunlight)",
    year: "2024",
    medium: "Oil on Canvas",
    size: "(24.2 × 24.2 cm) × 4",
    status: "Available",
    image: `${IMG_BASE}/1754143889828 - 햇살의 파편 (Shards of Sunlight).jpg`,
    aspect: "1/1",
    fit: "contain",
  },
  {
    title: "청해의 화안 (Jade Sunbloom)",
    year: "2024",
    medium: "Oil on Canvas",
    size: "120.0 × 71.0 cm",
    status: "Available",
    image: `${IMG_BASE}/IMGL9595 copy - 청해의 화안 (Jade Sunbloom).jpg`,
    aspect: "16/9",
  },
  {
    title: "생명의 태양 1 (Sun of Life 1)",
    year: "2024",
    medium: "Oil on Canvas",
    size: "120.0 × 50.0 cm",
    status: "Available",
    image: `${IMG_BASE}/IMGL9601 copy - 생명의 태양 1 (Sun of Life 1).jpg`,
    aspect: "12/5",
    fit: "contain",
  },
  {
    title: "비취의 화안 (Emerald Sunbloom)",
    year: "2024",
    medium: "Oil on Canvas",
    size: "91.0 × 72.7 cm",
    status: "Available",
    image: `${IMG_BASE}/IMGL9616 copy - 비취의 화안 (Emerald Sunbloom).jpg`,
    aspect: "5/4",
  },
  {
    title: "라일락의 화안 (Lilac Sunbloom)",
    year: "2024",
    medium: "Oil on Canvas",
    size: "94.0 × 94.0 cm",
    status: "Available",
    image: `${IMG_BASE}/IMGL9619 copy - 라일락의 화안 (Lilac Sunbloom).jpg`,
    aspect: "1/1",
  },
  {
    title: "불꽃의 씨앗 Ⅱ (Heart of Flame Ⅱ)",
    year: "2024",
    medium: "Oil on Canvas",
    size: "60.5 × 60.5 cm",
    status: "Available",
    image: `${IMG_BASE}/60.5x60.5cm (4) - 불꽃의 씨앗.jpg`,
    aspect: "1/1",
  },

   
  {
    title: "비취의 숨결 (Emerald Breath)",
    year: "2025",
    medium: "Oil on Canvas",
    size: "145.5 × 97.0 cm",
    status: "Available",
    image: `${IMG_BASE}/1754143893424 - 비취의 숨결 (Emerald Breath).jpg`,
    aspect: "3/2",
  },
  {
    title: "붉은 숨결 (Scarlet Breath)",
    year: "2025",
    medium: "Oil on Canvas",
    size: "145.5 × 97.0 cm",
    status: "Available",
    image: `${IMG_BASE}/1754143905646 - 붉은 숨결 (Scarlet Breath).jpg`,
    aspect: "3/2",
  },
  {
    title: "황금 숨결 (Golden Breath)",
    year: "2025",
    medium: "Oil on Canvas",
    size: "145.5 × 97.0 cm",
    status: "Available",
    image: `${IMG_BASE}/1754143901190- 황금 숨결 (Golden Breath).jpg`, // 원본
    thumbnail: `${IMG_BASE}/1754143901190- 황금 숨결 (Golden Breath) - 썸네일.jpg`, // ✅ 리스트용 썸네일
    aspect: "3/2",
  },
];

/* =========================
 * Exhibitions / Awards (NEW)
 * =======================*/
// 개인전
const SOLO_SHOWS: SoloItem[] = [
  { year: "2025", text: "제8회 최미진 개인부스전 — 대구 EXCO아트페어" },
  { year: "2024", text: "제7회 최미진 개인전 — 대구 퀸즈크라운베이커리카페" },
  { year: "2024", text: "제6회 최미진 개인전 — 대구 봉산문화회관 3전시실" },
  { year: "2024", text: "제5회 최미진 개인전 — 대구 대백프라자갤러리" },
  { year: "2021", text: "제4회 최미진 개인부스전 — 대구 문화예술회관" },
  { year: "2017", text: "제3회 최미진 개인전 — 경주 신원갤러리" },
  { year: "2016", text: "제2회 최미진 개인전 — 대구 소나무갤러리" },
  { year: "2008", text: "제1회 최미진 개인전 — 대구제일교회 100주년 기념관" },
];

// 단체전(기간형 포함)
const GROUP_SHOWS: GroupItem[] = [
  { period: "2025", text: "중국교류전 — 서울 인사아트프라자갤러리" },
  { period: "2023", text: "한미불 국제교류전 — 대구 문화예술회관" },
  { period: "2016", text: "부산 BAMA 국제아트페어 — 부산 벡스코" },
  { period: "2008", text: "대구경찰청 초대전 — 대구 지산경찰청" },
  { period: "2007", text: "대구–상트페테르부르크 미술교류전 — 대구 문화예술회관" },
  { period: "2006", text: "대구–상트페테르부르크 미술교류전 — 경주 라우갤러리" },
  { period: "2005", text: "APEC 축하 여성작가초대전 — 대구 인터불고갤러리" },
  { period: "2005", text: "우봉 누드크로키전 — 대구 우봉미술관" },
  { period: "2007 ~ 현재", text: "여류100호회 — 정기전·기획전·소품전" },
  { period: "2006 ~ 현재", text: "대한민국현대인물화가회 — 정기전·기획전·소품전" },
  {
    period: "기타",
    text:
      "대한민국현대인물화가회, 대구아트페스티벌, 부산아트페어 외 단체전 100여 회 / " +
      "작품 소장처: 영덕경대안과병원, 흥해경대안과병원, GIA감정원, 대구아름다운치과병원, 수성구청 등",
  },
];

// 수상
const AWARDS: AwardItem[] = [
  { year: "2006", text: "제4회 현대여성미술공모대전 특선 (대구)" },
  { year: "2006", text: "단원미술공모대전 (안산)" },
  { year: "2005", text: "제3회 현대여성미술공모대전 최우수상 (대구)" },
  { year: "2005", text: "단원미술공모대전 (안산)" },
];

/* =========================
 * UI
 * =======================*/
function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-gray-900 text-white grid place-items-center font-semibold">CM</div>
          <div className="leading-tight">
            <h1 className="text-lg font-bold">
              {PROFILE.nameEn} <span className="text-gray-500 text-base">({PROFILE.nameKo})</span>
            </h1>
            <p className="text-sm text-gray-600">{PROFILE.tagline}</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <a href={PROFILE.instagram} target="_blank" className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm hover:bg-gray-50">
            <Instagram className="size-4" /> Instagram
          </a>
          <a href="/contact" className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm hover:bg-gray-50">
            <ExternalLink className="size-4" /> Contact
          </a>

        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const first = ARTWORKS[0];
  const aspect = first?.aspect ?? "4/3";
  const fit = first?.fit ?? "cover";

  // Tailwind purge 회피: 동적 class 대신 인라인 CSS aspect-ratio 사용
  const aspectStyle =
    aspect && aspect.includes("/")
      ? { aspectRatio: aspect.replace("/", " / ") }
      : { aspectRatio: "4 / 3" };

  return (
    <section className="max-w-6xl mx-auto px-4 pt-10 pb-12 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {PROFILE.nameEn}{" "}
          <span className="text-gray-500 font-semibold">({PROFILE.nameKo})</span>
        </h2>
        <p className="mt-3 text-gray-700">{PROFILE.tagline}</p>
        <ul className="mt-5 text-sm text-gray-700 space-y-1">
          <li className="flex items-center gap-2">
            <Palette className="size-4" /> {PROFILE.degree}
          </li>
          <li className="flex items-center gap-2">
            <ExternalLink className="size-4" /> {PROFILE.shows}
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-4" /> {PROFILE.location}
          </li>
        </ul>
        <div className="mt-6 flex gap-3">
          <a
            href="/contact"
            className="rounded-2xl bg-gray-900 text-white px-4 py-2 text-sm hover:opacity-90"
          >
            Contact for Price & Availability
          </a>
          <a
            href={PROFILE.instagram}
            target="_blank"
            className="rounded-2xl border px-4 py-2 text-sm hover:bg-gray-50"
          >
            View Instagram
          </a>
        </div>
      </div>

      <div
        className="relative rounded-2xl overflow-hidden shadow-sm bg-gradient-to-br from-gray-100 to-gray-200"
        style={aspectStyle}
      >
        {first?.image ? (
          <Image
            src={first.image}
            alt={`${first.title}, ${first.year}`}
            fill
            priority
            className={fit === "contain" ? "object-contain" : "object-cover"}
            sizes="(min-width: 768px) 50vw, 100vw"
            placeholder={first.blurDataURL ? "blur" : "empty"}
            blurDataURL={first.blurDataURL}
          />
        ) : (
          <div className="grid place-items-center w-full h-full text-gray-500 text-sm">
            Upload a hero artwork image
          </div>
        )}
      </div>
    </section>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
      {subtitle && <p className="text-gray-600 mt-1 text-sm">{subtitle}</p>}
    </div>
  );
}

/** Lightbox (원본) */
function Lightbox({
  works, index, onClose, onPrev, onNext,
}: { works: Work[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void; }) {
  const work = works[index];
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);

  useEffect(() => { closeBtnRef.current?.focus(); }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative w-full h-full max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={work.image}
          alt={`${work.title}, ${work.year}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
          draggable={false}
          placeholder={work.blurDataURL ? "blur" : "empty"}
          blurDataURL={work.blurDataURL}
        />
        <button ref={closeBtnRef} onClick={onClose} className="absolute top-2 right-2 rounded-full bg-white/90 px-3 py-1 text-sm shadow" aria-label="Close">Close ✕</button>
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-sm shadow" aria-label="Previous">←</button>
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-sm shadow" aria-label="Next">→</button>
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-3">
          <div className="font-medium">{work.title}</div>
          <div className="opacity-90">{work.medium} · {work.size} · {work.year}</div>
        </div>
      </div>
    </div>
  );
}

/** 갤러리 (카드=썸네일) */
function LoadMoreGallery({ works, initialCount = 9, step = 6 }: { works: Work[]; initialCount?: number; step?: number; }) {
  const [visible, setVisible] = useState(initialCount);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const canLoadMore = visible < works.length;
  const list = works.slice(0, visible);

  const openAt = (i: number) => setCurrentIndex(i);
  const close = () => setCurrentIndex(null);
  const prev = () => setCurrentIndex((v) => (v === null ? null : (v - 1 + works.length) % works.length));
  const next = () => setCurrentIndex((v) => (v === null ? null : (v + 1) % works.length));

  return (
    <section id="works" className="max-w-6xl mx-auto px-4 py-10">
      <SectionTitle title="Works" subtitle="Selected paintings and growing archive" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((w, i) => (
          <article
            key={`${w.title}-${i}`}
            className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-shadow cursor-zoom-in"
            onClick={() => openAt(i)}
          >
            <div className="relative aspect-[3/2] bg-gray-100 overflow-hidden">
              {(() => {
                const cardSrc = w.thumbnail ?? w.image;
                const cardBlur = w.thumbnail ? getBlur(cardSrc) : w.blurDataURL;
                return (
                  <Image
                    src={cardSrc}
                    alt={`${w.title}, ${w.year}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    placeholder={cardBlur ? "blur" : "empty"}
                    blurDataURL={cardBlur}
                  />
                );
              })()}
            </div>
            <div className="p-4">
              <h4 className="font-semibold">{w.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{w.medium} · {w.size} · {w.year}</p>
              <span className={`mt-3 inline-flex text-xs items-center gap-2 rounded-full px-2.5 py-1 border ${w.status === "Available" ? "text-emerald-600" : "text-gray-500"}`}>
                {w.status}
              </span>
            </div>
          </article>
        ))}
      </div>

      {canLoadMore && (
        <div className="mt-8 flex justify-center">
          <button onClick={() => setVisible((v) => v + step)} className="rounded-2xl border px-5 py-2 text-sm hover:bg-gray-50">
            더 보기 (+{Math.min(step, works.length - visible)} 작품)
          </button>
        </div>
      )}

      {currentIndex !== null && (
        <Lightbox works={works} index={currentIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}

/** About */
function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-10">
      <SectionTitle title="About" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* 소개문: 한국어 + 영어 */}
          <p className="text-gray-800 leading-relaxed">
            {PROFILE.bioShortKo}
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            {PROFILE.bioShortEn}
          </p>

          {/* 하이라이트 포인트 */}
          <ul className="mt-6 text-sm text-gray-700 space-y-1">
            <li>• {PROFILE.degree}</li>
            <li>• {PROFILE.shows}</li>
          </ul>
        </div>

        {/* 연락 카드 그대로 유지 */}
        <aside className="bg-white rounded-2xl border p-5 shadow-sm">
          <p className="text-sm text-gray-600">
            For artwork inquiries, acquisitions, commissions, or exhibition invitations & collaborations:
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-gray-900 text-white px-4 py-2 text-sm hover:opacity-90"
          >
            <Mail className="size-4" /> Email the Studio
          </a>
          <a
            href={PROFILE.instagram}
            target="_blank"
            className="mt-2 inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-gray-50"
          >
            <Instagram className="size-4" /> Instagram
          </a>
        </aside>
      </div>
    </section>
  );
}


/** Exhibitions (개인전/단체전) */
function Exhibitions() {
  return (
    <section id="exhibitions" className="max-w-6xl mx-auto px-4 py-10">
      <SectionTitle title="Exhibitions" subtitle="Solo & selected group shows" />

      {/* Solo */}
      <h4 className="text-lg font-semibold mb-3">Solo Exhibitions</h4>
      <ul className="relative pl-6 mb-8">
        {SOLO_SHOWS.map((e, i) => (
          <li key={`solo-${i}`} className="mb-4">
            <div className="absolute left-0 mt-1 size-2 rounded-full bg-gray-900" />
            <div className="ml-2">
              <span className="text-sm text-gray-500">{e.year}</span>
              <p className="text-gray-800">{e.text}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Group */}
      <h4 className="text-lg font-semibold mb-3">Group Exhibitions</h4>
      <ul className="relative pl-6">
        {GROUP_SHOWS.map((g, i) => (
          <li key={`group-${i}`} className="mb-4">
            <div className="absolute left-0 mt-1 size-2 rounded-full bg-gray-900" />
            <div className="ml-2">
              <span className="text-sm text-gray-500">{g.period}</span>
              <p className="text-gray-800">{g.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Awards */
function Honors() {
  return (
    <section id="awards" className="max-w-6xl mx-auto px-4 py-10">
      <SectionTitle title="Awards" />
      <div className="grid md:grid-cols-2 gap-6">
        {AWARDS.map((a, i) => (
          <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{a.year}</p>
            <p className="mt-1 font-medium">{a.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} {PROFILE.nameEn}. All rights reserved.</div>
        <div className="flex items-center gap-3">
          <a href={PROFILE.instagram} target="_blank" className="inline-flex items-center gap-2 hover:text-gray-900">
            <Instagram className="size-4" /> Instagram
          </a>
          <a href="/contact" className="inline-flex items-center gap-2 hover:text-gray-900">
            <Mail className="size-4" /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}

/* =========================
 * Page
 * =======================*/
export default function ArtistHomepage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      <Header />
      <Hero />
      <main>
        <LoadMoreGallery works={ARTWORKS} initialCount={9} step={6} />
        <About />
        <Exhibitions />
        <Honors />
      </main>

      {/* JSON-LD: Person + VisualArtwork list */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Choi Mijin",
            jobTitle: "Painter",
            url: DOMAIN,
            sameAs: [PROFILE.instagram],
            works: ARTWORKS.map((w) => ({
              "@context": "https://schema.org",
              "@type": "VisualArtwork",
              name: w.title,
              artform: "Painting",
              artMedium: w.medium,
              width: w.size,
              dateCreated: w.year,
              image: `${DOMAIN}${w.image}`,
              creator: { "@type": "Person", name: "Choi Mijin" },
            })),
          }),
        }}
      />
      <Footer />
    </div>
  );
}

'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * 1. FULL HERO MEHNDI & POINTED LOTUS MANDALA (For Chapter 1 Hero)
 */
export function HeroMehndiMandala({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(300, 300)" stroke="#D49B4B" strokeLinecap="round" strokeLinejoin="round">
        <circle r="138" strokeWidth="1.5" strokeOpacity="0.5" />
        <circle r="146" strokeWidth="2.2" />
        <circle r="154" strokeWidth="1.5" strokeDasharray="2 6" />
        <circle r="188" strokeWidth="2" />
        <circle r="195" strokeWidth="1.2" strokeOpacity="0.7" />

        {/* Inner Ring of 16 Scalloped Ribbed Fan Domes */}
        {Array.from({ length: 16 }).map((_, i) => (
          <g key={`inner-fan-${i}`} transform={`rotate(${i * 22.5})`}>
            <path
              d="M -29,-146 C -26,-184 26,-184 29,-146"
              strokeWidth="2"
              fill="#D49B4B"
              fillOpacity="0.06"
            />
            <path d="M -23,-146 C -20,-176 20,-176 23,-146" strokeWidth="1.2" />
            <line x1="0" y1="-146" x2="0" y2="-174" strokeWidth="1.3" />
            <line x1="0" y1="-146" x2="-9" y2="-171" strokeWidth="1.2" />
            <line x1="0" y1="-146" x2="9" y2="-171" strokeWidth="1.2" />
            <line x1="0" y1="-146" x2="-16" y2="-164" strokeWidth="1.1" />
            <line x1="0" y1="-146" x2="16" y2="-164" strokeWidth="1.1" />
          </g>
        ))}

        {/* Secondary Layer: 8 Interlocking Lotus Buds + Spiral Volute Curls */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`secondary-bud-${i}`} transform={`rotate(${i * 45 + 22.5})`}>
            <path
              d="M -52,-195 C -46,-238 -16,-254 0,-276 C 16,-254 46,-238 52,-195"
              strokeWidth="2.8"
              fill="#4A180D"
              fillOpacity="0.45"
            />
            <path
              d="M -42,-195 C -36,-230 -12,-244 0,-262 C 12,-244 36,-230 42,-195"
              strokeWidth="1.4"
            />
            <path
              d="M 0,-195 L 0,-248 M 0,-195 L -14,-240 M 0,-195 L 14,-240 M 0,-195 L -26,-226 M 0,-195 L 26,-226"
              strokeWidth="1.3"
            />
            <path
              d="M -24,-248 C -34,-262 -48,-256 -44,-244 C -41,-236 -31,-240 -34,-247"
              strokeWidth="1.5"
            />
            <path
              d="M 24,-248 C 34,-262 48,-256 44,-244 C 41,-236 31,-240 34,-247"
              strokeWidth="1.5"
            />
          </g>
        ))}

        {/* Primary Layer: 8 Grand Royal Pointed Ogee Lotus Arches */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`primary-arch-${i}`} transform={`rotate(${i * 45})`}>
            <path
              d="M -74,-196 C -68,-252 -24,-274 0,-297 C 24,-274 68,-252 74,-196"
              strokeWidth="2.2"
              strokeDasharray="1 7"
            />
            <path
              d="M -66,-192 C -60,-244 -20,-266 0,-290 C 20,-266 60,-244 66,-192"
              strokeWidth="3.6"
              fill="#4A180D"
              fillOpacity="0.85"
            />
            <path
              d="M -56,-193 C -50,-236 -16,-256 0,-276 C 16,-256 50,-236 56,-193"
              strokeWidth="1.6"
            />
            <path
              d="M -38,-194 C -36,-234 36,-234 38,-194"
              strokeWidth="2"
              fill="#D49B4B"
              fillOpacity="0.12"
            />
            <path d="M -30,-194 C -28,-224 28,-224 30,-194" strokeWidth="1.2" />
            <path
              d="M 0,-194 C -5,-212 -3,-228 0,-232 C 3,-228 5,-212 0,-194 Z"
              strokeWidth="1.3"
              fill="#D49B4B"
              fillOpacity="0.2"
            />
            <path
              d="M 0,-194 C -14,-210 -18,-224 -14,-228 C -9,-226 -4,-210 0,-194 Z"
              strokeWidth="1.3"
              fill="#D49B4B"
              fillOpacity="0.2"
            />
            <path
              d="M 0,-194 C 14,-210 18,-224 14,-228 C 9,-226 4,-210 0,-194 Z"
              strokeWidth="1.3"
              fill="#D49B4B"
              fillOpacity="0.2"
            />
            <path
              d="M 0,-194 C -24,-204 -30,-216 -26,-220 C -20,-219 -10,-206 0,-194 Z"
              strokeWidth="1.2"
            />
            <path
              d="M 0,-194 C 24,-204 30,-216 26,-220 C 20,-219 10,-206 0,-194 Z"
              strokeWidth="1.2"
            />
            <path
              d="M 0,-236 C -8,-248 -6,-262 0,-268 C 6,-262 8,-248 0,-236 Z"
              strokeWidth="1.6"
              fill="#D49B4B"
              fillOpacity="0.3"
            />
            <circle cx="0" cy="-252" r="2.2" fill="#D49B4B" />
            <circle cx="-18" cy="-244" r="2" fill="#D49B4B" />
            <circle cx="18" cy="-244" r="2" fill="#D49B4B" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/**
 * 2. RAMESHWARAM-STYLE 8-PETAL LOTUS IMAGE FRAME (Replaces circles in "Find Your Favorites")
 */
export function RameshwaramLotusFrame({
  src,
  alt,
  className = 'w-44 h-44',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative select-none ${className} drop-shadow-[0_14px_24px_rgba(58,38,24,0.18)]`}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="rameshwaram-lotus-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.50,0.01 C 0.58,0.06 0.63,0.12 0.638,0.167 C 0.70,0.13 0.78,0.12 0.846,0.154 C 0.88,0.22 0.87,0.30 0.833,0.362 C 0.88,0.37 0.94,0.42 0.99,0.50 C 0.94,0.58 0.88,0.63 0.833,0.638 C 0.87,0.70 0.88,0.78 0.846,0.846 C 0.78,0.88 0.70,0.87 0.638,0.833 C 0.63,0.88 0.58,0.94 0.50,0.99 C 0.42,0.94 0.37,0.88 0.362,0.833 C 0.30,0.87 0.22,0.88 0.154,0.846 C 0.12,0.78 0.13,0.70 0.167,0.638 C 0.12,0.63 0.06,0.58 0.01,0.50 C 0.06,0.42 0.12,0.37 0.167,0.362 C 0.13,0.30 0.12,0.22 0.154,0.154 C 0.22,0.12 0.30,0.13 0.362,0.167 C 0.37,0.12 0.42,0.06 0.50,0.01 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Outer Golden Lotus Border Halo */}
      <div
        className="w-full h-full p-[5px] bg-gradient-to-b from-[#D49B4B] to-[#9E742B]"
        style={{ clipPath: 'url(#rameshwaram-lotus-clip)' }}
      >
        {/* Inner Food Image Clipped to Lotus Shape */}
        <div
          className="w-full h-full overflow-hidden bg-[#FAF5EC]"
          style={{ clipPath: 'url(#rameshwaram-lotus-clip)' }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * 3. SCROLL-DRAWN LOOPED ARROW (Draws shaft first, then arrowhead tip as user scrolls)
 */
export function HandDrawnLoopedArrow({
  color = '#D97736',
  flip = false,
  className = 'w-28 h-12',
}: {
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const shaftRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!svgRef.current || !shaftRef.current || !headRef.current) return;

    const shaftLen = shaftRef.current.getTotalLength();
    const headLen = headRef.current.getTotalLength();

    gsap.set(shaftRef.current, {
      strokeDasharray: shaftLen,
      strokeDashoffset: shaftLen,
    });
    gsap.set(headRef.current, {
      strokeDasharray: headLen,
      strokeDashoffset: headLen,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 40%',
          end: 'top 18%',
          scrub: 0.4,
        },
      });

      // Step 1: Draw the looped line shaft from start to tip
      tl.to(shaftRef.current, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'none',
      })
        // Step 2: Draw the arrowhead right as the shaft finishes
        .to(
          headRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.25,
            ease: 'none',
          },
          '-=0.05'
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 60"
      fill="none"
      className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={shaftRef}
        d="M 10,38 C 35,52 72,44 70,22 C 68,6 46,10 48,26 C 50,44 88,46 108,24"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        ref={headRef}
        d="M 95,22 L 109,23 L 104,37"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 4. REPEATING GOLDEN LOTUS-PETAL BORDER TRIM
 */
export function SarvaniGoldenBorder({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none ${
        flip ? 'rotate-180' : ''
      }`}
    >
      <svg
        viewBox="0 0 1200 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-6 sm:h-8"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="sarvani-petal-pattern"
            x="0"
            y="0"
            width="60"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 35 C12 35 20 8 30 3 C40 8 48 35 60 35"
              stroke="#C6923A"
              strokeWidth="1.4"
              fill="none"
            />
            <path
              d="M10 35 C18 35 24 16 30 11 C36 16 42 35 50 35"
              stroke="#C6923A"
              strokeWidth="1"
              strokeOpacity="0.6"
              fill="none"
            />
            <circle cx="30" cy="24" r="2.2" fill="#C6923A" />
            <circle cx="0" cy="18" r="1.5" fill="#C6923A" fillOpacity="0.6" />
            <circle cx="60" cy="18" r="1.5" fill="#C6923A" fillOpacity="0.6" />
          </pattern>
        </defs>
        <rect width="1200" height="36" fill="url(#sarvani-petal-pattern)" />
        <line x1="0" y1="35.5" x2="1200" y2="35.5" stroke="#C6923A" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}

/**
 * 5. ORNATE MANDALA WHEEL (For Section 2, Between Section 2 & 3, Twin Pedestals & Platform Banner)
 */
export function OrnateMandalaWheel({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="#C6923A" strokeWidth="1.5">
        <circle cx="200" cy="200" r="190" strokeOpacity="0.35" />
        <circle cx="200" cy="200" r="168" strokeDasharray="4 6" strokeOpacity="0.6" />
        <circle cx="200" cy="200" r="142" strokeOpacity="0.5" />
        <circle cx="200" cy="200" r="110" strokeOpacity="0.7" />
        <circle cx="200" cy="200" r="76" strokeDasharray="3 5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 200 200)`}>
            <path
              d="M200 10 C222 42 226 68 200 90 C174 68 178 42 200 10 Z"
              stroke="#C6923A"
              strokeWidth="1.6"
              fill="#C6923A"
              fillOpacity="0.07"
            />
            <path
              d="M200 26 C212 46 214 62 200 76 C186 62 188 46 200 26 Z"
              stroke="#C6923A"
              strokeWidth="1.1"
            />
            <circle cx="200" cy="52" r="3" fill="#C6923A" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/**
 * 6. GOLDEN FILIGREE FLOURISH DIVIDER
 */
export function GoldenFiligreeDivider({ className = 'w-64' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="18" x2="112" y2="18" stroke="#C6923A" strokeWidth="1.4" />
      <line x1="188" y1="18" x2="290" y2="18" stroke="#C6923A" strokeWidth="1.4" />
      <circle cx="10" cy="18" r="2.5" fill="#C6923A" />
      <circle cx="290" cy="18" r="2.5" fill="#C6923A" />
      <path
        d="M150 4 C156 12 168 18 182 18 C168 18 156 24 150 32 C144 24 132 18 118 18 C132 18 144 12 150 4 Z"
        stroke="#C6923A"
        strokeWidth="1.5"
        fill="#C6923A"
        fillOpacity="0.2"
      />
      <path
        d="M132 12 C122 6 116 18 128 22 M168 12 C178 6 184 18 172 22"
        stroke="#C6923A"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BandhanKolamLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <img
      src="/bandhanlogo.png"
      alt="Bandhan Sweets"
      className={`${className} object-contain`}
    />
  );
}

export function GlobalBandhanClips() {
  return null;
}

export function CleanAngledSlope({ fill = '#120E0C', flip = false }: { fill?: string; flip?: boolean }) {
  return <SarvaniGoldenBorder flip={flip} />;
}

export function BandhanScrollThread() {
  return null;
}
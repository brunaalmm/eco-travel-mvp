/** Decorative monochrome-green pixel landscape: mountains, forest, clouds and a hiker with a trekking pole. */
const pine = ["...X...", "..XXX..", ".XXXXX.", "..XXX..", ".XXXXX.", "XXXXXXX", "...X...", "...X..."];
const cloud = ["..XXX....", ".XXXXXXX.", "XXXXXXXXX"];
const clouds = [
  { size: 6, top: "9%", delay: "0s" },
  { size: 3, top: "16%", delay: "-3.5s" },
  { size: 5, top: "24%", delay: "-7s" },
  { size: 2, top: "11%", delay: "-10.5s" },
  { size: 4, top: "20%", delay: "-14s" },
  { size: 3, top: "27%", delay: "-17.5s" },
];
const bird = ["X...X", ".X.X.", "..X.."];
const birdFlap = ["..X..", ".X.X.", "X...X"];
// Hiker: H = body, P = trekking pole.
const hiker = [
  "..HH....",
  "..HH....",
  ".HHHH..P",
  "HHHHHH.P",
  ".HHHHHHP",
  "..HH...P",
  "..HH...P",
  ".H..H..P",
  ".H..H..P",
  "H....H.P",
];

function Sprite({ map, size, className, fills }: { map: string[]; size: number; className?: string; fills: Record<string, string> }) {
  const w = map[0]?.length ?? 0;
  return (
    <svg viewBox={`0 0 ${w} ${map.length}`} width={w * size} height={map.length * size} className={className} shapeRendering="crispEdges" aria-hidden="true">
      {map.flatMap((row, y) => [...row].map((c, x) => (fills[c] ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className={fills[c]} /> : null)))}
    </svg>
  );
}

export function PixelNature() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-pixel-sky" aria-hidden="true">
      {/* Mountains (stepped pixel silhouettes) */}
      <svg viewBox="0 0 64 32" preserveAspectRatio="none" shapeRendering="crispEdges" className="absolute inset-x-0 bottom-0 h-[70%] w-full">
        <path d="M0 32V20h4v-2h4v-3h4v-3h4v-3h4v3h4v3h4v2h4v-3h4v-4h4V6h4v4h4v4h4v3h4v4h4v11Z" className="fill-pixel-far" />
        <path d="M0 32V24h6v-2h6v-3h6v3h4v2h6v-4h6v-3h4v3h6v3h6v3h6v-2h8v10Z" className="fill-pixel-mid" />
        <path d="M0 32v-4h64v4Z" className="fill-pixel-near" />
      </svg>
      {clouds.map(({ size, top, delay }) => (
        <div key={`${size}-${top}`} className="absolute inset-y-0 left-0 w-full animate-pixel-cloud" style={{ animationDelay: delay }}>
          <div className="absolute left-0" style={{ top }}>
            <Sprite map={cloud} size={size} fills={{ X: "fill-pixel-cloud" }} />
          </div>
        </div>
      ))}
      <FlyingBird top="12%" delay="-2s" />
      <FlyingBird top="22%" delay="-9s" size={4} />
      <FlyingBird top="17%" delay="-16s" />
      {/* Forest */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-2">
        {[6, 9, 5, 8, 7, 10, 6, 8].map((s, i) => (
          <Sprite key={i} map={pine} size={s} fills={{ X: i % 2 ? "fill-pixel-tree" : "fill-pixel-tree-dark" }} />
        ))}
      </div>
      {/* Hiker walking with trekking pole */}
      <div className="pixel-walk-track absolute inset-x-0 bottom-0 h-10 w-full animate-pixel-walk">
        <div className="absolute bottom-0 right-0">
          <Sprite map={hiker} size={4} fills={{ H: "fill-pixel-hiker", P: "fill-pixel-cloud" }} />
        </div>
      </div>
    </div>
  );
}

function FlyingBird({ top, delay, size = 3 }: { top: string; delay: string; size?: number }) {
  return (
    <div className="absolute inset-y-0 left-0 w-full animate-pixel-flight" style={{ animationDelay: delay }}>
      <div className="absolute left-0 animate-pixel-bob" style={{ top }}>
        <span className="relative block h-[9px] w-[15px]" style={{ width: `${size * 5}px`, height: `${size * 3}px` }}>
          <Sprite map={bird} size={size} fills={{ X: "fill-pixel-cloud" }} className="absolute inset-0 animate-pixel-wing-a" />
          <Sprite map={birdFlap} size={size} fills={{ X: "fill-pixel-cloud" }} className="absolute inset-0 animate-pixel-wing-b" />
        </span>
      </div>
    </div>
  );
}

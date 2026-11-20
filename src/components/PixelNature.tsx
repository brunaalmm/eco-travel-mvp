/** Decorative monochrome-green pixel landscape: mountains, forest, clouds and a hiker with a trekking pole. */
const pine = ["...X...", "..XXX..", ".XXXXX.", "..XXX..", ".XXXXX.", "XXXXXXX", "...X...", "...X..."];
const cloud = ["..XXX....", ".XXXXXXX.", "XXXXXXXXX"];
const clouds = [
  { size: 6, top: "9%", left: "12%" },
  { size: 3, top: "16%", left: "38%" },
  { size: 5, top: "24%", left: "68%" },
  { size: 2, top: "11%", left: "85%" },
  { size: 4, top: "20%", left: "52%" },
  { size: 3, top: "27%", left: "25%" },
];
const bird = ["X...X", ".X.X.", "..X.."];
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
      {clouds.map(({ size, top, left }) => (
        <div key={`${size}-${top}`} className="absolute" style={{ top, left }}>
          <Sprite map={cloud} size={size} fills={{ X: "fill-pixel-cloud" }} />
        </div>
      ))}
      <StaticBird top="12%" left="32%" />
      <StaticBird top="22%" left="62%" size={4} />
      <StaticBird top="17%" left="82%" />
      {/* Forest */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-2">
        {[6, 9, 5, 8, 7, 10, 6, 8].map((s, i) => (
          <Sprite key={i} map={pine} size={s} fills={{ X: i % 2 ? "fill-pixel-tree" : "fill-pixel-tree-dark" }} />
        ))}
      </div>
      {/* Hiker walking with trekking pole */}
      <div className="absolute bottom-0 right-0">
        <Sprite map={hiker} size={4} fills={{ H: "fill-pixel-hiker", P: "fill-pixel-cloud" }} />
      </div>
    </div>
  );
}

function StaticBird({ top, left, size = 3 }: { top: string; left: string; size?: number }) {
  return (
    <div className="absolute" style={{ top, left }}>
      <Sprite map={bird} size={size} fills={{ X: "fill-pixel-cloud" }} />
    </div>
  );
}

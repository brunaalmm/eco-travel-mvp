/** Decorative pixel-art scene: leaves, pine trees, sun and a small bird drifting gently. */
const leaf = ["..XX..", ".XXXX.", "XXXXXX", ".XXXX.", "..XX..", "..X..."];
const pine = ["...X...", "..XXX..", ".XXXXX.", "..XXX..", ".XXXXX.", "XXXXXXX", "...X...", "...X..."];
const bird = ["X...X", ".X.X.", "..X.."];

function Sprite({ map, size, className, fill }: { map: string[]; size: number; className: string; fill: string }) {
  const w = map[0]?.length ?? 0;
  return (
    <svg viewBox={`0 0 ${w} ${map.length}`} width={w * size} height={map.length * size} className={className} shapeRendering="crispEdges" aria-hidden="true">
      {map.flatMap((row, y) => [...row].map((c, x) => (c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className={fill} /> : null)))}
    </svg>
  );
}

export function PixelNature() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Sprite map={[".XXX.", "XXXXX", "XXXXX", "XXXXX", ".XXX."]} size={9} fill="fill-warning" className="absolute right-[12%] top-[14%] animate-pixel-drift opacity-80" />
      <Sprite map={bird} size={5} fill="fill-login-paper" className="absolute left-[18%] top-[20%] animate-pixel-drift" />
      <Sprite map={bird} size={4} fill="fill-login-paper" className="absolute left-[30%] top-[12%] animate-pixel-drift [animation-delay:1.5s]" />
      {[{ l: "6%", t: "40%", d: "0s" }, { l: "80%", t: "48%", d: "1s" }, { l: "62%", t: "22%", d: "2s" }, { l: "40%", t: "55%", d: "3s" }].map((p) => (
        <span key={p.l} className="absolute" style={{ left: p.l, top: p.t }}>
          <Sprite map={leaf} size={5} fill="fill-leaf" className="animate-pixel-drift" />
        </span>
      ))}
      <div className="absolute inset-x-0 bottom-28 flex items-end justify-between px-3">
        {[7, 10, 6, 9, 8, 11, 7].map((s, i) => (
          <Sprite key={i} map={pine} size={s} fill={i % 2 ? "fill-leaf" : "fill-primary"} className="animate-pixel-sway" />
        ))}
      </div>
    </div>
  );
}

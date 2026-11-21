import type { DashboardData, Period } from "./dashboard-data";
import { environmentalMetricData } from "./environmental-metrics";

// Standard PDF fonts only support WinAnsi; replace characters they cannot encode.
const safe = (t: string) => t.replace(/₂/g, "2").replace(/[—–]/g, "-");

export async function createDashboardPdf(data: DashboardData, period: Period) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const page = pdf.addPage([595, 842]);
  // PDF colors mirror the official app palette; the PDF renderer cannot read CSS tokens.
  const forest = rgb(0, 63 / 255, 56 / 255);
  const leaf = rgb(95 / 255, 155 / 255, 95 / 255);
  const paper = rgb(1, 249 / 255, 243 / 255);
  const light = rgb(232 / 255, 242 / 255, 232 / 255);
  const white = rgb(1, 1, 1);
  const red = rgb(0.75, 0.2, 0.15);
  const text = (t: string, x: number, y: number, size = 10, strong = false, color = forest) => page.drawText(safe(t), { x, y, size, font: strong ? bold : font, color });

  page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: paper });
  page.drawRectangle({ x: 0, y: 752, width: 595, height: 90, color: forest });
  text("EcoTravel | Relatório Executivo", 40, 800, 22, true, white);
  text(`Monitorização da pegada de carbono · ${period}`, 40, 775, 10, false, white);

  const { emissions, reduction, mostUsed } = environmentalMetricData;
  const kpis: [string, string][] = [
    [`${emissions.total} ${emissions.totalUnit}`, emissions.yearLabel],
    [reduction.range, `Meta ambiental ${reduction.until}`],
    [mostUsed.label, mostUsed.description],
  ];
  kpis.forEach(([v, l], i) => {
    const x = 40 + i * 175;
    page.drawRectangle({ x, y: 670, width: 165, height: 62, color: light });
    text(v, x + 12, 702, 16, true);
    text(l, x + 12, 682, 9);
  });

  text("Distribuição por transportes", 40, 640, 13, true);
  const modeOrder = ["carro", "onibus", "bike", "trilha", "pe"];
  [...emissions.modes]
    .sort((a, b) => modeOrder.indexOf(a.id) - modeOrder.indexOf(b.id))
    .forEach((m, i) => {
      const y = 615 - i * 22;
      text(m.label, 40, y, 10);
      page.drawRectangle({ x: 130, y: y - 2, width: 300, height: 10, color: light });
      page.drawRectangle({ x: 130, y: y - 2, width: 3 * m.percent, height: 10, color: leaf });
      text(`${m.percent}% - ${m.tonnes} Mt`, 445, y, 10, true);
    });

  text("Roteiros monitorados", 40, 490, 13, true);
  page.drawRectangle({ x: 40, y: 462, width: 515, height: 20, color: forest });
  ["Roteiro", "Região", "Ocupação", "CO2"].forEach((h, i) => text(h, [48, 270, 420, 500][i]!, 468, 9, true, white));
  data.records.forEach((r, i) => {
    const y = 442 - i * 20;
    if (i % 2) page.drawRectangle({ x: 40, y: y - 6, width: 515, height: 20, color: light });
    const usage = Math.round((r.trips / r.capacity) * 100);
    text(r.route.slice(0, 38), 48, y, 9);
    text(r.region.slice(0, 26), 270, y, 9);
    text(`${usage}%`, 420, y, 9, usage > 100, usage > 100 ? red : forest);
    text(`${r.tonnes.toFixed(1)} t`, 500, y, 9, true);
  });

  const alertY = 442 - data.records.length * 20 - 25;
  text("Alertas de capacidade", 40, alertY, 13, true);
  if (data.overCapacity.length) data.overCapacity.forEach((a, i) => text(`${a.route}: ${a.usage}% da capacidade de suporte`, 40, alertY - 20 - i * 16, 10, false, red));
  else text("Nenhum roteiro acima da capacidade de suporte.", 40, alertY - 20, 10);

  page.drawLine({ start: { x: 40, y: 70 }, end: { x: 555, y: 70 }, thickness: 0.5, color: leaf });
  text("DEMONSTRAÇÃO - dados ilustrativos, sem monitorização real. Valores arredondados.", 40, 55, 8);
  text("EcoTravel - Turismo sustentável inteligente", 40, 42, 8);
  const bytes = await pdf.save();
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}

export function downloadDashboardPdf(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ecotravel-relatorio-executivo.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

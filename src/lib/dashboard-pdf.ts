import type { DashboardData, Period, Region } from "./dashboard-data";

export async function createDashboardPdf(data: DashboardData, region: Region, period: Period) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const page = pdf.addPage([595, 842]);
  // PDF colors mirror the official app palette; the PDF renderer cannot read CSS tokens.
  const forest = rgb(0, 63 / 255, 56 / 255);
  const paper = rgb(1, 249 / 255, 243 / 255);
  page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: paper });
  const line = (text: string, y: number, size = 11, strong = false) => page.drawText(text, { x: 42, y, size, font: strong ? bold : font, color: forest });
  line("EcoTravel | Relatório regional", 785, 24, true);
  line("Monitorização da pegada de carbono no Estado de São Paulo", 757);
  line("DEMONSTRAÇÃO - dados ilustrativos, sem monitorização real", 732, 10);
  line(`Região: ${region} | Período: ${period}`, 701);
  line(`${data.total.toFixed(1)} t CO2 economizadas`, 657, 21, true);
  line(`Meta ambiental: ${data.progress}% de ${data.target} t CO2`, 629);
  line(`Transporte mais utilizado: ${data.mostUsed?.label ?? "Sem dados"}`, 607);
  line("Distribuição por modal", 568, 15, true);
  data.distribution.forEach((mode, index) => line(`${mode.label}: ${mode.percent}% | ${mode.tonnes.toFixed(1)} t CO2 | ${mode.trips} deslocamentos`, 542 - index * 23));
  line("Registros recentes e destinos monitorados", 401, 15, true);
  data.records.forEach((row, index) => {
    line(row.route, 374 - index * 34, 11, true);
    line(`${row.region} | ${data.distribution.find((m) => m.id === row.mode)?.label ?? ""} | ${row.tonnes.toFixed(1)} t CO2`, 359 - index * 34, 10);
  });
  line("Valores arredondados. Percentuais demonstrativos aproximados.", 62, 9);
  line("EcoTravel - Turismo sustentável inteligente", 43, 9);
  const bytes = await pdf.save();
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}

export function downloadDashboardPdf(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ecotravel-relatorio-carbono.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
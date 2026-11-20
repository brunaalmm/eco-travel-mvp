import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDownToLine, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnvironmentalMetrics } from "@/components/EnvironmentalMetrics";
import { useDashboard } from "@/components/DashboardContext";
import { getDashboardData } from "@/lib/dashboard-data";
import { createDashboardPdf, downloadDashboardPdf } from "@/lib/dashboard-pdf";
import { environmentalMetricData } from "@/lib/environmental-metrics";

export const Route = createFileRoute("/dashboard/relatorios")({
  head: () => ({ meta: [
    { title: "Painel do Gestor" },
    { name: "description", content: "Exporte relatórios executivos em PDF com os filtros regionais e indicadores do painel." },
    { property: "og:title", content: "Central de Relatórios — Painel do Gestor EcoTravel" },
    { property: "og:description", content: "Relatórios executivos padronizados em PDF." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Relatorios,
});

function Relatorios() {
  const { region, period, peak, data } = useDashboard();
  const { emissions, reduction, mostUsed } = environmentalMetricData;
  const [pdf, setPdf] = useState<{ blob?: Blob; error?: string }>({});
  const [done, setDone] = useState(false);
  useEffect(() => {
    let active = true;
    setPdf({}); setDone(false);
    // Prepared before the click so mobile browsers keep the download gesture.
    createDashboardPdf(getDashboardData(region, period, peak), region, period)
      .then((blob) => { if (active) setPdf({ blob }); })
      .catch(() => { if (active) setPdf({ error: "Não foi possível gerar o relatório. Tente outro filtro." }); });
    return () => { active = false; };
  }, [region, period, peak]);
  function download() {
    if (!pdf.blob) return;
    downloadDashboardPdf(pdf.blob);
    setDone(true);
    window.alert("Relatório PDF gerado com sucesso! O download foi iniciado.");
  }
  return <div className="grid gap-5">
    <EnvironmentalMetrics />
    <section aria-labelledby="reports-title" className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
    <div className="rounded-2xl bg-forest p-6 text-forest-foreground">
      <FileText className="h-7 w-7 text-dashboard-chart-1" />
      <h2 id="reports-title" className="mt-4 text-xl font-semibold">Central de Relatórios</h2>
      <p className="mt-2 text-sm text-forest-foreground/70">Relatório executivo padronizado com cabeçalho, indicadores, distribuição por modal, roteiros e alertas de capacidade, usando os filtros atuais.</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        {[["Região", region], ["Período", period], ["Cenário", peak ? "Pico / Feriado" : "Regular"], ["Roteiros", String(data.records.length)]].map(([k, v]) => <div key={k} className="rounded-xl bg-forest-foreground/10 p-3"><dt className="text-xs text-forest-foreground/60">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>)}
      </dl>
      <Button variant="leaf" onClick={download} disabled={!pdf.blob} className="mt-6 h-12 w-full"><ArrowDownToLine />{pdf.blob ? "Baixar Relatório (PDF)" : "Preparando relatório…"}</Button>
      {done && <p role="status" className="mt-3 flex items-center gap-2 text-xs text-dashboard-chart-1"><CheckCircle2 className="h-4 w-4" />Download iniciado</p>}
      {pdf.error && <p role="alert" className="mt-3 text-sm text-destructive">{pdf.error}</p>}
    </div>
    <div className="rounded-2xl border border-border bg-card p-6" aria-label="Prévia do relatório">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prévia</p>
      <div className="mt-3 rounded-xl bg-forest px-4 py-3 text-forest-foreground"><p className="font-semibold">EcoTravel | Relatório Executivo</p><p className="text-xs text-forest-foreground/70">{region} · {period}</p></div>
      <div className="mt-4 grid gap-3 md:grid-cols-3" aria-label="Indicadores ambientais da prévia">
        <article className="rounded-xl bg-accent p-4">
          <h3 className="text-sm font-semibold">{emissions.title}</h3>
          <p className="mt-2 font-display text-2xl font-semibold">{emissions.total} {emissions.totalUnit}</p>
          <p className="text-xs text-muted-foreground">{emissions.yearLabel}</p>
          <p className="mt-2 text-[10px] text-muted-foreground">{emissions.description}</p>
          <ul className="mt-3 space-y-2">
            {emissions.modes.map((mode) => (
              <li key={mode.id} className="flex items-start justify-between gap-2 text-xs">
                <span className="min-w-0">
                  <span className="block font-medium">{mode.label}</span>
                  <span className="block text-[10px] text-muted-foreground">{mode.description}</span>
                </span>
                <span className="shrink-0 text-right">{mode.percent}%<br />{mode.tonnes} Mt</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl bg-accent p-4">
          <p className="text-[10px] text-muted-foreground">{reduction.plan}</p>
          <h3 className="mt-2 text-sm font-semibold">{reduction.title}</h3>
          <p className="mt-3 font-display text-2xl font-semibold">{reduction.range}</p>
          <p className="text-xs text-muted-foreground">{reduction.until}</p>
          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-label={reduction.title}
            aria-valuenow={reduction.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full rounded-full bg-dashboard-chart-1" style={{ width: `${reduction.progress}%` }} />
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground">{reduction.description}</p>
        </article>
        <article className="rounded-xl bg-accent p-4">
          <p className="text-[10px] text-muted-foreground">{mostUsed.fleet}</p>
          <h3 className="mt-2 text-sm font-semibold">{mostUsed.title}</h3>
          <p className="mt-3 font-display text-2xl font-semibold">{mostUsed.label}</p>
          <p className="mt-2 text-xs text-muted-foreground">{mostUsed.description}</p>
        </article>
      </div>
      <ul className="mt-4 divide-y divide-border text-sm">{data.records.map((r) => <li key={`${r.id}-${r.mode}`} className="flex justify-between gap-3 py-2"><span>{r.route}</span><b>{r.tonnes.toFixed(1)} t</b></li>)}</ul>
    </div>
    </section>
  </div>;
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDownToLine, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/components/DashboardContext";
import { getDashboardData } from "@/lib/dashboard-data";
import { createDashboardPdf, downloadDashboardPdf } from "@/lib/dashboard-pdf";
import { environmentalMetricData } from "@/lib/environmental-metrics";

export const Route = createFileRoute("/dashboard/relatorios")({
  head: () => ({ meta: [
    { title: "Relatórios" },
    { name: "description", content: "Exporte relatórios executivos em PDF com os indicadores do painel." },
    { property: "og:title", content: "Central de Relatórios — Painel do Gestor EcoTravel" },
    { property: "og:description", content: "Relatórios executivos padronizados em PDF." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Relatorios,
});

function Relatorios() {
  const { period, data } = useDashboard();
  const { emissions, reduction, mostUsed } = environmentalMetricData;
  const [pdf, setPdf] = useState<{ blob?: Blob; error?: string }>({});
  const [done, setDone] = useState(false);
  useEffect(() => {
    let active = true;
    setPdf({}); setDone(false);
    // Prepared before the click so mobile browsers keep the download gesture.
    createDashboardPdf(getDashboardData("Todas", period, false), period)
      .then((blob) => { if (active) setPdf({ blob }); })
      .catch(() => { if (active) setPdf({ error: "Não foi possível gerar o relatório. Tente novamente." }); });
    return () => { active = false; };
  }, [period]);
  function download() {
    if (!pdf.blob) return;
    downloadDashboardPdf(pdf.blob);
    setDone(true);
    window.alert("Relatório PDF gerado com sucesso! O download foi iniciado.");
  }
  return <div className="grid gap-5">
    <section aria-labelledby="reports-title" className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
    <div className="rounded-2xl bg-forest p-6 text-forest-foreground">
      <FileText className="h-7 w-7 text-dashboard-chart-1" />
      <h2 id="reports-title" className="mt-4 text-xl font-semibold">Central de Relatórios</h2>
      <p className="mt-2 text-sm text-forest-foreground/70">Relatório executivo padronizado com cabeçalho, indicadores, distribuição por transportes e roteiros monitorados.</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        {[["Período", period], ["Roteiros", String(data.records.length)]].map(([k, v]) => <div key={k} className="rounded-xl bg-forest-foreground/10 p-3"><dt className="text-xs text-forest-foreground/60">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>)}
      </dl>
      <Button variant="leaf" onClick={download} disabled={!pdf.blob} className="mt-6 h-12 w-full"><ArrowDownToLine />{pdf.blob ? "Baixar Relatório (PDF)" : "Preparando relatório…"}</Button>
      {done && <p role="status" className="mt-3 flex items-center gap-2 text-xs text-dashboard-chart-1"><CheckCircle2 className="h-4 w-4" />Download iniciado</p>}
      {pdf.error && <p role="alert" className="mt-3 text-sm text-destructive">{pdf.error}</p>}
    </div>
    <div className="rounded-2xl border border-border bg-card p-6" aria-label="Prévia do relatório">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prévia</p>
      <div className="mt-3 rounded-xl bg-forest px-4 py-3 text-forest-foreground"><p className="font-semibold">EcoTravel | Relatório Executivo</p><p className="text-xs text-forest-foreground/70">{period}</p></div>
      <div className="mt-4 grid gap-3 md:grid-cols-3" aria-label="Indicadores ambientais da prévia">
        <article className="rounded-xl bg-accent p-4">
          <h3 className="text-sm font-semibold">{emissions.title}</h3>
          <p className="mt-2 font-display text-2xl font-semibold">{emissions.total} {emissions.totalUnit}</p>
          <p className="text-xs text-muted-foreground">{emissions.yearLabel}</p>
        </article>
        <article className="rounded-xl bg-accent p-4">
          <h3 className="mt-2 text-sm font-semibold">{reduction.title}</h3>
          <p className="mt-3 font-display text-2xl font-semibold">{reduction.range}</p>
          <p className="text-xs text-muted-foreground">{reduction.until}</p>
        </article>
        <article className="rounded-xl bg-accent p-4">
          <h3 className="mt-2 text-sm font-semibold">{mostUsed.title}</h3>
          <p className="mt-3 font-display text-2xl font-semibold">{mostUsed.label}</p>
          <p className="mt-2 text-xs text-muted-foreground">{mostUsed.description}</p>
        </article>
      </div>
    </div>
    </section>
  </div>;
}

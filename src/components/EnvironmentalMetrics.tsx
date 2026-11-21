import { ArrowUpRight, Car, Leaf, Target } from "lucide-react";
import { environmentalMetricData } from "@/lib/environmental-metrics";

const sourceUrl =
  "https://energiaeambiente.org.br/produto/inventario-nacional-de-emissoes-atmosfericas-por-veiculos-automotores-rodoviarios";

const chartClasses = [
  "stroke-dashboard-chart-1",
  "stroke-dashboard-chart-2",
  "stroke-dashboard-chart-3",
  "stroke-dashboard-chart-4",
  "stroke-dashboard-chart-5",
];
const swatchClasses = [
  "bg-dashboard-chart-1",
  "bg-dashboard-chart-2",
  "bg-dashboard-chart-3",
  "bg-dashboard-chart-4",
  "bg-dashboard-chart-5",
];

function SourceFooter() {
  return (
    <p className="mt-6 border-t border-forest-foreground/15 pt-3 text-[10px] leading-4 text-forest-foreground/55">
      Fonte: Inventário Nacional de Emissões Atmosféricas por Veículos Automotores Rodoviários
      (Ano-Base 2024) —{" "}
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2"
      >
        IEMA / INEAVAR 2024
      </a>
    </p>
  );
}

export function EnvironmentalMetrics({ showSources = false }: { showSources?: boolean }) {
  let offset = 0;
  const footer = showSources ? <SourceFooter /> : null;
  const { emissions, reduction, mostUsed } = environmentalMetricData;

  return (
    <section aria-label="Indicadores ambientais" className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
      <div className="rounded-2xl bg-forest p-5 text-forest-foreground sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-medium tracking-normal">{emissions.title}</h2>
            <p className="mt-1 text-xs text-forest-foreground/65">{emissions.description}</p>
          </div>
          <Leaf className="h-5 w-5 text-dashboard-chart-1" />
        </div>
        <div className="mt-6 flex flex-col items-center gap-7 xl:flex-row xl:justify-center">
          <div
            className="relative h-64 w-64 shrink-0"
            role="img"
            aria-label={`${emissions.total} ${emissions.totalUnit} ${emissions.yearLabel}. ${emissions.modes.map((mode) => `${mode.label}: ${mode.percent}%`).join(", ")}.`}
          >
            <svg className="dashboard-chart h-full w-full" viewBox="0 0 240 240" aria-hidden="true">
              <circle
                cx="120"
                cy="120"
                r="98"
                fill="none"
                className="stroke-forest-foreground/10"
                strokeWidth="19"
              />
              {emissions.modes.map((mode, index) => {
                const start = offset;
                const share = mode.percent * 0.98;
                offset += share;
                return (
                  <circle
                    key={mode.id}
                    cx="120"
                    cy="120"
                    r="98"
                    fill="none"
                    strokeWidth="19"
                    pathLength="100"
                    strokeDasharray={`${share} ${100 - share}`}
                    strokeDashoffset={-start}
                    className={chartClasses[index]}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 mx-auto flex w-full max-w-[135px] flex-col items-center justify-center px-2 text-center sm:max-w-[145px]">
              <span className="mb-2 text-xs text-forest-foreground/65">Total (transportes)</span>
              <span className="font-display text-4xl font-semibold tracking-normal">
                {emissions.total}{" "}
                <span className="text-xl font-normal text-dashboard-chart-1">
                  {emissions.totalUnit}
                </span>
              </span>
              <span className="mt-2 flex items-center gap-1 whitespace-normal text-[11px] leading-tight text-dashboard-chart-1">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {emissions.yearLabel}
              </span>
            </div>
          </div>
          <ul className="w-full space-y-3 xl:max-w-60">
            {emissions.modes.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <li key={mode.id} className="flex items-center gap-2.5">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${swatchClasses[index]}`} />
                  <Icon className="h-4 w-4 shrink-0 text-forest-foreground/65" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{mode.label}</p>
                    <p className="mt-0.5 text-[10px] leading-4 text-forest-foreground/60">
                      {mode.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold">{mode.percent}%</p>
                    <p className="text-xs text-forest-foreground/60">{mode.tonnes} Mt</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {footer}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        <article className="rounded-2xl bg-forest p-6 text-forest-foreground">
          <div className="flex items-center justify-between">
            <Target className="h-6 w-6 text-dashboard-chart-1" />
            <span className="text-xs text-forest-foreground/60">{reduction.plan}</span>
          </div>
          <h2 className="mt-4 text-base font-medium tracking-normal">{reduction.title}</h2>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-display text-4xl font-semibold tracking-normal">
              {reduction.range}
            </span>
            <span className="pb-1 text-sm text-dashboard-chart-1">{reduction.until}</span>
          </div>
          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-forest-foreground/15"
            role="progressbar"
            aria-label={reduction.title}
            aria-valuenow={reduction.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-dashboard-chart-1"
              style={{ width: `${reduction.progress}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-forest-foreground/60">{reduction.description}</p>
          {footer}
        </article>
        <article className="rounded-2xl bg-forest p-6 text-forest-foreground">
          <div className="flex items-center justify-between">
            <Car className="h-6 w-6 text-dashboard-chart-2" />
            <span className="text-xs text-forest-foreground/60">{mostUsed.fleet}</span>
          </div>
          <h2 className="mt-4 text-base font-medium tracking-normal">{mostUsed.title}</h2>
          <p className="mt-3 font-display text-3xl font-semibold tracking-normal">
            {mostUsed.label}
          </p>
          <p className="mt-3 text-sm text-dashboard-chart-2">{mostUsed.description}</p>
          {footer}
        </article>
      </div>
    </section>
  );
}

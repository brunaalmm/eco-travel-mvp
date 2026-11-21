import { Bike, Bus, Car, Footprints, Mountain } from "lucide-react";

export const environmentalMetricData = {
  emissions: {
    title: "Emissões de CO₂ por transporte",
    description: "CO₂ emitido por transportes (Ano-Base 2024) · Todas",
    total: 135,
    totalUnit: "Mt CO₂",
    yearLabel: "Emitidas em 2024 (transportes)",
    modes: [
      {
        id: "carro",
        label: "Carro",
        description: "Veículo particular / Base de referência",
        percent: 84,
        tonnes: "113,4",
        icon: Car,
      },
      {
        id: "onibus",
        label: "Ônibus",
        description: "Transporte rodoviário coletivo",
        percent: 16,
        tonnes: "21,6",
        icon: Bus,
      },
      {
        id: "trilha",
        label: "Trilha",
        description: "Ecoturismo monitorado",
        percent: 0,
        tonnes: "0,0",
        icon: Mountain,
      },
      {
        id: "bike",
        label: "Bicicleta",
        description: "Mobilidade ativa urbana",
        percent: 0,
        tonnes: "0,0",
        icon: Bike,
      },
      {
        id: "pe",
        label: "A pé",
        description: "Mobilidade ativa de impacto zero",
        percent: 0,
        tonnes: "0,0",
        icon: Footprints,
      },
    ],
  },
  reduction: {
    title: "Meta Ambiental de Redução",
    plan: "Plano Clima (2024–2035)",
    range: "59% a 67%",
    until: "até 2035",
    progress: 63,
    description: "Meta oficial NDC Brasil · Base: emissões de 2005",
  },
  mostUsed: {
    title: "Transporte Mais Utilizado",
    label: "Carro",
    fleet: "Frota nacional: +71 mi",
    description: "~45 mi de veículos (63% da frota)",
  },
} as const;

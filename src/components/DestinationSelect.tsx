import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { destinations } from "@/lib/data";

type DestinationSelectProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
  ariaLabel: string;
};

export function DestinationSelect({ selectedId, onSelect, ariaLabel }: DestinationSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const selectedDestination = destinations.find((destination) => destination.id === selectedId);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        aria-label={selectedDestination ? `${ariaLabel}: ${selectedDestination.name}` : ariaLabel}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={`flex w-full items-center justify-between rounded-full px-6 py-4 text-left shadow-sm transition-all ${
          selectedDestination
            ? "bg-forest font-semibold text-white hover:bg-forest/90"
            : "bg-white text-stone-700 hover:bg-stone-50"
        }`}
      >
        <span>{selectedDestination?.name ?? "Selecionar roteiro"}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          id={listId}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-stone-200/70 bg-white shadow-lg"
        >
          {destinations.map((destination) => {
            const isSelected = selectedDestination?.id === destination.id;
            return (
              <button
                key={destination.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  onSelect(destination.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-6 py-3 text-left transition-colors ${
                  isSelected
                    ? "bg-leaf/30 font-semibold text-forest"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                {destination.name}
                {isSelected && <Check className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

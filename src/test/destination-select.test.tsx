import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { DestinationSelect } from "@/components/DestinationSelect";
import { destinations } from "@/lib/data";

function StatefulDestinationSelect({ onSelect }: { onSelect: (id: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <DestinationSelect
      selectedId={selectedId}
      onSelect={(id) => {
        onSelect(id);
        setSelectedId(id);
      }}
      ariaLabel="Selecionar roteiro"
    />
  );
}

describe("DestinationSelect", () => {
  it("shows a placeholder and closes after selecting a destination", () => {
    const destination = destinations[0]!;
    const onSelect = vi.fn();
    render(<StatefulDestinationSelect onSelect={onSelect} />);

    fireEvent.click(screen.getByRole("button", { name: "Selecionar roteiro" }));
    fireEvent.click(screen.getByRole("button", { name: destination.name }));

    expect(onSelect).toHaveBeenCalledWith(destination.id);
    expect(
      screen.getByRole("button", { name: `Selecionar roteiro: ${destination.name}` }),
    ).toHaveTextContent(destination.name);
    expect(screen.queryByRole("button", { name: destination.name })).not.toBeInTheDocument();
  });

  it("closes when the user clicks outside the selector", () => {
    render(<StatefulDestinationSelect onSelect={vi.fn()} />);
    const trigger = screen.getByRole("button", { name: "Selecionar roteiro" });

    fireEvent.click(trigger);
    expect(screen.getByRole("button", { name: destinations[0]!.name })).toBeInTheDocument();

    fireEvent.pointerDown(document.body);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("button", { name: destinations[0]!.name })).not.toBeInTheDocument();
  });
});

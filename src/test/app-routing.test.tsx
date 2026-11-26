import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { createRoute, createRootRoute, createRouter, rootRouteId, RouterProvider } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { EntryScreen } from "@/components/EntryScreen";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it.each(["/descobrir", "/cadastro", "/onboarding", "/perfil", "/mapa", "/dashboard/roteiros", "/dashboard/relatorios", "/dashboard/aprovacoes", "/dashboard/configuracoes"])("matches the separate page %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path);
  });

  it("uses simulated origins to distinguish local and cross-destination routes", async () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    await router.load();
    const { container } = render(<RouterProvider router={router} />);

    await act(async () => {
      await router.navigate({ to: "/mapa", search: { d: undefined } });
    });

    expect(screen.getByText("São Paulo · sem acesso ao GPS")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Escolher ponto de partida" }));
    fireEvent.click(screen.getByRole("button", { name: "Selecionar ponto de partida: São Paulo" }));
    fireEvent.click(screen.getByRole("button", { name: "Guarujá" }));
    expect(screen.getByText("Circuito entre destinos")).toBeInTheDocument();
    expect(container.querySelector("[data-route-line]")).toBeInTheDocument();
    expect(container.querySelector('[data-route-number="1"]')).toBeInTheDocument();
    expect(container.querySelector('[data-route-number="2"]')).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Ônibus" }));
    expect(screen.getByText("Guarujá → Peruíbe")).toBeInTheDocument();
    expect(screen.getByText("Distância")).toBeInTheDocument();
    expect(screen.getByText("Transporte")).toBeInTheDocument();
    expect(screen.getByText("Emissão")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Selecionar destino: Peruíbe" }));
    fireEvent.click(screen.getByRole("button", { name: /^Guarujá$/ }));
    expect(screen.getByText("Roteiro Local")).toBeInTheDocument();
    expect(container.querySelector("[data-route-line]")).toBeNull();
    expect(container.querySelectorAll("[data-route-number]")).toHaveLength(0);
  });

  it("submits the tourist login to onboarding without rendering the error page", async () => {
    localStorage.clear();
    const rootRoute = createRootRoute();
    const loginRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      component: () => <PreferencesProvider><EntryScreen /></PreferencesProvider>,
    });
    const onboardingRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/onboarding",
      component: () => <p>Localização para roteiros próximos</p>,
    });
    const dashboardRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/dashboard",
      component: () => <p>Resumo do painel do gestor</p>,
    });
    const router = createRouter({ routeTree: rootRoute.addChildren([loginRoute, onboardingRoute, dashboardRoute]) });
    await router.load();
    render(<RouterProvider router={router} />);

    fireEvent.click(await screen.findByRole("button", { name: "Entrar" }));

    await waitFor(() => expect(router.state.location.pathname).toBe("/onboarding"));
    expect(await screen.findByText("Localização para roteiros próximos")).toBeInTheDocument();
    expect(screen.queryByText("This page didn't load")).not.toBeInTheDocument();

    await act(async () => {
      await router.navigate({ to: "/" });
    });
    fireEvent.mouseDown(await screen.findByRole("tab", { name: "Sou Gestor" }), { button: 0 });
    await waitFor(() => expect(screen.getByRole("tab", { name: "Sou Gestor" })).toHaveAttribute("data-state", "active"));
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => expect(router.state.location.pathname).toBe("/dashboard"));
    expect(await screen.findByText("Resumo do painel do gestor")).toBeInTheDocument();
  });
});

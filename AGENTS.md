<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The public root is a demo entry screen, the tourist home is `/descobrir`, and `/dashboard` is a public manager preview with demonstration data; navigation selection is not authentication or authorization.
- Demo credentials and profile data must not be persisted or sent anywhere; real account storage requires a separately approved authentication integration.
- Manager dashboard snapshots and filtering live in a browser-safe data module; PDF exports use the same filtered snapshot and are prepared before clicking to preserve mobile download activation.
- Destination macro-region filtering uses the shared browser-safe destination dataset, so discovery, details, calculator presets and the schematic map stay aligned.
- Accessibility appearance is held in a root React provider and applied to document tokens without persisting personal data; content accessibility uses shared speech and explicitly labeled generic Libras demonstrations.
- Profile privacy, notifications and tracking switches are demonstration state only; offline export is a textual guide, never a navigation map or a tracking service.
- Tourist preferences onboarding is a dedicated route reached only after demo login; /descobrir redirects there until anonymous preferences exist, then shows educational tips once; only preferences persist locally, never credentials or real location.
- Recommendations use deterministic demonstration scoring and the unchanged shared carbon data, so compatibility must never be presented as real AI output or verified geolocation.
- Retired Cloud authentication middleware and integration packages must stay removed; the empty Drizzle journal is an inert remix scaffold, not a connected database or runnable backend.

- The manager dashboard is a layout route with separate child pages sharing filters through a React context; its records derive from the shared destination catalog so manager and tourist data stay aligned.

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

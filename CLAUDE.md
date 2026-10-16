# Morgan's Games — project rules

A library of ~553 browser games built by **Morgan** (a kid) with family help.
Published from this folder to GitHub Pages via `github.com/mozrice/mo-ball`.

Morgan is the player and often the person asking. Use they/them for anyone whose
pronouns you have not been told.

## The format — do not change it

- **One game = one `.html` file**, with its CSS and JavaScript inline. Vanilla
  JavaScript and the Canvas 2D API (some games use SVG or plain DOM — that is fine).
- **No build step, no npm, no bundler, no dev server, no framework.** A game must run
  by double-clicking the file, and must also work served statically from GitHub Pages.
- **No CDN or remote `<script src>`.** The games must work with no internet.
- **Never split a game that is currently one file.**

### Deliberate exceptions — leave these alone

- `hoop-shot-3d.html` loads a **vendored** `three.min.js` next to it. A library copied
  into the repo and loaded by relative path is fine. Only *remote* dependencies are banned.
- About nine folders hold more than one file (`mo-hardware`, `mo-homedesign`,
  `mo-football`, `mo-diner`, `mo-sports`, `mo-ball-3d`, `mo-grocerystore`,
  `mo-familyfort`, `mo-arffsick`). Usually that is an original plus a `*-new.html`
  rewrite in progress. Ask which one is live before editing either.

## How to work here

- **One change at a time.** Make a single improvement, then stop so it can be played and
  checked. Do not bundle five changes into one edit.
- **Readable over clever.** Plain descriptive variable names, no new abstractions, no
  refactoring a working game that was not asked about.
- **Stay in scope.** Do not reorganize folders, rename files, add tooling, or "clean up"
  games you were not asked to touch.
- **When Morgan is the one asking**, explain in plain language and keep code changes small
  enough to follow. The `mentoring-juniors` and `eli5` skills cover this; use them when
  Morgan wants to *learn*, not when an adult wants work done.

## Which skills apply

**Use:** `html5-single-file-game` (code patterns) · `prototype-fast` (is this fun? keep or
kill) · `playtest-protocol` (what to build next) · `elegance-audit` (what to cut) ·
`skill-curve-audit` (difficulty, timing) · `emotion-engine-audit` · `decision-flow-audit` ·
`game-feel-audit` (polish — only once the loop works) · `game-interface-audit` ·
`mobile-web-correctness` (iPad/Safari) · `game-library-triage` (which game next)

**Ignore here:** anything that wants multi-file layouts, a package manager, a test suite,
git worktrees, or a formal written plan before a small edit. `superpowers:writing-plans`
and `superpowers:test-driven-development` are built for multi-file codebases with tests
and do not fit a one-file kid's game — `superpowers:brainstorming` is fine and genuinely
useful for deciding what to make.

Skills live user-level in `~/.claude/skills/`, not in this repo (`.claude/` is gitignored).

## Repo facts worth knowing

- **`kid-code/` is a stale August backup copy** with its own `mo-*` folders and its own
  `push-to-web.cmd`. It is gitignored. **Never edit anything under `kid-code/`.** Searching
  for a game by name matches both copies — always take the top-level one.
- **File timestamps are mostly meaningless.** 518 of 557 game files share one bulk
  timestamp (2026-09-13 16:59). Only files newer than that reflect real edits.
- **Git dates are also meaningless.** All 52 commits are stamped 2026-09-21. Do not infer
  activity from `git log` dates.
- **A lot of recent work is unpublished.** At last check 8 games were modified and ~48
  paths untracked, including whole game folders. New games may not be on the website yet.
- `push-to-web.cmd` publishes. `games.html` / `index.html` are the game menus.

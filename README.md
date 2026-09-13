# 🏀 Hoop Shot

A basketball video game made by **Morgan** and family. Star of the game: Morgan!
There are two versions in this folder — a 2D game and a full 3D game — and they
share one coin wallet.

Everything runs in a web browser with **no internet needed**.

## ▶️ How to play it

- **Easiest:** double‑click **`index.html`** to open the 2D game. Tap **3D →** in
  the corner to jump to the 3D game (and **← 2D** to come back).
- **Installable / offline app:** double‑click **`start-game.cmd`** (Windows). It
  runs a tiny local server so the "add to home screen" / offline part works.
- **On an iPad/phone:** see **`Put Hoop Shot on the iPad.md`** — you can add it to
  the home screen so it opens full screen like a real app.

**Controls (3D game):** hold **Shoot** and let go on the green to shoot · move the
shooter with the **arrow keys / WASD** or the on‑screen **D‑pad** · buttons for
**Rebound, Block, Time Out, Practice, View** (camera angles) and **4D** (crowd).

## ✨ What's in it

- **2D game** — 1‑on‑1 vs the puppy or solo Practice; 4 quarters of 10 minutes;
  2‑ and 3‑pointers; a shot clock; music; the puppy shoots threes too.
- **3D game (Three.js)** — 2‑on‑2 vs the puppies, or Practice; the shooter runs
  around and shoots from anywhere; puppies grab rebounds and drive to their own
  hoop; 4 quarters of 10 minutes; a 24‑second shot clock; free throws from
  **punch fouls**; five camera **Views**; **4D** crowd roar + rumble.
- **Coins** — earn coins for baskets (shared between both games, saved on your
  device); a game costs coins to play; a pretend **Buy** button for play money.

## 📁 What the files are

- `index.html` — the 2D game (SVG + plain JavaScript).
- `hoop-shot-3d.html` — the 3D game.
- `three.min.js` — the 3D engine, bundled so it works offline.
- `sw.js`, `manifest.webmanifest`, `icon-*` — the "install as an app" / offline bits.
- `start-game.cmd`, `serve.ps1` — open the game with the local server (Windows).
- `start-on-ipad.cmd`, `serve-lan.ps1` — serve it over Wi‑Fi so an iPad can open it.

## 🌐 Play it online (optional)

Turn on **GitHub Pages** (Settings → Pages → Deploy from branch → `main` / root)
and the game plays — and installs — from:

**https://mozrice.github.io/mo-ball/**

---

Made with love as a family project. 🧡

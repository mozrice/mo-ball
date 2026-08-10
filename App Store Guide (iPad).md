# 🏀 Hoop Shot — iPad App Store Submission Guide

This is the complete plan to get Hoop Shot onto the Apple **App Store** for iPad.
I've prepared everything except the parts only you can do (the Apple account, the
Mac build, and the final submit). Work through it top to bottom.

---

## ⚠️ The one hard requirement

Apple only lets you **build and submit** iOS/iPad apps from a **Mac with Xcode**.
You're on Windows, so you'll need access to a Mac for the build steps:

- Borrow a Mac (a friend's / family's), **or**
- Rent a **cloud Mac** by the hour — e.g. **MacinCloud** or **MacStadium**
  (a few dollars for an afternoon is plenty).

Everything up to that point can be done from Windows.

You'll also need an **Apple Developer Program** membership — **$99/year**, signed
up at <https://developer.apple.com/programs/>. (This is Apple's fee; there's no
way around it for the App Store.)

---

## The path, step by step

### 1. Put the game online (HTTPS)
The packaging tool needs a live web address for the game. Use the GitHub Pages
site we set up: **https://mozrice.github.io/mo-ball/**. Confirm it loads in a
browser first.

### 2. Make the iOS package with PWABuilder (from Windows)
1. Go to **<https://www.pwabuilder.com>**.
2. Paste your URL: `https://mozrice.github.io/mo-ball/` and click **Start**.
3. It scores your PWA (manifest + service worker are already in place ✅).
4. Click **Package for stores → iOS → Generate**. It downloads an **Xcode
   project** (a `.zip`).
5. Copy that zip onto the Mac (USB drive, email, or cloud).

### 3. On the Mac: open in Xcode
1. Install **Xcode** from the Mac App Store (free).
2. Unzip the PWABuilder project and open it in Xcode.
3. Sign in with your Apple ID under **Xcode → Settings → Accounts**, and pick
   your **Team** (your Apple Developer account) in the project's **Signing &
   Capabilities** tab. Xcode handles the certificates for you.
4. Set the **Bundle Identifier** to something unique, e.g.
   `com.rice.hoopshot`.

### 4. In App Store Connect: create the listing
Go to <https://appstoreconnect.apple.com> → **My Apps → +** → **New App**.

- **Platform:** iOS (this also covers iPad)
- **Name:** `Hoop Shot`  *(if taken, try `Hoop Shot Basketball`)*
- **Primary language:** English
- **Bundle ID:** the one from Xcode
- **SKU:** any code, e.g. `hoopshot001`

Then fill in the listing using the **Listing text** below, and upload the
**assets** (icon, screenshots, privacy URL) — all prepared for you.

### 5. Upload the build & submit
1. In Xcode: **Product → Archive**, then **Distribute App → App Store Connect →
   Upload**.
2. Back in App Store Connect, attach that build to your app version.
3. Answer the questions (see **Notes** below), then **Add for Review → Submit**.
4. Review usually takes **1–3 days**.

---

## 📝 Listing text (copy‑paste)

**App Name:** Hoop Shot

**Subtitle (30 chars max):** Family basketball fun

**Promotional text:** Shoot, dunk, steal, and win — a fast, friendly basketball
game the whole family can play. In 2D and full 3D!

**Description:**
```
Hoop Shot is a fun, family-friendly basketball game — with a 2D game and a
full 3D game in one app!

Hold to shoot and let go on the green to score. Run around the court, pull up
for threes, and throw down a SLAM DUNK. Play a quick practice by yourself or a
2-on-2 game against the puppies, with four 10-minute quarters, a halftime
break, a shot clock, and free throws.

FEATURES
• 2D game and a full 3D game
• Practice mode or play a game
• Move your player and shoot from anywhere
• Slam dunks, rebounds, blocks, steals, and double teams
• Free throws from an "AND 1"
• Coins you earn for every basket
• Fun music and a roaring crowd
• Works offline — no internet needed
• No ads, no tracking, no real-money purchases

Made with love as a family project. Have fun!
```

**Keywords (100 chars max):**
`basketball,hoops,dunk,sports,kids,family,shooter,ball,arcade,3d,game,court,free throw`

**Category:** Games → Sports  (Secondary: Games → Arcade)

**Age rating:** 4+ (no objectionable content)

**Support URL:** https://mozrice.github.io/mo-ball/
**Privacy Policy URL:** https://mozrice.github.io/mo-ball/privacy.html
**Marketing/Copyright:** © Rice family

---

## 🎨 Assets (all prepared — in this folder / delivered to you)

- **App icon:** `AppIcon-1024.png` (1024×1024) — required marketing icon.
- **iPad screenshots (2732×2048):** `ipad-3d-1.png`, `ipad-2d-1.png`
  (you need 1–10; two is fine to start. Add more scenes anytime.)
- **Privacy policy:** `privacy.html` — I've added it to the game folder, so once
  the site is live it's at `https://mozrice.github.io/mo-ball/privacy.html`.

---

## ✅ Notes to smooth the review

Apple sometimes rejects apps that are "just a website in a wrapper" (guideline
4.2). Hoop Shot is a **real game** with lots of interactive features, so you're
in good shape — but it helps to:

- In App Store Connect, answer **"Does this app use IDFA / tracking?"** → **No**.
- **Content rights:** it's your own original game → **Yes, you have the rights**.
- **Sign-in:** none required.
- If reviewers ask, note that the app is a full offline game (not a web view of
  a site), with no ads, no accounts, and no data collection.

If it does get bounced, don't worry — reply in the Resolution Center, mention
the above, and resubmit. Lots of small apps go through one round of that.

---

Questions on any step? I can walk you through it. When mo-ball is live on
GitHub Pages, tell me and I'll double-check the PWABuilder score for you.

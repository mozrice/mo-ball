# Put Hoop Shot on the iPad 🏀

Good news: Hoop Shot is already built like a real app. Once it's on the iPad's
home screen it opens **full screen**, works **offline** (no internet needed),
and has its **own icon** — just like an app from the App Store, but free.

The only trick is that the game currently lives in a folder on the Windows
computer, and the iPad can't open a folder on another computer. So we give the
iPad a **web address** to open. There are two ways to do that — pick whichever
sounds easier.

---

## ⭐ Way 1 — Free web link (recommended)

This makes Hoop Shot into a proper app that works **anywhere** — at home, at
grandma's, on a road trip — even after the computer is turned off. It takes
about 5 minutes and is free.

1. On the computer, go to **https://app.netlify.com/drop** in a web browser.
2. Open the game folder (`morgans ball video game → kid-code → first-project`).
3. **Drag the whole `first-project` folder** onto the Netlify Drop page.
4. Netlify gives you a web address like `https://sunny-hoops-123.netlify.app`.
   - To keep the link forever, click **Sign up** and make a free account
     (an email address is all it needs). Without an account the link only
     lasts about an hour.
5. On the **iPad**, open **Safari** and go to that web address.
6. Follow **"Add to Home Screen"** below. Done — it's an app! 🎉

> After the first time it loads, the game is saved on the iPad and plays with
> no internet at all.

---

## Way 2 — Over your home Wi-Fi (no sign-up)

Use this if you'd rather not make any account. The catch: the computer has to
be **on and running the little server** for the iPad's *first* load and any
time you want to update the game. After the first load, the game still works
offline on the iPad.

1. Make sure the **iPad and the computer are on the same Wi-Fi**.
2. On the computer, **double-click `start-on-ipad.cmd`** (it's in the game
   folder). A black window opens and shows one or more web addresses like
   `http://192.168.1.50:8123/`.
   - If Windows asks about the firewall, click **Allow access**.
3. On the **iPad**, open **Safari** and type in one of those addresses.
   (Try the first one; if a page doesn't appear, try the next address listed.)
4. When the game loads, follow **"Add to Home Screen"** below.
5. Keep that black window open while playing; close it when you're done.

> This way needs Python on the computer. If the window says Python isn't
> installed, use **Way 1** instead (it's honestly easier), or install Python
> from python.org (tick **"Add python.exe to PATH"**) and try again.

---

## 📲 Add to Home Screen (both ways use this)

On the iPad, with the game open in **Safari**:

1. Tap the **Share button** — the square with an arrow pointing up, at the top
   or bottom of the screen.
2. Scroll down and tap **"Add to Home Screen."**
3. It'll show the name **Hoop Shot** and the basketball icon — tap **Add.**
4. Close Safari. Tap the new **Hoop Shot** icon on the home screen — it opens
   full screen like a real app. 🏀

---

## What about the *real* Apple App Store?

That's a bigger project and it costs money. To be listed in Apple's App Store
you'd need:

- An **Apple Developer account** — **$99 per year.**
- A **Mac** with **Xcode** to wrap the game and submit it.
- To pass **Apple's review** (which can take a few days, and Apple sometimes
  turns down simple games that are "just a web page").

The "Add to Home Screen" method above gives Morgan the same *feel* — a real app
icon that opens full screen and works offline — with no cost and no waiting.
If you ever do want to go for the official App Store, just say so and I'll
prepare everything you'd hand to Apple (the wrapper project, icons,
screenshots, description, and a step-by-step submit guide).

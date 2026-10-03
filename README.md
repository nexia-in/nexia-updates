# Nexia Virtual Desk — Updates & Services Landing Page

A simple, fast, mobile-first landing page for **Nexia Virtual Desk**.

Customers click your WhatsApp advertisement → land here → see the **current
opportunity** (e.g. IBPS) → can follow Instagram for more updates → and can
enquire about your **permanent services** (CV creation, online application
support, print & DTP, internet cabin) through a small popup that opens
WhatsApp with a ready-written message.

Built with **plain HTML + CSS + JavaScript**. No framework, no database,
no backend, no paid service. It works by simply opening `index.html`.

---

## 1. What this project is (in plain words)

Think of the project as 4 files that each have ONE job:

| File          | What it does                                                        | How often you edit it |
|---------------|---------------------------------------------------------------------|-----------------------|
| `content.js`  | **All your text**: current advertisement, services, WhatsApp number | ⭐ Often — this is your "control panel" |
| `index.html`  | The skeleton/structure of the page                                  | Almost never          |
| `style.css`   | Colours, fonts, spacing, animations                                 | Rarely (colours only) |
| `script.js`   | The logic: builds cards, expiry check, WhatsApp messages            | Almost never          |

Plus an `assets/` folder for images, and this README for help.

**The golden rule: 95% of the time, you only edit `content.js` and swap
image files.** You never need to touch the design.

---

## 2. How to open it in VS Code

1. Install [VS Code](https://code.visualstudio.com/) (free).
2. In VS Code: **File → Open Folder…** and choose this project folder
   (`nexia-virtual-desk`).
3. In the left sidebar (Explorer) you will see the files. Click
   `content.js` to open it.
4. Recommended (optional, makes life easier): install the free extension
   **"Live Server"** by Ritwick Dey. Then right-click `index.html` →
   **Open with Live Server** and the page opens in your browser and
   auto-refreshes every time you save a file.

> Even without Live Server you can simply double-click `index.html` in
> your file explorer and it opens in your browser. Everything works from
> the file directly (no server needed).

---

## 3. Where to change the CURRENT ADVERTISEMENT ⭐

Open **`content.js`** and look for the big comment:

```
B. CURRENT FEATURED ADVERTISEMENT
```

You will see something like this:

```js
currentAd: {
  ref: "ibps",
  category: "Banking Recruitment",
  title: "IBPS Recruitment 2026",
  description: "Applications are currently open. Check eligibility...",
  image: "assets/ads/current-ad.svg",
  imageAlt: "IBPS Recruitment 2026 advertisement from Nexia Virtual Desk",
  lastDate: "2026-10-15",
  lastDateText: "",
  updated: "2026-10-02",
  expiresOn: "",
  detailsUrl: "",
  detailsText: "View Details",
  isSample: true
},
```

To advertise **RRB** tomorrow, just change the values, for example:

```js
currentAd: {
  ref: "rrb",
  category: "Railway Recruitment",
  title: "RRB Recruitment 2026",
  description: "Applications currently open for ...",
  image: "assets/ads/rrb.webp",
  imageAlt: "RRB Recruitment 2026 advertisement",
  lastDate: "2026-11-30",
  lastDateText: "",
  updated: "2026-10-05",
  expiresOn: "",
  detailsUrl: "https://official-website-link.example",
  detailsText: "View Details",
  isSample: false
},
```

Save the file (`Ctrl + S`), refresh the browser. Done. The design does not
change — only the card content changes.

**Field cheat-sheet**

| Field          | Meaning |
|----------------|---------|
| `ref`          | Short code used in your ad links: `your-site.com/?ref=rrb`. Also becomes "Source: RRB Advertisement" inside enquiry messages. |
| `category`     | Small badge above the title. |
| `title`        | Headline of the opportunity. |
| `description`  | One or two short lines. |
| `image`        | Path to the image file (see section 4). |
| `startDate`    | OPTIONAL. The day applications OPEN (`"2026-10-15"`). Before that day the card shows an amber **UPCOMING** badge and an "Application Start" box; ON that day it turns green **Applications Open** by itself. Leave `""` if applications are already open. |
| `lastDate`     | Best written as `"YYYY-MM-DD"` so the site can auto-close it. Plain text also works (e.g. `"To be announced"`), but then auto-close is off. |
| `lastDateText` | Optional. If you want the card to show different words than `lastDate`. Usually leave `""`. |
| `updated`      | The date you last verified/updated this card. Shown to customers. |
| `expiresOn`    | Optional. If filled, the card closes on THIS date instead of `lastDate`. |
| `qualification` | Text for the **"Minimum Qualification"** box on the card. Leave `""` to hide the box. |
| `applicationFee` | Text for the **"Official Application Fee"** box on the card. Leave `""` to hide the box. |
| `detailsUrl`   | Official link for the **View Details** button. While you have no real link, leave `""` (or `"#"`) — the button then shows greyed out as "coming soon" and customers use **Ask on WhatsApp** instead (that button always works and writes the enquiry message automatically). |
| `detailsText`  | Button label. |
| `isSample`     | `true` shows a yellow **DEMO CONTENT** warning. Set it to `false` the moment you enter real verified data. |

### The automatic life of every advertisement

Each card moves through three states by itself, looking only at dates:

```
 before startDate        from startDate            after expiresOn/lastDate
 ─────────────────  →  ─────────────────────  →  ──────────────────────────
 🟠 UPCOMING             🟢 Applications Open       🔴 Application Closed
 (amber badge,           (green badge,              (red badge, grey image,
  "Application Start"     Apply button active)       Apply button hidden)
  box on the card)
```

You never change the state by hand — you only write the dates once.
The switch happens at midnight of the start day / end of the closing day,
in the visitor's own timezone.

### Automatic "Application Closed" (how it works)

- If `expiresOn` (or `lastDate`, when `expiresOn` is empty) is a real date
  and that day has fully passed, the site automatically:
  - shows a red **"Application Closed"** badge,
  - greys the image,
  - **hides the Apply / View Details button**,
  - tells visitors to message you on WhatsApp for the latest openings.
- The closing day itself still counts as OPEN (until 23:59 that day).
- No code change needed — it just looks at today's date in the visitor's
  browser.

### Running two advertisements at the same time (`?ref=` links)

Sometimes you post an IBPS ad AND an RRB ad in different WhatsApp groups.
Instead of editing `currentAd` twice a day:

1. Open `content.js`, find section **C. OTHER ADVERTISEMENTS**.
2. Inside `otherAds: [ ... ]` there is a commented-out example. Delete the
   comment marks around it (the `/*` at the start and `*/` at the end) and
   fill in your real values. Keep the `ref` unique, e.g. `"rrb"`.
3. Now use these links in your advertisements:
   - `https://your-domain.com/?ref=ibps` → shows the IBPS card
   - `https://your-domain.com/?ref=rrb` → shows the RRB card
   - `https://your-domain.com` → shows `currentAd` (the default)
4. Every enquiry message will contain a line like
   `Source: RRB Advertisement`, so you know which ad brought the customer.

---

## 3b. Showing TWO or more live applications at the same time (copy & paste)

Yes — this works exactly the way you imagined:

1. Open `content.js`, section **C. MORE LIVE ADVERTISEMENTS**.
2. Inside `otherAds: [ ... ]` there is one example block wrapped in
   comment marks (slash-star at the start, star-slash at the end).
3. **Copy** that whole block and **paste** it inside the `[ ]`.
4. On YOUR COPY, delete the comment marks so the values become active.
5. Change the values: a new `ref` (for example `rrb`, `army`, `navy`),
   title, description, image, dates…
6. Save + refresh → a **second card** appears under the first card in
   "Currently Open Applications".
7. Need a third? Copy-paste the block again. The order in the list is
   the order on the page (`currentAd` is always the first card).

Good to know:

- ⚠️ **The words `otherAds: [` and `],` must appear ONLY ONCE in the file.**
  For ad #3, #4, #5… copy only the `{ ... }` block and put a **comma**
  after the previous block. If you paste `otherAds: [ ... ],` a second
  time, JavaScript silently keeps only the last list and your earlier
  extra cards disappear (no error message!).
  **Third card not showing?** Search the file (Ctrl + F) for `otherAds:` —
  if you find it more than once, delete the extra `otherAds: [` and `],`
  lines and join the ad blocks with commas.
- Each ad needs its **own `ref`** — it is also the code for links like
  `?ref=rrb`, which scroll to that card and highlight it with a blue ring.
- Every card checks its own dates: an expired card automatically shows
  **"Application Closed"** and hides its button, while the other cards
  stay open.
- When an opportunity is completely finished, delete its block (or leave
  it — it will simply show as closed).
- The yellow DEMO warning stays visible while **any** card still has
  `isSample: true`. Set it to `false` card by card as you verify them.
- Each card's "Ask on WhatsApp" button writes its own message with that
  card's title, last date and the service-charge line.

---

## 4. Where to replace images

All images live in the **`assets/`** folder:

```
assets/
├── branding/   logo.svg, favicon.svg, favicon.ico, apple-touch-icon.png, og-cover.png
├── ads/        current-ad.svg        ← the featured advertisement image
├── jobs/       sample-job.svg        ← image used by extra "otherAds" entries
└── services/   cv.svg, application.svg, print.svg, internet.svg
```

**To replace any image:**

1. Prepare your new image (from Canva, a screenshot, a photo…).
   Recommended: save/export as **`.webp`** (smallest) or `.jpg`/`.png`.
2. Copy it into the matching folder, e.g. `assets/ads/`.
3. Open `content.js` and change only the `image:` line, e.g.
   `image: "assets/ads/current-ad.webp",`
4. Save + refresh. That's it.

Tips:
- Advertisement images look best around **1200 × 675 px** (16:9).
- Service thumbnails around **800 × 500 px** (16:10).
- Keep files under ~200 KB so the page loads fast on mobile data.
  (Free tool: [squoosh.app](https://squoosh.app) → export as WebP.)
- If an image path is wrong or the file is missing, the page automatically
  shows a neutral "Image not available" placeholder — the layout never
  breaks.
- `assets/branding/thumbnail.webp` is the picture people see when your
  link is shared on WhatsApp / Facebook. See the next section.

---

## 4b. How to change the WhatsApp share THUMBNAIL (thumbnail.webp)

When someone shares your website link in WhatsApp, a small preview card
with a picture appears. That picture is this one file:

```
assets/branding/thumbnail.webp
```

**To change it:**

1. Create your new picture. Best size: **1200 × 630 pixels**
   (any 16:9 image works; keep the important text in the middle because
   WhatsApp sometimes crops the edges).
2. Convert/save it as `.webp` (or use [squoosh.app](https://squoosh.app)).
3. Rename your file to exactly `thumbnail.webp`.
4. In GitHub, open `assets/branding/`, delete the old `thumbnail.webp`
   (trash icon), then **Add file → Upload files** and upload yours. Commit.
5. Wait for Vercel to redeploy (~30 s).

**Important WhatsApp cache warning:** WhatsApp remembers old previews for
a long time. After changing the thumbnail, test the share with a "cache
buster" link once, e.g. `https://your-domain.com/?v=2` — if the new image
shows there, the normal link will update soon too. Facebook has a
"Sharing Debugger" tool that refreshes the preview immediately.

No code change is needed — the page already points to this file name.

---

## 5. Where to change the WhatsApp number

Open **`content.js`**, section **A. CONTACT & SOCIAL LINKS**:

```js
contact: {
  whatsappNumber: "919961850698",      // digits only, country code first, no + or spaces
  whatsappDisplay: "+91 99618 50698",  // how it is shown to customers
  ...
}
```

Change both lines to your new number. Every WhatsApp button and every
generated enquiry link on the whole page updates automatically — you never
edit the number anywhere else.

One more useful line lives a little higher, in the `business:` block:

```js
serviceChargeNote: "Service charges will be applicable extra."
```

This sentence is automatically added to the ready-made WhatsApp message of
the advertisement card ("Ask on WhatsApp"). Set it to `""` if you ever want
to remove it.

---

## 6. Where to change the Instagram link

Same place, `content.js` section A:

```js
instagram: "https://www.instagram.com/nexia_virtual_desk/",
instagramHandle: "@nexia_virtual_desk",
```

---

## 7. Where to change the Facebook link

Same place, `content.js` section A:

```js
facebook: "https://www.facebook.com/nexiacare",
facebookHandle: "nexiacare",
```

---

## 8. How to add a NEW service

Example: you want to add **"Passport Application Help"**.

1. Open `content.js`, section **E. SERVICES**.
2. Copy one whole `{ ... }` service block (for example the `print` one),
   paste it **after the last service, before the closing `]`**, and put a
   comma between the blocks.
3. Edit the copy:

```js
{
  id: "passport",
  icon: "🛂",
  title: "Passport Application Help",
  description: "Step by step help with passport application and documents.",
  image: "assets/services/passport.svg",
  imageAlt: "Passport application help",
  actionText: "Enquire",
  enquiry: {
    title: "Passport Enquiry",
    intro: "I need help with a passport application.",
    closing: "Please contact me.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, placeholder: "Your full name", messageLine: "Name" },
      { name: "phone", label: "WhatsApp Number", type: "tel", required: true, placeholder: "10 digit mobile number", messageLine: "WhatsApp Number" },
      { name: "type", label: "Application Type", type: "select", required: true, messageLine: "Application Type",
        options: ["New Passport", "Renewal", "Tatkal", "Need advice"] }
    ]
  }
}
```

4. (Optional) add an image file at `assets/services/passport.svg` (or
   `.webp`). If you skip it, delete the `image:` and `imageAlt:` lines —
   the card still works.
5. Save + refresh. The new card, its enquiry popup and its WhatsApp
   message all appear automatically. **No other file needs editing.**

Field types you can use: `"text"`, `"tel"`, `"select"` (with `options`),
`"date"`, `"time"`. Mark important ones `required: true`.

---

## 9. How to test locally

**Easiest:** double-click `index.html` → it opens in your browser.

**Better (auto-refresh while editing):**
- VS Code with the **Live Server** extension → right-click `index.html` →
  **Open with Live Server**.
- Or with a terminal: open VS Code menu **Terminal → New Terminal**, then
  type exactly this and press Enter:

  ```
  python -m http.server 8000
  ```

  and visit `http://localhost:8000` in your browser.
  (Stop it with `Ctrl + C`.)

**Test on your phone:** your phone and computer must be on the same Wi-Fi.
In the terminal you will see your computer's local address, e.g.
`http://192.168.1.5:8000` — open that on your phone.

**Things worth checking after each change:**
- The featured card shows the new advertisement.
- Tap each service → popup opens → fill form → WhatsApp opens with the
  right message.
- Open the popup and press the **✕** button / tap the dark background /
  press **Esc** → it closes.
- Try leaving Name empty → you get a friendly red error, not a crash.
- Try a wrong phone number like `12345` → you get an error message.
- Visit with `?ref=ibps` at the end of the address → enquiry messages
  contain `Source: IBPS Advertisement`.

---

## 10. How to upload to GitHub (no Git commands needed)

1. Create a free account on [github.com](https://github.com) if needed.
2. Click the **+** (top right) → **New repository**.
3. Name it `nexia-virtual-desk`, keep it **Public**, click
   **Create repository**. (Do NOT tick "Add a README".)
4. On the new empty repository page click the blue link
   **"uploading an existing file"**.
5. Open your project folder on your computer, select **everything inside
   it** (`index.html`, `style.css`, `content.js`, `script.js`, `README.md`,
   `.gitignore` and the whole `assets` folder) and drag them into the
   GitHub page.
6. Wait for the upload, then click the green **Commit changes** button.
7. Done — your code is safely on GitHub.

**Later, to update the site after editing files**, the friendliest way is
inside VS Code:
1. Install Git from [git-scm.com](https://git-scm.com) (all default
   options are fine) — one time only.
2. In VS Code open the **Source Control** tab (the branch icon on the
   left, or `Ctrl + Shift + G`).
3. Click **Publish Branch / Initialize & Publish** once; after that each
   update is: edit files → in Source Control click **+** (stage) → type a
   small note like "new RRB ad" → click **✓ Commit** → click **Sync**.

(Or simply repeat steps 4–6 above in the browser: upload the changed files
again and commit.)

---

## 11. How to connect GitHub to Vercel (free)

1. Create a free account on [vercel.com](https://vercel.com) — choose
   **"Continue with GitHub"**.
2. Click **Add New… → Project**.
3. Find your repository `nexia-virtual-desk` and click **Import**.
4. Vercel auto-detects a plain website. You do not need to change any
   setting. (Framework preset: *Other* is fine.)
5. Click **Deploy**. Wait ~30 seconds.
6. Vercel gives you a live address like
   `https://nexia-virtual-desk.vercel.app`. Open it on your phone — that
   is your website. 🎉
7. (Recommended) In Vercel: **Settings → Domains** to add your own domain
   later, and share THAT link in your WhatsApp advertisements.

**One small cleanup after you have a real domain:** open `index.html` and
replace `https://nexia-virtual-desk.vercel.app/` (appears in the `canonical`
and `og:` lines at the top) with your real address. This only improves the
WhatsApp/Facebook sharing preview.

---

## 12. How to deploy future updates

This is the nice part — after step 11 it is automatic:

1. Edit `content.js` (new advertisement) and/or swap image files.
2. Push the changes to GitHub (section 10).
3. Vercel notices the change and re-deploys by itself in ~30 seconds.
4. Your WhatsApp advertisement link keeps working — the site now shows the
   new opportunity.

That's the whole workflow: **VS Code → GitHub → Vercel → live website.**

---

## Bonus: the daily routine in 60 seconds

1. New recruitment published → save its image to `assets/ads/`.
2. Edit the `currentAd` block in `content.js` (title, dates, image, link).
3. Set `isSample: false` if the data is verified.
4. Save, commit, sync. Vercel publishes it.
5. Post your WhatsApp advertisement with the link
   `https://your-domain.com/?ref=ibps`.

---

## Project structure (what each file is)

```
nexia-virtual-desk/
├── index.html        page structure + SEO/social preview settings
├── style.css         all design (colours at the very top)
├── content.js        ⭐ YOUR CONTROL PANEL — all editable text & links
├── script.js         page logic (builds cards, expiry, WhatsApp messages)
├── README.md         this guide
├── .gitignore        tells Git to ignore junk files
└── assets/
    ├── placeholder.svg          automatic fallback for missing images
    ├── branding/                logo, favicon, sharing preview image
    ├── ads/                     featured advertisement images
    ├── jobs/                    images for extra ?ref= advertisements
    └── services/                service card thumbnails
```

No other files are needed. There is no build step, no `npm install`,
nothing to compile.

## Notes & honest limits (Version 1)

- Everything runs in the visitor's browser. Enquiries arrive as WhatsApp
  messages — there is no inbox, database or admin panel (by design).
- The sample IBPS content is **demo data** and clearly labelled on the
  page until you set `isSample: false`.
- Never publish invented dates, vacancies or eligibility details. Add
  verified information only, and point `detailsUrl` to the official
  source whenever possible.

---

# TROUBLESHOOTING: "My update shows on my computer but NOT on Vercel"

Remember the chain:

```
YOUR COMPUTER  --upload-->  GITHUB  --auto-->  VERCEL (live site)
```

Vercel only ever builds what is inside GitHub. Editing files on your PC
does nothing online until you upload them to GitHub again.

## Step 1 — Find where the chain is broken (2 minutes)

1. Open your repository on GitHub and open `content.js` in the browser:
   `github.com/YOUR-USERNAME/nexia-virtual-desk/blob/main/content.js`
   - **Your new title is NOT there** → the break is PC → GitHub.
     Do **FIX A** below.
   - **Your new title IS there** → continue to step 2.

2. Trick: your deployed files are public. Open in a private window:
   `https://your-site.vercel.app/content.js`
   - Old text there → Vercel has not rebuilt. Do **FIX B**.
   - New text there but the page still looks old → it is only your
     browser/WhatsApp cache. Do **FIX C**.

## FIX A — Put the edited files on GitHub (the usual cause)

For `content.js` (text file):
1. In your repository, click `content.js`.
2. Click the **pencil icon** (Edit this file).
3. Press `Ctrl + A` (select all), then `Ctrl + V` (paste your new version
   from your computer — open it in Notepad/VS Code to copy it).
4. Click **Commit changes**.

For the advertisement image:
1. In the repository, open the folder `assets/ads/`.
2. Click **Add file → Upload files**, drag your new image in, commit.
3. If GitHub keeps the OLD file next to it, open the old file and click
   the **trash icon** to delete it, then commit.
4. **Names must match exactly.** If your new file is called
   `current-ad.webp` or `ibps-october.jpg`, then open `content.js` on
   GitHub (pencil icon) and change the line to match, e.g.
   `image: "assets/ads/current-ad.webp",` — same folder, same spelling,
   same upper/lower case, same extension. Vercel (Linux) is
   case-sensitive: `Current-Ad.svg` is NOT `current-ad.svg`.

Wait ~30 seconds, then check the live site in a private window.

## FIX B — GitHub is updated but Vercel did not rebuild

1. Vercel dashboard → your project → **Deployments** tab.
   A new deployment should appear right after every GitHub commit.
2. If the newest deployment is not marked **Production / Ready**:
   - Click the **⋯** menu next to it → **Redeploy** (or
     **Promote to Production**).
3. Check the branch: **Settings → Git → Production Branch** must be the
   branch you upload to (normally `main`). If you accidentally committed
   to another branch, switch this setting or upload to `main`.

## FIX C — Everything is new, but YOU see the old page (cache)

- Desktop: hard refresh `Ctrl + Shift + R`, or open a private window.
- Phone: open Chrome **Incognito**. The WhatsApp in-app browser caches
  very aggressively — never use it to check updates.
- Make sure you are opening your **production** address
  (`your-project.vercel.app`), not an old preview address from a previous
  deployment (those look like `your-project-git-xxxx.vercel.app`).

## Your update routine from now on (60 seconds)

1. Edit `content.js` / swap the image on your computer, test locally.
2. Upload BOTH changed files to GitHub (pencil icon / Upload files).
3. Wait ~30 s, check the live site in a private window. Done —
   Vercel deployed it by itself.

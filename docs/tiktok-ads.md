# How to run TikTok ads for s-prestige.com.cy

A start-to-finish plan: the accounts you need, how the link from TikTok to the
website actually works, what to film, what to spend, and how to tell within two
weeks whether it is working.

A formatted version of this document is at
[`docs/S-Prestige-TikTok-Ads-Plan.pdf`](S-Prestige-TikTok-Ads-Plan.pdf).

---

## The short version

The website turns visitors into customers in one way: they tap a WhatsApp or
phone button. So the whole job of a TikTok ad is to get the right person onto
the right page of **s-prestige.com.cy** with enough interest to tap that button.

- **The link is not the hard part.** Every TikTok ad has a destination URL and a
  button built in. You paste the page address, TikTok makes it clickable. There
  is no follower requirement and no "link in bio" limitation on paid ads.
- **Send each ad to a matching page**, never to the homepage. A ceramic-coating
  video goes to the ceramic-coating page.
- **Install the tracking pixel before spending anything.** Without it you are
  guessing which ad brought the customer.
- **Run two separate campaigns** — car services for Pafos locals, and
  rentals/excursions/transfers for tourists.
- **Budget €300–450 for the first month** and treat it as paid research.

---

## Step 1 — Get the accounts in place

1. **Switch the TikTok profile to a Business Account.** Profile → menu →
   Settings and privacy → Account → Switch to Business Account. This also
   unlocks the clickable website field on the profile, with no follower minimum.
2. **Create a TikTok Ads Manager account** at `ads.tiktok.com`. Country
   **Cyprus**, currency **EUR**, time zone **Asia/Nicosia**. The time zone is
   locked after creation and every report depends on it.
3. **Submit business verification** — Cyprus company registration or VAT
   registration plus the trading address. Unverified accounts get throttled.
4. **Enter the VAT number** under Payment → Billing information, so TikTok
   invoices under the EU reverse-charge rule instead of adding VAT.
5. **Add a payment card.** Manual payment gives a hard ceiling while learning.
6. **Verify the domain** under Tools → Domains. It is a DNS TXT record, the same
   kind already added for Vercel.

Use one ad account for both sides of the business, with separate campaigns
inside it — the account learns faster when the data is pooled.

---

## Step 2 — How the link works

| Route | How it works | Use it for |
|---|---|---|
| **Ad destination URL** (paid) | The ad's **Website URL** field plus a call-to-action button. One tap opens the page in TikTok's in-app browser. | Every campaign here. No follower count needed. |
| **Profile bio link** (free) | The Website field on a Business Account profile. | Set it to `s-prestige.com.cy` once and leave it. |
| **Spark Ads** (paid) | Put budget behind a video already posted on the profile. Keeps its likes and comments, gains the same button. | Best-performing organic videos. Usually cheaper per click. |
| **Instant Page** (paid) | A landing page hosted inside TikTok. | Skip it — it cuts you off from your own pages and tracking. |

### Tag every link

```
https://s-prestige.com.cy/detailing/ceramic-coating?utm_source=tiktok&utm_medium=cpc&utm_campaign=auto_detailing&utm_content=ceramic_beforeafter_01
```

Keep `utm_source` and `utm_medium` identical every time. Change `utm_campaign`
per campaign and `utm_content` per individual video.

---

## Step 3 — Turn on conversion tracking

### A. Create the pixel in TikTok

Ads Manager → **Tools → Events → Web Events → Set up Web Events** → **TikTok
Pixel** → **Manually install pixel code**. Copy the **Pixel ID**.

### B. Put the ID into the website

The site is already built to accept it. In Vercel → project → **Settings →
Environment Variables**, add:

| Name | Value | Environments |
|---|---|---|
| `PUBLIC_TIKTOK_PIXEL_ID` | the Pixel ID | Production |

Redeploy. That is the whole installation — no code editing, no Tag Manager.
Leave the variable unset and the site ships no advertising script at all.

### Consent

The pixel only loads after the visitor presses **Accept** on the cookie banner,
which is required under Cyprus/EU ePrivacy rules. Some visitors will decline, so
TikTok will always report slightly fewer conversions than actually happened.

### What gets measured

Customers leave the site to talk to you, so the pixel cannot see the sale. What
it sees is the handover — a tap on a WhatsApp or phone button — which fires a
TikTok **`Contact`** event tagged with the channel and the lane (`auto` or
`tourism`). Treat one `Contact` as one lead and optimise against it.

Verify with the **TikTok Pixel Helper** Chrome extension before spending: open
the site, accept cookies, tap a WhatsApp button, confirm a `Contact` event
fires.

Any element can also fire a custom event by adding `data-tt-event="EventName"`
(and optionally `data-tt-name="..."`) — no extra script needed.

---

## Step 4 — Campaign structure

| Campaign | Ad group | Send the click to | Who |
|---|---|---|---|
| **AUTO — Pafos locals** | Detailing & ceramic | `/detailing`, `/detailing/ceramic-coating` | Pafos district, 25–55, car owners |
| | Headlight restoration | `/detailing/headlight-restoration` | Pafos district, 30–60 |
| | Buy & sell | `/buy-sell` | Cyprus-wide, 25–55 |
| **TOURISM — visitors** | Car rental | `/tourism/rentals` | In Cyprus now + UK/DE/PL pre-trip |
| | Excursions & transfers | `/tourism/excursions`, `/tourism/taxi` | In Cyprus now, 25–55 |

### Objective

- **Weeks 1–2: Traffic.** Cheap, collects pixel data immediately, needs no
  conversion history.
- **Week 3 onward: Website Conversions** optimising for `Contact` — but only
  once that event fires roughly 50 times per week. Below that TikTok has too
  little signal.
- **Ignore** Reach, Video Views and Community Interaction for now.

---

## Step 5 — Targeting

| Setting | Auto (locals) | Tourism (visitors) |
|---|---|---|
| Location | Pafos district; add Limassol once it works | Cyprus (all) |
| Age | 25–55 | 25–55 |
| Languages | Greek, English, Russian | English, German, Polish, Russian |
| Interests | Leave open, or Vehicles / Auto care | Travel, Outdoor activities |
| Placement | **TikTok only** | **TikTok only** |

**Turn off Pangle.** It is TikTok's third-party app network and it spends budget
on clicks from mobile games that never convert. Placement → Select placement →
TikTok only. This one setting saves more wasted money than any other.

Rental customers decide either weeks before flying or on their first day in
Pafos. Targeting Cyprus catches the second group. For the first, test a small
UK/Germany/Poland ad group in the shoulder months (March–May, September–October)
and judge it separately.

---

## Step 6 — Budget

| Line | Amount | Note |
|---|---|---|
| Ad group minimum | €20/day | Platform floor |
| Campaign minimum | €50/day | Set campaign budget to unlimited, control at ad-group level |
| **Suggested start** | **€10–15/day per ad group** | Using a lifetime budget, which allows going below the daily floor |
| Month 1 total | €300–450 | Two campaigns, 2–3 ad groups live at a time |
| Decision point | after €150 | Enough clicks to see which videos work |

Run each ad group for at least four uninterrupted days before judging it. Every
edit to budget or targeting resets TikTok's learning phase.

---

## Step 7 — What to film

Creative decides cost per lead more than anything else on this list.

- Vertical 9:16, filmed on a phone, 9–21 seconds. Polished agency-style ads
  underperform badly here.
- The first two seconds decide it. Open on the most striking moment.
- Burn captions into the video — most people watch on mute.
- Say "Pafos" or "Kissonerga" in the first line of text.
- End with the action, matching the button.
- Make 3–5 per ad group and replace the losers every 7–10 days.

Videos worth shooting:

1. **Before/after detailing** — split-screen wipe, filthy to clean, no talking.
2. **Headlight restoration in real time** — yellow to clear, sped up.
3. **Sand and salt extraction** from a beach-used family car.
4. **Rental walk-around** — one car, keys, quick lap, coast road.
5. **Akamas or Troodos excursion** — 12 seconds of the actual view.
6. **Car listing walkthrough** from `/buy-sell`, price on screen.

Post each one organically first. The ones that get traction on their own are the
ones to promote as Spark Ads — free creative testing, and cheaper clicks.

---

## Step 8 — Reading the numbers

| Metric | Where it should land | If it is off |
|---|---|---|
| CTR | Above 1%; below 0.6% is failing | Creative problem — replace the video |
| CPC | €0.10–0.40 in Cyprus | Above €0.60: audience too narrow, or Pangle still on |
| Contact rate | 3–8% of clicks | Below 2%: landing page does not match the video |
| Cost per Contact | €3–10 per lead | The real number — compare to job value |
| Hook rate | 25%+ still watching at 3s | Opening two seconds are wrong |

**The number that actually matters:** ask every new customer where they found
you and write it down. A ceramic coating job is worth several hundred euro; if
€400 of ads brings two coating jobs and a week of rentals, it paid for itself
regardless of the dashboard.

---

## Step 9 — Four-week rollout

| When | Do | Spend |
|---|---|---|
| Week 1 | Business Account. Ads Manager (Cyprus/EUR/Asia-Nicosia). Verification + VAT. Create pixel, set `PUBLIC_TIKTOK_PIXEL_ID` in Vercel, redeploy, verify with Pixel Helper. Verify domain. Film first three videos. | €0 |
| Week 2 | Post the three videos organically. Launch AUTO campaign, Traffic, two ad groups at €10/day, TikTok-only placement. Leave alone four days. | ~€140 |
| Week 3 | Kill anything under 0.6% CTR. Launch TOURISM campaign. Promote best organic post as a Spark Ad. Film three replacements. | ~€150 |
| Week 4 | Count `Contact` events. At 50+/week switch the winner to Website Conversions. Otherwise stay on Traffic and improve creative. | ~€150 |

---

## Common ways this goes wrong

- Sending every ad to the homepage instead of the matching page.
- Leaving Pangle placement on.
- Editing the campaign every day, resetting the learning phase each time.
- Judging results in 24 hours.
- Running one video per ad group, so there is nothing to compare.
- Spending before the pixel is verified.
- Re-using a landscape Facebook video.

---

## Landing pages

| Page | URL | Campaign |
|---|---|---|
| Detailing | `/detailing` | AUTO |
| Ceramic coating | `/detailing/ceramic-coating` | AUTO |
| Headlight restoration | `/detailing/headlight-restoration` | AUTO |
| Interior / biological | `/detailing/interior-biological` | AUTO |
| Mechanical | `/mechanical` | AUTO |
| Recovery / towing | `/recovery` | AUTO |
| Buy & sell | `/buy-sell` | AUTO |
| Car rentals | `/tourism/rentals` | TOURISM |
| Excursions | `/tourism/excursions` | TOURISM |
| Taxi & transfers | `/tourism/taxi` | TOURISM |
| Contact | `/contact` | — |

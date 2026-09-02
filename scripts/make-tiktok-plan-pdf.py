#!/usr/bin/env python3
"""Regenerate docs/S-Prestige-TikTok-Ads-Plan.pdf.

Requires reportlab (pip install reportlab). Edit docs/tiktok-ads.md and this
script together so the Markdown and the PDF stay in agreement.
"""

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

import os

OUT = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "docs",
    "S-Prestige-TikTok-Ads-Plan.pdf",
)

GOLD = colors.HexColor("#A8801F")
GOLD_LIGHT = colors.HexColor("#F6EFDC")
INK = colors.HexColor("#141414")
MUTED = colors.HexColor("#5A5A5A")
RULE = colors.HexColor("#D8D2C4")

styles = getSampleStyleSheet()

S = {}
S["title"] = ParagraphStyle(
    "title", parent=styles["Title"], fontName="Helvetica-Bold",
    fontSize=26, leading=30, textColor=INK, alignment=TA_LEFT, spaceAfter=4,
)
S["subtitle"] = ParagraphStyle(
    "subtitle", fontName="Helvetica", fontSize=11.5, leading=16,
    textColor=MUTED, spaceAfter=2,
)
S["eyebrow"] = ParagraphStyle(
    "eyebrow", fontName="Helvetica-Bold", fontSize=8, leading=12,
    textColor=GOLD, spaceAfter=6,
)
S["h1"] = ParagraphStyle(
    "h1", fontName="Helvetica-Bold", fontSize=15, leading=19,
    textColor=INK, spaceBefore=16, spaceAfter=7,
)
S["h2"] = ParagraphStyle(
    "h2", fontName="Helvetica-Bold", fontSize=11, leading=15,
    textColor=INK, spaceBefore=11, spaceAfter=4,
)
S["body"] = ParagraphStyle(
    "body", fontName="Helvetica", fontSize=9.8, leading=14.6,
    textColor=INK, spaceAfter=7,
)
S["small"] = ParagraphStyle(
    "small", fontName="Helvetica", fontSize=8.6, leading=12.4,
    textColor=MUTED, spaceAfter=6,
)
S["bullet"] = ParagraphStyle(
    "bullet", parent=S["body"], spaceAfter=3.5,
)
S["cell"] = ParagraphStyle(
    "cell", fontName="Helvetica", fontSize=8.4, leading=11.6, textColor=INK,
)
S["cellb"] = ParagraphStyle(
    "cellb", parent=S["cell"], fontName="Helvetica-Bold",
)
S["cellhead"] = ParagraphStyle(
    "cellhead", fontName="Helvetica-Bold", fontSize=8.2, leading=11,
    textColor=colors.white,
)
S["callout"] = ParagraphStyle(
    "callout", fontName="Helvetica", fontSize=9.4, leading=13.8,
    textColor=INK, leftIndent=8, rightIndent=8, spaceBefore=6, spaceAfter=6,
)

story = []


def h1(text, eyebrow=None):
    block = []
    if eyebrow:
        block.append(Paragraph(eyebrow.upper(), S["eyebrow"]))
    block.append(Paragraph(text, S["h1"]))
    story.append(KeepTogether(block))


def h2(text):
    story.append(Paragraph(text, S["h2"]))


def p(text, style="body"):
    story.append(Paragraph(text, S[style]))


def bullets(items, numbered=False):
    story.append(
        ListFlowable(
            [ListItem(Paragraph(i, S["bullet"]), leftIndent=14) for i in items],
            bulletType="1" if numbered else "bullet",
            bulletFontName="Helvetica-Bold" if numbered else "Helvetica",
            bulletFontSize=9 if numbered else 9,
            bulletColor=GOLD,
            leftIndent=14,
            bulletOffsetY=0 if numbered else -1,
            spaceAfter=8,
        )
    )


def table(header, rows, widths):
    data = [[Paragraph(c, S["cellhead"]) for c in header]]
    for r in rows:
        data.append([Paragraph(str(c), S["cell"]) for c in r])
    t = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("LINEBELOW", (0, 1), (-1, -1), 0.4, RULE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#FAF8F3")]),
            ]
        )
    )
    if len(rows) <= 5:
        story.append(KeepTogether([t, Spacer(1, 10)]))
    else:
        story.append(t)
        story.append(Spacer(1, 10))


def callout(text):
    t = Table([[Paragraph(text, S["callout"])]], colWidths=[168 * mm], hAlign="LEFT")
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), GOLD_LIGHT),
                ("LINEBEFORE", (0, 0), (0, -1), 2.5, GOLD),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 8))


# ----------------------------------------------------------------- cover ----
story.append(Spacer(1, 6))
p("S.PRESTIGE SERVICES &nbsp;&middot;&nbsp; KISSONERGA, PAFOS", "eyebrow")
story.append(Paragraph("How to run TikTok ads<br/>for s-prestige.com.cy", S["title"]))
story.append(Spacer(1, 6))
p(
    "A start-to-finish plan: the accounts you need, how the link from TikTok to your "
    "website actually works, what to film, what to spend, and how to tell within two "
    "weeks whether it is working.",
    "subtitle",
)
story.append(Spacer(1, 4))
p("Prepared 2 September 2026", "small")

story.append(Spacer(1, 10))

h1("The short version", "Read this first")
p(
    "Your website turns visitors into customers in one way: they tap a WhatsApp or phone "
    "button. So the whole job of a TikTok ad is to get the right person onto the right page "
    "of <b>s-prestige.com.cy</b> with enough interest to tap that button. Everything in this "
    "plan serves that one path."
)
bullets(
    [
        "<b>The link is not the hard part.</b> Every TikTok ad has a destination URL and a "
        "button built in. You paste your page address, TikTok makes it clickable. There is no "
        "follower requirement and no \"link in bio\" limitation on paid ads.",
        "<b>Send each ad to a matching page</b>, never to the homepage. A ceramic-coating "
        "video goes to the ceramic-coating page. Sending everything to the homepage is the "
        "single most common way to waste money.",
        "<b>Install the tracking pixel before you spend anything.</b> Without it you are "
        "guessing which ad brought the customer. It is a one-line setting on the website.",
        "<b>Run two separate campaigns</b>, because you have two different businesses: car "
        "services for Pafos locals, and rentals/excursions/transfers for tourists. They need "
        "different videos, different targeting, and different budgets.",
        "<b>Budget €300–€450 for the first month</b> and treat it as paid research, not as "
        "sales. Month two is when you scale what worked.",
    ]
)

story.append(PageBreak())

# ---------------------------------------------------------------- step 1 ----
h1("Step 1 — Get the accounts in place", "Week 1, about two hours")
p(
    "You cannot advertise from a personal TikTok account. Do these in order; each one "
    "unlocks the next."
)
bullets(
    [
        "<b>Switch your TikTok profile to a Business Account.</b> In the app: Profile → menu "
        "(≡) → Settings and privacy → Account → Switch to Business Account. Pick "
        "\"Automotive\" or \"Travel &amp; Tourism\". This also unlocks the clickable website "
        "field on your profile — no follower minimum.",
        "<b>Create a TikTok Ads Manager account</b> at <b>ads.tiktok.com</b>. Country "
        "<b>Cyprus</b>, currency <b>EUR</b>, time zone <b>Asia/Nicosia</b>. The time zone is "
        "locked after creation and every report you ever read depends on it — get it right "
        "the first time.",
        "<b>Submit business verification.</b> TikTok will ask for your Cyprus company "
        "registration certificate or VAT registration, and the trading address. Approval "
        "usually lands within one to three working days. Unverified accounts get throttled "
        "and randomly paused, so do not skip it.",
        "<b>Enter your VAT number</b> under Payment → Billing information. As a "
        "VAT-registered Cyprus business you are then invoiced under the EU reverse-charge "
        "rule, meaning TikTok does not add VAT and you account for it yourself. Without the "
        "number you are charged VAT you cannot easily reclaim.",
        "<b>Add a payment card</b> and set <b>Manual payment</b> if you want a hard ceiling "
        "on spend while you learn, or Automatic if you would rather it never stops mid-flight.",
        "<b>Verify the domain s-prestige.com.cy</b> in Ads Manager under Tools → "
        "Domains. You already control the DNS, so this is a TXT record, the same kind you "
        "added for Vercel. It proves the site is yours and improves how reliably conversions "
        "are attributed to your ads.",
    ],
    numbered=True,
)
callout(
    "<b>One account, two businesses.</b> Do not open two ad accounts for auto and tourism. "
    "One account, with separate campaigns inside it — the account learns faster when all "
    "the data is pooled, and billing stays simple."
)

# ---------------------------------------------------------------- step 2 ----
h1("Step 2 — How the link actually works", "The part you asked about")
p(
    "There are four different ways a person gets from TikTok to your website, and they are "
    "easy to confuse. Only the first one is \"TikTok ads\"; the others are worth having anyway."
)
table(
    ["Route", "How it works", "Use it for"],
    [
        [
            "<b>Ad destination URL</b><br/>(paid)",
            "When you build the ad you fill a field called <b>Website URL</b> and pick a "
            "call-to-action button (\"Learn more\", \"Book now\", \"Get quote\"). TikTok "
            "renders the button over the video. One tap opens your page in TikTok's "
            "in-app browser.",
            "Every campaign in this plan. No follower count needed.",
        ],
        [
            "<b>Profile bio link</b><br/>(free)",
            "The Website field on your Business Account profile. Clickable for business "
            "accounts regardless of follower count.",
            "Set it to <b>s-prestige.com.cy</b> once and leave it. Catches people who "
            "look you up after seeing an ad.",
        ],
        [
            "<b>Spark Ads</b><br/>(paid, boosts a real post)",
            "You take a video already posted on your own profile and put money behind it. "
            "It keeps its likes, comments and your profile name, and gains the same "
            "clickable button as a normal ad.",
            "Your best-performing organic videos. Usually cheaper per click than a "
            "cold-made ad because it looks like a real post.",
        ],
        [
            "<b>Instant Page</b><br/>(paid, hosted by TikTok)",
            "A landing page built inside TikTok that opens instantly instead of loading "
            "your site.",
            "Skip it. Your site is already fast and static, and an Instant Page would "
            "cut you off from your own pages and tracking.",
        ],
    ],
    [30 * mm, 78 * mm, 60 * mm],
)

h2("Tag every link so you can tell what worked")
p(
    "Add tracking parameters to the end of each destination URL. They change nothing for the "
    "visitor, but they let you separate TikTok traffic from everything else in your analytics. "
    "The pattern:"
)
p(
    "<font face='Courier' size='8.4'>https://s-prestige.com.cy/detailing/ceramic-coating"
    "?utm_source=tiktok&amp;utm_medium=cpc&amp;utm_campaign=auto_detailing"
    "&amp;utm_content=ceramic_beforeafter_01</font>",
    "small",
)
p(
    "Keep <b>utm_source</b> and <b>utm_medium</b> exactly as above every time. Change "
    "<b>utm_campaign</b> per campaign and <b>utm_content</b> per individual video, so you can "
    "see which specific clip is pulling its weight."
)

# ---------------------------------------------------------------- step 3 ----
h1("Step 3 — Turn on conversion tracking", "Do this before the first euro")
p(
    "TikTok needs to see what happens after the click, otherwise it cannot learn who to show "
    "your ads to, and you cannot tell a good ad from a bad one. Two things are needed."
)
h2("A. Create the pixel in TikTok")
p(
    "In Ads Manager go to <b>Tools → Events → Web Events → Set up Web Events</b>. "
    "Choose <b>TikTok Pixel</b>, then <b>Manually install pixel code</b>. Name it "
    "\"s-prestige.com.cy\". TikTok gives you a <b>Pixel ID</b> — a long string of letters "
    "and numbers. Copy it."
)
h2("B. Put the ID into the website")
p(
    "The website is already built to accept it. In your <b>Vercel</b> dashboard open the "
    "project, go to <b>Settings → Environment Variables</b>, and add:"
)
table(
    ["Name", "Value", "Environments"],
    [["<font face='Courier'>PUBLIC_TIKTOK_PIXEL_ID</font>", "the Pixel ID you copied",
      "Production"]],
    [58 * mm, 62 * mm, 48 * mm],
)
p(
    "Then redeploy. That is the whole installation — no code editing, no Google Tag "
    "Manager. Leave the variable empty and the site ships no advertising script at all, so "
    "you can switch tracking off as easily as you switched it on."
)
callout(
    "<b>Consent, because this is the EU.</b> The pixel only loads after a visitor presses "
    "<b>Accept</b> on the cookie banner — that is a legal requirement in Cyprus, not an "
    "option. In practice a portion of visitors will decline, so TikTok will always report "
    "slightly fewer conversions than actually happened. Expect the gap; do not chase it."
)
h2("What gets measured")
p(
    "Because your customers leave the site to talk to you, the pixel cannot see the actual "
    "sale. What it can see — and what you should optimise against — is the handover: "
    "the moment someone taps a WhatsApp or phone button. That fires a TikTok event called "
    "<b>Contact</b>, tagged with which button and which side of the business. Treat one "
    "<b>Contact</b> as one lead."
)
p(
    "Verify it works before spending: install the <b>TikTok Pixel Helper</b> Chrome "
    "extension, open your site, accept cookies, tap a WhatsApp button, and confirm the "
    "extension shows a <b>Contact</b> event. If it does not, fix that first.",
    "small",
)

# ---------------------------------------------------------------- step 4 ----
h1("Step 4 — Campaign structure", "Two campaigns, five ad groups")
p(
    "Your two businesses want different people. Keep them apart so that one cannot quietly "
    "eat the other's budget."
)
table(
    ["Campaign", "Ad group", "Send the click to", "Who"],
    [
        [
            "<b>AUTO — Pafos locals</b>",
            "Detailing &amp; ceramic",
            "/detailing<br/>/detailing/ceramic-coating",
            "Pafos district, 25–55, car owners",
        ],
        [
            "",
            "Headlight restoration",
            "/detailing/headlight-restoration",
            "Pafos district, 30–60",
        ],
        [
            "",
            "Buy &amp; sell",
            "/buy-sell",
            "Cyprus-wide, 25–55",
        ],
        [
            "<b>TOURISM — visitors</b>",
            "Car rental",
            "/tourism/rentals",
            "In Cyprus now + UK/DE/PL pre-trip",
        ],
        [
            "",
            "Excursions &amp; transfers",
            "/tourism/excursions<br/>/tourism/taxi",
            "In Cyprus now, 25–55",
        ],
    ],
    [34 * mm, 32 * mm, 56 * mm, 46 * mm],
)
h2("Which objective to choose")
p(
    "TikTok asks for a campaign objective on the first screen. This trips up most beginners, "
    "so follow this sequence:"
)
bullets(
    [
        "<b>Weeks 1–2: choose Traffic.</b> It is cheap, it starts collecting pixel data "
        "immediately, and it does not need a conversion history to work. You are buying "
        "information about which videos and which audiences respond.",
        "<b>Week 3 onward: switch to Website Conversions</b>, optimising for the "
        "<b>Contact</b> event — but only once that event has fired roughly 50 times in a "
        "week. Below that, TikTok has too little signal and the campaign will underdeliver "
        "at a high cost. If you are not reaching 50, stay on Traffic longer.",
        "<b>Ignore Reach, Video Views and Community Interaction</b> for now. They buy "
        "eyeballs, not customers.",
    ]
)
p(
    "If TikTok offers you a WhatsApp or messaging destination in Cyprus, it is worth testing "
    "later as a second ad group — but keep the website route as your main one, because "
    "that is where your tracking and your pages live.",
    "small",
)

# ---------------------------------------------------------------- step 5 ----
h1("Step 5 — Targeting", "Keep it wide, let the algorithm work")
p(
    "The instinct is to narrow the audience until it is exactly your customer. On TikTok "
    "that backfires: a small audience raises your costs and starves the algorithm of the "
    "data it needs. Set the boundaries below and leave interests mostly open."
)
table(
    ["Setting", "Auto (locals)", "Tourism (visitors)"],
    [
        ["Location", "Pafos district; add Limassol once it works",
         "Cyprus (all) — catches tourists already on the island"],
        ["Age", "25–55", "25–55"],
        ["Gender", "All", "All"],
        ["Languages", "Greek, English, Russian", "English, German, Polish, Russian"],
        ["Interests", "Leave open, or Vehicles / Auto care",
         "Travel, Outdoor activities"],
        ["Placement", "TikTok only — turn off Pangle and the audience network",
         "TikTok only — turn off Pangle and the audience network"],
    ],
    [26 * mm, 71 * mm, 71 * mm],
)
callout(
    "<b>Turn off Pangle.</b> It is TikTok's third-party app network and it will happily spend "
    "your budget on clicks from mobile games that never convert. Under Placement choose "
    "<b>Select placement</b> and tick TikTok only. This one setting saves more wasted money "
    "than any other."
)
h2("The tourist timing problem")
p(
    "Rental customers decide either weeks before they fly or on their first day in Pafos. "
    "Targeting Cyprus catches the second group, which is the easier win. For the first group, "
    "test one small ad group aimed at the UK, Germany and Poland in the shoulder months "
    "(March–May, September–October) when people are booking. Judge it separately — "
    "its cost per lead will look worse but the bookings are longer."
)

# ---------------------------------------------------------------- step 6 ----
h1("Step 6 — Budget", "What it costs to find out")
table(
    ["Line", "Amount", "Note"],
    [
        ["TikTok ad group minimum", "€20 / day",
         "Platform floor. Below this an ad group will not run."],
        ["TikTok campaign minimum", "€50 / day",
         "Set campaign budget to \"unlimited\" and control spend at ad-group level instead."],
        ["<b>Suggested start</b>", "<b>€10–15 / day per ad group</b>",
         "Using a lifetime budget, which lets you go below the daily floor."],
        ["Month 1 total", "€300–450",
         "Two campaigns, two or three ad groups live at a time."],
        ["Decision point", "after €150",
         "By then you will have enough clicks to see which videos are working."],
    ],
    [40 * mm, 38 * mm, 90 * mm],
)
p(
    "Run each ad group for a minimum of four uninterrupted days before judging it. Every time "
    "you edit budget or targeting you reset TikTok's learning and the first days' costs are "
    "wasted again. Set it, leave it, then decide."
)

# ---------------------------------------------------------------- step 7 ----
h1("Step 7 — What to film", "The part that decides everything")
p(
    "Targeting and budget are hygiene. On TikTok the creative is what actually determines "
    "your cost per lead, and the difference between a good video and a bad one is not "
    "10 percent — it is five times. Budget your effort accordingly."
)
h2("Rules that apply to every video")
bullets(
    [
        "<b>Vertical 9:16, filmed on a phone, 9–21 seconds.</b> Shot on a phone is not a "
        "compromise here, it is the format. Polished agency-looking ads underperform badly.",
        "<b>The first two seconds decide it.</b> Open on the most visually striking moment "
        "— the dirty half of the seat, the yellow headlight, the car mid-turn on a coast "
        "road. No logo intro, no slow build.",
        "<b>Burn captions into the video.</b> Most people watch on mute.",
        "<b>Say where you are.</b> \"Pafos\" or \"Kissonerga\" in the first line of text. It "
        "filters out the wrong viewers, which lowers your costs.",
        "<b>End with the action</b> — \"Message us on WhatsApp\", matching the button.",
        "<b>Make 3–5 per ad group</b> and let them compete. Replace the losers every "
        "7–10 days; TikTok audiences burn out on creative faster than any other platform.",
    ]
)
h2("Specific videos to shoot for your business")
table(
    ["#", "Video", "Why it works"],
    [
        ["1", "<b>Before / after detailing.</b> Split-screen or a wipe down the middle of a "
              "filthy interior turning clean. 15s, no talking, satisfying audio.",
         "The highest-performing format in this entire category. You already have the "
         "before/after material on your site."],
        ["2", "<b>Headlight restoration in real time.</b> One continuous shot, yellow to "
              "clear, sped up.",
         "Instantly legible, obviously valuable, needs no explanation in any language."],
        ["3", "<b>Sand and salt out of a car interior.</b> Extraction on a beach-used family "
              "car.",
         "Speaks directly to everyone who lives near a Cyprus beach."],
        ["4", "<b>Rental walk-around.</b> One car, keys, quick lap, then the coast road.",
         "Sells the holiday rather than the vehicle. Point it at /tourism/rentals."],
        ["5", "<b>Akamas or Troodos excursion clip.</b> 12 seconds of the actual view.",
         "The destination sells itself; you are only supplying the transport."],
        ["6", "<b>Car listing walkthrough.</b> One vehicle from /buy-sell, price on screen.",
         "Price on screen filters out the browsers and pulls in serious buyers."],
    ],
    [7 * mm, 76 * mm, 85 * mm],
)
callout(
    "<b>Post them organically first.</b> Put each video on your own profile before paying to "
    "promote it. The ones that get traction on their own are the ones to put money behind, "
    "as Spark Ads — you will have pre-tested the creative for free, and Spark Ads "
    "typically cost less per click than ads built cold."
)

# ---------------------------------------------------------------- step 8 ----
h1("Step 8 — Reading the numbers", "What good looks like")
p(
    "Check the account twice a week, not twice a day. Daily fluctuation is noise and reacting "
    "to it makes results worse."
)
table(
    ["Metric", "Where it should land", "If it is off"],
    [
        ["<b>CTR</b> (click-through rate)", "Above 1%. Below 0.6% is a failing video.",
         "The creative is the problem, not the targeting. Replace the video."],
        ["<b>CPC</b> (cost per click)", "€0.10–€0.40 in Cyprus for this kind of business.",
         "Above €0.60: audience too narrow, or Pangle is still switched on."],
        ["<b>Contact rate</b>", "3–8% of clicks should tap WhatsApp or phone.",
         "Below 2%: the landing page does not match what the video promised."],
        ["<b>Cost per Contact</b>", "€3–€10 per lead is healthy at this scale.",
         "This is your real number. Compare it to what one detailing job is worth."],
        ["<b>Hook rate</b>", "25%+ still watching at 3 seconds.",
         "Below that, your opening two seconds are wrong."],
    ],
    [33 * mm, 63 * mm, 72 * mm],
)
h2("The number that actually matters")
p(
    "None of the above is profit. The only measurement that settles whether TikTok works for "
    "you is this: <b>ask every new customer where they found you, and write it down.</b> A "
    "ceramic coating job is worth several hundred euro; if one month of ads costs €400 and "
    "brings two coating jobs and a week of rentals, it paid for itself regardless of what any "
    "dashboard says. Keep a simple tally in a notebook or a phone note for the first two "
    "months — it will tell you more than the analytics will."
)

# ---------------------------------------------------------------- step 9 ----
h1("Step 9 — Four-week rollout", "Do it in this order")
table(
    ["When", "Do", "Spend"],
    [
        ["<b>Week 1</b>",
         "Switch to Business Account. Open Ads Manager, set Cyprus / EUR / Asia-Nicosia. "
         "Submit business verification and VAT number. Create the pixel, add "
         "PUBLIC_TIKTOK_PIXEL_ID in Vercel, redeploy, verify with Pixel Helper. Verify the "
         "domain. Film the first three videos.",
         "€0"],
        ["<b>Week 2</b>",
         "Post the three videos organically. Launch the AUTO campaign, Traffic objective, "
         "two ad groups (detailing, headlights) at €10/day. Placement: TikTok only. Leave "
         "it alone for four full days.",
         "~€140"],
        ["<b>Week 3</b>",
         "Kill anything under 0.6% CTR. Launch the TOURISM campaign with the rental video. "
         "Promote your best organic post as a Spark Ad. Film three replacement videos.",
         "~€150"],
        ["<b>Week 4</b>",
         "Count Contact events. At 50+ per week, switch the winning campaign to Website "
         "Conversions optimising for Contact. Otherwise stay on Traffic and keep improving "
         "the creative. Compare the notebook tally against the spend.",
         "~€150"],
    ],
    [20 * mm, 116 * mm, 22 * mm],
)

h1("Common ways this goes wrong", "Avoid these")
bullets(
    [
        "<b>Sending every ad to the homepage.</b> The visitor has to hunt for what the video "
        "promised, and most will not. Match the page to the video.",
        "<b>Leaving Pangle placement on.</b> Cheap clicks, no customers.",
        "<b>Editing the campaign every day.</b> Each edit restarts the learning phase and "
        "re-burns the expensive early days.",
        "<b>Judging in 24 hours.</b> Four days minimum, then decide.",
        "<b>One video per ad group.</b> You need competition to find a winner.",
        "<b>Spending before the pixel is verified.</b> You will never know what worked.",
        "<b>Re-using a landscape Facebook video.</b> It will be ignored. Vertical or nothing.",
    ]
)

h1("Your landing pages", "Reference")
table(
    ["Page", "URL", "Campaign"],
    [
        ["Detailing", "s-prestige.com.cy/detailing", "AUTO"],
        ["Ceramic coating", "s-prestige.com.cy/detailing/ceramic-coating", "AUTO"],
        ["Headlight restoration", "s-prestige.com.cy/detailing/headlight-restoration", "AUTO"],
        ["Interior / biological", "s-prestige.com.cy/detailing/interior-biological", "AUTO"],
        ["Mechanical", "s-prestige.com.cy/mechanical", "AUTO"],
        ["Recovery / towing", "s-prestige.com.cy/recovery", "AUTO"],
        ["Buy &amp; sell", "s-prestige.com.cy/buy-sell", "AUTO"],
        ["Car rentals", "s-prestige.com.cy/tourism/rentals", "TOURISM"],
        ["Excursions", "s-prestige.com.cy/tourism/excursions", "TOURISM"],
        ["Taxi &amp; transfers", "s-prestige.com.cy/tourism/taxi", "TOURISM"],
        ["Contact", "s-prestige.com.cy/contact", "—"],
    ],
    [42 * mm, 88 * mm, 38 * mm],
)


# ----------------------------------------------------------------- build ----
def decorate(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(21 * mm, 16 * mm, A4[0] - 21 * mm, 16 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(21 * mm, 11 * mm, "S.Prestige Services — TikTok ads plan")
    canvas.drawRightString(A4[0] - 21 * mm, 11 * mm, "Page %d" % doc.page)
    canvas.restoreState()


doc = BaseDocTemplate(
    OUT,
    pagesize=A4,
    leftMargin=21 * mm,
    rightMargin=21 * mm,
    topMargin=18 * mm,
    bottomMargin=22 * mm,
    title="S.Prestige Services - TikTok Ads Plan",
    author="S.Prestige Services",
    subject="Plan for running TikTok advertising to s-prestige.com.cy",
)
frame = Frame(
    doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="body",
    leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
)
from reportlab.platypus import PageTemplate  # noqa: E402

doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=decorate)])
doc.build(story)
print("wrote", OUT)

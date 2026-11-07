# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two readers of equal weight:

- **Recruiters (HR)** screening candidates for a permanent web developer role. They spend under a minute and need the role, the experience, the CV and a way to get in touch.
- **Lead developers and CTOs** judging technical level. They read further and want the stack, what was actually built, and how.

The first screen serves the recruiter; the rest of the page convinces the technical reader.

## Product Purpose

The personal portfolio of Julien Devienne-Ousmer, full-stack web developer (PHP/Symfony, Angular) in Toulouse. It exists to land interviews for a permanent (CDI) developer job. Success means a visitor downloads the CV or makes contact.

## Positioning

He designed, built and still evolves **on his own** a company intranet used every day by 130 employees at Cerfrance Lot (an accounting firm), from database modelling to production, with automated tests in CI. That is the one fact a visitor must remember, and it is what a neighbouring junior portfolio cannot truthfully claim.

## Operating Context

- Visitors arrive from a CV, LinkedIn or a job application, on desktop or phone.
- Career path: DUT Informatique (2020–2022), Licence pro APSIO (2022–2023), work-study at Cerfrance Lot (2022–2025), fixed-term contracts (Sep–Dec 2025, Apr–Jun 2026), permanent contract (CDI) since July 2026, Master Ingénierie Logicielle at IPI Blagnac (2023–2025).
- Scrum: takes part in ceremonies and occasionally facilitates them. Never present him as a Scrum Master.

## Capabilities and Constraints

- Stack must stay **Angular + Tailwind CSS** (the site also demonstrates Angular skill). Deployed on Vercel.
- Must stay **bilingual French / English**, with a language switch. French is the default.
- Not required to stay a single page.
- All content lives in `src/app/data/portfolio.data.ts`.

## Brand Commitments

- Name written in full: **Julien Devienne-Ousmer**.
- Voice: **direct and warm**, first person, short sentences; the person shows through, without jokes or hype.
- The user explicitly rejects the "AI slop" look; no violet-to-cyan or violet-to-blue gradients.
- Standing preference (2026-11-07): the user rejected every metaphor world (football programme, transit map, exposed binding, zoo map, comic, sewing pattern, type specimen, darkroom). The site must be **modern and polished**, at the craft level of **figma.com, linear.app and vercel.com**: strong type, clean layout, fluid motion, no theme or gimmick.
- Light **and** dark: light by default, with a switch to dark.

## Evidence on Hand

- CV: `public/CV_Julien_Devienne-Ousmer.pdf` (it still ends at the Dec 2025 fixed-term contract and includes a phone number).
- Real photo: `public/photo.webp`, `public/photo.jpg` (640×640 crop of an indoor selfie, white T-shirt).
- Four projects, three of them internal to Cerfrance (Intranet, accounting workload tool, legacy intranet modernisation) and one school project (Fighter Stats). There are **no screenshots, demos or public code** for any of them: never fabricate UI captures presented as the real tools.
- Real figures: 130 employees use the intranet; tools serve 3,000 client members; TOEIC 795/990.
- No testimonials, references or client logos exist. Never invent any.

## Product Principles

1. The intranet is the proof: lead with what he built alone and who uses it.
2. Answer the recruiter in one screen, then reward the technical reader who scrolls.
3. Every claim is true and checkable against the CV.
4. Show the person, not a template: real photo, his own voice.

## Accessibility & Inclusion

Required: readable contrast (WCAG AA) and motion that stops under `prefers-reduced-motion`. Keyboard access and visible focus throughout.

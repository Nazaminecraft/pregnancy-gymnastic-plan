# Gymnastic Plan

## Summary
Pregnancy-safe exercise plan for a Thai woman, age 40.

- Gestational Age anchor date: 25 August 2025 (0 weeks 0 days)
- Equipment: treadmill, swimming pool, fixed bicycle, resistance bands, dumbbells, yoga mat
- Body-weight options are always acceptable.

## Gestational Age Calculation
- `gestational_age_days_today = (today − 2025-08-25 in days)`
- `gestational_age_weeks = floor(gestational_age_days_today / 7)`; `gestational_age_days = gestational_age_days_today % 7`

## Guardrails
- General guidance only; not medical advice.
- Keep intensity moderate (Rate of Perceived Exertion 4 to 6; talk test). Stay hydrated; avoid overheating.

## When Adding Sessions
- Keep sessions around 25–40 minutes total: warm‑up, main, cool‑down.
- Offer an equipment‑free alternative for each exercise.
- Use stable positions; avoid prolonged supine work as gestation advances.
- No maximal efforts; leave two to four repetitions in reserve.
- Stop if any concerning symptoms occur.

## Output Rules (Required)
- Format: deliver a single, moderately styled HTML file unless requested otherwise.
- Styling: semantic HTML with a small inline <style>; responsive layout; no heavy frameworks, no external fonts.
- Visual theme: light, professional, friendly. Use white/soft‑grey surfaces, clear borders, generous whitespace, accessible contrast (WCAG AA). Avoid dark/low‑contrast themes.
- Organization: three sessions per week as defined in “Three‑Session Weeks (Required)”.
- Categories: Cardio, Strength, Core and Breathing, Mobility, Pelvic Floor.
- Equipment: treadmill, swimming pool, fixed bicycle, resistance bands, dumbbells, yoga mat; always include body‑weight alternatives.
- Videos: provide three titled YouTube links per exercise (prefer high‑quality Thai content; English acceptable if Thai is unavailable). Create a single “Video Library” section listing links per exercise, and link to it from exercises via anchors. Do not embed iframes.
- Language: write all plan content in Thai. Use full words (no abbreviations). If a technical English term improves clarity, put the full English term in parentheses on first mention.
- Gestational Age anchor: use 25 August 2025 as 0 weeks 0 days; compute gestational age from this anchor only. Do not reference EDD.
- Scope: the output file is `index.html`. Do not add additional files beyond `AGENTS.md` and `index.html` unless explicitly requested by the project owner.

## Three‑Session Weeks (Required)
- Group sessions by Week N. Keep week headings concise (for example, “สัปดาห์ที่ 10”). If useful, include gestational age and date range as subtle meta or data attributes — not in the main heading.
- Each Week must include exactly three Sessions:
  - Session 1 — Strength and Movement Quality (Lower emphasis or full body)
  - Session 2 — Cardio Endurance (treadmill, stationary bicycle, or pool)
  - Session 3 — Strength and Core (Upper emphasis or full body) or Mobility and Core
- Each Session block must include: session focus, target duration range, and target Rate of Perceived Exertion range.
- Session sections in order: Warm‑up, Main Work (one clearly labeled Circuit with rounds and rest), Optional Finisher, Cool‑down, Pelvic Floor.
- Default is “do all”. Do not label blocks with “ทำทั้งหมด/Do all”. Only mark choice blocks as “เลือกอย่างใดอย่างหนึ่ง/Pick one”.
- Scheduling guidance: spread the three sessions across the week with at least one rest day between (for example, Monday, Wednesday, Saturday). Optional light walking or swimming on non‑session days.
- Weekly volume target: approximately 150 or more minutes of moderate activity across all days (adjust as needed). The three programmed sessions should provide the majority; optional easy walking can top up as desired.

## Default Prescriptions and Execution Key (Required)
- Strength default: three rounds (sets) of eight to twelve repetitions per exercise, Rate of Perceived Exertion four to six, rest sixty to ninety seconds between sets; tempo about two seconds down, no pause, two seconds up; exhale on effort.
- Core default: two to three rounds of six to ten slow repetitions or fifteen to thirty second holds; rest thirty to forty‑five seconds.
- Mobility default: two rounds of twenty to forty second holds or six to ten controlled repetitions; breathe calmly; no pain.
- Cardio default: twenty‑five to thirty‑five minutes at Rate of Perceived Exertion four to five; intervals when specified (work to rest clearly stated).
- Pelvic floor default: two by six repetitions of six to eight second gentle contractions with six to eight seconds full relaxation; breathe throughout.
- Labels used per exercise: Purpose (why), Setup (start and position), Movement (path and tempo), Breathe (cues), Avoid (warnings), Alternatives and Modifications (including trimester‑specific notes).

## Circuit Formatting Rules (Required)
- Name circuits like “Circuit A — three rounds”.
- Under each circuit, list exercises with their prescriptions and details.
- If a “Pick one” choice is intended, mark the block header “Pick one” and provide two to three options.

## Exercise Detail Fields (Required)
For every exercise listed under Main Work, include:
- Name and pattern/category.
- Prescription: sets × repetitions or time/distance; intensity target (Rate of Perceived Exertion), and rest.
- Equipment used + a body‑weight alternative.
- Purpose: 1–2 sentences on why it’s included (muscles, posture, balance, pelvic‑floor synergy, trimester relevance).
- How to do it: 4–6 concise steps (start position, setup, movement path, breathing, tempo, finish/return).
- Mistakes/Warnings: 4–6 common pitfalls and cautions (breath‑holding/Valsalva, poor alignment, excessive range, overheating, dizziness, pain flags).
- Coaching cues: 2–3 short bullets (in addition to the above, if useful).
- Modifications by trimester (first/second/third); note if not applicable.
- Three YouTube tutorial links per exercise (prefer prenatal‑appropriate, Thai when possible) listed in the Video Library section.
Applies to warm‑up, mobility, core, pelvic‑floor, and cardio items as well (adjust steps as appropriate).

## Presentation (Required)
- For each exercise, render a compact “spec table” first, then follow with descriptive text blocks. Do not mix parameters inline with prose.
- Spec table rows to include when applicable: จำนวน/เวลา, ความหนัก (Rate of Perceived Exertion), พัก, อุปกรณ์, ทางเลือก/การปรับ, วิดีโอ (link to Video Library anchor).
- Separate descriptive blocks: วัตถุประสงค์, การเตรียมท่า, การเคลื่อนไหว, การหายใจ, ข้อควรหลีกเลี่ยง.

## Cardio Block Details (Required)
- Mode (treadmill/bike/pool/walk) and structure (steady, intervals, tempo).
- Parameters: time/distance, Rate of Perceived Exertion, and rest (if intervals); include incline or cadence if relevant.
- Alternatives: provide a non‑impact option and an equipment‑free option when possible.
- Also include: Purpose (1–2 sentences), How (3–4 steps), and Mistakes/Warnings (3–5 items) for the chosen mode, plus three titled links in the Video Library as above.

## Professional & Friendly Style (Guideline)
- Tone: supportive and clear. Prefer friendly micro‑copy (“breathe easy; sip water”) over jargon.
- Typography: base 16px+, 1.5–1.65 line‑height, short paragraphs, bullets where helpful.
- Accessibility: keyboard/screen‑reader friendly structure; descriptive link text; adequate color contrast.
- Print‑friendly: avoid dark backgrounds; ensure text legibility and minimal ink.

## HTML Structure (Guideline)
- Use one section per week with clear, concise headings (for example, “สัปดาห์ที่ 10”).
- If needed, include gestational age and calendar date range as data attributes or a subtle meta line, not in the H2.
- Minimal example markup:
  - Week wrapper: <section class="week" data-week="N" data-gestational-age="18 weeks 0 days to 18 weeks 6 days">…</section>
  - Session block: <article class="session" data-session="1" data-focus="Strength">…</article>
  - Exercise item: <li class="exercise"><a href="YT_LINK" target="_blank" rel="noopener">Name</a> — sets × repetitions or time at Rate of Perceived Exertion N; key cues…</li>

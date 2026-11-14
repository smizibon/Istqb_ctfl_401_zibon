# CTFL-Guide
Give a Star if you want to send love to a brother . 
An **unofficial, community-built study guide** for the ISTQB Certified Tester Foundation Level (CTFL) v4.0.1 exam. Fully offline, zero-install, bilingual (English / বাংলা), and free to share under open licenses.

> Not affiliated with, endorsed by, or connected to ISTQB or any exam board. See [Disclaimer](#disclaimer--trademarks).
## Authors message 
I vibecoded this whole thing. Use it any way you wish.

One thing I'd like to say to you after sitting the CTFL exam myself:

1. Follow any tutorial series first. Don't try to memorize anything — just do it, start to finish.
2. Then read the syllabus.
3. Make your own notes from the syllabus.
4. DO all the maths (EP, BVA, State ,branch,statement , transition, threepoint ) these are 7 question that will come in the exam. 
5. Then use this project to take mock exams.
6. Review your mistakes. Take more mocks.
All of this took me about 15 hours 
— plan it however works for you.

Real-world testing practice and the exam differ a bit; CTFL teaches the best-case view, so the real-world timeboxing you face at work isn't quite the vibe you'll get while studying. What you gain instead is the optimum mindset.


---

## What this is


CTFL-Guide is a static website you can use entirely offline: six teaching chapters, worked K3 technique walkthroughs, randomised calculation drills, three original mock exams, a glossary recall drill, and a printable cheat sheet — all in one folder of HTML, CSS, and vanilla JavaScript. There is no server, no build step, no dependency, and no tracking; your progress stays in your own browser.

The guide was forked from one person's exam-prep site and generalised for anyone preparing for the CTFL v4.0 exam.

**The exam it prepares you for** (verify current details with your exam board — see disclaimer):

| Fact | Value |
|---|---|
| Questions | 40 multiple-choice |
| Time | 60 minutes |
| Pass mark | 26/40 (65%) |
| K1 (remember) | ~7–8 questions |
| K2 (understand) | ~21–23 questions |
| K3 (apply) | ~10–11 questions |

## Who it's for

- **First-time CTFL candidates** who want a structured path through the v4.0 syllabus, not just the official documents.
- **Self-studiers** without a paid course: the chapters teach, the quizzes give retrieval practice, the mocks give exam rehearsal.
- **Speakers of Bangla** studying for an English-language exam: every page has a Bangla layer while technical terms stay in English (see [The Bangla layer](#the-bangla-layer)).
- **Anyone short on time**: a cram track compresses the material into the final three days before the exam.

## Quick start (zero install)

1. Download or clone this repository.
2. Open `html/index.html` in any modern browser. That's it — everything works straight from `file://`, fully offline.

Optional local server (friendlier URLs, behaves like a real site):

- **macOS:** double-click `serve.command` — it starts a server at `http://localhost:8734` and opens your browser. `stop.command` stops it.
- **Any OS:** run `python3 -m http.server` from the `html/` folder, or use any static-file server.

## The study flow

The guide is sequenced so each stage feeds the next:

1. **Read a chapter** (`chapter-01..06.html`) — collapsible sections, memorise boxes, trap lists. Mark sections as read as you go.
2. **Take the chapter quiz** — instant feedback with per-question explanations, plus a target score per chapter.
3. **Work the K3 walkthroughs** (`math-walkthroughs.html`) — step-by-step, click-to-advance solutions for the technique questions (equivalence partitioning, boundary value analysis, decision tables, state transitions, white-box coverage), with visualisations that re-render at each step.
4. **Drill** (`drills.html`) — random-number generators give you a fresh BVA/EP problem every round, plus a coverage meter, a decision-table counter, and a state-machine stepper. The numbers change; the method sticks.
5. **Sit mock exams** (`mock-01..03.html`, or print from `mock-exams/`) — three original 40-question, 60-minute mocks in exam format, with answer keys. 40 questions / 60 minutes / pass 26/40, same as the real thing.
6. **Flash sweep** — glossary recall mode (definitions blurred until you click) and the final-day cheat sheet self-test, closed book, in the last days.

For the official ISTQB sample exams (which this project deliberately does not embed — see [Content provenance](#content-provenance)), use the [Official samples](html/official-samples.html) page, which links straight to them.

## Study tracks

The study hub (`html/index.html`) lets you **set your exam date** and picks a schedule from it:

| Track | Window | Shape |
|---|---|---|
| **Standard** | 4–6 weeks | One to two chapters per week, quizzes after each, mocks interleaved from week 3 |
| **Fast** | 7–10 days | Roughly a chapter a day, walkthroughs and drills alongside, mocks on consecutive days near the end |
| **Cram** | final 3 days | Highest marks-per-hour material first, hardest topic (Ch 4 K3) freshest before the exam, one mock as a dress rehearsal, flash sweep, stop the evening before |

All tracks end the same way: every gate green, a final glossary/cheat-sheet sweep, and a real rest before the exam.

## Site map

Everything lives in `html/` (site) plus three markdown folders (source/print material).

### The site (`html/`)

| Page | What it does |
|---|---|
| `index.html` | **Study hub** — set your exam date, pick a track, see your progress dashboard across all six chapters |
| `chapter-01.html` … `chapter-06.html` | The six **teaching chapters** (Fundamentals · Testing in the SDLC · Static Testing · Test Techniques · Test Management · Test Tools), each with collapsible sections, mark-as-read, and a graded chapter quiz |
| `math-walkthroughs.html` | **K3 technique walkthroughs** — worked solutions advancing one step per click, with per-step visualisations (number lines, decision-table highlights, state diagrams) |
| `drills.html` | **K3 drills** — randomised BVA/EP generator, statement/branch coverage meter, decision-table rule counter, state-machine stepper; fresh numbers every round |
| `mock-01.html` / `mock-02.html` / `mock-03.html` | **Three original mock exams** — 40 questions each, exam conditions, fully original questions (also in printable markdown, see below) |
| `official-samples.html` | **Links to the official ISTQB sample exams** — external links only; official material is not copied into this project |
| `glossary.html` | **Glossary** — 72 exam-critical terms + 7 formulas, searchable, with recall mode (blur-and-reveal), self-marking (known/missed), and a missed-only filter |
| `explainers.html` | **Explainers** — the *why* behind the definitions, so K2 scenario questions become recognisable |
| `advice.html` | **Exam advice digest** — practical exam-day tactics collected from people who took the exam |
| `final-day-cheatsheet.html` | **Printable cheat sheet** — the whole syllabus condensed for the final flash sweep; print-optimised |

### Markdown source and print material

| Folder | Contents |
|---|---|
| `mock-exams/` | The three original mocks as markdown (`mock-01..03.md`) with answer keys (`answer-keys/`) |
| `practice/` | Per-chapter exercise sets (`chapter-exercises/`) with worked answer explanations (`answer-explanations/`) |
| `syllabus/` | Chapter-by-chapter study notes mapping content to the CTFL v4.0 learning objectives |

### Engine scripts (`html/assets/`)

Vanilla JS, no dependencies: `menu.js` (navigation + theme toggle), `layout.js` (collapsible sections), `quiz.js` (graded quizzes), `progress.js` (progress persistence), `i18n.js` + `bangla.js` (bilingual layer), `walkthrough.js` + `walkthrough-data.js` (K3 walkthroughs), `drills.js` (drill widgets).

## Content provenance

Everything teachable in this guide is **original content**, written for this project:

- The chapter teaching text, explainers, advice digest, cheat sheet, and glossary.
- The Bangla translations.
- **All practice questions** — chapter quizzes, exercises, and the three mock exams are original questions written against the published CTFL v4.0 learning objectives. They are *not* official ISTQB questions and claim no official status.

**Official ISTQB sample questions are deliberately not embedded.** The official sample exams are copyrighted material distributed by ISTQB and its boards; this project's policy is to *link* to them, never to copy them. The [`official-samples.html`](html/official-samples.html) page points you to the official sources so you can practise with the real thing on the publisher's own terms. Where an ISTQB definition is quoted in the teaching text, it is a short factual quote of a published definition, attributed as such.

This separation keeps the project redistributable: everything in this repository is either ours to share (see [License](#license)) or a link.

## The Bangla layer

- The menubar has a **বাংলা toggle** that switches the whole site; each bilingual section also has its own **বাংলা/EN** button for per-section override.
- The layer is a study aid, not a translation of the exam: **technical terms stay in English** (e.g. equivalence partitioning, regression testing) because the exam is in English — the Bangla text explains around the English term.
- Glossary cards pair each English definition with a one-line Bangla gloss.

## How progress persists

Progress — sections marked read, quiz answers and scores, glossary self-marks, drill sessions, collapsed/expanded sections, theme, language choice — is stored in your browser's `localStorage` under versioned `ctflg-*` keys.

- **Per browser, per device**: no account, no sync, no server, nothing leaves your machine.
- Clearing the browser's site data for these pages resets all progress.
- Copying the repository folder does not carry progress with it.

## License

Dual-licensed (full text in [`LICENSE`](LICENSE)):

- **Content** — chapter text, Bangla translations, questions, glossary, docs — under **Creative Commons Attribution-ShareAlike 4.0** (CC BY-SA 4.0): share and adapt, even commercially, with attribution, under the same license.
- **Software** — the JavaScript engines in `html/assets/` and the serve/stop scripts — under the **MIT License**.

No ISTQB-owned material is included in or licensed by this project. "ISTQB" and "CTFL" are trademarks of their respective owners and are used here only to refer descriptively to the exam being studied for.

## Disclaimer & trademarks

CTFL-Guide is an **unofficial study aid created by the community**. It is not affiliated with, endorsed by, sponsored by, or connected to the International Software Testing Qualifications Board (ISTQB), any member board, or any certification body. **ISTQB**, **CTFL**, and the ISTQB logo are registered trademarks of their respective owners.

While the guide tracks the publicly published CTFL v4.0 syllabus, it is an independent secondary source and may contain errors. **Always verify exam details — question count, duration, pass mark, K-level mix, permitted materials, and registration rules — with your exam board**, as these can vary by board and change over time. Using this guide does not guarantee a pass.

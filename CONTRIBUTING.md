# Contributing to CTFL-Guide

Thanks for helping improve this unofficial CTFL v4.0 study guide. The project is small on purpose — a folder of static HTML, vanilla JS engines, and markdown — so contributions are easy to review if they follow a few rules. The rules below exist mostly to keep the project **legally clean and fully offline**; please read them before your first PR.

## Ways to contribute

| Kind | Examples |
|---|---|
| **Content fixes** | Typos, broken links, clearer wording, factual corrections against the CTFL v4.0 syllabus (cite the learning objective, e.g. FL-4.2.1) |
| **Engine bugs** | Anything in `html/assets/*.js`: quizzes, progress, drills, walkthroughs, the Bangla layer, the menu |
| **New original questions** | Extra chapter-quiz items, exercises, or a new mock — **they must be original** (see content rules) |
| **Bangla layer** | Better Bangla phrasing, new bilingual sections — technical terms stay in English |
| **UX / print / a11y** | Keyboard access, contrast, print layout of the cheat sheet and advice pages |

For anything non-trivial (new page, new engine, changing a study track), open an issue first so the approach can be agreed before you write code.

## Content rules — what keeps this project safe

These rules are non-negotiable; a PR that breaks them cannot be merged.

1. **Never paste official ISTQB questions.** All questions, options, and answer explanations you add must be written by you, from scratch. Do not copy an official sample-exam question, do not "lightly reword" one, and do not paste official answer-key explanations. If you want to practise with official questions, the correct move is to add or improve a link on `html/official-samples.html`, which points to ISTQB's own material.
2. **Verbatim ISTQB definitions: short factual quotes only.** Teaching text may quote a published ISTQB definition verbatim where the exact wording matters, kept short and attributed. Anything longer is a rewrite in your own words.
3. **No redistribution of official sample material.** No official question banks, no scraped sample exams, no PDFs of official documents in this repository. Link out; never embed.
4. **Provenance labels must stay accurate.** Every page's `<body>` carries `data-provenance="original"`. That label is a promise: everything on the page is original to this project or a short attributed factual quote. If you add content that is not original, do not add it — that's the signal to stop and reconsider.
5. **No invented exam facts.** Exam-format claims (40 questions / 60 minutes / 26 to pass, K-level mix) track the published CTFL v4.0 sample documents. If you change one, cite the official source in your PR.

## Dev loop

There is no build system, no package manager, and there must never be one:

1. **Open the site from `file://`.** Clone, open `html/index.html` in a browser, and work. (Optional: `serve.command` for a local server on port 8734, `stop.command` to stop it.) If your change needs a server to work, it is wrong for this project.
2. **Check every JS file you touch:** `node --check html/assets/<file>.js`. There is no bundler to catch your syntax errors.
3. **Keep the engines' contracts.** Each engine documents its contract in the file-header comment of `html/assets/*.js` — read it before editing. The load-bearing ones:
   - `i18n.js` loads **first** (before quiz/layout/progress); engines call `t(key, englishFallback)`.
   - `layout.js` loads **before** `progress.js`; a button inside `.sec-head` must never toggle the section.
   - `bangla.js` loads **last** (it wraps the section bodies the layout engine built).
   - `quiz.js` expects `<div class="q" data-a="b">` with `<button data-k="a">` children; multi-select uses sorted letters (`data-a="ae"`) with exact set match.
   - `progress.js` keys off `<body data-ch="chN">` plus `#chapter-progress`, and renders the hub dashboard into `#total-progress` when `data-ch` is absent.
   - `drills.js` touches **only** the versioned, try/catch-guarded `localStorage` key `ctflg-k3-drills` — no other keys.
   - `walkthrough.js` renders `window.WALKTHROUGHS` (from `walkthrough-data.js`); one step per click, no auto-play; without JS all steps must render visible.
4. **Test both languages and both themes.** Toggle বাংলা and dark mode before and after your change.

## PR checklist

Before you open the PR, confirm every item:

- [ ] Works when opened directly from `file://` — no new dependencies, no `fetch()`, no ES modules, no network calls.
- [ ] `node --check` passes on every JS file I touched.
- [ ] Engine contracts (load order, DOM hooks, storage keys — per the file-header comments) are preserved.
- [ ] **No hardcoded dates, exam weekdays, countdowns, or personal paths.** Schedules and countdowns must derive from the exam date the user sets in the hub, never from a fixed calendar.
- [ ] All new questions and explanations are **original** — no official ISTQB question text, options, or answer explanations, pasted or reworded.
- [ ] Any verbatim ISTQB definition is a short, attributed factual quote.
- [ ] `data-provenance` labels remain accurate for every page I touched.
- [ ] Bangla additions keep technical terms in English (the exam is in English; Bangla explains around the term).
- [ ] **Print CSS survives** — the cheat sheet, advice page, and walkthroughs still print cleanly (`@media print` rules intact; nothing I added prints as a broken mess).
- [ ] New `localStorage` use is versioned and wrapped in try/catch, like the existing engines (`ctflg-*` keys).
- [ ] No tracking, analytics, or external requests added anywhere.

## Reporting problems

Open an issue on this repository's tracker with the page, what you expected, and what happened. Screenshots of print problems help a lot.

**Copyright concerns:** if you believe ISTQB-owned (or any third party's) material has slipped into this project, open an issue marked `copyright` and it will be removed promptly. Keeping this repository redistributable depends on it.

## License note

By contributing, you agree that your contributions are licensed under the project's dual license (see [`LICENSE`](LICENSE)): content under CC BY-SA 4.0, software under the MIT License. Do not contribute material you do not have the right to license — in particular, not official ISTQB material.

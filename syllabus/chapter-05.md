# Chapter 5 — Managing the Test Activities
*Study days: 9–10 November · Priority: 🟡 Tier 2 · K-levels: K2 (5.5.2 is K3) · Reading time: ~2 hours*

> **What this chapter is:** how testing is planned, estimated, monitored, and controlled; risk-based testing; and defect management. Lots of definitional exam questions plus the one K3 skill at Foundation level: judging a defect report.

## Learning objectives covered

| LO | Topic | K |
|---|---|---|
| 5.1.1 | Test planning, test plan content, context-driven | K2 |
| 5.1.2 | Entry & exit criteria | K2 |
| 5.1.3 | Estimation (metrics-based, expert-based) | K2 |
| 5.1.4 | Test case prioritisation | K2 |
| 5.1.5 | Test pyramid | K2 |
| 5.1.6 | Test quadrants | K2 |
| 5.2.1 | Risk & risk assessment (likelihood × impact) | K2 |
| 5.2.2 | Risk-based test prioritisation | K2 |
| 5.2.3 | Product vs. project risk | K2 |
| 5.3.1 | Test monitoring & control, reporting per audience | K2 |
| 5.3.2 | Test completion criteria & report | K2 |
| 5.3.3 | Testing metrics | K2 |
| 5.4.1 | Configuration management of testware | K2 |
| 5.5.1 | Defect lifecycle | K2 |
| 5.5.2 | **Defect report content — evaluate a report (K3)** | **K3** |

---

## 5.1 Test planning

**(5.1.1) Purpose:** define *why, what, when, who, and how* testing is done, aligned with **stakeholders and the organisation's goals**. The test plan may be a standalone document or part of an agile release/sprint plan — planning is **continuous**: it adapts as the project and context change. Typical content: test strategy/approach, scope, entry/exit criteria, testware to maintain, estimates/schedule, risks with mitigation, and definition of the test environment.

**(5.1.2) Entry & exit criteria** — memorise: criteria are **defined to prevent starting/finishing too early**.
- **Entry criteria:** what must hold to *begin* test execution (e.g., environment ready, test data available, testable build, test cases ready). Failing entry criteria → wasted execution & false failures.
- **Exit criteria:** what must hold to *declare testing complete* (e.g., planned tests executed, coverage achieved, defect counts below threshold, no known critical open defects). Related term: **Definition of Done** in agile contexts.
- ⚠️ They should be **measurable** — vague criteria ("system is stable enough") are an exam-flagged anti-pattern.

**(5.1.3) Estimation:**
- **Metrics-based:** estimate from **measures of past projects** (e.g., tests/hour, defects/test, team velocity) — needs comparable historical data.
- **Expert-based:** estimate from the **experience of experts** (e.g., planning poker / wideband Delphi).
- Choose by data availability; combine them in practice. ⚠️ "Ask the senior tester how long it takes" = expert-based; "we ran 50 test cases/day last release, so…" = metrics-based.

**(5.1.4) Prioritisation:** order execution by risk, coverage goals, and constraints (see 4.1.2). If time runs out, the most valuable tests have already run.

**(5.1.5) Test pyramid 📖 memorise:** a model of **test suite layers: many small component (unit) automated tests at the base, fewer integration tests in the middle, few large end-to-end/system automated tests at the top**. Rationale: higher levels are slower, costlier, harder to maintain; you want *most* tests low in the pyramid. Deviating (too few unit tests, too many slow GUI tests) creates long feedback loops.

**(5.1.6) Test quadrants 📖 memorise:** tests classified on two axes — **business-facing vs. technology-facing**, **guide development (support the team) vs. critique the product**. This yields quadrants:
- **Q1** technology-facing, support team (component, component integration — often automated)
- **Q2** business-facing, support team (functional examples, ATDD/BDD-style tests)
- **Q3** business-facing, critique product (acceptance, exploratory, usability, UAT)
- **Q4** technology-facing, critique product (non-functional: performance, security, reliability)

## 5.2 Risk and risk-based testing

**(5.2.1) Definitions — memorise:**
- **Risk = likelihood of an event × impact of the event** (a factor that could lead to a negative outcome). Risk analysis determines risk level; **risk assessment** = identify and analyse risks and define mitigation.
- **Risk mitigation** lowers likelihood or impact (testing itself is a mitigation activity).

**(5.2.2) Risk-based testing:** prioritise testing **by risk**: test the riskiest items first, more intensely, with stronger techniques; track risk reduction (residual risk remains and must be communicated to stakeholders). Scenario questions: rank items by likelihood × impact, allocate the strongest technique to the top risk.

**(5.2.3) Product vs. project risk 📖 memorise the split:**
- **Product risk** — the possibility that the **work product** fails to satisfy users/business (poor quality: reliability, security, usability, correctness problems, poor data quality).
- **Project risk** — threats to the **project's success** itself: staffing/skills shortages, personal conflicts, integration/ supplier problems, bad estimates/deadlines, scope creep, tool issues, contract gaps.
- ⚠️ Trap: "the release might be late" = project risk; "customer data might leak" = product risk. Test planning addresses both.

## 5.3 Test monitoring, control, and completion

**(5.3.1)** **Monitoring** = gathering data & comparing progress against the plan; **control** = taking corrective actions (re-prioritise, adjust schedule, add automation). Reports must fit the **audience**: management wants short summary dashboards (cost, schedule, quality, risk); the test team wants execution detail.

**(5.3.3) Common metrics (memorise a few with their purpose):** test progress (planned vs. executed tests, pass rate), **defect find/fix trends** (defect density = defects per unit size; defect discovery/fix rates), coverage of requirements/code, remaining risk, test execution time, confidence levels. Metrics answer: *are we on track, is quality good enough, when can we stop?*

**(5.3.2) Test completion:** performed at project milestones (release, end of iteration, completion of a test level). The **test completion report** summarises: test results vs. plan, exit criteria status, testing obstacles, lessons learned, remaining residual risk, and reusable testware.

## 5.4 Configuration management (5.4.1)

**Testware** (test plans, cases, procedures, data, automation) must be **version-controlled, traceable, and change-managed** so that: the right versions of testware match the right versions of the product; results can be reproduced; nothing is lost; everyone knows what is current. When a scenario shows "tests run against the wrong build" or "nobody could find the latest test cases" → CM failure.

## 5.5 Defect management

**(5.5.1) Lifecycle — memorise the flow:**

```
New/Found → (triage: confirm?) → Assigned/Fixing → Fixed → (confirmation test)
   → passes → Closed
   → fails → Reopened (loop)
Also: Rejected / Duplicate / Deferred (won't fix now) / Cancelled
```

Each state change is tracked with **who, when, what changed**; reports are archived for later analysis (defect trends, clustering).

**(5.5.2) Defect report content — the K3 skill: evaluate a given report.** 📖 Memorise what a good report contains:

- **Unique ID**
- **Title/summary** (concise, specific, searchable)
- **Date & reporter identity**
- **Test environment / system version/build under test**
- **Steps to reproduce** (ordered, precise)
- **Expected vs. actual result**
- **Severity** (impact on the system) — and priority/urgency if the organisation uses it
- Evidence (logs, screenshots), references (test case, requirement)
- Status, comments

⚠️ Severity vs. priority (classic): **severity = technical impact** ("crashes when saving"), **priority = business urgency of fixing** ("must fix before Friday's demo"). They can diverge (tiny typo on the homepage: low severity, high priority).

**K3 question pattern:** "Which defect report is best?" or "What should be *added*?" — look for: reproducible steps, expected *and* actual results, build identification; penalise reports with blame ("developer X broke it"), vague steps ("it crashes sometimes"), one report bundling several defects, or missing expected result.

## Confusion table

| Confused | Distinction |
|---|---|
| Entry / exit criteria | Preconditions to start / conditions to stop |
| Metrics-based / expert-based estimation | Past data / judgement |
| Product / project risk | Quality of the deliverable / success of the project |
| Severity / priority | Technical impact / business urgency |
| Monitoring / control | Observe & compare / act & correct |
| Test pyramid / test quadrants | Layering of automation depth / classification by audience & purpose |

## ⚠️ Top exam traps
1. "Exit criteria = tests all executed" alone — exit criteria usually also include quality thresholds (open defects, coverage).
2. Product/project risk mix-ups in scenario wording (watch for "the product could…" vs "the project could…").
3. Test quadrants: putting performance testing in a business-facing quadrant (it's Q4 technology-facing).
4. Defect lifecycle order questions — confirmation test **precedes** closing a defect.
5. Estimation technique identification — "based on historical measures" is the giveaway for metrics-based.
6. Priority/severity inversion scenarios.

## 📖 Memorise / 🧠 Understand summary
- **Memorise:** entry/exit criteria purpose, both estimation techniques, test pyramid layers, the four quadrants, risk formula and product/project split, the defect report field list, severity vs. priority.
- **Understand & apply:** ranking risks and allocating test effort; choosing report content per audience; evaluating a defect report (K3); reading monitoring/control scenarios.

## Knowledge check (10 questions)
1. Give two measurable exit criteria for a system test level.
2. Team uses planning poker to size testing work. Which estimation technique?
3. Rank by risk: A = likelihood 2, impact 5; B = likelihood 4, impact 3. Which is tested first?
4. "The vendor delivering the test tool may go bankrupt." Product or project risk?
5. Name the four test quadrants with one example test each.
6. What does 100% branch coverage as an exit criterion guarantee — and what not?
7. A defect report reads: "Payment broken again, Sam's fault. Please fix." List three concrete defects in this report.
8. Which state follows "Fixed" in the lifecycle, and what decides the next one?
9. Why does the test pyramid want more component tests than end-to-end tests?
10. Name two metrics for management reporting and two for the test team.

*(Answers in `practice/answer-explanations/chapter-05-answers.md` — Phase 3.)*

## One-paragraph revision summary
Test planning defines why/what/when/who/how with measurable entry and exit criteria, estimated by past metrics or expert judgement, and prioritises execution by risk. The test pyramid guides automation depth (broad unit base, narrow end-to-end top) while test quadrants classify tests by audience and purpose. Risk is likelihood times impact; product risk threatens quality, project risk threatens delivery, and risk-based testing attacks the highest risks first and reports residual risk. Monitoring compares progress to plan, control corrects it, metrics inform each audience, and completion reports close a level or release. Configuration management keeps testware versioned and traceable, and every defect follows a tracked lifecycle from discovery through confirmation to closure — with reports complete enough (steps, expected vs. actual, environment, severity) for anyone to reproduce and evaluate.

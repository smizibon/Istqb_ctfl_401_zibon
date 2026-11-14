# Chapter 2 — Testing Throughout the Software Development Lifecycle
*Study day: 5 November · Priority: 🟡 Tier 2 · K-levels: K2 · Reading time: ~1.5 hours*

> **What this chapter is:** where testing sits in the development lifecycle, the four test levels, the four test types, confirmation vs. regression testing, and maintenance testing. Heavily scenario-based in the exam.

## Learning objectives covered

| LO | Topic | K |
|---|---|---|
| 2.1.1 | Impact of SDLC on test process & activities | K2 |
| 2.1.2 | DevOps benefits & challenges for testing | K2 |
| 2.1.3 | Shift-left | K2 |
| 2.1.4 | Retrospectives & process improvement | K2 |
| 2.2.1 | Four test levels | K2 |
| 2.2.2 | Four test types | K2 |
| 2.2.3 | Confirmation & regression testing | K2 |
| 2.2.4 | Test suites in regression automation | K2 |
| 2.3.1 | Maintenance testing & triggers | K2 |

---

## 2.1 How the SDLC shapes testing

**Core idea (2.1.1):** every SDLC model — sequential (waterfall, V-model), iterative/incremental (spiral, RUP), or **agile** (Scrum, Kanban, XP) — changes *when* and *how* you test:

- **Sequential:** test levels follow phases; detailed test preparation can start early from documentation; test execution happens late.
- **Iterative/agile:** regression testing grows in importance each iteration (the system keeps changing); **lightweight, communicate-often** test documentation; development and testing run concurrently in the same iteration; **continuous feedback**.
- In every model the **test process activities (Ch. 1) still happen** — only their timing, formality, and frequency change.

### DevOps (2.1.2)
DevOps = development + operations collaborating, with **automation of the deployment pipeline**. For testing:
- **Benefits:** fast feedback on quality and usability (continuous integration → automated builds and tests on every commit), shorter time-to-market, defects found and fixed quickly, automated regression suites make frequent releases safe.
- **Challenges / risks:** the pipeline itself must be **maintained and automated** (test automation is an ongoing investment, not a one-off), team needs **new skills**, and if the feedback loop isn't managed, teams drown in automated failures.

### Shift-left (2.1.3)
Move test activities **earlier** in the lifecycle. But it's more than "start testing sooner" — ⚠️ exam trap: shift-left means (a) testing work products **earlier** (reviews, static analysis, early test design) and (b) testers **involved from the start** in requirements/user stories, improving testability and **preventing defects**. Both halves are the correct meaning.

### Retrospectives & process improvement (2.1.4)
After each iteration/release, the team reflects: what went well, what to improve — including **test process improvement** (e.g., better automation, improved defect prevention, revised estimation). Lessons feed the next cycle. Exam scenario: "team meets after sprint to improve testing" → retrospective.

## 2.2 Test levels and test types — the chapter's core

### 📖 Memorise — the four test levels (2.2.1)

| Level | Scope / test basis | Typical who & notes |
|---|---|---|
| **Component (unit) testing** | Single components in isolation; code, design, spec of the component | Developers, often with mock objects/stubs to isolate |
| **Component integration testing** | **Interactions & interfaces between components**; architecture/design docs | Developers primarily |
| **System testing** | **Whole system's behaviour & capabilities**, end-to-end; system requirements/spec, use cases, risk analysis | **Independent test team** in many organisations; covers functional + non-functional; explores behaviour of the complete system, also things no single requirement describes |
| **Acceptance testing** | **Validation** — does it meet user needs/business goals? Often the **entry criterion for release** | Users/customers, ops, support; forms: **user acceptance, operational, contractual/regulatory, alpha (at developer's site) and beta (at user's site)** |

⚠️ Classic exam item: a scenario describing "verifying interaction between modules" = component *integration* level; "checking the system as delivered meets business needs with real users" = acceptance.

### 📖 Memorise — the four test types (2.2.2)

| Type | Target | Examples |
|---|---|---|
| **Functional testing** | *What* the system does — functions the system performs | Search, payment, interest calculation; can be done at **all levels** (e.g., component tests of a function's behaviour) |
| **Non-functional testing** | *How well* it behaves — quality characteristics | Performance, usability, security, reliability; also possible at all levels |
| **Black-box testing** | System behaviour **from outside**, based on specifications — no knowledge of internals | Spec-based test derivation |
| **White-box testing** | Internal **structure** of the system/code drives the tests | Statement/branch coverage of code |

Key ideas: **a test type can be applied at every test level** (functional and non-functional testing exist at component level too — this surprises people); black-box vs. white-box is about *the basis of test derivation* (spec vs. structure), not about "who runs it".

### Confirmation vs. regression testing (2.2.3) — near-guaranteed exam question

| | **Confirmation testing (re-testing)** | **Regression testing** |
|---|---|---|
| Purpose | Verify that a **specific defect** is really fixed | Verify that a **change** broke nothing else |
| Runs on | The fixed defect's test (plus anything needed to re-run it) | Affected areas + previously working areas at risk |
| When | After the fix is delivered | After **any** change: fixes, new features, environment/ configuration changes |

Rules the exam tests: regression testing happens at **all test levels** and in **all SDLCs**; when there are many changes, regression can be run on *affected* areas rather than everything; confirmation passes → the same fix may still **cause regressions elsewhere**, so both tests coexist.

### Test suites in regression automation (2.2.4)
When regression suites become huge, teams run:
- a **full/complete regression suite** before major releases,
- and **smaller, selection-based suites** for everyday changes — e.g., a **smoke test suite** ("does the build work at all?" — the most important functions, run on every new build) and targeted suites per affected area. ⚠️ Trap: a smoke suite does *not* replace regression testing; it just gates further work on a build.

## 2.3 Maintenance testing (2.3.1)

Once deployed, systems change — and each change triggers maintenance testing, driven by **impact analysis** of *what* changed and *what the change could affect*. 📖 Memorise the **triggers**:

1. **Modification** — planned enhancements, corrective fixes, emergency hotfixes.
2. **Migration** — moving to another platform/OS/DB/server, including data migration; often needs **conversion testing of data** and regression on the new environment.
3. **Retirement** — shutting down; testing may include data **archiving/migration** and, when replacing a system, testing the new environment and old-data handling.

Also: maintenance releases may require regression tests at **all levels**, and scope is influenced by **risk of the change** — analysis of both the change and its ripple effects decides how much regression runs.

## Confusion table

| Easily confused | The distinction |
|---|---|
| Component integration / system testing | Interfaces between components / behaviour of the whole system |
| System / acceptance testing | Built right (meets spec) / built the right thing (meets needs) |
| Alpha / beta | At developer's site / at users' sites |
| Functional / non-functional | What it does / how well it does it |
| Confirmation / regression | The fix works / nothing else broke |
| Smoke suite / regression suite | Build-worth-testing gate / change-impact verification |

## ⚠️ Top exam traps
1. "Non-functional testing happens only at system level" → false; all types at all levels.
2. "Regression testing only after defect fixes" → false; after *any* change (features, migrations, config).
3. Shift-left described only as "starting test execution earlier" → incomplete; it's early *work-product testing* + early tester involvement.
4. Migration scenario asking for "regression testing" only → also needs data **conversion** testing.
5. White-box testing described as "done by developers, black-box by testers" → the real distinction is spec-based vs. structure-based derivation.
6. Beta testing placed "at the developer's site" → swapped with alpha.

## 📖 Memorise / 🧠 Understand summary
- **Memorise:** 4 levels (+ acceptance forms incl. alpha/beta), 4 types, confirmation vs. regression definitions, smoke suite role, 3 maintenance triggers, DevOps benefit/challenge pairs.
- **Understand & apply:** mapping scenarios to levels and types; why regression grows in agile; what impact analysis decides in maintenance; the full meaning of shift-left.

## Knowledge check (8 questions)
1. A test exercises the interface between the payment module and the shopping cart. Level, and why?
2. Name the four test types and state which two can be applied at component level.
3. A defect is fixed; you re-run its failing test and it passes. What have you done, and what is still missing?
4. The company moves the application from on-premise to a cloud provider. Which maintenance trigger, and what two kinds of testing are involved?
5. What is a smoke suite and what is it not?
6. Give two DevOps benefits and one challenge for testing.
7. Define shift-left with both of its components.
8. UAT performed at the customer's own offices by their staff: which testing form is this?

*(Answers in `practice/answer-explanations/chapter-02-answers.md` — Phase 3.)*

## One-paragraph revision summary
The SDLC model determines the timing, formality, and automation of test activities; DevOps and shift-left push testing earlier and make feedback continuous, while retrospectives improve the test process cycle by cycle. The four levels — component, component integration, system, acceptance — test progressively larger scopes from code units to business validation. The four types — functional, non-functional, black-box, white-box — apply at every level. Every change triggers confirmation testing of the change itself and regression testing of everything at risk, with automated suites (smoke + full regression) keeping frequent releases feasible. After release, modification, migration, and retirement trigger maintenance testing scoped by impact analysis.

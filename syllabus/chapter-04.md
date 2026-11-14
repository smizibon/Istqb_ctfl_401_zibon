# Chapter 4 — Test Analysis and Design (Test Techniques)
*Study days: 6–8 November · Priority: 🔴 Tier 1 — the make-or-break chapter · K-levels: K2–K3 · Reading time: ~2.5 hours across 3 days*

> **What this chapter is:** how to derive actual test cases. The K3 techniques (equivalence partitioning, boundary value analysis, decision tables, state transition, statement/branch coverage) require you to **calculate answers by hand** — they cannot be guessed. Days 6–8 of the plan give this chapter the most practice time for a reason.

## Learning objectives covered

| LO | Topic | K |
|---|---|---|
| 4.1.1 | Test analysis / design / implementation, activity breakdown | K2 |
| 4.1.2 | Test design prioritisation | K2 |
| 4.1.3 | Test condition, test case, test procedure, test data, expected result | K2 |
| 4.1.4 | Traceability | K2 |
| 4.2.1 | Equivalence partitioning (EP) | **K3** |
| 4.2.2 | Boundary value analysis (BVA) | **K3** |
| 4.2.3 | Decision tables | **K3** |
| 4.2.4 | State transition testing | **K3** |
| 4.3.1–4.3.2 | Statement & branch coverage | **K3** |
| 4.3.3 | Value of the white-box approach | K2 |
| 4.4.1–4.4.3 | Error guessing, checklist-based, exploratory | K2 |
| 4.5.1–4.5.2 | Collaboration-based: acceptance criteria, examples, BDD, ATDD | K2 |

---

## 4.1 The test design process

A **test technique** is a procedure to derive and select test cases — it makes testing reproducible, measurable, and reviewable rather than ad-hoc. (Black-box = from the specification/usage; white-box = from internal structure; experience-based = from skill/intuition.)

**Activity breakdown (4.1.1) — continuing Ch. 1:**
- **Test analysis:** identify **test conditions** from the test basis (requirements, user stories, code for white-box). Question answered: *what* to test.
- **Test design:** turn conditions into concrete **test cases**: inputs, expected results, and the coverage items each case covers. Question: *how* to test.
- **Test implementation:** build test procedures/suites, arrange environments & data, confirm testability of the item.
- During execution, **actual results are compared with expected results**, and test completion criteria (often expressed as coverage) show when to stop.

**Prioritisation (4.1.2):** test cases are prioritised by **risk** (likelihood & impact of failure), **coverage goals**, and **project constraints** (time, budget). Highest priority cases run first, and in regression only high-priority subsets may run.

**Vocabulary (4.1.3) — memorise exactly:**
- **Test case** = set of **preconditions, inputs (incl. data), actions, expected results and postconditions**. It is an *instance* of testing one thing; it may be concrete (exact values) or logical/abstract (described generally).
- **Test procedure** = ordered sequence of test cases (script) for execution.
- **Traceability (4.1.4):** conditions ↔ basis ↔ cases ↔ results — enables coverage measurement, change-impact analysis, auditing, and reporting (see Ch. 1).

## 4.2 Black-box techniques (K3 — calculate!)

### 4.2.1 Equivalence Partitioning (EP)

**Idea:** divide inputs (or outputs, or internal values) into groups (**partitions**) where all members should be handled identically — then **one representative per partition** is enough to test that behaviour. Why: exhaustive testing is impossible (principle 2); EP is the systematic escape.

- **Valid partitions** — values the system should accept/process normally.
- **Invalid partitions** — values the system should reject/handle as errors. ⚠️ **Each invalid partition gets its own test case** (one invalid value per test, so the right error can be verified).

**Worked example.** Rule: *"A hotel loyalty discount applies to guests aged 18–60; under-18 and over-60 get no discount but different messages."*
- Valid partitions: P1 = 18–60 (discount), P2 = under 18 (no-discount message A), P3 = over 60 (no-discount message B).
- Wait — check the wording: if under-18 and over-60 get *different* behaviour, they are **two separate valid partitions**; if the spec treated them identically, they'd be one.
- **Invalid** partitions (if age input must be a plausible human age 0–120): P4 = below 0, P5 = above 120, P6 = non-numeric.
- Minimum tests: one from each partition → e.g., 25 (P1), 10 (P2), 70 (P3), −5 (P4), 200 (P5), "abc" (P6).

**Exam task pattern:** given a rule, "how many test cases minimum?" → count partitions (invalids individually) — or "which value tests an invalid partition?" → pick the one outside valid ranges.

### 4.2.2 Boundary Value Analysis (BVA)

**Idea:** defects cluster at partition **edges** (defect clustering in miniature — off-by-one errors). BVA tests values **on and around the boundary**.

- **2-value method (ISTQB default):** for each boundary *b*: test **b and its nearest neighbour** (b−1 or b+1, the neighbour inside the adjacent partition). For range 18–60: **18, 17, 60, 61**.
- **3-value method:** test **b−1, b, b+1** for each boundary. Range 18–60: **17, 18, 19 and 59, 60, 61**.
- BVA can apply to **inputs and outputs**; boundaries can also come from data ranges, screen positions, array sizes, etc.

⚠️ **Traps:** BVA tests *values*, not just the two boundary numbers — the neighbour values are what make it BVA; and don't mix conventions: if the question says "3-value BVA", each boundary contributes 3 tests.

### 4.2.3 Decision tables

**Idea:** for business rules combining **conditions** (inputs/flags), list every combination and the resulting **action** — one column per combination = a **rule**; each rule = at least one test.

**Worked example.** Discount rule: *"If a customer is a gold member AND order > 100€ → 20% discount. Gold member and ≤100€ → 5%. Non-gold and >100€ → 10%. Non-gold and ≤100€ → no discount."*

| Conditions \ Rules | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| Gold member | T | T | F | F |
| Order > 100€ | T | F | T | F |
| **Action: discount** | 20% | 5% | 10% | none |

→ 4 rules → **4 test cases minimum**.

- **Collapsed tables:** when a condition doesn't affect the action, merge rules using "don't care" (−). E.g., if gold members always got 20% regardless of amount, rules R1/R2 merge: Gold=T, Order=−, → 20%. Collapsing reduces test count — the exam may ask how many tests after collapsing.
- Number of full rules = product of condition values (2 conditions binary → 4; 3 binary → 8; conditions with 3 values multiply accordingly: e.g., 2×2×3 = 12).

### 4.2.4 State transition testing

**Idea:** systems whose behaviour depends on **current state + event**. Elements (memorise): **state** (condition the system is in), **transition** (change of state caused by an **event**, possibly with an **action** — action ≠ transition).

**Worked mini-example** — ATM PIN:
States: `Awaiting card → (card inserted) → Awaiting PIN → (wrong PIN, attempts<3) → Awaiting PIN → (wrong PIN, 3rd attempt) → Card retained → (card removed) → Awaiting card`.

- **Valid transitions:** all transitions shown in the diagram → 0-switch style coverage: test each **valid transition** once (4 tests in the mini-example: card inserted, wrong PIN, 3rd wrong PIN, card removed).
- **Invalid transitions:** (event, state) pairs **not** in the diagram (e.g., *card removed* while `Awaiting PIN`) → each invalid transition is also a test — a system should reject it (and ideally not change state).
- **N-switch coverage** (concept only at FL): 0-switch covers every single valid transition; 1-switch covers every *pair* of consecutive transitions; higher N → more thorough, more tests.

⚠️ **Traps:** "test all valid transitions" ≠ "test all states" (a state may have several in/out transitions; count transitions, not states); invalid-transition tests are in scope and often forgotten by candidates.

## 4.3 White-box techniques (K3)

Based on the code's / design's **internal structure**.

### Statement & branch coverage (4.3.1–4.3.2)

- **Statement coverage:** % of executable statements executed by the tests. Minimum 100% statement coverage ⇒ every line runs at least once.
- **Branch coverage:** % of **decision outcomes** exercised (each `if` has True and False exits; each `case` and `default` in a switch is a branch; loops: enter/skip). Minimum 100% branch coverage ⇒ every possible outcome of every decision taken.

**The exam-critical relationship: 100% branch coverage *guarantees* 100% statement coverage — never the reverse.** (A test set that runs every statement can still always take the same branch outcome.)

**Worked example.**
```
1  if (x > 0):          # decision D
2      print("positive")
3  print("done")
```
Statements: 1, 2, 3 (three). Branches: D-T and D-F (two). Test x=5 covers statements 1,2,3 = **100% statement, 50% branch** (D-F never taken). Adding x=−1 → 100% branch. This one example answers most coverage questions.

Coverage **measure** (K3 exam style): "tests execute 8 of 10 statements" → 80% statement coverage. To raise branch coverage, add a test that exercises the **untaken decision outcome**.

**Value & limits (4.3.3):** white-box coverage **measures** how much structure was tested, achieving higher coverage systematically — but **it cannot detect missing functionality**: code that was never written produces 0% extra statements to cover. ⚠️ Guaranteed exam trap: "100% branch coverage means the system meets all requirements" → false.

## 4.4 Experience-based techniques (K2)

| Technique | Essence | Best when |
|---|---|---|
| **Error guessing (4.4.1)** | Anticipate likely defects from experience and target them (division by zero, empty lists, nulls, special characters, date boundaries) — a **defect-based** technique | Experienced tester, cheap to apply anywhere |
| **Checklist-based (4.4.2)** | Test against a **checklist** built from experience/standards; items may become conditions; checklist quality decides effectiveness; items should evolve | Organisational memory, repeatable coverage |
| **Exploratory testing (4.4.3)** | **Concurrent** learning, test design, execution; **charter-based** (goal) and **session-based** (timeboxed sessions with reports); most useful when specs are poor or time is short | Agile, early product, finding what scripted tests miss |

⚠️ Traps: "exploratory = random/unstructured" → false (charters, sessions, discipline). Error guessing is not a checklist technique — no list, pure anticipation.

## 4.5 Collaboration-based test approaches (K2 — new in v4.0)

- **Acceptance criteria-based testing (4.5.1):** derive tests from **user-story acceptance criteria** (the story's validation conditions); good criteria make stories testable ("Given/When/Then" style conditions help).
- **Examples & BDD / ATDD (4.5.2):**
  - **Acceptance test-driven development (ATDD):** tests are derived from acceptance criteria *before* coding — the "test-first" loop with developers, testers, and business together.
  - **Behaviour-driven development (BDD):** collaboration where **examples with business value** are written in a **domain-specific, structured language (Given/When/Then — Gherkin)**, usable as **living documentation** and automation. Exam scenario mentioning "Given/When/Then" → BDD.

## Choosing a technique (K2-style judgement)
Use **specification-based (black-box)** for functional coverage of requirements; add **white-box** to measure/raise structural coverage; add **experience-based** where time or specs are limited or risk intuition matters. In practice techniques are **combined**.

## Confusion table

| Confused | Distinction |
|---|---|
| Test condition / test case | What to test / concrete inputs+expected result |
| 2-value / 3-value BVA | {b, neighbour} / {b−1, b, b+1} |
| Rule / decision table column | One full combination of conditions = one rule = ≥1 test |
| Transition / action | Change of state / output performed (may occur without transition) |
| Statement / branch coverage | Lines executed / decision outcomes exercised (branch ⊃ statement) |
| Error guessing / checklist | Pure anticipation / itemised, reusable list |
| ATDD / BDD | Test-first from acceptance criteria / Given-When-Then examples as living documentation |

## ⚠️ Top exam traps
1. EP: forgetting **invalid partitions** or bundling several invalid values into one test case.
2. BVA: giving only the boundary values (18, 60) without neighbours.
3. Decision tables: counting rules as tests *before* checking for collapsible (don't-care) columns — or collapsing when behaviours differ.
4. State transition: counting **states** instead of **transitions**; ignoring invalid transitions.
5. Coverage: "100% statement ⇒ 100% branch" (wrong direction) and any "coverage proves correctness" option.
6. Exploratory testing described as unstructured/random.

## 📖 Memorise / 🧠 Understand summary
- **Memorise:** the technique definitions, 2-value vs 3-value BVA conventions, rule/collapse logic, state-transition vocabulary, the branch⊇statement theorem, BDD's Given/When/Then.
- **Understand & apply (K3!):** derive partitions & minimum test counts; pick BVA sets; build/collapse decision tables; enumerate valid+invalid transitions; compute coverage % and identify the test that raises it. **These are hand-calculation skills — drill the exercises, don't just read.**

## Knowledge check (10 questions — drill, on paper)
1. Field accepts 1–1000 items per order. List partitions and the 2-value BVA set.
2. Rule: "Student discount if age < 26 AND enrolled full-time" (2 boolean conditions, 4 rules, actions differ in every rule). How many minimum tests? Now: if non-students always pay full price regardless of enrolment, how many after collapsing?
3. From the ATM example above: list every valid transition and two invalid transitions.
4. Code: `if a: x(); if b: y();` — how many branches? Which single test reaches 100% statement coverage but which coverage stays at 50%?
5. A requirements review finds no rule for orders of exactly 0 items. Which technique would have exposed this gap, and why can't white-box coverage do it?
6. Write a Gherkin-style test from: "As a user, I want to reset my password so I regain access."
7. Why does each invalid partition need its own test case?
8. Tests exercise 12 of 15 branch outcomes. Compute coverage and name the cheapest fix.
9. When would you choose exploratory over decision tables? Give two situations.
10. Distinguish an action from a transition with a one-line example.

*(Answers & worked solutions in `practice/answer-explanations/chapter-04-answers.md` — Phase 3.)*

## One-paragraph revision summary
Test analysis identifies test conditions, design turns them into test cases with inputs and expected results, implementation makes them runnable, and traceability ties it all to the basis. Black-box techniques derive tests from specifications: equivalence partitioning groups inputs to minimise tests (invalids individually), BVA attacks boundaries (2-value: boundary + neighbour; 3-value: ±1 around), decision tables expand condition combinations into rules (collapsible with don't-cares), and state transition testing covers valid and invalid transitions between states. White-box testing measures structural coverage, where 100% branch always implies 100% statement, but no coverage detects absent functionality. Experience-based techniques (error guessing, checklists, exploratory/charters) and collaboration-based approaches (acceptance criteria, ATDD, BDD's Given/When/Then) complete the toolbox, chosen by specification quality, risk, and time.

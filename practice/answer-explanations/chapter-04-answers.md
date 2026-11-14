# Chapter 4 — Answers & Worked Solutions

## Part A — technique tasks

**A1.** Valid: [1–100]. Invalid: [<1], [>100], non-numeric (if allowed by the field). 2-value BVA: **0, 1, 100, 101**.
**A2.** 3-value BVA: **0, 1, 2 and 99, 100, 101** (six tests).
**A3.** Valid partitions: low [0–20,000], medium (20,000–60,000], high (60,000–1,000,000] → 3. Invalid: ≤0, >1,000,000, non-numeric → 3. **Minimum 6 tests.**
**A4.**

| | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| New customer | T | T | F | F |
| Electric | T | F | T | F |
| Discount | 15% | 5% | 10% | 0% |

**4 rules → 4 minimum tests.**
**A5.** R3 and R4 collapse (existing customer, car type = don't-care, → 10%). New minimum: **3 tests**.
**A6.** Valid transitions: Play: Idle→Playing; Play: Paused→Playing; Pause: Playing→Paused; Stop: Playing→Idle; Stop: Paused→Idle. **5 valid transitions.**
**A7.** Examples: Stop in Idle; Play in Playing; Pause in Idle/Paused (any three pairs not in the diagram).
**A8.** Statements: read, if-check, print("high"), print("end") — Test 1 (x=15) executes all four → **100% statement**. Branches: x>10 T and F — only T taken → **50% branch**. Add **x = 5** → 100% branch.
**A9.** Statement: 36/40 = **90%**. Branch: 20/24 = **83.3%**.
**A10.** 2×2×2 = **8 rules**; 4 of 8 covered = **50%**.
**A11.** The alert behaviour splits the valid range into two valid partitions: [−50…40] no alert, (40…50] alert. Invalid partitions: <−50, >50, non-numeric. 3-value BVA at the 40 boundary: **39, 40, 41** — with "above 40" read literally, 39 and 40 produce no alert and 41 triggers it. (Exam habit: always re-read the comparison word — "above" vs. "at or above" changes which side of the boundary belongs to which behaviour.)
**A12.** Three single transitions = partial **0-switch** coverage (each covered transition individually). Uncovered valid transitions: Play: Paused→Playing and Stop: Playing→Idle.

## Part B — concepts

| Q | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ans | d | b | c | a | d | b | c | b | a | b | a | d |

**B1. d** — Analysis → conditions; design → cases.
**B2. b** — Risk, coverage, constraints (LO 4.1.2).
**B3. c** — Traceability informs; it executes nothing.
**B4. a** — BVA attacks the edges where off-by-one defects cluster.
**B5. d** — Each invalid input must reveal its own correct rejection behaviour.
**B6. b** — Action = output/behaviour; transition = state change.
**B7. c** — Branch ⊃ statement. Every branch outcome taken means every statement ran.
**B8. b** — You can't cover code that doesn't exist; the classic white-box limitation.
**B9. a** — Experience-driven anticipation = error guessing.
**B10. b** — A reusable list = checklist-based testing.
**B11. a** — Charters + timeboxed sessions = session-based exploratory testing.
**B12. d** — Given/When/Then examples as living documentation = BDD. (ATDD is the broader test-first approach from acceptance criteria.)

---
### Knowledge-check answers (from chapter-04.md)
1. Valid [1–1000]; invalid [≤0], [>1000], non-numeric. 2-value BVA: 0, 1, 1000, 1001.
2. 4 rules → 4 tests; after collapsing (non-students → full price regardless of enrolment): 3 tests.
3. Valid: card inserted; wrong PIN (attempts<3); 3rd wrong PIN; card removed. Invalid e.g.: card removed while Awaiting PIN; PIN entered while Awaiting card.
4. 4 branches (two decisions × 2 outcomes). Tests a=T,b=T → 100% statement; branch coverage 50%.
5. Black-box techniques (spec-driven) expose missing rules; white-box coverage can't detect absent functionality.
6. Given a registered email, When I request a password reset, Then I receive a reset link.
7. To verify each invalid input's specific handling/error.
8. 12/15 = 80%. Add a test exercising the 3 untaken decision outcomes.
9. Poor/absent specs; time-boxed exploration of a new build; after scripted tests to hunt the unexpected.
10. Transition: Paused→Playing on Play (state changes). Action: error beep on invalid PIN (no state change).

## Part C — K3 as the exam asks it (MCQ)

| Q | C1 | C2 | C3 | C4 | C5 | C6 |
|---|---|---|---|---|---|---|
| Ans | c | a | d | b | a | c |

**C1. c** — 2-value BVA on 1–100: {1, 0} and {100, 101} → 4 tests (2 = boundaries-only trap; 6 = 3-value confusion; 8 = double-count).
**C2. a** — 3-value BVA: each boundary contributes {b−1, b, b+1} → {0, 1, 2, 99, 100, 101} (b = 2-value set; c = boundaries only; d = missing outer neighbours).
**C3. d** — 3 valid partitions + 3 invalid (<0, >120, non-numeric), invalids counted individually → 6 tests.
**C4. b** — Only order=80 exercises the untaken False outcome of `order > 100`; 200/300 re-take True.
**C5. a** — Fields tested independently: EP test cases = SUM of partitions (3 + 2 = 5); product (6) only if a full combination table is required.
**C6. c** — Output-based EP: one representative income per output class (low/medium/high) → 3 tests.

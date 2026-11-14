# Chapter 1 — Answers & Explanations
*Score yourself, then read every explanation — including for questions you got right. Root-cause each miss: DIDN'T KNOW / MISREAD / MISAPPLIED.*

> **Note:** the HTML page (`html/chapter-01.html`) quizzes you on **Q1–12** interactively. Q13–25 below belong to the full paper set in `practice/chapter-exercises/chapter-01-exercises.md` — use them as extra drills (all 25 trace to the same chapter).

| Q | Ans | Q | Ans | Q | Ans | Q | Ans | Q | Ans |
|---|---|---|---|---|---|---|---|---|---|
| 1 | a | 6 | d | 11 | d | 16 | b | 21 | b |
| 2 | c | 7 | c | 12 | a | 17 | a | 22 | c |
| 3 | b | 8 | b | 13 | b | 18 | c | 23 | b |
| 4 | c | 9 | b | 14 | b | 19 | a | 24 | b |
| 5 | b | 10 | c | 15 | c | 20 | b | 25 | c |

**1. a** — Testing evaluates work products for requirement satisfaction and differences vs expected results; it includes static and dynamic activities.
*Why wrong:* b) only covers dynamic execution; c) describes debugging; d) is static testing — one part of testing, not the best description of the whole.

**2. c** — Debugging = find, analyse, remove causes.
*Why wrong:* b) reproducing is supporting debugging but the *fix* is the hallmark; a), d) are testing activities.

**3. b** — No execution + examining a work product = static testing.
*Why wrong:* a) dynamic testing requires execution; c) debugging concerns code causes; d) static testing IS testing, not merely QA.

**4. c** — Testing cannot prove absence of defects (principle 1).
*Why wrong:* a), b), d) are all listed objectives in the syllabus.

**5. b** — error (human act) → defect (wrong formula in code) → failure (wrong total observed).

**6. d** — A defect may never be executed or triggered.
*Why wrong:* a) overstates; b) environment can cause failures; c) same.

**7. c** — Time pressure and human fallibility are classic root causes (also miscommunication, complexity, unfamiliar tech…).

**8. b** — Passing tests ≠ defect-free.

**9. b** — Exhaustive testing is impossible; the alternative is risk-based prioritisation.

**10. c** — Defects concentrated in few modules = defect clustering.
*Why wrong:* d) pesticide paradox is about tests wearing out, not bug distribution.

**11. d** — Pesticide paradox remedy: update/improve tests, not run them more.

**12. a** — Test approach must fit the product's context (safety-critical ≠ e-commerce).

**13. b** — Absence-of-errors fallacy: defect-free ≠ the right system.

**14. b** — Test analysis produces test conditions.
*Why wrong:* a) planning; c) execution; d) completion.

**15. c** — Implementation: procedures, suites, environments, data.
*Why wrong:* a) design creates test cases; b) analysis creates conditions.

**16. b** — Without an expected result you cannot judge the actual result.
*Why wrong:* d) traceability is good practice but a case can exist without code links.

**17. a** — Test basis = what tests are derived from.

**18. c** — Traceability informs people; it removes nothing automatically.

**19. a** — Correct ladder: own → in-team → external organisation.

**20. b** — The documented trade-off: independence vs product knowledge.
*Why wrong:* d) independence never replaces developer testing.

**21. b** — Whole-team: tester as coach/catalyst collaborating on testability.
*Why wrong:* a) quality is everyone's job, not the tester's alone.

**22. c** — Public interest first.

**23. b** — Verification = meets spec; validation = meets user needs.

**24. b** — QA is process-oriented prevention; QC is product-oriented detection.

**25. c** — Testing provides information; it cannot guarantee delivery dates.

---
### Knowledge-check answers (from chapter-01.md)
1. Pesticide paradox; respond by updating/improving the tests.
2. error → defect → failure; a defect may never be executed, or inputs never trigger it.
3. Analysis → conditions; implementation → procedures.
4. False — presence, never absence.
5. Level 4 (independent testers from another organisation).
6. Preventing defects in the work products (e.g., via requirements reviews and early test design) is the prevention objective; the others (verifying requirements, finding defects, providing information, reducing risk, building confidence, compliance) are detection/information-oriented.
7. The expected result.
8. Early testing / shift-left (testing work products early).
9. QC; QA.
10. The information a test is based on; benefits: coverage evaluation and change impact analysis (also audits, reporting).

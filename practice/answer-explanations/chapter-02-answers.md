# Chapter 2 — Answers & Explanations

| Q | Ans | Q | Ans | Q | Ans | Q | Ans |
|---|---|---|---|---|---|---|---|
| 1 | d | 6 | b | 11 | a | 16 | d |
| 2 | b | 7 | a | 12 | d | 17 | c |
| 3 | c | 8 | c | 13 | c | 18 | b |
| 4 | a | 9 | b | 14 | b | 19 | a |
| 5 | a | 10 | d | 15 | b | 20 | b |

**1. d** — Test design needs a *basis*, not executable code.
**2. b** — Pipeline/automation maintenance and new skills are the DevOps challenges.
*Why wrong:* a) DevOps speeds feedback; d) automation *enables* regression, never replaces it.
**3. c** — Both halves: early work-product testing + early tester involvement.
*Why wrong:* d) compressing the schedule only moves *execution* earlier — it changes nothing about test design or tester involvement.
**4. a** — Retrospective = post-iteration improvement meeting.
**5. a** — Isolated single component = component testing.
**6. b** — Interfaces/interactions between components = component integration testing.
**7. a** — Whole-system behaviour against requirements = system testing.
**8. c** — Users validating business fit; at users' own site (beta-style, UAT form).
*Why wrong:* a) alpha is at the developer's site.
**9. b** — Operational acceptance = ops/admin staff.
**10. d** — All four types at all levels — the key insight.
**11. a** — Spec-based derivation without internal knowledge = black-box.
**12. d** — Re-running the failed test for that defect = confirmation.
**13. c** — Checking unaffected areas after a change = regression.
**14. b** — Regression follows *any* change, at any level.
**15. b** — Smoke suite = build-worthiness gate.
**16. d** — New DB version = migration (incl. data conversion checks).
**17. c** — Shutting down the old system = retirement (incl. archiving).
**18. b** — Impact analysis scopes maintenance testing.
**19. a** — Each iteration adds functionality → ever-growing regression need.
**20. b** — Even emergency fixes need confirmation + regression of affected areas.
*Why wrong:* d) a fresh impact analysis with targeted regression is good normal practice, but the question asks what emergency fixes *additionally require on top of* such work — the complete answer is confirmation of the fix plus regression around it.

---
### Knowledge-check answers (from chapter-02.md)
1. Component integration — it exercises the interface between two components.
2. Yes — every test type can be applied at every test level; component tests are often white-box, but functional, non-functional and black-box component tests are all valid. *(Question reworded Nov 2026: it previously implied only two types apply at component level, which trained a wrong rule.)*
3. Confirmation testing done; regression testing of surrounding areas still missing.
4. Migration; data conversion testing + regression testing (on the new environment).
5. A small high-value suite that gates further work on a build; not a substitute for regression testing.
6. Benefits: fast feedback, quicker fixes, shorter time-to-market. Challenge: pipeline/automation maintenance, new skills.
7. (a) test work products earlier; (b) involve testers early for testability and defect prevention.
8. User acceptance testing at the users' site (beta-style).

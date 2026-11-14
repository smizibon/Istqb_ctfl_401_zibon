# Mock Exam 1 — CTFL v4.0 Style
**When:** 11 November · **Conditions:** 40 questions, **60 minutes**, closed book, no notes. ~90 seconds per question. Answer every question — no negative marking.
**Origin:** original questions written for this programme, aligned to CTFL v4.0 learning objectives. Not official ISTQB questions.
**Distribution:** Ch.1 ×7 · Ch.2 ×7 · Ch.3 ×4 · Ch.4 ×10 · Ch.5 ×9 · Ch.6 ×3 (approximation of real weighting)
**Pass:** 26/40 (65%) · **Your target:** ≥ 30 (75%)

---

**1.** Which activity belongs to debugging rather than testing?
a) Designing tests from a specification
b) Locating and correcting the cause of a failure in the code
c) Reporting a failure with reproduction steps
d) Prioritising which test to run next

**2.** A system contains a defect in a rarely used feature that no customer has ever accessed. The defect exists but no failure has been observed. This shows that:
a) The defect does not exist because no failure occurred
b) A defect can be present without causing a failure
c) The feature was tested exhaustively
d) Failures always follow defects

**3.** A test team finds that their long-standing test suite no longer detects new defects. Following the pesticide paradox, they should:
a) Execute the suite twice as often
b) Review and improve the tests, adding new and modified cases
c) Remove all quality checks
d) Declare the product defect-free

**4.** Which of the following is NOT part of the fundamental test process activities?
a) Test planning
b) Test analysis and design
c) Debugging and fixing the code
d) Test monitoring and control

**5.** "Interest calculation on overdue invoices" as an item to be tested is an example of a:
a) Test case
b) Test condition
c) Test procedure
d) Test plan

**6.** Which option gives the HIGHEST degree of test independence?
a) The developer tests their own code
b) A tester within the development team
c) An independent test team within the organisation
d) Testers employed by an external test services company

**7.** Two teams interpreted one ambiguous requirement differently, and each built code to a different understanding. The root cause category of the resulting errors is:
a) Tool complexity
b) Miscommunication about requirements
c) Excessive testing
d) Hardware failure

**8.** Before a new system goes live, the operations team verifies backup/restore procedures and system monitoring. This is:
a) User acceptance testing
b) Operational acceptance testing
c) Component integration testing
d) Alpha testing

**9.** Testing focuses on interfaces and data flows between the modules produced by different developers. The test level is:
a) Component testing
b) Component integration testing
c) System testing
d) Acceptance testing

**10.** A new "export to PDF" feature is added. Besides testing the new feature, the team retests existing printing functionality. The retesting of printing is:
a) Confirmation testing
b) Regression testing
c) Smoke testing
d) Static testing

**11.** Beta testing is performed:
a) At the developer's site by the development team
b) At the users' own location by real users
c) Only by independent test consultancies
d) Before component testing

**12.** Which statement BEST describes shift-left?
a) Move test execution from system test to acceptance test
b) Test work products early and involve testers from the beginning of the lifecycle
c) Schedule testing only after coding completes, but earlier in the day
d) Replace dynamic testing with static analysis entirely

**13.** Which is TRUE about test types?
a) Non-functional testing is only meaningful at system test level
b) Functional and non-functional tests can both be applied at any test level
c) Black-box testing requires access to source code
d) White-box testing is based only on user requirements

**14.** An organisation moves its application to a new cloud platform and must verify both the migrated data and system behaviour. The maintenance trigger is:
a) Modification
b) Migration
c) Retirement
d) Enhancement

**15.** A tool flags excessive cyclomatic complexity in a class, without executing the program. This is:
a) Dynamic testing
b) A review
c) Static analysis
d) Regression testing

**16.** In a walkthrough, the review is led by:
a) A trained moderator who is not the author
b) The author of the work product
c) The project manager
d) The scribe

**17.** Which feature set characterises an inspection?
a) Author-led, educational purpose, no roles
b) Rules/checklists, metrics, entry/exit criteria, trained non-author moderator
c) Pair review at the desk, immediate feedback
d) Tool-based code execution

**18.** During a review meeting, who records the defects and comments as they are raised?
a) The scribe
b) The manager
c) The author
d) The facilitator

**19.** A field accepts ages 0–120. The keypad permits only numbers, and values below 0 or above 120 must be rejected. Using equivalence partitioning, the minimum number of test cases (one per valid partition, one per invalid partition) is:
a) 2
b) 3
c) 5
d) 121

**20.** For the field in question 19, the complete 2-value BVA set is:
a) 0 and 120
b) 0, 1, 120, 121
c) −1, 0, 121, 122
d) 0, 60, 120

**21.** A pricing rule combines three independent yes/no conditions. The FULL decision table has how many rules?
a) 3
b) 6
c) 8
d) 9

**22.** If one condition proves irrelevant to the action in every rule, the table can be collapsed, reducing the rules by:
a) No change
b) Half
c) The full combination count of that condition
d) All rules become one

**23.** A lift controller has states Idle, Moving, DoorsOpen. Valid transitions: call→Moving, arrive→DoorsOpen, close→Idle, plus emergency→Idle from both Moving and DoorsOpen. How many valid transitions in total?
a) 3
b) 4
c) 5
d) 6

**24.** Which statement about coverage is TRUE?
a) 100% statement coverage implies 100% branch coverage
b) 100% branch coverage implies 100% statement coverage
c) Neither implies the other
d) 100% statement coverage proves correctness

**25.** A module has 50 statements; tests execute 40 of them. Statement coverage is:
a) 40%
b) 80%
c) 90%
d) 125%

**26.** Branch coverage is 75% with one `if` statement's false-outcome never taken. The most efficient fix is:
a) Add a test that exercises the untaken false outcome
b) Remove the if statement
c) Re-run existing tests twice
d) Increase statement coverage to 120%

**27.** Tests written collaboratively as "Given/When/Then" examples that double as living documentation indicate:
a) BDD
b) Inspections
c) Decision tables
d) Component testing

**28.** An exploratory tester works in fixed-length sessions, each guided by a charter, and reports results per session. This is:
a) Ad-hoc testing
b) Session-based exploratory testing
c) Checklist-based testing
d) Static analysis

**29.** Risk level equals:
a) Impact + likelihood
b) Likelihood × impact
c) Impact ÷ likelihood
d) Likelihood − impact

**30.** "The test team may lose its only performance specialist before the load tests." This is a:
a) Product risk
b) Project risk
c) Defect
d) Failure

**31.** Which is the best example of a measurable EXIT criterion?
a) "The product is good enough"
b) "All severity-1 defects resolved; ≥95% of planned tests executed"
c) "The team believes quality is fine"
d) "Testing has been thorough"

**32.** Estimating test effort from the previous release's tests-per-day figures is:
a) Expert-based
b) Metrics-based
c) Risk-based
d) Static

**33.** Usability evaluation with real users critiquing the product is which test quadrant?
a) Q1 technology-facing, supporting the team
b) Q2 business-facing, supporting the team
c) Q3 business-facing, critiquing the product
d) Q4 technology-facing, critiquing the product

**34.** The test pyramid exists mainly because:
a) GUI tests are the cheapest to maintain
b) Lower-level tests are faster, cheaper and more stable, so they should dominate
c) End-to-end tests find no defects
d) Unit tests require no design

**35.** A dashboard shows execution progress; the manager re-prioritises tests. These are respectively:
a) Control; monitoring
b) Test monitoring; test control
c) Estimation; completion
d) Analysis; design

**36.** A defect report lacks the environment/build identifier, expected result and reproduction steps. The biggest consequence is:
a) The defect cannot be reliably reproduced and evaluated by others
b) The defect will be fixed too quickly
c) Severity cannot be political
d) Traceability improves

**37.** A crash in the payment module (data loss for users) versus a misspelled company name on the legal page. Correct severity/priority intuition:
a) Payment crash: high severity; typo: low severity but potentially high priority before launch
b) Payment crash: low severity
c) Typo: high severity
d) Severity and priority are always identical

**38.** A capture/replay framework that executes functional tests against the GUI is:
a) Test management tooling
b) Test execution and automation tooling
c) Static analysis tooling
d) Support tooling

**39.** Introducing a new tool first on one small project to verify fit and cost is a:
a) Pilot project
b) Retrospective
c) Walkthrough
d) Smoke test

**40.** Which is a RISK (not a benefit) of test tool support?
a) Faster feedback
b) Underestimating introduction and maintenance effort
c) More consistent regression runs
d) Better coverage measurement

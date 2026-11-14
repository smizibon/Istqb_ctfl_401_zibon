# Mock Exam 3 — Final Readiness Mock
**When:** 13 November · **Conditions:** 40 questions, 60 minutes, closed book, simulated exam pressure.
**Readiness gate:** ≥ 85% (34/40). Below 34 → use the evening for the two weakest chapters, and know your risk areas going in (65% still passes, but margin is the goal).

---

**1.** Which of the following BEST describes why testing is necessary?
a) Because developers are careless
b) Because errors are human and work products of every kind can contain defects
c) Because tools cannot find defects
d) Because testers need employment

**2.** A failure occurs in production, but the code matches its specification. The most likely explanation is:
a) The tester missed a test case — always the cause
b) An error existed in the specification (wrong expected behaviour), or an environmental cause
c) The compiler is broken
d) Failures cannot occur if code matches specification

**3.** A team prioritises testing the modules that historically produced the most production defects. This is an application of:
a) Defect clustering
b) Pesticide paradox
c) Absence-of-errors fallacy
d) Shift-left

**4.** Test design, test implementation, and test execution in an agile project often overlap and iterate. This shows that:
a) The team misunderstands the test process
b) Test activities are context-driven and need not be strictly sequential
c) Agile forbids test design
d) Implementation must always precede analysis

**5.** Which work product pairing is correct?
a) Test planning → test plan; test execution → defect reports
b) Test analysis → test procedures; test completion → test conditions
c) Test design → test plan; monitoring → test data
d) Test execution → test plan; analysis → completion report

**6.** Ethical behaviour for a certified tester means, when interests conflict:
a) The employer's interest overrides safety
b) Public interest takes precedence over personal, employer or client interests
c) The client's interest overrides public interest
d) Personal career interests come first

**7.** "Everyone tests better someone else's work" summarises the benefit of:
a) Test independence
b) Debugging
c) Static analysis
d) Tool pilots

**8.** In a sequential lifecycle model, test execution comes late; the biggest compensating practice is:
a) Skipping test design until code exists
b) Early static testing and early test preparation from documentation
c) Replacing testing with inspections after release
d) Waiting for user feedback only

**9.** Which acceptance testing form is performed at the DEVELOPER's site?
a) Beta
b) Alpha
c) Operational
d) Regulatory

**10.** Regression test selection is needed mainly because:
a) Full regression becomes too large to run on every change; suites must be selected by impact
b) Regression testing is optional
c) All tests are equally important
d) Selection replaces confirmation testing

**11.** Confirming a fix, then testing around the fixed area, in order, are:
a) Regression then confirmation
b) Confirmation then regression
c) Two smoke tests
d) Static then dynamic analysis

**12.** Which is an impact-analysis question for maintenance testing?
a) "Which features could be affected by this change?"
b) "How old is the system?"
c) "Who wrote the original code?"
d) "How many testers do we have?"

**13.** Static analysis tools are most valuable in CI because they:
a) Run code under load
b) Give immediate structural defect feedback on every commit, before execution testing
c) Replace peer reviews
d) Generate user documentation

**14.** Which review type would you choose to formally measure defect density of requirements documents across projects?
a) Informal review
b) Inspection (metrics, checklists, formal process)
c) Pair programming
d) Ad-hoc discussion

**15.** In an inspection, the author of the work product:
a) Leads the inspection
b) Is a participant; a trained moderator leads
c) Cannot attend
d) Writes the metrics report

**16.** Reviews find defects in work products; static analysis additionally excels at finding:
a) Business-process gaps
b) Structural code anomalies such as unreachable code and excessive complexity
c) User dissatisfaction
d) Slow network latency

**17.** A rule states: quantity 1–5 → €5 shipping; 6–20 → €10; 21–100 → €15. Quantities outside 1–100 rejected. Count minimum EP test cases:
a) 3
b) 4
c) 5
d) 6

**18.** For boundaries between the shipping bands in question 17, the 2-value BVA values around the 5/6 boundary are:
a) 4, 5
b) 5, 6
c) 5, 6, 7
d) 4, 5, 6

**19.** A hotel booking rule: "If stay ≥ 5 nights AND loyalty member → free breakfast; otherwise no free breakfast." Decision table rules after any possible collapsing:
a) 4 rules, no collapse (both conditions always affect the action)
b) 3 rules
c) 2 rules
d) 1 rule

**20.** For a "download" state machine: Idle→Downloading (click), Downloading→Paused (pause), Paused→Downloading (resume), Downloading→Idle (complete), Paused→Idle (cancel). Minimum tests for all valid transitions:
a) 4
b) 5
c) 6
d) 3

**21.** For the machine in Q20, clicking "resume" while Idle is:
a) A valid transition
b) An invalid transition — a test case worth executing
c) Unreachable code
d) A decision table rule

**22.**
```
if (amount > 0 and amount <= 100):
    fee = 0
else:
    fee = 5
```
Tests: T1 amount=50, T2 amount=150, T3 amount=0. Statement and branch coverage with T1+T2+T3:
a) 100% statement, 100% branch
b) 100% statement, 50% branch
c) 75% statement, 100% branch
d) 50% statement, 50% branch

**23.** In Q22, which single pair of tests achieves 100% branch coverage of the `if` decision?
a) T1, T2
b) T1, T3
c) T2, T3
d) Impossible with two tests

**24.** A thorough test basis-derived suite achieving 100% branch coverage still misses the fact that a requirement was forgotten. This shows:
a) A pesticide paradox
b) Black-box and white-box techniques are complementary; coverage cannot reveal missing functionality
c) The developers were careless
d) Branch coverage includes requirement coverage

**25.** Which technique would you ADD to systematic techniques to catch unusual data-dependent defects cheaply?
a) Error guessing
b) Statement coverage
c) Test pyramid
d) Smoke testing

**26.** In BDD, the Given/When/Then format primarily supports:
a) Shared understanding plus automation-ready specification of behaviour
b) Memory profiling
c) Branch measurement
d) Tool vendor lock-in

**27.** Checklist-based testing's effectiveness depends MOST on:
a) The quality and evolution of the checklist itself
b) The IDE used
c) The number of meetings
d) Code complexity only

**28.** Test conditions, prioritised by risk, are created during:
a) Test analysis
b) Test execution
c) Test completion
d) Debugging

**29.** An exit criterion "no open severity 1 or 2 defects, 100% of planned tests executed, 80% branch coverage" fails only on branch coverage at 76%. Correct completion action:
a) Release anyway without recording anything
b) Either negotiate a documented deviation with stakeholders or add tests raising coverage, then reassess
c) Delete the criterion
d) Close testing silently

**30.** Which estimation approach combines past project data with structured team judgement?
a) Metrics-based only
b) Expert-based only
c) Both, used together where data exists and judgement fills gaps
d) Neither is valid in agile

**31.** The test pyramid warns against too many GUI end-to-end tests because they are:
a) Slow, brittle and expensive to maintain
b) Impossible to automate
c) Useless for regression
d) Business-facing

**32.** A risk register lists: payment fraud (likelihood 4, impact 5); slow search page (likelihood 5, impact 2). Risk levels, in order:
a) 20 and 10 — payment risk gets the stronger techniques and earlier execution
b) 9 and 7
c) Equal
d) 0.8 and 2.5

**33.** "System cannot process the legally required audit trail" is a:
a) Product risk
b) Project risk
c) Test tool risk
d) Schedule risk

**34.** Test completion reports at iteration end in agile typically include:
a) Full code listings
b) Test results vs. plan, obstacle summary, residual risk, lessons for the next iteration
c) Marketing materials
d) Nothing — agile needs no reporting

**35.** A defect's status history, environment and reproduction steps are all tracked so that:
a) Results are reproducible and analysis (trends, clustering) is possible later
b) Developers cannot claim credit
c) Reports become longer
d) Exit criteria become unnecessary

**36.** Which defect report title is BEST?
a) "System broken"
b) "Checkout total wrong by 10% when gift wrap is added (v2.3.1, Chrome 130)"
c) "Developer error in checkout"
d) "Testing found stuff"

**37.** A tester verifies a rejected credit card correctly shows a specific error message. This tests:
a) A valid partition of the payment function
b) An invalid partition — each invalid partition verified separately
c) Branch coverage
d) A review outcome

**38.** A team's new test data generator creates invalid data sets for negative testing. Its tool category:
a) Test design/implementation support tool
b) Non-functional tool
c) Test management tool
d) Support tool

**39.** The FIRST step when a pilot tool project shows the tool needs more maintenance than expected:
a) Roll it out everywhere immediately anyway
b) Reassess objectives and rollout decision with realistic expectations before wider adoption
c) Fire the team
d) Hide the findings

**40.** Which outcome is a documented BENEFIT of test management tooling?
a) It writes the test strategy automatically
b) Better traceability and coverage reporting across testware
c) It guarantees on-time projects
d) It eliminates the need for exit criteria

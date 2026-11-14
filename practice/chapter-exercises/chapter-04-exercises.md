# Chapter 4 Exercises — Test Analysis and Design
*Part A: 12 K3 technique tasks (work them on paper!). Part B: 12 K2 concept questions. Target ≥ 80%. Answers with worked solutions: [`../answer-explanations/chapter-04-answers.md`](../answer-explanations/chapter-04-answers.md).*

## Part A — Technique tasks (K3). Solve on paper first.

**A1.** A delivery charge field accepts quantities 1–100. List the valid and invalid equivalence partitions and all values of the **2-value BVA** set.

**A2.** Same field (1–100). Give the complete **3-value BVA** set.

**A3.** A bank classifies loan applicants by annual income: "low" ≤ 20,000; "medium" > 20,000 and ≤ 60,000; "high" > 60,000. Income must also be a number between 0 and 1,000,000. How many **minimum** test cases for EP coverage (one per valid partition, one per invalid partition)?

**A4.** An insurance rule: *"If the customer is a new customer AND the car is electric → 15% discount. New customer, non-electric → 5%. Existing customer, electric → 10%. Existing, non-electric → 0%."* Build the decision table. How many rules / minimum tests?

**A5.** Extension of A4: suppose existing customers get **10% regardless of car type** (new customers keep the two-way split). Which rules collapse, and what is the new minimum test count?

**A6.** A music player has states: `Idle`, `Playing`, `Paused`. Events: Play (from Idle or Paused → Playing), Pause (from Playing → Paused), Stop (from Playing or Paused → Idle). List all **valid transitions**, then count them.

**A7.** For the player in A6: list **three invalid transitions** (event/state pairs not allowed).

**A8.** Code:
```
read x
if x > 10:
    print("high")
print("end")
```
Test 1 uses x = 15. Compute statement coverage and branch coverage for Test 1 alone. What single second test achieves 100% branch coverage?

**A9.** A component has 40 executable statements and 12 two-way decisions. Tests execute 36 statements and 20 of 24 branch outcomes. Compute both coverage percentages.

**A10.** An order form has three independent boolean conditions in its pricing rule: premium member (Y/N), rush delivery (Y/N), gift wrap (Y/N). How many rules in the full decision table? If tests exist only for the four rules where premium=Y, roughly what fraction of rules is covered?

**A11.** A temperature monitor must raise an alert when temperature goes above 40°C (range: −50 to +50 valid). Write the EP partitions and the boundary tests for the **40 boundary** using 3-value BVA.

**A12.** For the state diagram in A6, what coverage is achieved by test sequences: (Idle→Playing via Play), (Playing→Paused via Pause), (Paused→Idle via Stop) — 0-switch or more? Which valid transitions remain uncovered?

## Part B — Concept questions (K2)

**B1.** Which activity identifies test conditions from the test basis?
a) Test design b) Test analysis c) Test implementation d) Test execution

**B2.** Prioritising test cases for execution is primarily driven by:
a) Alphabetical order of test case IDs
b) Risk, coverage goals and project constraints
c) The author's preference
d) Number of steps in each case

**B3.** Traceability from test cases to requirements does NOT support:
a) Coverage evaluation b) Change impact analysis c) Automatic test execution d) Auditability

**B4.** EP and BVA differ because BVA:
a) Tests classes of equivalent inputs b) Targets values at and around partition edges c) Requires code knowledge d) Only tests invalid inputs

**B5.** "Each invalid partition is covered by a separate test case" — why?
a) To save time b) So each invalid input's specific handling/error can be verified c) Because ISTQB requires exactly one assertion d) Invalid inputs cannot be combined

**B6.** In state transition testing, an action differs from a transition because an action:
a) Changes the state b) Is a behaviour/output performed, which may occur without changing state c) Is always invalid d) Belongs only to 1-switch coverage

**B7.** Which statement is TRUE?
a) 100% statement coverage implies 100% branch coverage
b) 100% branch coverage implies 100% statement coverage
c) The two are unrelated
d) Both imply absence of defects

**B8.** White-box coverage cannot detect:
a) An unused branch b) Missing functionality (code never written) c) An unexecuted statement d) An untested decision outcome

**B9.** A tester with 10 years on payment systems tests unusual card numbers first. This is:
a) Checklist-based testing b) Error guessing c) BVA d) State transition testing

**B10.** Testing against a list of known risk items derived from past projects is:
a) Error guessing b) Checklist-based testing c) EP d) Inspection

**B11.** Exploratory testing in timeboxed sessions guided by charters is called:
a) Session-based exploratory testing b) Ad-hoc testing c) Checklist testing d) Regression testing

**B12.** Business analysts, developers and testers jointly specify examples in Given/When/Then format used as living documentation and automation. This is:
a) ATDD b) BDD c) EP d) Inspection-based testing

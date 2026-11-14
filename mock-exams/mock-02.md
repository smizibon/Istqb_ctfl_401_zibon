# Mock Exam 2 — CTFL v4.0 Style
**When:** 12 November · **Conditions:** 40 questions, 60 minutes, closed book. Target ≥ 80% (32/40).
**Origin:** original programme questions — no reuse from exercises or Mock 1.

---

**1.** Testing and debugging differ in that testing:
a) Fixes defects while debugging finds them
b) Can show the presence of defects, while debugging finds and removes their causes
c) Requires no test basis, while debugging does
d) Is only static, while debugging is dynamic

**2.** Static testing of a user story could find:
a) A slow response under load
b) An acceptance criterion that is impossible to verify
c) A crash when saving
d) A memory leak

**3.** "Testing everything exhaustively is impossible, so we prioritise by risk." Which TWO principles does this sentence combine?
a) Pesticide paradox and defect clustering
b) Exhaustive testing impossible and context-dependence
c) Early testing and defect clustering
d) Absence-of-errors fallacy and shift-left

**4.** During test monitoring and control, the test manager notices execution is behind and reassigns staff and reprioritises tests. This is:
a) Test monitoring
b) Test control
c) Test completion
d) Test analysis

**5.** A testware work product produced at test completion is:
a) Test completion report
b) Test data
c) Defect report
d) Test procedure

**6.** The main benefit of independent testing is:
a) Cheaper testing
b) Reduced author bias in evaluating one's own work
c) Faster execution
d) Less communication needed

**7.** Which professional skill combination does testing explicitly require?
a) Only technical skills
b) Only interpersonal skills
c) Both technical and interpersonal skills
d) Management skills exclusively

**8.** In a Scrum project, automated regression tests run on every build because:
a) Iterative development constantly changes the system, so regression risk grows each sprint
b) Scrum forbids manual testing
c) Regression is only needed at the end
d) Reviews are not allowed in agile

**9.** Component testing typically uses stubs and mock objects to:
a) Increase test execution time
b) Isolate the component from dependencies
c) Replace acceptance testing
d) Satisfy entry criteria for reviews

**10.** Contractual acceptance testing verifies the system against:
a) User preferences discovered during beta
b) Contractual acceptance criteria defined by the customer
c) Developers' unit expectations
d) Performance benchmarks only

**11.** A test level focused on validation (building the right thing) rather than verification (building it right) is:
a) Component testing
b) Component integration testing
c) System testing
d) Acceptance testing

**12.** Testing that video playback works on the new OS version after the app's platform upgrade is maintenance testing triggered by:
a) Modification
b) Migration
c) Retirement
d) UAT

**13.** Which pair are BOTH static testing techniques?
a) Review and static analysis
b) Review and equivalence partitioning
c) Static analysis and exploratory testing
d) Walkthrough and BVA

**14.** The strongest argument FOR static testing early in the lifecycle is:
a) It finds defects before code exists, when removal is cheapest
b) It replaces dynamic testing
c) It executes the code faster
d) It requires no human involvement

**15.** A technical review differs from a walkthrough mainly because it:
a) Is led by a trained moderator (not the author) with technical peers, aiming at consensus and defect detection
b) Has no defined roles
c) Never produces comments
d) Only applies to code

**16.** In reviews, "adequate preparation time and capped review rates" are:
a) Success factors
b) Exit criteria for the project
c) Entry criteria for testing
d) Types of review

**17.** Delivering review results as critique of the PRODUCT (never the person) supports:
a) Metrics gathering
b) A blame-free culture — a review success factor
c) Branch coverage
d) Tool pilot decisions

**18.** From the rule "free shipping for orders over exactly €50 (order total 1–9999)":
valid partition (1–50 no free shipping], valid (50–9999 free), invalid <1, invalid >9999. Minimum EP test cases:
a) 2
b) 3
c) 4
d) 5

**19.** For the €50 boundary with 3-value BVA, the values around it are:
a) 49, 50, 51
b) 50, 51
c) 49, 50
d) 48, 50, 52

**20.** A decision table has conditions: membership (3 values: none/silver/gold) and order size (2 values: small/large). Full table rules:
a) 5
b) 6
c) 8
d) 9

**21.** In state transition testing, "0-switch coverage" means:
a) All states visited
b) All valid single transitions exercised
c) All invalid transitions exercised
d) All pairs of consecutive transitions exercised

**22.** A login feature blocks after 3 wrong passwords. States: Open, Blocked. Transitions: wrong password (attempts<3): Open→Open; 3rd wrong: Open→Blocked; admin reset: Blocked→Open; correct password: Open→Open(logged in treated as same flow). Number of distinct valid transitions listed:
a) 2
b) 3
c) 4
d) 5

**23.** Which coverage statement is FALSE?
a) Branch coverage subsumes statement coverage
b) Statement coverage can be 100% with branch coverage below 100%
c) 100% branch coverage guarantees all statements executed
d) 100% statement coverage guarantees every decision outcome exercised

**24.** A switch statement has 6 cases plus a default. Branch coverage requires exercising:
a) 6 outcomes
b) 7 outcomes
c) 1 outcome
d) 12 outcomes

**25.** A charter says "Explore the checkout flow for unexpected discount combinations." This is:
a) Checklist-based testing
b) Exploratory testing with a charter
c) Error guessing
d) Static analysis

**26.** Deriving tests from acceptance criteria before development begins is:
a) ATDD
b) Static analysis
c) Inspection
d) BVA

**27.** Error guessing relies on:
a) Formal specifications
b) The tester's experience of likely defects
c) Code coverage tools
d) Boundary values exclusively

**28.** A checklist that grows with each project's lessons learned characterises:
a) Checklist-based testing — the checklist evolves
b) BDD
c) Branch coverage
d) Walkthroughs

**29.** Test planning should define all EXCEPT:
a) Test approach and scope
b) Entry/exit criteria
c) Estimates and schedule
d) The customer's marketing plan

**30.** Test case prioritisation is LEAST influenced by:
a) Risk of failure
b) Coverage goals
c) The alphabetical order of test case titles
d) Time and budget constraints

**31.** Which pair correctly matches quadrant content?
a) Q1: automated component tests; Q4: performance tests
b) Q1: usability; Q4: functional examples
c) Q2: security; Q3: unit tests
d) Q3: compilers; Q2: exploratory

**32.** Risk mitigation through testing works by:
a) Eliminating the risk entirely
b) Reducing the likelihood of failures or their impact, and providing information about residual risk
c) Transferring risk to users
d) Removing the need for quality assurance

**33.** A test progress report written for the test TEAM (not management) would most likely include:
a) High-level cost summaries only
b) Detailed execution status per test case and remaining blockers
c) Marketing projections
d) Nothing quantitative

**34.** Which metric best shows whether quality is converging toward an exit criterion?
a) Defect discovery vs. fix rate trend
b) Number of test plans
c) Meeting count
d) Page count of documentation

**35.** Configuration management applied to testware provides:
a) Versioning, traceability and reproducibility of tests against product versions
b) Faster defect fixing
c) Automated test design
d) Risk elimination

**36.** After "Fixed", a defect fails its confirmation test. Its next state is:
a) Reopened
b) Closed
c) Deferred
d) Duplicate

**37.** A defect report includes: ID, title, steps, expected/actual results, build ID, severity. The MOST important missing element for tracking ownership is:
a) A unique identifier (already present)
b) The tester's report has everything needed
c) Reporter identity/date and status/assignment
d) A screenshot

**38.** Version control and CI systems are which tool category?
a) Support tools
b) Test design tools
c) Non-functional tools
d) Static analysis tools

**39.** A tool benefit REALISED only with proper implementation is:
a) Reduced repetitive manual effort and faster feedback
b) Automatic requirements writing
c) Guaranteed release dates
d) Self-improving quality culture

**40.** Over-reliance on a single vendor's proprietary format creates risk due to:
a) Vendor dependence / lock-in
b) Excess traceability
c) Over-frequent releases
d) Too much tester skill

# Chapter 1 — Fundamentals of Testing
*Study day: 4 November · Priority: 🔴 Tier 1 · K-levels: K1–K2 · Reading time: ~2 hours*

> **What this chapter is:** the vocabulary and mental model everything else in the syllabus is built on. The exam will test these concepts both directly (definitions) and indirectly (buried inside scenarios about some other chapter's topic).

## Learning objectives covered

| LO | Topic | K | After studying you can… |
|---|---|---|---|
| 1.1.1 | What is testing | K2 | Explain testing, incl. debugging distinction |
| 1.1.2 | Test objectives | K2 | Give examples of objectives |
| 1.2.1 | Contributions to success, QA vs QC | K2 | Explain how testing improves quality |
| 1.2.2 | Errors, defects, failures | K2 | Distinguish and explain the chain |
| 1.2.3 | Root causes of defects | K2 | Recall the typical causes |
| 1.3.1 | Seven testing principles | K2 | Apply them in scenarios |
| 1.4.1 | Test process & context | K2 | Explain context-driven process |
| 1.4.2 | Test activities | K1 | List activities & tasks |
| 1.4.3 | Test work products | K1 | Identify work products per activity |
| 1.4.4 | Traceability | K2 | Explain why we trace basis→cases |
| 1.5.1 | Skills & independence | K2 | Discuss interpersonal skills, whole-team, independence |
| 1.5.2 | Tester's role in the team | K2 | Explain tester interactions |
| 1.6.1 | Universal ethical principle | K1 | Recall it |

---

## 1.1 What is testing?

**Definition (memorise the essence):** *Software testing is the process of evaluating a work product to determine whether it satisfies requirements and to detect differences between given and expected results.* Testing also includes **planning, analysis, design, implementation, execution, and reporting** — it is far more than executing tests.

Three contrasts you must be able to articulate:

**Testing vs. debugging.** Testing **detects failures** caused by defects. Debugging **finds, analyses, and removes their causes**. Testing answers "is there a problem?"; debugging answers "why, and how do I fix it?" Debugging is a **development activity**, not a testing activity — though testers often help developers reproduce failures.

**Dynamic vs. static testing.** Dynamic testing = running the software (or any executable work product) and observing behaviour. Static testing = examining work products **without running them** (reviews, static analysis). Testing includes **both**. If an exam option says "testing always requires executing code" — it's wrong.

**Testing can be done on any work product.** Requirements documents, user stories, design models, source code, test plans, tests themselves — all are testable. The idea that testers only test running software is a misconception the exam exploits.

### Test objectives (1.1.2)
Testing may aim to: prevent defects (e.g., by reviewing requirements), verify that requirements are fulfilled, check whether the system works as expected, build confidence in quality, find defects, reduce risk, provide information for stakeholders, comply with law/regulation/standards. Exam questions typically give a scenario and ask which objective fits ("the team tested to fulfil a contractual acceptance criterion" → compliance objective).

## 1.2 Why testing is necessary, and errors vs. defects vs. failures

### 📖 Memorise — the quality chain

| Term | Definition | Example |
|---|---|---|
| **Error (mistake)** | A **human action** that produces a defect | A developer misreads the spec and types the wrong formula |
| **Defect (bug/fault)** | A **flaw in a work product** — can cause failure | The code contains the wrong interest formula |
| **Failure** | **Actual behaviour deviates from expected** — a system/event, observed at runtime | ATM shows a wrong balance |

Causal chain: **error → defect → failure**, but with two caveats the exam loves:
1. A defect does **not always** cause a failure — the wrong code may never be executed, or inputs may not trigger it.
2. **Not every failure comes from a defect in the code** — environmental conditions (radiation, electromagnetic interference, hardware faults, wrong setup/configuration) can cause failures; also, if the expected result was wrong (bad oracle), a "failure" may be observed even when the system behaves as designed.
3. A failure can also be caused by an error in **any** work product — a wrong requirement causes the code to faithfully implement a defect.

**Typical root causes of errors (1.2.3):** time pressure, human fallibility, inexperienced/inadequately trained staff, miscommunication (verbal, written, ambiguous requirements), complexity of code/design/architecture, misunderstanding interfaces, new/unfamiliar technologies, incorrect handling of system states/conditions.

### Contributions to success; QA vs. QC (1.2.1)
Testing improves quality by **detecting and evaluating defects** (quality control — product-oriented: "is this build good?") and by **preventing defects** through reviews and early test design (quality assurance — process-oriented: "are we doing the right things right?"). Testing also provides **measures of quality** (defect counts, coverage) and **reduces risk** (of failures in operation) — the earlier a defect is found, the cheaper it is to remove.

⚠️ **Exam trap:** "Testing proves the system is correct" — **false**. Testing can show the presence of defects, never their absence (principle 1 below, and same logic as quality-chain). Also: testing alone does **not** ensure quality — quality is built through the whole development effort; testing gives *information* about quality.

## 1.3 The Seven Testing Principles 📖 Memorise + apply

| # | Principle | One-line meaning | Exam-hook scenario |
|---|---|---|---|
| 1 | **Testing shows presence of defects, not their absence** | Passing tests ≠ bug-free | Team ships after all tests pass; users still find bugs |
| 2 | **Exhaustive testing is impossible** | Can't test every input combination; must prioritise by risk & criteria | Someone proposes testing all input combinations |
| 3 | **Early testing saves time and money (shift-left)** | Test as early as possible in the SDLC | Defect found in requirements costs 1×, in production 100× |
| 4 | **Defect clustering** | Few modules contain most defects | 20% of modules hold 80% of the bugs → focus effort there |
| 5 | **Pesticide paradox** | Repeated identical tests stop finding new defects → **update/improve tests regularly** | Regression suite finds nothing new for months |
| 6 | **Testing is context-dependent** | No one right way; safety-critical ≠ e-commerce testing | Same approach applied everywhere |
| 7 | **Error/absence-of-errors fallacy** | Fixing bugs + building the wrong system = still failure | All defects fixed but system doesn't meet user needs |

Principles appear as K2 *scenarios*: read the mini-story, name the principle. Practise until this mapping is instant.

## 1.4 The test process

There is **no one universal test process** — it depends on **context**: product, risk, stakeholders, SDLC model, team, regulation (LO 1.4.1). But a structured test process includes these **activities** (1.4.2), each with example **work products** (1.4.3):

| Activity | Purpose | Typical work products |
|---|---|---|
| **Test planning** | Define objectives & approach | **Test plan** |
| **Test monitoring & control** | Compare progress vs. plan, take corrective action | Test progress reports, documented corrective actions |
| **Test analysis** | Identify **test conditions** (what to test) from the test basis | Test conditions list |
| **Test design** | Create **test cases** & data, design test environment | Test cases, test data, environment design |
| **Test implementation** | Make things executable: procedures, suites, environment setup | **Test procedures**, test suites, schedules |
| **Test execution** | Run tests, compare actual vs. expected | Test results, defect reports |
| **Test completion** | Collect experience at milestones (release, project end) | **Test completion report**, lessons learned |

Key vocabulary (memorise exactly):
- **Test basis** — the body of information a test is based on (requirements, user stories, design).
- **Test condition** — an **item/event to be tested** ("interest calculation on overdue accounts").
- **Test case** — input + execution preconditions + **expected result** (the expected result is what makes it a *case*, not just a trial run).
- **Test procedure (test script)** — step-by-step instructions for executing test cases, in order.
- **Traceability (1.4.4)** — links test basis ↔ test conditions ↔ test cases ↔ results. Enables: coverage evaluation, impact analysis of changes, audits, and reporting "requirement X is tested".

⚠️ **Exam traps:** analysis answers *what* to test, design answers *how*. Activities often overlap and iterate — they need not be strictly sequential (esp. in Agile). Expected results must be defined **before** execution to avoid "the output looked fine" bias.

## 1.5 Skills, independence, and the tester in the team

- **Skills (1.5.1):** testing needs both **professional/technical** (test techniques, tools, standards, SDLC) and **interpersonal** (communication, critical thinking, analytical, teamwork) skills. **Domain knowledge** helps; **independence** reduces the author's bias ("everyone tests better someone else's work").
- **Levels of independence** (memorise the ladder): ① no independence (author tests own code) ② independent testers **within the team** ③ independent test team/group ④ independent testers from **outside the organisation** ⑤ testers are neither developers nor the organisation's staff (certified third party). More independence → more objectivity, but it's a **trade-off**: independent testers may lack product/developer knowledge, and independence **does not replace** developer testing.
- **Whole-team approach (1.5.2):** quality is everyone's job; testers act as coaches, catalysts, and information providers; they collaborate with business representatives on acceptance criteria and with developers on testability (e.g., test automation interfaces). Testers also promote quality **thinking** — asking "what if…", challenging assumptions, making quality visible.

## 1.6 Universal ethical principle (1.6.1) — K1 recall

Short version: **public interest first.** Certified testers shall act in the public interest — safety, and the wider community, overrides employer/client interests when they conflict. One-mark question at most; just recognise the wording "public" in it.

---

## Confusion table (quick contrasts)

| Easily confused | The distinction |
|---|---|
| Testing / debugging | Detect failures / find & remove defect causes |
| Error / defect / failure | Human act / flaw in product / observed deviation |
| Quality assurance / quality control | Process-oriented prevention / product-oriented detection |
| Test condition / test case | What to test / how to test it (inputs + expected result) |
| Verification / validation mindset | Did we build it right (per spec) / did we build the right thing (per needs) — helpful background, but use syllabus wording |

## ⚠️ Top exam traps in this chapter
1. "All tests passed, so the software is defect-free" → principle 1.
2. Any option implying testing = only executing code → ignores planning/static testing.
3. Scenario describes most bugs in a few modules → defect clustering, *not* pesticide paradox.
4. Pesticide paradox described as "tests wear out" → the remedy is **new/modified tests**, not running them more often.
5. Independence question: "most independent" = option with testers from **outside/3rd party**; "independent team inside the organisation" is one level lower.
6. Root-cause question where "environmental conditions" is offered as a *cause of failure* (correct) vs. as an *error cause* (an error is a human action).

## 📖 Memorise / 🧠 Understand summary
- **Memorise:** the 7 principles verbatim; error/defect/failure definitions; the 7 activities of the test process + one work product each; test basis/condition/case/procedure definitions; the 5 independence levels; public-interest ethic.
- **Understand & apply:** reading a scenario and naming the principle; QA vs. QC in context; why traceability matters; the trade-offs of independence; why context drives the process.

## Knowledge check (10 questions — full set with explanations in `practice/`)
1. A test team runs the same regression suite for a year; lately it finds no defects. Which principle applies, and what is the correct response?
2. Name the three links in the error→defect→failure chain, and one reason a defect might never cause a failure.
3. Which activity produces test conditions, and which produces test procedures?
4. True/false: 100% branch testing of all code guarantees absence of defects.
5. A tester hired from an external test services company is what level of independence?
6. Give two test objectives that are about *prevention*, not detection.
7. What makes a test case a test case (which element is mandatory)?
8. Which principle does "reviewing requirements before coding starts" illustrate?
9. QA or QC: "measuring defect density per release"? …and "training developers in defensive coding"?
10. What is the test basis, and name two traceability benefits.

*(Answers and why-wrong analysis: [`../practice/answer-explanations/chapter-01-answers.md`](../practice/answer-explanations/chapter-01-answers.md) — available in Phase 3.)*

## One-paragraph revision summary
Testing evaluates work products to detect defects and build confidence; it spans static and dynamic activities from planning to completion. Human errors create defects; defects may (not must) cause failures, and failures can also arise from the environment. The seven principles govern all testing: presence-not-absence, no exhaustive testing, early testing, defect clustering, pesticide paradox, context dependence, and the absence-of-errors fallacy. The test process — planning, monitoring/control, analysis, design, implementation, execution, completion — is context-driven, produces traceable work products, and is performed by people whose independence is balanced against product knowledge, inside a whole-team approach to quality, under the public-interest ethic.

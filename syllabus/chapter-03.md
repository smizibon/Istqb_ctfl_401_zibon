# Chapter 3 — Static Testing
*Study day: 6 November (first half) · Priority: 🟢 Tier 3 · K-levels: K2 (roles K1) · Reading time: ~1 hour*

> **What this chapter is:** examining work products **without executing them** — reviews and static analysis. Conceptually the easiest chapter, but exam questions hinge on precise role and review-type distinctions.

## Learning objectives covered

| LO | Topic | K |
|---|---|---|
| 3.1.1 | Static testing basics; what it can find | K2 |
| 3.1.2 | Static analysis vs. reviews | K2 |
| 3.1.3 | Strengths of static analysis; tool examples | K2 |
| 3.2.1 | Benefits of early reviews & feedback | K2 |
| 3.2.2 | Review roles | K1 |
| 3.2.3 | Review types (informal → inspection) | K2 |
| 3.2.4 | Review success factors | K2 |

---

## 3.1 Static testing basics

**Definition:** static testing examines work products **without executing the code** — either manually (**reviews**) or automatically (**static analysis**). It works on **any work product**: requirements, user stories, epics, code, design models, test plans, tests, contracts — anything that can be read.

**What static testing finds — the key exam point:** defects **directly in work products**, and crucially it finds them **early** (shift-left) and cheaply. Static testing can detect defects that dynamic testing **would only find as failures at much higher cost** — or not at all. Examples of typical findings:

- **Requirements:** ambiguities, contradictions, omissions, duplicates, impractical designs, security holes in design, testability problems (requirement can't be verified)
- **Code:** syntax errors (some), incorrectly spelled variables, undeclared variables, unreachable/duplicate code, excessive complexity, security vulnerabilities, coding-standard violations
- **Representations (models):** missing steps, incorrect steps, wrong order

⚠️ **Trap:** static testing finds the *defect in the document/code itself*; dynamic testing observes *failures* from which defects are inferred. Static testing does **not** need runnable code or test execution.

### Reviews vs. static analysis (3.1.2)

| | **Reviews** | **Static analysis** |
|---|---|---|
| How | **Human** examination of documents/code | **Tool-based** analysis of code (and models) |
| Finds | Deviations from standards/requirements, defects, improvement points, misunderstandings | **Structure-related defects**: unreachable code, undeclared/mis-spelled variables, duplicate code, excessive complexity, security vulnerabilities, standards violations |
| Needs | People, preparation, meeting or async examination | Tool, runs continuously (often inside IDE/CI) |

(3.1.3) **Strengths of static analysis:** finds defects **before dynamic testing can**, can find defects hard or impossible to observe at runtime (e.g., unreached code), prevents defect injection improving maintainability. **Tool examples:** compilers (yes — a compiler is a static analysis tool), static code analysers (linters, SonarQube-style), security analysers, checkers for coding standards. When a tool is *described* as flagging "unused variable" or "cyclomatic complexity too high" without running the program → static analysis.

## 3.2 The review process

### Benefits of early reviews / feedback loop (3.2.1)
Reviews give **early feedback** (detect defects cheaply, before code), shorten the feedback loop, and support **defect prevention**: reviewing and improving work products (e.g., requirements) reduces defect injection into later products. Reviews also spread knowledge (author learns standards; reviewers learn the product), improve consistency, and produce work products that are more **maintainable and testable**.

### 📖 Memorise — Review roles (3.2.2)

| Role | Does |
|---|---|
| **Author** | Created the work product; fixes defects after review |
| **Facilitator (moderation)** | Ensures the review runs effectively: planning, running the meeting, neutral conduct |
| **Reviewer (inspector)** | Reviews the product; ideally not the author, may be subject-matter experts |
| **Scribe (recorder)** | Collects defects/comments during the meeting |
| **Review leader** | Takes overall **responsibility for the review**: planning, decides exit, follow-up |
| **Manager** | Decides **whether** a review happens and its objectives; accounts for review outcomes; not necessarily present in the meeting |

A person may hold **multiple roles**; small reviews merge them. Exam scenario: "who records the issues raised?" → scribe; "who ensures an effective review meeting?" → facilitator; "who decides on executing the review?" → manager.

### 📖 Memorise — Review types (3.2.3), from informal to formal

| Type | Formality | Key characteristics |
|---|---|---|
| **Informal review** | Lowest | No process, no roles, no documents; **pair review / pair programming**, desk-check; cheap, immediate feedback; main objective: cheap and fast defect detection |
| **Walkthrough** | Mid-low | Led by the **author**; goal often **education/consensus-building**, gathering comments, explaining/evaluating; scenarios/dry runs possible |
| **Technical review** | Mid-high | Trained moderator (not the author), technical/qualified reviewers; **peer review** among technical peers; objectives: consensus, detect defects, make decisions, generate alternatives |
| **Inspection** | Highest | **Most formal**, based on rules/checklists, defined roles, detailed entry/exit criteria, **metrics** gathered, formal follow-up; led by a **trained moderator (not the author)**; objectives: maximum defect detection, quality improvement, process improvement |

Exam logic: formality rises with (a) moderator not author, (b) defined roles, (c) entry/exit criteria, (d) metrics & checklists. Any question showing "author presents to the team to reach shared understanding" = walkthrough; "rule-based, checklist, metrics, trained moderator" = inspection.

### Review success factors (3.2.4)
- Right **reviewers** (mix of expertise),
- adequate **preparation time** (typically ≥ as much as meeting time) and **review rate limits** (pages/hour caps — small chunks beat marathons),
- **defect-focused, no-blame culture** (critique the product, never the person; "egoless"),
- management support of reviews as valuable (time allocated),
- clear objectives & right review type for the purpose.

⚠️ **Trap:** "reviews are only about finding defects" → they also spread knowledge, build consensus, improve products' consistency and maintainability. Another: "reviews require a meeting" → informal and many reviews can be asynchronous, no meeting needed.

## Confusion table

| Easily confused | Distinction |
|---|---|
| Static / dynamic testing | Without execution / with execution |
| Review / static analysis | Human / tool-based |
| Walkthrough / technical review | Author-led, educational / peer-based, defect- and decision-focused, trained moderator |
| Technical review / inspection | Peer consensus & decisions / most formal: rules, checklists, metrics, entry/exit criteria |
| Facilitator / review leader / manager | Runs the meeting / owns the review's success / decides review happens |

## 📖 Memorise / 🧠 Understand summary
- **Memorise:** the 6 roles, the 4 review types with their features, examples of static analysis tools (incl. compiler), categories of findings per work-product type.
- **Understand & apply:** scenario → review type; role-in-scenario questions; why static testing finds some defects dynamic cannot; feedback-loop reasoning.

## Knowledge check (8 questions)
1. A linter flags an unreachable branch without the program running. Static or dynamic, review or analysis?
2. Who leads a walkthrough, and who must never lead an inspection?
3. Which review type produces metrics and uses checklists with formal entry/exit criteria?
4. Name three defects a review can find in *requirements*.
5. Why can static analysis find defects that dynamic testing cannot?
6. Which role decides whether a review is performed?
7. Is a compiler a static analysis tool? Justify.
8. Give three review success factors.

*(Answers in `practice/answer-explanations/chapter-03-answers.md` — Phase 3.)*

## One-paragraph revision summary
Static testing examines work products without executing them: humans do reviews, tools do static analysis (compilers, linters, security analysers). It finds defects directly and early — including defects dynamic testing cannot provoke at runtime — making it the engine of defect prevention and shift-left. Reviews range from informal pair checks, through author-led walkthroughs and peer-based technical reviews, to the most formal inspections with trained moderators, rules, checklists, and metrics. Roles — author, facilitator, scribe, reviewer, review leader, manager — can combine in small reviews. Success depends on the right people, enough preparation, capped review rates, and a blame-free culture aimed at the product, not the person.

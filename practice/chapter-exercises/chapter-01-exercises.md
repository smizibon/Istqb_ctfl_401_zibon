# Chapter 1 Exercises — Fundamentals of Testing
*25 exam-style questions. Rules: closed book, ~90 seconds each, mark unsure ones. Then check [`../answer-explanations/chapter-01-answers.md`](../answer-explanations/chapter-01-answers.md). Target ≥ 80% (20/25).*

**1.** Which of the following BEST describes software testing?
a) Executing software with the intent of finding failures
b) The process of evaluating a work product to determine whether it satisfies requirements and to detect differences between given and expected results
c) The activity of finding, analysing and removing the causes of failures in code
d) Inspecting requirement documents to prevent defects

**2.** Which is a debugging activity, not a testing activity?
a) Designing a test case for a defect found in production
b) Reproducing a failure reported by a tester
c) Analysing the code to locate the cause of a failure and fixing it
d) Reporting a failure with steps to reproduce

**3.** A tester examines a requirements document to find ambiguities, without running any code. This is:
a) Dynamic testing, because testing includes any quality activity
b) Static testing, because the work product is examined without execution
c) Debugging, because no execution is involved
d) Quality assurance, and therefore not testing

**4.** Which of the following is NOT a typical objective of testing?
a) Preventing defects through early requirements review
b) Gaining confidence in the level of quality
c) Proving the software contains no defects
d) Providing information to stakeholders for decision-making

**5.** A developer misreads a specification and writes an incorrect formula. The system runs the formula and produces a wrong invoice total. In order: what are the mistake, the flaw, and the observed deviation?
a) Failure, error, defect
b) Error, defect, failure
c) Defect, failure, error
d) Error, failure, defect

**6.** Which statement about defects and failures is TRUE?
a) Every defect eventually causes a failure
b) A failure can only be caused by a defect in the code
c) A defect may exist in a work product without ever causing a failure
d) Failures never occur when the hardware and environment are stable

**7.** Which of the following is a typical root cause of errors?
a) Executing too many test cases
b) Excessive product documentation
c) Time pressure combined with human fallibility
d) Using equivalence partitioning

**8.** A system passes all 12,000 planned test cases. Management concludes the system is defect-free. Which principle have they violated?
a) Defect clustering
b) Testing shows the presence of defects, not their absence
c) Pesticide paradox
d) Testing is context dependent

**9.** Testing every possible combination of input values for a form with 10 fields, each accepting 50 values, is rejected by the test team. Which principle justifies their decision, and what is the correct alternative?
a) Pesticide paradox; improve the tests regularly
b) Exhaustive testing is impossible; test based on risk and prioritisation
c) Defect clustering; test the most complex modules
d) Early testing; start reviewing requirements

**10.** 80% of production defects come from 3 of the system's 40 modules. The test manager allocates disproportionate effort to those modules. Which principle applies?
a) Shift-left
b) Absence-of-errors fallacy
c) Defect clustering
d) The pesticide paradox

**11.** A regression suite that found many defects last year finds nothing new for six months. The BEST response is to:
a) Run the suite more frequently
b) Retire the suite entirely
c) Improve and update the tests to find new defects
d) Reduce development quality checks

**12.** A team replaced a safety-critical medical device's test approach with a lightweight e-commerce-style approach. Which principle did they ignore?
a) Testing is context dependent
b) Testing shows presence of defects
c) Error fallacy
d) Defect clustering

**13.** All known defects were fixed and the product fully meets its (incorrectly specified) requirements — but users reject it because it doesn't do what they need. Which principle explains this failure?
a) Pesticide paradox
b) Absence-of-errors fallacy
c) Exhaustive testing is impossible
d) Defect clustering

**14.** Which of the following is a work product of test analysis?
a) Test plan
b) Test conditions
c) Defect reports
d) Test completion report

**15.** Which activity turns test cases into ordered, executable test procedures and prepares environments?
a) Test design
b) Test analysis
c) Test implementation
d) Test monitoring

**16.** A test case MUST include:
a) The defect it is expected to find
b) An expected result
c) Automated execution
d) Traceability to code

**17.** What is the "test basis"?
a) The body of information a test is based on, such as requirements or user stories
b) The set of all executed test cases
c) The test team's experience
d) The final test completion report

**18.** Traceability between requirements, test conditions and test cases does NOT enable:
a) Coverage evaluation of requirements
b) Impact analysis when a requirement changes
c) Automatic elimination of defects
d) Audit and reporting on testing

**19.** Which list correctly orders increasing independence?
a) Author's own testing → independent testers inside the team → independent external test organisation
b) External testers → team testers → author
c) Team testers → author → external testers
d) Author → external testers → team testers

**20.** A drawback of high tester independence is:
a) Testers become too objective
b) Independent testers may lack product and developer knowledge
c) Independent testers always find fewer defects
d) Independence makes developer testing unnecessary

**21.** In the whole-team approach, the tester's role includes:
a) Owning all quality responsibilities so developers can focus on code
b) Coaching and supporting non-testers on quality matters and collaborating on testability
c) Refusing to talk to developers to preserve independence
d) Testing only after development is complete

**22.** Which statement about the universal ethical principle for testers is correct?
a) The employer's commercial interest always comes first
b) The client's deadlines override all other concerns
c) The public interest takes precedence when in conflict with other interests
d) Testers owe loyalty only to the test manager

**23.** "Verifying that the system meets its specified requirements" vs. "checking the system meets user needs" correspond respectively to:
a) Validation, verification
b) Verification, validation
c) Testing, debugging
d) Quality control, testing

**24.** Quality assurance differs from quality control because QA:
a) Is product-oriented and detects defects by testing
b) Is process-oriented and aims to prevent defects
c) Only applies after release
d) Is performed exclusively by testers

**25.** Testing contributes to success in all of the following ways EXCEPT:
a) Frequent early feedback enabling cheaper defect removal
b) Reducing the risk of failures in operation
c) Guaranteeing on-time delivery
d) Providing quality measures used for release decisions

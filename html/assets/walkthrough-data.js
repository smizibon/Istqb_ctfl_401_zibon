(function(){
window.WALKTHROUGHS = {
  "techniques": [
    {
      "id": "ep",
      "name": "Equivalence partitioning — minimum test count",
      "recipe": "One test per valid partition; EACH invalid partition gets its own test case.",
      "drillHref": "drills.html#w-bva",
      "cards": [
        {
          "id": "ep-a20",
          "source": "Exam A · Q20",
          "lo": "FL-4.2.1",
          "k": "K3",
          "appendix": false,
          "stem": "You are testing a simplified apartment search form which has only two search criteria:<br>- floor (with three possible options: ground floor; first floor; second or higher floor)<br>- garden type (with three possible options: no garden; small garden; large garden)<br>Each of the apartments on the ground floor has a garden, apartments on higher floors don&#x27;t. The form has a built-in validation mechanism that will not allow you to use the search criteria which violate this rule.<br><br>Each test has two input values: floor and garden type. You want to apply equivalence partitioning (EP) to cover each floor and each garden type in your tests.<br><br>What is the minimal number of test cases to achieve 100% EP coverage for valid partitions?<br><ul><li>a). 3</li><li>b). 4</li><li>c). 5</li><li>d). 6</li></ul>",
          "answer": "b",
          "answerText": "4",
          "steps": [
            {
              "t": "Rule",
              "d": "One test per valid partition; EACH invalid partition gets its own test case. Here all partitions are valid, so we pair floor and garden values without wasting tests.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Identify partitions",
              "d": "Floor has 3 partitions (ground / first / second-or-higher) and garden type has 3 (no garden / small / large). The validation rule constrains the pairs: every ground-floor apartment has a garden, higher floors never do.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Write the pairs",
              "d": "Small garden and large garden only combine with ground floor, so two ground-floor tests cover those two garden partitions; first floor and second-or-higher each take one more test with \"no garden\" — which also covers the last garden partition.",
              "viz": {
                "type": "dt",
                "head": [
                  "Test",
                  "Floor",
                  "Garden type"
                ],
                "rows": [
                  [
                    "TC1",
                    "ground",
                    "small"
                  ],
                  [
                    "TC2",
                    "ground",
                    "large"
                  ],
                  [
                    "TC3",
                    "first",
                    "no garden"
                  ],
                  [
                    "TC4",
                    "second+",
                    "no garden"
                  ]
                ],
                "hl": [
                  0,
                  1,
                  2,
                  3
                ]
              }
            },
            {
              "t": "Count",
              "d": "4 tests cover all 3 floor partitions and all 3 garden partitions with no invalid combination.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "4 test cases maps to option (b).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "Exam B · Q20",
          "href": "official-bank.html#ch4-k3"
        },
        {
          "source": "Exam C · Q20",
          "href": "official-bank.html#ch4-k3"
        },
        {
          "source": "Exam D · Q20 (select TWO)",
          "href": "official-bank.html#ch4-k3"
        }
      ]
    },
    {
      "id": "bva",
      "name": "Boundary value analysis — 2-value and 3-value sets",
      "recipe": "2-value (ISTQB default): {boundary, nearest neighbour} · 3-value: {b−1, b, b+1}",
      "drillHref": "drills.html#w-bva",
      "cards": [
        {
          "id": "bva-a21",
          "source": "Exam A · Q21",
          "lo": "FL-4.2.2",
          "k": "K3",
          "appendix": false,
          "stem": "You are testing a system that calculates the final course grade for a given student.<br>The final grade is assigned based on the final result, according to the following rules:<br>- 0–50 points: failed<br>- 51–60 points: fair<br>- 61–70 points: satisfactory<br>- 71–80 points: good<br>- 81–90 points: very good<br>- 91–100 points: excellent<br>You have prepared the following set of test cases:<br><br>     | Final result | Final grade<br>TC1  | 91           | excellent<br>TC2  | 50           | failed<br>TC3  | 81           | very good<br>TC4  | 60           | fair<br>TC5  | 70           | satisfactory<br>TC6  | 80           | good<br><br>What is the 2-value boundary value analysis (BVA) coverage for the final result that is achieved with the existing test cases?<br><ul><li>a). 50%</li><li>b). 60%</li><li>c). 33.3%</li><li>d). 100%</li></ul>",
          "answer": "a",
          "answerText": "50%",
          "steps": [
            {
              "t": "Rule",
              "d": "2-value BVA (ISTQB default): {boundary, nearest neighbour}; 3-value: {b−1, b, b+1}. Each partition contributes its min and max as boundary values.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "List the boundary values",
              "d": "Six partitions give 12 boundary values: 0, 50 | 51, 60 | 61, 70 | 71, 80 | 81, 90 | 91, 100.",
              "viz": {
                "type": "numline",
                "lo": 0,
                "hi": 100,
                "on": [
                  0,
                  50,
                  51,
                  60,
                  61,
                  70,
                  71,
                  80,
                  81,
                  90,
                  91,
                  100
                ]
              }
            },
            {
              "t": "Match the test cases",
              "d": "TC1–TC6 use 91, 50, 81, 60, 70, 80 — six of the twelve boundary values are exercised (one from each pair).",
              "viz": {
                "type": "numline",
                "lo": 0,
                "hi": 100,
                "on": [
                  50,
                  60,
                  70,
                  80,
                  81,
                  91
                ]
              }
            },
            {
              "t": "Compute",
              "d": "6 / 12 = 50% 2-value BVA coverage.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "50% maps to option (a).",
              "viz": {
                "type": "none"
              }
            }
          ]
        },
        {
          "id": "bva-b21",
          "source": "Exam B · Q21",
          "lo": "FL-4.2.2",
          "k": "K3",
          "appendix": false,
          "stem": "You are testing a form that verifies the correctness of the length of the password given as input. The form accepts a password with the correct length and rejects a password that is too short or too long. The password length is correct if it has between 6 and 12 characters inclusive. Otherwise, it is considered incorrect.<br>At first, the form is empty (password length = 0). You apply boundary value analysis to the &quot;password length&quot; variable.<br>Your set of test cases achieves 100% 2-value boundary value coverage. The team decided that due to the high risk of this component, test cases should be added to ensure 100% 3-value boundary value coverage.<br>Which additional password lengths should be tested to achieve this?<br>Select ONE option.<br><ul><li>a). 4, 5, 13, 14</li><li>b). 7, 11</li><li>c). 1, 5, 13</li><li>d). 1, 4, 7, 11, 14</li></ul>",
          "answer": "d",
          "answerText": "1, 4, 7, 11, 14",
          "steps": [
            {
              "t": "Rule",
              "d": "2-value BVA (ISTQB default): {boundary, nearest neighbour}; 3-value: {b−1, b, b+1}. Moving from 2-value to 3-value coverage adds the neighbours one step further out on each side.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Full 3-value set",
              "d": "Three partitions — too short {0..5}, OK {6..12}, too long {13..∞}. Full 3-value coverage needs 0, 1, 4, 5, 6, 7, 11, 12, 13, 14.",
              "viz": {
                "type": "numline",
                "lo": 0,
                "hi": 14,
                "on": [
                  0,
                  1,
                  4,
                  5,
                  6,
                  7,
                  11,
                  12,
                  13,
                  14
                ]
              }
            },
            {
              "t": "Subtract what is already tested",
              "d": "100% 2-value coverage means 0, 5, 6, 12 and 13 are already tested. What remains to add is 1, 4, 7, 11 and 14.",
              "viz": {
                "type": "numline",
                "lo": 0,
                "hi": 14,
                "on": [
                  1,
                  4,
                  7,
                  11,
                  14
                ]
              }
            },
            {
              "t": "Answer",
              "d": "The additional lengths 1, 4, 7, 11, 14 map to option (d).",
              "viz": {
                "type": "none"
              }
            }
          ]
        },
        {
          "id": "bva-a15",
          "source": "Exam A · A15 (appendix)",
          "lo": "FL-4.2.2",
          "k": "K3",
          "appendix": true,
          "stem": "A wine storage system uses a control device that measures the wine cell temperature T (measured in °C, rounded to the nearest degree) and alarms the user if it deviates from the optimal value of 12, according to the following rules:<br>- if T = 12, the system says, &quot;optimal temperature&quot;<br>- if T &lt; 12, the system says, &quot;temperature is too low!&quot;<br>- if T &gt; 12, the system says, &quot;temperature is too high!&quot;<br>You want to use the 3-point boundary value analysis (BVA) to verify the behavior of the control device. A test input is a temperature in °C provided by the device.<br><br>What is the MINIMAL set of test inputs that achieves 100% of the desired coverage?<br><ul><li>a). 11, 12, 13</li><li>b). 10, 12, 14</li><li>c). 10, 11, 12, 13, 14</li><li>d). 10, 11, 13, 14</li></ul>",
          "answer": "c",
          "answerText": "10, 11, 12, 13, 14",
          "steps": [
            {
              "t": "Rule",
              "d": "2-value BVA (ISTQB default): {boundary, nearest neighbour}; 3-value: {b−1, b, b+1}. For each partition boundary test the boundary and both neighbours.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Identify partitions",
              "d": "T ≤ 11 (\"too low\"), T = 12 (\"optimal\"), T ≥ 13 (\"too high\"). The boundaries sit on both sides of the single point 12.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Write the 3-value set",
              "d": "Boundaries 11|12 and 12|13 give {10, 11, 12} and {12, 13, 14}; the union is 10, 11, 12, 13, 14.",
              "viz": {
                "type": "numline",
                "lo": 9,
                "hi": 15,
                "on": [
                  10,
                  11,
                  12,
                  13,
                  14
                ]
              }
            },
            {
              "t": "Answer",
              "d": "The minimal 100% 3-value set {10, 11, 12, 13, 14} maps to option (c).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "Exam C · Q21",
          "href": "official-bank.html#ch4-k3"
        },
        {
          "source": "Exam D · Q21",
          "href": "official-bank.html#ch4-k3"
        }
      ]
    },
    {
      "id": "dt",
      "name": "Decision tables — coverage and impossible rules",
      "recipe": "Full rules = product of condition values; collapse rules ONLY when actions are identical; minimum tests = collapsed rules",
      "drillHref": "drills.html#w-dt",
      "cards": [
        {
          "id": "dt-b22",
          "source": "Exam B · Q22",
          "lo": "FL-4.2.3",
          "k": "K3",
          "appendix": false,
          "stem": "The following decision table contains the rules for determining the risk of atherosclerosis.<br><br>| | Rule 1 | Rule 2 | Rule 3 | Rule 4 | Rule 5 |<br>|---|---|---|---|---|---|<br>| Conditions: Cholesterol (mg/dl) | ≤124 | ≤ 124 | 125 – 200 | 125 – 200 | ≥ 201 |<br>| Blood pressure (mm Hg) | ≤ 140 | &gt; 140 | ≤ 140 | &gt; 140 | – |<br>| Action: Risk level | very low | low | medium | high | very high |<br><br>You designed the test cases with the following input data:<br>TC1: Cholesterol = 125 mg/dl, Blood pressure = 141 mm Hg<br>TC2: Cholesterol = 200 mg/dl, Blood pressure = 201 mm Hg<br>TC3: Cholesterol = 124 mg/dl, Blood pressure = 201 mm Hg<br>TC4: Cholesterol = 109 mg/dl, Blood pressure = 200 mm Hg<br>TC5: Cholesterol = 201 mg/dl, Blood pressure = 140 mm Hg<br>What is the decision table coverage achieved by these test cases?<br>Select ONE option.<br><ul><li>a). 40%</li><li>b). 60%</li><li>c). 80%</li><li>d). 100%</li></ul>",
          "answer": "b",
          "answerText": "60%",
          "steps": [
            {
              "t": "Rule",
              "d": "Decision table coverage = number of rules exercised by at least one test ÷ total number of rules.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Map each test to its rule",
              "d": "TC1 (125, 141) → Rule 4; TC2 (200, 201) → Rule 4; TC3 (124, 201) → Rule 2; TC4 (109, 200) → Rule 2; TC5 (201, 140) → Rule 5.",
              "viz": {
                "type": "dt",
                "head": [
                  "Rule",
                  "Chol (mg/dl)",
                  "BP (mm Hg)",
                  "Risk"
                ],
                "rows": [
                  [
                    "R1",
                    "≤124",
                    "≤140",
                    "very low"
                  ],
                  [
                    "R2",
                    "≤124",
                    ">140",
                    "low"
                  ],
                  [
                    "R3",
                    "125–200",
                    "≤140",
                    "medium"
                  ],
                  [
                    "R4",
                    "125–200",
                    ">140",
                    "high"
                  ],
                  [
                    "R5",
                    "≥201",
                    "–",
                    "very high"
                  ]
                ],
                "hl": [
                  1,
                  3,
                  4
                ]
              }
            },
            {
              "t": "Count covered rules",
              "d": "Rules 2, 4 and 5 are covered; rules 1 and 3 are never hit.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Compute",
              "d": "3 / 5 rules = 60% decision table coverage.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "60% maps to option (b).",
              "viz": {
                "type": "none"
              }
            }
          ]
        },
        {
          "id": "dt-d22",
          "source": "Exam D · Q22",
          "lo": "FL-4.2.3",
          "k": "K3",
          "appendix": false,
          "stem": "You are designing test cases based on the following decision table.<br>         R1      R2      R3      R4      R5      R6      R7<br>C1: Age  0-18   19-65   19-65   &gt;65     0-18    19-65   &gt;65<br>C2: Experience  -    0-4     &gt;4       -       -       -      -<br>C3: Registered? NO      NO      NO      NO      YES     YES     YES<br>Category  A       A       B       B       B       D       C<br><br>So far you have designed the following test cases:<br>• TC1: 19-year-old, unregistered man with no experience; expected result: category A<br>• TC2: 65-year-old, unregistered woman with 5 years of experience; expected result: category B<br>• TC3: 66-year-old, registered man with no experience; expected result: category C<br>• TC4: 65-year-old, registered woman with 4 years of experience; expected result: category D<br>Which of the following test cases, when added to the existing set of test cases, will increase the decision table coverage?<br><ul><li>a). 66-year-old, unregistered man with no experience; expected result: category B</li><li>b). 55-year-old, unregistered woman with 2 years of experience; expected result: category A</li><li>c). 19-year-old, registered woman with 5 years of experience; expected result: category D</li><li>d). No additional test case can increase the already achieved decision table coverage</li></ul>",
          "answer": "a",
          "answerText": "66-year-old, unregistered man with no experience; expected result: category B",
          "steps": [
            {
              "t": "Rule",
              "d": "Decision table coverage increases only when a new test exercises a rule that no existing test has hit.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Map the existing tests",
              "d": "TC1 (19, unregistered, 0 yrs) → R2; TC2 (65, unregistered, 5 yrs) → R3; TC3 (66, registered) → R7; TC4 (65, registered, 4 yrs) → R6. Rules 2, 3, 6 and 7 are already covered.",
              "viz": {
                "type": "dt",
                "head": [
                  "Rule",
                  "Age",
                  "Exp",
                  "Reg?",
                  "Cat"
                ],
                "rows": [
                  [
                    "R1",
                    "0-18",
                    "-",
                    "NO",
                    "A"
                  ],
                  [
                    "R2",
                    "19-65",
                    "0-4",
                    "NO",
                    "A"
                  ],
                  [
                    "R3",
                    "19-65",
                    ">4",
                    "NO",
                    "B"
                  ],
                  [
                    "R4",
                    ">65",
                    "-",
                    "NO",
                    "B"
                  ],
                  [
                    "R5",
                    "0-18",
                    "-",
                    "YES",
                    "B"
                  ],
                  [
                    "R6",
                    "19-65",
                    "-",
                    "YES",
                    "D"
                  ],
                  [
                    "R7",
                    ">65",
                    "-",
                    "YES",
                    "C"
                  ]
                ],
                "hl": [
                  1,
                  2,
                  5,
                  6
                ]
              }
            },
            {
              "t": "Check the options",
              "d": "(b) hits R2 again, (c) hits R6 again — no new rule. (a) is a 66-year-old unregistered man → Rule 4, which is not yet covered.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "The test case exercising Rule 4 maps to option (a).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "Exam A · Q22",
          "href": "official-bank.html#ch4-k3"
        },
        {
          "source": "Exam C · Q22",
          "href": "official-bank.html#ch4-k3"
        }
      ]
    },
    {
      "id": "state",
      "name": "State transition testing — valid transitions coverage",
      "recipe": "Count TRANSITIONS, not states; invalid (event, state) pairs are also test cases; 0-switch coverage = every valid transition exercised once",
      "drillHref": "drills.html#w-sm",
      "cards": [
        {
          "id": "state-d23",
          "source": "Exam D · Q23",
          "lo": "FL-4.2.4",
          "k": "K3",
          "appendix": false,
          "stem": "You are applying state transition testing to the hotel room reservation system modeled by the following state transition table, with 4 states and 5 different events:<br><br>Events:        Available  NotAvailable  ChangeRoom  Cancel  Pay<br>S1: Requesting    S2          S3<br>S2: Confirmed                               S1          S4      S4<br>S3: Waiting list  S2                                   S4<br>S4: End<br><br>Assuming all test cases start in the &#x27;Requesting&#x27; state, which of the following test cases, represented as sequences of events, achieves the highest valid transitions coverage?<br><ul><li>a). NotAvailable, Available, ChangeRoom, NotAvailable, Cancel</li><li>b). Available, ChangeRoom, NotAvailable, Available, Pay</li><li>c). Available, ChangeRoom, Available, ChangeRoom, NotAvailable</li><li>d). NotAvailable, Cancel, ChangeRoom, Available, Pay</li></ul>",
          "answer": "b",
          "answerText": "Available, ChangeRoom, NotAvailable, Available, Pay",
          "steps": [
            {
              "t": "Rule",
              "d": "Count TRANSITIONS, not states; invalid (event, state) pairs are also test cases; 0-switch coverage = every valid transition exercised once. The highest valid-transitions coverage comes from the longest feasible sequence of distinct valid transitions.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Enumerate valid transitions",
              "d": "From the table: S1→S2 (Available), S1→S3 (NotAvailable), S2→S1 (ChangeRoom), S2→S4 (Cancel), S2→S4 (Pay), S3→S2 (Available), S3→S4 (Cancel) — 7 valid transitions (S2→S4 is TWO distinct transitions: via Cancel and via Pay).",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Play back option (b)",
              "d": "Available (S1→S2), ChangeRoom (S2→S1), NotAvailable (S1→S3), Available (S3→S2), Pay (S2→S4): every event fires a valid transition and 5 of the 7 are covered, ending in End.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Compare",
              "d": "Option (a) repeats S1→S3 (4 distinct); (c) repeats two transitions (3 distinct); (d) fails — after Cancel it reaches S4 (End), and no event has a valid transition from S4, so the third event ChangeRoom cannot fire.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "The highest valid transitions coverage maps to option (b).",
              "viz": {
                "type": "none"
              }
            }
          ]
        },
        {
          "id": "state-b23",
          "source": "Exam B · Q23",
          "lo": "FL-4.2.4",
          "k": "K3",
          "appendix": false,
          "stem": "A storage system can store up to three elements and is modeled by the following state transition diagram. The variable N represents the number of currently stored elements. [State transition diagram referenced in the original PDF.]<br>Which of the following test cases, represented as sequences of events, achieves the highest level of valid transitions coverage?<br>Select ONE option.<br><ul><li>a). Add, Remove, Add, Add, Add</li><li>b). Add, Add, Add, Add, Remove, Remove</li><li>c). Add, Add, Add, Remove, Remove</li><li>d). Add, Add, Add, Remove, Add</li></ul>",
          "answer": "c",
          "answerText": "Add, Add, Add, Remove, Remove",
          "steps": [
            {
              "t": "Rule",
              "d": "Count TRANSITIONS, not states; 0-switch coverage = every valid transition exercised once. A sequence only counts transitions that are valid in the current state (N = 0, 1, 2, 3 stored elements).",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Enumerate valid transitions",
              "d": "The diagram has 5 distinct transitions: Add N=0→1, Add N=1→2, Add N=2→3 (enters FULL), Remove from FULL (N=3→2), Remove while not FULL (N=2→1 or N=1→0).",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Play back option (c)",
              "d": "Add (N:0→1), Add (N:1→2), Add (N:2→3, enters FULL), Remove (from FULL), Remove (N:2→1): every step is valid and 5 of 5 valid transitions are covered — 100%.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Eliminate",
              "d": "(a) covers only 4 of 5; (b) is infeasible — the fourth Add fires in the FULL state; (d) repeats transitions and covers fewer.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "100% valid transitions coverage maps to option (c).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "Exam A · Q23 (diagram in PDF)",
          "href": "official-bank.html#ch4-k3"
        },
        {
          "source": "Exam C · Q23 (diagram in PDF)",
          "href": "official-bank.html#ch4-k3"
        }
      ]
    },
    {
      "id": "coverage",
      "name": "Statement & branch coverage arithmetic",
      "recipe": "100% branch ⇒ 100% statement — never the reverse; coverage cannot detect missing functionality",
      "drillHref": "drills.html#w-cov",
      "cards": [
        {
          "id": "cov-b24",
          "source": "Exam B · Q24",
          "lo": "FL-4.3.1",
          "k": "K2",
          "appendix": false,
          "stem": "You run two test cases, T1 and T2, on the same code. Test T1 achieved 40% statement coverage and test T2 achieved 65% statement coverage.<br>Which of the following sentences must be necessarily true?<br>Select ONE option.<br><ul><li>a). The test suite composed of tests T1 and T2 achieves 105% statement coverage</li><li>b). There exists at least one statement that must have been executed by both T1 and T2</li><li>c). At least 5% of the statements in the code that was tested are non-executable</li><li>d). The test suite composed of tests T1 and T2 achieves full branch coverage</li></ul>",
          "answer": "b",
          "answerText": "There exists at least one statement that must have been executed by both T1 and T2",
          "steps": [
            {
              "t": "Rule",
              "d": "100% branch ⇒ 100% statement — never the reverse; coverage cannot detect missing functionality. Statement coverage of a suite = union of the statements executed, so it can never exceed 100%.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Add the percentages",
              "d": "T1 executed 40% of the statements, T2 executed 65%: 40% + 65% = 105% of the statements accounted for (with multiplicity).",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Reason about the overlap",
              "d": "Since a suite cannot exceed 100%, at least 105% − 100% = 5% of the statements must have been executed by both T1 and T2.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "At least one statement was executed by both tests maps to option (b).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "Exam C · Q24 (K2, graph in PDF)",
          "href": "official-bank.html#ch4-k3"
        },
        {
          "source": "Exam D · Q24 (K2, same overlap arithmetic: 3×50% vs 100% union)",
          "href": "official-bank.html#ch4-k3"
        }
      ]
    },
    {
      "id": "est",
      "name": "Test effort estimation — three-point & ratios",
      "recipe": "Three-point estimate = (O + 4·M + P) / 6; ratio-based estimate = averaged test-to-development effort ratio × estimated development effort",
      "drillHref": "official-bank.html#ch5",
      "cards": [
        {
          "id": "est-a32",
          "source": "Exam A · Q32",
          "lo": "FL-5.1.4",
          "k": "K3",
          "appendix": false,
          "stem": "Your team uses the three-point estimation technique to estimate the test effort for a new high-risk feature. The following estimates were made:<br>- Most optimistic estimation: 2 person-hours<br>- Most likely estimation: 11 person-hours<br>- Most pessimistic estimation: 14 person-hours<br>What is the final estimate?<br><ul><li>a). 9 person-hours</li><li>b). 14 person-hours</li><li>c). 11 person-hours</li><li>d). 10 person-hours</li></ul>",
          "answer": "d",
          "answerText": "10 person-hours",
          "steps": [
            {
              "t": "Rule",
              "d": "Three-point estimate = (O + 4·M + P) / 6, with O = most optimistic, M = most likely, P = most pessimistic.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Substitute",
              "d": "O = 2, M = 11, P = 14 person-hours: (2 + 4·11 + 14) / 6 = (2 + 44 + 14) / 6 = 60 / 6.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Compute",
              "d": "60 / 6 = 10 person-hours.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "10 person-hours maps to option (d).",
              "viz": {
                "type": "none"
              }
            }
          ]
        },
        {
          "id": "est-d31",
          "source": "Exam D · Q31",
          "lo": "FL-5.1.4",
          "k": "K3",
          "appendix": false,
          "stem": "The team wants to estimate the time needed for one tester to execute four test cases for a software component. The team has gathered the following measures of the effort used to execute a single test case:<br>• Best-case scenario: 1 hour<br>• Worst-case scenario: 8 hours<br>• Most likely scenario: 3 hours<br>Given that the three-point estimation technique is being used, what is the final estimate of the time needed to execute all four test cases?<br><ul><li>a). 14 hours</li><li>b). 3.5 hours</li><li>c). 16 hours</li><li>d). 12 hours</li></ul>",
          "answer": "a",
          "answerText": "14 hours",
          "steps": [
            {
              "t": "Rule",
              "d": "Three-point estimate = (O + 4·M + P) / 6, with O = best case, M = most likely, P = worst case.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Estimate one test case",
              "d": "O = 1, M = 3, P = 8 hours: (1 + 4·3 + 8) / 6 = 21 / 6 = 3.5 hours per test case.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Scale to four test cases",
              "d": "3.5 × 4 = 14 hours for executing all four test cases.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "14 hours maps to option (a).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "Exam B · Q31 (ratio-based)",
          "href": "official-bank.html#ch5"
        },
        {
          "source": "Exam C · Q31 (extrapolation)",
          "href": "official-bank.html#ch5"
        },
        {
          "source": "Exam A · A20 (appendix, planning poker)",
          "href": "official-bank.html#ch5"
        }
      ]
    },
    {
      "id": "metrics",
      "name": "Test prioritization & scheduling math",
      "recipe": "Test scheduling: dependencies gate execution; among the runnable tests, execute the highest priority (lowest number) first",
      "drillHref": "official-bank.html#ch5",
      "cards": [
        {
          "id": "met-a33",
          "source": "Exam A · Q33",
          "lo": "FL-5.1.5",
          "k": "K3",
          "appendix": false,
          "stem": "You are testing a mobile application that allows users to find a nearby restaurant based on the type of food they want to eat. Consider the following list of test cases, priorities (i.e., a smaller number means a higher priority), and dependencies:<br><br>Test case number | Test condition covered | Priority | Logical dependency<br>TC 001 | Select type of food | 3 | none<br>TC 002 | Select restaurant | 2 | TC 001<br>TC 003 | Get direction | 1 | TC 002<br>TC 004 | Call restaurant | 2 | TC 002<br>TC 005 | Make reservation | 3 | TC 002<br>Which of the following test cases should be executed as the third one?<br><ul><li>a). TC 003</li><li>b). TC 005</li><li>c). TC 002</li><li>d). TC 001</li></ul>",
          "answer": "a",
          "answerText": "TC 003",
          "steps": [
            {
              "t": "Rule",
              "d": "Test scheduling: dependencies gate execution — a test runs only after its dependency has passed; among the runnable tests, execute the one with the highest priority (lowest number) first.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Find the runnable order",
              "d": "TC 001 (priority 3) has no dependency, so it runs first. That unlocks TC 002 (priority 2), which runs second and unlocks TC 003 (priority 1), TC 004 (2) and TC 005 (3).",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Pick the third",
              "d": "Among the newly runnable tests, TC 003 has the highest priority (1), so it is executed third.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "TC 003 maps to option (a).",
              "viz": {
                "type": "none"
              }
            }
          ]
        },
        {
          "id": "met-d32",
          "source": "Exam D · Q32",
          "lo": "FL-5.1.5",
          "k": "K3",
          "appendix": false,
          "stem": "The table shows the traceability matrix from test cases to requirements. &quot;X&quot; means that a given test case covers the corresponding requirement.<br>        Req1  Req2  Req3  Req4  Req5  Req6  Req7<br>TC1      X           X     X           X<br>TC2      X                 X     X<br>TC3                  X           X     X<br>TC4            X<br>You want to prioritize the test cases following the additional coverage prioritization technique. You execute all four test cases.<br>Which test case should be executed as the LAST one?<br><ul><li>a). TC1</li><li>b). TC2</li><li>c). TC3</li><li>d). TC4</li></ul>",
          "answer": "b",
          "answerText": "TC2",
          "steps": [
            {
              "t": "Rule",
              "d": "Additional coverage prioritization: repeatedly execute the test that covers the most not-yet-covered requirements; the LAST test executed is the one that adds nothing new by then.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Rank by new requirements",
              "d": "TC1 covers Req 1, 3, 4, 6 (4 new) → first. After that TC2, TC3 and TC4 each add exactly one new requirement (TC2/TC3 → Req5, TC4 → Req2).",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Continue greedily",
              "d": "TC2, TC3 and TC4 each add exactly one new requirement — the order among them is a tie-break that doesn't change the outcome; run TC3 (Req5), then TC4 (Req2). By then Req 1–6 are covered, and TC2 only touches Req 1, 4, 5 — all already covered.",
              "viz": {
                "type": "dt",
                "head": [
                  "Order",
                  "Test",
                  "New requirements"
                ],
                "rows": [
                  [
                    "1st",
                    "TC1",
                    "Req1, Req3, Req4, Req6"
                  ],
                  [
                    "2nd",
                    "TC3",
                    "Req5"
                  ],
                  [
                    "3rd",
                    "TC4",
                    "Req2"
                  ],
                  [
                    "4th",
                    "TC2",
                    "none"
                  ]
                ],
                "hl": [
                  3
                ]
              }
            },
            {
              "t": "Answer",
              "d": "TC2, executed last with zero additional coverage, maps to option (b).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "Exam B · Q32",
          "href": "official-bank.html#ch5"
        },
        {
          "source": "Exam C · Q32 (graph in PDF)",
          "href": "official-bank.html#ch5"
        },
        {
          "source": "Exam D · Q34 (K1, risk impact)",
          "href": "official-bank.html#ch5"
        }
      ]
    }
  ]
};
})();

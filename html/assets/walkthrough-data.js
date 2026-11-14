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
          "id": "ep-01",
          "source": "Original practice",
          "lo": "FL-4.2.1",
          "k": "K3",
          "appendix": false,
          "stem": "You are testing a simplified train search screen which has only two search criteria:<br>- line (with three possible options: coastal; valley; mountain)<br>- seat (with three possible options: no reservation; window seat; aisle seat)<br>On the coastal line every train takes seat reservations, so a window or aisle seat must be chosen; valley and mountain trains are unreserved, so no seat can be chosen. The form has a built-in validation mechanism that will not allow you to use search criteria which violate this rule.<br><br>Each test has two input values: line and seat. You want to apply equivalence partitioning (EP) to cover each line and each seat option in your tests.<br><br>What is the minimal number of test cases to achieve 100% EP coverage for valid partitions?<br><ul><li>a). 3</li><li>b). 4</li><li>c). 5</li><li>d). 6</li></ul>",
          "answer": "b",
          "answerText": "4",
          "steps": [
            {
              "t": "Rule",
              "d": "One test per valid partition; EACH invalid partition gets its own test case. Here all partitions are valid, so we pair line and seat values without wasting tests.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Identify partitions",
              "d": "Line has 3 partitions (coastal / valley / mountain) and seat has 3 (no reservation / window / aisle). The validation rule constrains the pairs: window and aisle exist only on coastal trains, valley and mountain never offer a seat.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Write the pairs",
              "d": "Window and aisle only combine with the coastal line, so two coastal tests cover those two seat partitions; valley and mountain each take one more test with \"no reservation\" — which also covers the last seat partition.",
              "viz": {
                "type": "dt",
                "head": [
                  "Test",
                  "Line",
                  "Seat"
                ],
                "rows": [
                  [
                    "TC1",
                    "coastal",
                    "window"
                  ],
                  [
                    "TC2",
                    "coastal",
                    "aisle"
                  ],
                  [
                    "TC3",
                    "valley",
                    "no reservation"
                  ],
                  [
                    "TC4",
                    "mountain",
                    "no reservation"
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
              "d": "4 tests cover all 3 line partitions and all 3 seat partitions with no invalid combination.",
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
          "source": "drill this type with new numbers →",
          "href": "drills.html#w-bva"
        },
        {
          "source": "official ISTQB exam samples (external)",
          "href": "official-samples.html"
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
          "id": "bva-01",
          "source": "Original practice",
          "lo": "FL-4.2.2",
          "k": "K3",
          "appendix": false,
          "stem": "You are testing a library system that assigns a loyalty tier to a member based on the number of books borrowed during the year (the system counts at most 99 books):<br>- 0–9 books: bronze<br>- 10–19 books: silver<br>- 20–29 books: gold<br>- 30–39 books: platinum<br>- 40–49 books: diamond<br>- 50–99 books: ambassador<br>You have prepared the following set of test cases:<br><br>     | Books borrowed | Tier<br>TC1  | 50             | ambassador<br>TC2  | 9              | bronze<br>TC3  | 40             | diamond<br>TC4  | 19             | silver<br>TC5  | 29             | gold<br>TC6  | 39             | platinum<br><br>What is the 2-value boundary value analysis (BVA) coverage for the number of books borrowed that is achieved with the existing test cases?<br><ul><li>a). 50%</li><li>b). 60%</li><li>c). 33.3%</li><li>d). 100%</li></ul>",
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
              "d": "Six partitions give 12 boundary values: 0, 9 | 10, 19 | 20, 29 | 30, 39 | 40, 49 | 50, 99.",
              "viz": {
                "type": "numline",
                "lo": 0,
                "hi": 99,
                "on": [
                  0,
                  9,
                  10,
                  19,
                  20,
                  29,
                  30,
                  39,
                  40,
                  49,
                  50,
                  99
                ]
              }
            },
            {
              "t": "Match the test cases",
              "d": "TC1–TC6 use 50, 9, 40, 19, 29, 39 — six of the twelve boundary values are exercised (one from each pair).",
              "viz": {
                "type": "numline",
                "lo": 0,
                "hi": 99,
                "on": [
                  9,
                  19,
                  29,
                  39,
                  40,
                  50
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
          "id": "bva-02",
          "source": "Original practice",
          "lo": "FL-4.2.2",
          "k": "K3",
          "appendix": false,
          "stem": "You are testing a grocery checkout form that verifies the length of the delivery instructions given as input. The form accepts instructions with the correct length and rejects instructions that are too short or too long. The instructions length is correct if it has between 12 and 30 characters inclusive. Otherwise, it is considered incorrect.<br>At first, the field is empty (instructions length = 0). You apply boundary value analysis to the &quot;instructions length&quot; variable.<br>Your set of test cases achieves 100% 2-value boundary value coverage. The team decided that due to the high risk of this component, test cases should be added to ensure 100% 3-value boundary value coverage.<br>Which additional instruction lengths should be tested to achieve this?<br>Select ONE option.<br><ul><li>a). 1, 10, 13, 29, 32</li><li>b). 10, 13, 29, 32</li><li>c). 0, 11, 31</li><li>d). 1, 10, 30, 31, 32</li></ul>",
          "answer": "a",
          "answerText": "1, 10, 13, 29, 32",
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
              "d": "Three partitions — too short {0..11}, OK {12..30}, too long {31..∞}. Full 3-value coverage needs 0, 1, 10, 11, 12, 13, 29, 30, 31, 32.",
              "viz": {
                "type": "numline",
                "lo": 0,
                "hi": 32,
                "on": [
                  0,
                  1,
                  10,
                  11,
                  12,
                  13,
                  29,
                  30,
                  31,
                  32
                ]
              }
            },
            {
              "t": "Subtract what is already tested",
              "d": "100% 2-value coverage means the partition extremes 0, 11, 12, 30 and 31 are already tested. What remains to add is 1, 10, 13, 29 and 32.",
              "viz": {
                "type": "numline",
                "lo": 0,
                "hi": 32,
                "on": [
                  1,
                  10,
                  13,
                  29,
                  32
                ]
              }
            },
            {
              "t": "Answer",
              "d": "The additional lengths 1, 10, 13, 29, 32 map to option (a).",
              "viz": {
                "type": "none"
              }
            }
          ]
        },
        {
          "id": "bva-03",
          "source": "Original practice",
          "lo": "FL-4.2.2",
          "k": "K3",
          "appendix": false,
          "stem": "A car insurance quoting system reads the applicant&#x27;s age A (measured in whole years) and sets the quote modifier according to the following rules:<br>- if A = 25, the system applies the &quot;standard rate&quot;<br>- if A &lt; 25, the system applies the &quot;young-driver surcharge&quot;<br>- if A &gt; 25, the system applies the &quot;experienced-driver rate&quot;<br>You want to use the 3-value boundary value analysis (BVA) to verify the behaviour of the quoting system. A test input is an applicant age in whole years provided to the system.<br><br>What is the MINIMAL set of test inputs that achieves 100% of the desired coverage?<br><ul><li>a). 24, 25, 26</li><li>b). 23, 25, 27</li><li>c). 23, 24, 25, 26, 27</li><li>d). 23, 24, 26, 27</li></ul>",
          "answer": "c",
          "answerText": "23, 24, 25, 26, 27",
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
              "d": "A ≤ 24 (\"young-driver surcharge\"), A = 25 (\"standard rate\"), A ≥ 26 (\"experienced-driver rate\"). The boundaries sit on both sides of the single point 25.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Write the 3-value set",
              "d": "Boundaries 24|25 and 25|26 give {23, 24, 25} and {25, 26, 27}; the union is 23, 24, 25, 26, 27.",
              "viz": {
                "type": "numline",
                "lo": 22,
                "hi": 28,
                "on": [
                  23,
                  24,
                  25,
                  26,
                  27
                ]
              }
            },
            {
              "t": "Answer",
              "d": "The minimal 100% 3-value set {23, 24, 25, 26, 27} maps to option (c).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "drill this type with new numbers →",
          "href": "drills.html#w-bva"
        },
        {
          "source": "official ISTQB exam samples (external)",
          "href": "official-samples.html"
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
          "id": "dt-01",
          "source": "Original practice",
          "lo": "FL-4.2.3",
          "k": "K3",
          "appendix": false,
          "stem": "The following decision table contains the rules for raising a reorder alert in a warehouse system.<br><br>| | Rule 1 | Rule 2 | Rule 3 | Rule 4 | Rule 5 |<br>|---|---|---|---|---|---|<br>| Conditions: Stock on hand (pallets) | ≤20 | ≤20 | 21 – 80 | 21 – 80 | ≥81 |<br>| Days until next delivery | ≤3 | &gt;3 | ≤3 | &gt;3 | – |<br>| Action: Reorder alert | routine | critical | none | medium | none |<br><br>You designed the test cases with the following input data:<br>TC1: Stock = 25 pallets, Days = 4<br>TC2: Stock = 80 pallets, Days = 5<br>TC3: Stock = 20 pallets, Days = 4<br>TC4: Stock = 5 pallets, Days = 5<br>TC5: Stock = 81 pallets, Days = 2<br>What is the decision table coverage achieved by these test cases?<br>Select ONE option.<br><ul><li>a). 40%</li><li>b). 60%</li><li>c). 80%</li><li>d). 100%</li></ul>",
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
              "d": "TC1 (25, 4) → Rule 4; TC2 (80, 5) → Rule 4; TC3 (20, 4) → Rule 2; TC4 (5, 5) → Rule 2; TC5 (81, 2) → Rule 5.",
              "viz": {
                "type": "dt",
                "head": [
                  "Rule",
                  "Stock (pallets)",
                  "Days",
                  "Alert"
                ],
                "rows": [
                  [
                    "R1",
                    "≤20",
                    "≤3",
                    "routine"
                  ],
                  [
                    "R2",
                    "≤20",
                    ">3",
                    "critical"
                  ],
                  [
                    "R3",
                    "21–80",
                    "≤3",
                    "none"
                  ],
                  [
                    "R4",
                    "21–80",
                    ">3",
                    "medium"
                  ],
                  [
                    "R5",
                    "≥81",
                    "–",
                    "none"
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
          "id": "dt-02",
          "source": "Original practice",
          "lo": "FL-4.2.3",
          "k": "K3",
          "appendix": false,
          "stem": "You are designing test cases based on the following decision table for a library&#x27;s borrowing rules.<br>         R1      R2      R3      R4      R5      R6      R7<br>C1: Age group  child   adult   adult   senior  child   adult   senior<br>C2: Books on loan    –    0–4     5+      –       –       –       –<br>C3: e-card?    NO      NO      NO      NO      YES     YES     YES<br>Loan limit   2       4       6       8       8       10      12<br>(Age groups: child = 0–11, adult = 12–64, senior = 65+)<br><br>So far you have designed the following test cases:<br>• TC1: 30-year-old adult, no e-card, 2 books on loan; expected result: loan limit 4<br>• TC2: 45-year-old adult, no e-card, 7 books on loan; expected result: loan limit 6<br>• TC3: 66-year-old senior with an e-card; expected result: loan limit 12<br>• TC4: 40-year-old adult with an e-card; expected result: loan limit 10<br>Which TWO of the following test cases, when added to the existing set of test cases, will increase the decision table coverage?<br>Select TWO options.<br><ul><li>a). 70-year-old senior without an e-card; expected result: loan limit 8</li><li>b). 9-year-old child without an e-card; expected result: loan limit 2</li><li>c). 25-year-old adult without an e-card and with 3 books on loan; expected result: loan limit 4</li><li>d). 58-year-old adult with an e-card; expected result: loan limit 10</li></ul>",
          "answer": "a, b",
          "answerText": "62-year-old senior without an e-card (Rule 4) and 9-year-old child without an e-card (Rule 1)",
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
              "d": "TC1 (adult, no e-card, 0–4 out) → R2; TC2 (adult, no e-card, 5+ out) → R3; TC3 (senior, e-card) → R7; TC4 (adult, e-card) → R6. Rules 2, 3, 6 and 7 are already covered.",
              "viz": {
                "type": "dt",
                "head": [
                  "Rule",
                  "Age",
                  "Loans",
                  "e-card?",
                  "Limit"
                ],
                "rows": [
                  [
                    "R1",
                    "child",
                    "-",
                    "NO",
                    "2"
                  ],
                  [
                    "R2",
                    "adult",
                    "0-4",
                    "NO",
                    "4"
                  ],
                  [
                    "R3",
                    "adult",
                    "5+",
                    "NO",
                    "6"
                  ],
                  [
                    "R4",
                    "senior",
                    "-",
                    "NO",
                    "8"
                  ],
                  [
                    "R5",
                    "child",
                    "-",
                    "YES",
                    "8"
                  ],
                  [
                    "R6",
                    "adult",
                    "-",
                    "YES",
                    "10"
                  ],
                  [
                    "R7",
                    "senior",
                    "-",
                    "YES",
                    "12"
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
              "d": "(c) hits R2 again and (d) hits R6 again — no new rule. (a) is a senior without an e-card → Rule 4, and (b) is a child without an e-card → Rule 1; both rules are not yet covered.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "The two tests exercising Rules 4 and 1 map to options (a) and (b).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "drill this type with new numbers →",
          "href": "drills.html#w-dt"
        },
        {
          "source": "official ISTQB exam samples (external)",
          "href": "official-samples.html"
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
          "id": "state-01",
          "source": "Original practice",
          "lo": "FL-4.2.4",
          "k": "K3",
          "appendix": false,
          "stem": "You are applying state transition testing to a gym membership system modeled by the following state transition table, with 4 states and 5 different events:<br><br>Events:         Accept   BranchFull   ChangePlan   Cancel   TransferOut<br>S1: Applied      S2       S3<br>S2: Active                            S1           S4       S4<br>S3: Waitlist    S2                                   S4<br>S4: Archived<br><br>Assuming all test cases start in the &#x27;Applied&#x27; state, which of the following test cases, represented as sequences of events, achieves the highest valid transitions coverage?<br><ul><li>a). BranchFull, Accept, ChangePlan, BranchFull, Cancel</li><li>b). Accept, ChangePlan, BranchFull, Accept, TransferOut</li><li>c). Accept, ChangePlan, Accept, ChangePlan, BranchFull</li><li>d). BranchFull, Cancel, ChangePlan, Accept, TransferOut</li></ul>",
          "answer": "b",
          "answerText": "Accept, ChangePlan, BranchFull, Accept, TransferOut",
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
              "d": "From the table: S1→S2 (Accept), S1→S3 (BranchFull), S2→S1 (ChangePlan), S2→S4 (Cancel), S2→S4 (TransferOut), S3→S2 (Accept), S3→S4 (Cancel) — 7 valid transitions (S2→S4 is TWO distinct transitions: via Cancel and via TransferOut).",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Play back option (b)",
              "d": "Accept (S1→S2), ChangePlan (S2→S1), BranchFull (S1→S3), Accept (S3→S2), TransferOut (S2→S4): every event fires a valid transition and 5 of the 7 are covered, ending in Archived.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Compare",
              "d": "Option (a) repeats S1→S3, so it covers only 4 distinct transitions; (c) repeats two transitions (3 distinct); (d) fails — after Cancel it reaches S4 (Archived), and no event has a valid transition from S4.",
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
          "id": "state-02",
          "source": "Original practice",
          "lo": "FL-4.2.4",
          "k": "K3",
          "appendix": false,
          "stem": "A warehouse control system models one storage zone that can hold at most three pallets. The variable N represents the number of pallets currently stored in the zone (N = 0, 1, 2, 3; N = 3 is the FULL state). The system has two events:<br>- Inbound: adds one pallet; valid while N &lt; 3, taking the zone to state N+1<br>- Outbound: removes one pallet; valid while N &gt; 0, taking the zone to state N−1<br>Which of the following test cases, represented as sequences of events, achieves the highest level of valid transitions coverage?<br>Select ONE option.<br><ul><li>a). Inbound, Outbound, Inbound, Inbound, Inbound, Outbound</li><li>b). Inbound, Inbound, Inbound, Inbound, Outbound</li><li>c). Inbound, Inbound, Inbound, Outbound, Outbound, Outbound</li><li>d). Inbound, Inbound, Inbound, Outbound, Outbound</li></ul>",
          "answer": "c",
          "answerText": "Inbound, Inbound, Inbound, Outbound, Outbound, Outbound",
          "steps": [
            {
              "t": "Rule",
              "d": "Count TRANSITIONS, not states; 0-switch coverage = every valid transition exercised once. A sequence only counts transitions that are valid in the current state (N = 0, 1, 2, 3 stored pallets).",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Enumerate valid transitions",
              "d": "Inbound is valid from N = 0, 1 and 2 (three transitions: 0→1, 1→2, 2→3 entering FULL); Outbound is valid from N = 1, 2 and 3 (three transitions). The model has 6 valid transitions in total.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Play back option (c)",
              "d": "Inbound (N:0→1), Inbound (N:1→2), Inbound (N:2→3, enters FULL), Outbound (N:3→2), Outbound (N:2→1), Outbound (N:1→0): every step is valid and 6 of 6 valid transitions are covered — 100%.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Eliminate",
              "d": "(a) and (d) each cover only 5 of 6 — (a) never removes from N=2, (d) never removes from N=1; (b) is infeasible — the fourth Inbound fires in the FULL state.",
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
          "source": "drill this type with new numbers →",
          "href": "drills.html#w-sm"
        },
        {
          "source": "official ISTQB exam samples (external)",
          "href": "official-samples.html"
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
          "id": "cov-01",
          "source": "Original practice",
          "lo": "FL-4.3.1",
          "k": "K2",
          "appendix": false,
          "stem": "You run two test cases, T1 and T2, on the same delivery-fee calculation module. Test T1 achieved 30% statement coverage and test T2 achieved 85% statement coverage.<br>Which TWO of the following statements must be necessarily true?<br>Select TWO options.<br><ul><li>a). At least one statement was executed by both T1 and T2</li><li>b). The test suite composed of tests T1 and T2 achieves 115% statement coverage</li><li>c). At least 15% of the statements in the code that was tested were executed by both T1 and T2</li><li>d). The test suite composed of tests T1 and T2 achieves full branch coverage</li></ul>",
          "answer": "a, c",
          "answerText": "At least one statement was executed by both tests, and at least 15% of the statements were executed by both",
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
              "d": "T1 executed 30% of the statements, T2 executed 85%: 30% + 85% = 115% of the statements accounted for (with multiplicity).",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Reason about the overlap",
              "d": "Since a suite cannot exceed 100%, at least 115% − 100% = 15% of the statements must have been executed by both T1 and T2.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "At least one shared statement and an overlap of at least 15% map to options (a) and (c).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "drill this type with new numbers →",
          "href": "drills.html#w-cov"
        },
        {
          "source": "official ISTQB exam samples (external)",
          "href": "official-samples.html"
        }
      ]
    },
    {
      "id": "est",
      "name": "Test effort estimation — three-point & ratios",
      "recipe": "Three-point estimate = (O + 4·M + P) / 6; ratio-based estimate = averaged test-to-development effort ratio × estimated development effort",
      "drillHref": "official-samples.html",
      "cards": [
        {
          "id": "est-01",
          "source": "Original practice",
          "lo": "FL-5.1.4",
          "k": "K3",
          "appendix": false,
          "stem": "Your team uses the three-point estimation technique to estimate the test effort for a new gym-membership checkout feature. The following estimates were made:<br>- Most optimistic estimation: 3 person-hours<br>- Most likely estimation: 8 person-hours<br>- Most pessimistic estimation: 19 person-hours<br>What is the final estimate?<br>Select ONE option.<br><ul><li>a). 10 person-hours</li><li>b). 8 person-hours</li><li>c). 9 person-hours</li><li>d). 19 person-hours</li></ul>",
          "answer": "c",
          "answerText": "9 person-hours",
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
              "d": "O = 3, M = 8, P = 19 person-hours: (3 + 4·8 + 19) / 6 = (3 + 32 + 19) / 6 = 54 / 6.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Compute",
              "d": "54 / 6 = 9 person-hours — not the plain average (3 + 8 + 19) / 3 = 10.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "9 person-hours maps to option (c).",
              "viz": {
                "type": "none"
              }
            }
          ]
        },
        {
          "id": "est-02",
          "source": "Original practice",
          "lo": "FL-5.1.4",
          "k": "K3",
          "appendix": false,
          "stem": "A library team wants to estimate the time needed for one tester to execute six regression test scripts for the loans module. The team has gathered the following measures of the effort used to execute a single script:<br>• Best-case scenario: 2 hours<br>• Worst-case scenario: 12 hours<br>• Most likely scenario: 4 hours<br>Given that the three-point estimation technique is being used, what is the final estimate of the time needed to execute all six scripts?<br>Select ONE option.<br><ul><li>a). 30 hours</li><li>b). 6 hours</li><li>c). 18 hours</li><li>d). 5 hours</li></ul>",
          "answer": "a",
          "answerText": "30 hours",
          "steps": [
            {
              "t": "Rule",
              "d": "Three-point estimate = (O + 4·M + P) / 6, with O = best case, M = most likely, P = worst case.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Estimate one script",
              "d": "O = 2, M = 4, P = 12 hours: (2 + 4·4 + 12) / 6 = (2 + 16 + 12) / 6 = 30 / 6 = 5 hours per script.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Scale to six scripts",
              "d": "5 × 6 = 30 hours for executing all six scripts.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "30 hours maps to option (a).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "official ISTQB exam samples (external)",
          "href": "official-samples.html"
        }
      ]
    },
    {
      "id": "metrics",
      "name": "Test prioritization & scheduling math",
      "recipe": "Test scheduling: dependencies gate execution; among the runnable tests, execute the highest priority (lowest number) first",
      "drillHref": "official-samples.html",
      "cards": [
        {
          "id": "met-01",
          "source": "Original practice",
          "lo": "FL-5.1.5",
          "k": "K3",
          "appendix": false,
          "stem": "You are testing a mobile application that allows users to book and manage train tickets. Consider the following list of test cases, priorities (i.e., a smaller number means a higher priority), and dependencies:<br><br>Test case number | Test condition covered | Priority | Logical dependency<br>TC 101 | Search for trains | 3 | none<br>TC 102 | Select a fare | 2 | TC 101<br>TC 103 | Pay by card | 1 | TC 102<br>TC 104 | Reserve a seat | 2 | TC 102<br>TC 105 | Download the e-ticket | 3 | TC 103<br>Which of the following test cases should be executed as the third one?<br>Select ONE option.<br><ul><li>a). TC 103</li><li>b). TC 105</li><li>c). TC 102</li><li>d). TC 101</li></ul>",
          "answer": "a",
          "answerText": "TC 103",
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
              "d": "TC 101 (priority 3) has no dependency, so it runs first. That unlocks TC 102 (priority 2), which runs second and unlocks TC 103 (priority 1), TC 104 (2) and TC 105 (3).",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Pick the third",
              "d": "Among the newly runnable tests, TC 103 has the highest priority (1), so it is executed third.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Answer",
              "d": "TC 103 maps to option (a).",
              "viz": {
                "type": "none"
              }
            }
          ]
        },
        {
          "id": "met-02",
          "source": "Original practice",
          "lo": "FL-5.1.5",
          "k": "K3",
          "appendix": false,
          "stem": "The table shows the traceability matrix from test cases to requirements for an insurance quote module. &quot;X&quot; means that a given test case covers the corresponding requirement.<br>        Req1  Req2  Req3  Req4  Req5  Req6<br>TC1      X     X     X<br>TC2                  X     X<br>TC3      X     X<br>TC4                              X     X<br>You want to prioritize the test cases following the additional coverage prioritization technique. You execute all four test cases.<br>Which test case should be executed as the LAST one?<br>Select ONE option.<br><ul><li>a). TC1</li><li>b). TC2</li><li>c). TC3</li><li>d). TC4</li></ul>",
          "answer": "c",
          "answerText": "TC3",
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
              "d": "TC1 covers Req 1, 2, 3 (3 new) → first. After that TC4 adds two new requirements (Req 5, 6), TC2 adds one (Req 4) and TC3 adds none.",
              "viz": {
                "type": "none"
              }
            },
            {
              "t": "Continue greedily",
              "d": "TC4 runs second (adds Req 5, Req 6); TC2 still adds Req 4, so it runs third. By then Req 1–6 are all covered, and TC3 only touches Req 1 and 2 — both already covered.",
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
                    "Req1, Req2, Req3"
                  ],
                  [
                    "2nd",
                    "TC4",
                    "Req5, Req6"
                  ],
                  [
                    "3rd",
                    "TC2",
                    "Req4"
                  ],
                  [
                    "4th",
                    "TC3",
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
              "d": "TC3, executed last with zero additional coverage, maps to option (c).",
              "viz": {
                "type": "none"
              }
            }
          ]
        }
      ],
      "variants": [
        {
          "source": "official ISTQB exam samples (external)",
          "href": "official-samples.html"
        }
      ]
    }
  ]
};
})();

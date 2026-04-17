import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day12: Day = {
  id: 12,
  title: "Recursion and backtracking",
  subtitle: "Recursion is natural for trees, combinations, and &quot;try-every-choice&quot; problems. Today: base cases, recursion trees, and the backtracking template.",
  estimatedTime: "60–75 min",
  goals: [
    "Write recursive functions with clear base cases",
    "Trust the recursion — believe the recursive call works",
    "Apply the backtracking template (choose → recurse → unchoose)",
  ],
  youWillBuild: "Fibonacci, subsets, and permutations — three drills that teach the backtracking pattern.",
  steps: [
    teach(
      "d12-intro",
      "<p>A recursive function solves a problem by calling itself on a smaller version of the problem.</p><p>Two things to always get right: (1) the <strong>base case</strong> — where the recursion stops; (2) the <strong>recursive step</strong> — how the current call uses the result of smaller calls.</p>",
    ),
    teach(
      "d12-fib",
      "<p>Classic starter — factorial and Fibonacci:</p><pre><code>def factorial(n):\n    if n &lt;= 1:   # base case\n        return 1\n    return n * factorial(n - 1)\n\ndef fib(n):\n    if n &lt; 2:\n        return n\n    return fib(n - 1) + fib(n - 2)</code></pre><p>Key mental move: <em>trust</em> that <code>factorial(n - 1)</code> returns the right value. Don&apos;t try to trace through 5 levels — reason about one level at a time.</p>",
    ),
    exercise(
      "d12-ex-fact",
      "<p>Write <code>factorial(n)</code> recursively. <code>n &gt;= 0</code>. <code>factorial(0) == 1</code>.</p>",
      "def factorial(n):\n    # your code here\n    pass\n",
      "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n",
      "Base case: <code>n &lt;= 1</code> returns 1. Else return <code>n * factorial(n - 1)</code>.",
      [
        { call: "factorial(0)", expected: 1 },
        { call: "factorial(1)", expected: 1 },
        { call: "factorial(5)", expected: 120 },
        { call: "factorial(7)", expected: 5040 },
      ],
      { fnName: "factorial" },
    ),
    teach(
      "d12-fib-slow",
      "<p>Naive <code>fib(n)</code> is exponential — it recomputes the same values repeatedly. To fix: <strong>memoization</strong>. Cache subproblem answers.</p><pre><code>from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n &lt; 2:\n        return n\n    return fib(n - 1) + fib(n - 2)</code></pre><p>Memoization is the bridge to dynamic programming (Day 13).</p>",
    ),
    demo(
      "d12-fib-demo",
      "<p>Watch the speedup:</p>",
      "import time\nfrom functools import lru_cache\n\ndef fib_slow(n):\n    if n < 2:\n        return n\n    return fib_slow(n - 1) + fib_slow(n - 2)\n\n@lru_cache(maxsize=None)\ndef fib_fast(n):\n    if n < 2:\n        return n\n    return fib_fast(n - 1) + fib_fast(n - 2)\n\nt0 = time.time()\nprint(fib_slow(30), round(time.time() - t0, 3), \"s\")\nt0 = time.time()\nprint(fib_fast(100), round(time.time() - t0, 3), \"s\")",
    ),
    checkpoint(
      "d12-cp",
      "Backtracking template",
      "For combinations, subsets, permutations, and puzzles (sudoku, n-queens) — you explore choices, recurse, then undo. The shape is almost identical every time.",
    ),
    teach(
      "d12-backtrack",
      "<p><strong>Backtracking template:</strong></p><pre><code>def solve(partial, remaining, result):\n    if is_solution(partial):\n        result.append(list(partial))   # copy!\n        return\n    for choice in choices(remaining):\n        partial.append(choice)                    # choose\n        solve(partial, remaining_without(choice), result)  # recurse\n        partial.pop()                             # unchoose</code></pre><p>The <code>list(partial)</code> copy matters — if you append <code>partial</code> itself, all entries in <code>result</code> end up pointing to the same mutating list.</p>",
    ),
    exercise(
      "d12-ex-subsets",
      "<p><strong>LeetCode #78 — Subsets.</strong> Given a list of <em>distinct</em> integers, return all subsets. Order of subsets doesn&apos;t matter but we&apos;ll sort for a deterministic test.</p>",
      "def subsets(nums):\n    # your code here\n    pass\n",
      "def subsets(nums):\n    result = []\n    def backtrack(start, path):\n        result.append(list(path))\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return sorted(result, key=lambda s: (len(s), s))\n",
      "Start with the empty subset. At each position decide &quot;include this or not&quot; — we implement this as: at each index, choose any later element to include. The template writes itself.",
      [
        { call: "subsets([])", expected: [[]] },
        { call: "subsets([1])", expected: [[], [1]] },
        {
          call: "subsets([1, 2, 3])",
          expected: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]],
        },
      ],
      { fnName: "subsets" },
    ),
    exercise(
      "d12-ex-perms",
      "<p><strong>LeetCode #46 — Permutations.</strong> Given a list of distinct integers, return all permutations. Sort the result for a deterministic test.</p>",
      "def permutations(nums):\n    # your code here\n    pass\n",
      "def permutations(nums):\n    result = []\n    def backtrack(path, used):\n        if len(path) == len(nums):\n            result.append(list(path))\n            return\n        for i in range(len(nums)):\n            if used[i]:\n                continue\n            used[i] = True\n            path.append(nums[i])\n            backtrack(path, used)\n            path.pop()\n            used[i] = False\n    backtrack([], [False] * len(nums))\n    return sorted(result)\n",
      "Backtracking with a <code>used</code> array. Base case: <code>path</code> has <code>n</code> elements.",
      [
        { call: "permutations([])", expected: [[]] },
        { call: "permutations([1])", expected: [[1]] },
        { call: "permutations([1, 2])", expected: [[1, 2], [2, 1]] },
        {
          call: "permutations([1, 2, 3])",
          expected: [
            [1, 2, 3],
            [1, 3, 2],
            [2, 1, 3],
            [2, 3, 1],
            [3, 1, 2],
            [3, 2, 1],
          ],
        },
      ],
      { fnName: "permutations" },
    ),
    quizMC(
      "d12-q-copy",
      "Why do we append <code>list(path)</code> and not just <code>path</code> to the result?",
      [
        "It&apos;s faster",
        "<code>path</code> is a list we&apos;re mutating; appending a reference would make every stored &quot;answer&quot; point to the same list",
        "Python doesn&apos;t allow storing lists in lists",
        "<code>list()</code> converts it to an immutable tuple",
      ],
      1,
      "Day 3 aliasing callback. <code>path</code> keeps mutating; you need a snapshot copy.",
    ),
    recall(
      "d12-recall",
      "What&apos;s the shape of the backtracking template? Say the three steps in order.",
      "Choose — make a decision (add to <code>path</code>). Recurse — call yourself with the updated state. Unchoose — undo the decision (pop from <code>path</code>) so the next iteration of the loop has a clean slate.",
    ),
    teach(
      "d12-wrap",
      "<p>Today you wrote factorial, subsets, and permutations. With these three under your belt, you can attack most backtracking interview problems — N-Queens, combination sum, word search, etc. all follow the same shape.</p>",
    ),
  ],
  finalTest: [
    exercise(
      "d12-t-sumdigits",
      "<p>Write <code>sum_digits(n)</code> recursively — the sum of digits of a non-negative integer.</p>",
      "def sum_digits(n):\n    # your code here\n    pass\n",
      "def sum_digits(n):\n    if n < 10:\n        return n\n    return n % 10 + sum_digits(n // 10)\n",
      "Base: single digit returns itself. Else last digit (<code>n % 10</code>) plus recurse on the rest (<code>n // 10</code>).",
      [
        { call: "sum_digits(0)", expected: 0 },
        { call: "sum_digits(7)", expected: 7 },
        { call: "sum_digits(123)", expected: 6 },
        { call: "sum_digits(9999)", expected: 36 },
      ],
      { fnName: "sum_digits" },
    ),
    exercise(
      "d12-t-combine",
      "<p><strong>LeetCode #77 — Combinations.</strong> Return all combinations of <code>k</code> numbers from <code>1</code> to <code>n</code>. Sort the result for a deterministic test.</p>",
      "def combinations(n, k):\n    # your code here\n    pass\n",
      "def combinations(n, k):\n    result = []\n    def backtrack(start, path):\n        if len(path) == k:\n            result.append(list(path))\n            return\n        for i in range(start, n + 1):\n            path.append(i)\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(1, [])\n    return sorted(result)\n",
      "Same template as subsets but with a size-k goal.",
      [
        { call: "combinations(1, 1)", expected: [[1]] },
        { call: "combinations(4, 2)", expected: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]] },
        { call: "combinations(3, 3)", expected: [[1, 2, 3]] },
      ],
      { fnName: "combinations" },
    ),
    quizMC(
      "d12-t-memo",
      "What problem does <code>@lru_cache</code> solve for recursive functions like naive Fibonacci?",
      [
        "Stack overflow",
        "Exponential repeated work — caches subproblem answers",
        "Makes the code shorter",
        "Handles large numbers",
      ],
      1,
      "Without memoization, <code>fib(n)</code> recomputes <code>fib(n-3)</code>, <code>fib(n-4)</code>, etc., many times — exponential. Caching collapses it to linear.",
    ),
    exercise(
      "d12-t-pow",
      "<p>Write <code>my_pow(x, n)</code> — compute <code>x ** n</code> for integer <code>n</code> in O(log n) time using recursion. Handle negative <code>n</code>.</p>",
      "def my_pow(x, n):\n    # your code here\n    pass\n",
      "def my_pow(x, n):\n    if n == 0:\n        return 1.0\n    if n < 0:\n        return 1 / my_pow(x, -n)\n    half = my_pow(x, n // 2)\n    if n % 2 == 0:\n        return half * half\n    return half * half * x\n",
      "Fast exponentiation: <code>x^n = (x^(n/2))²</code> — halves the problem each recursion, O(log n).",
      [
        { call: "my_pow(2, 10)", expected: 1024 },
        { call: "my_pow(2, 0)", expected: 1 },
        { call: "my_pow(2, -2)", expected: 0.25 },
        { call: "my_pow(3, 3)", expected: 27 },
      ],
      { fnName: "my_pow" },
    ),
  ],
};

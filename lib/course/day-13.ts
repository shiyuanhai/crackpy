import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day13: Day = {
  id: 13,
  title: "Dynamic programming — the intro",
  subtitle: "DP is memoization + shrewd subproblem choice. Today: climb stairs, house robber, coin change — the canonical ladder.",
  estimatedTime: "60–75 min",
  goals: [
    "Identify when a problem is DP-shaped (overlapping subproblems, optimal substructure)",
    "Write a top-down memoized solution",
    "Convert to bottom-up iterative DP",
    "Recognize the 1D DP template",
  ],
  youWillBuild: "Climb stairs, house robber, coin change — three canonical entry points to DP.",
  steps: [
    teach(
      "d13-intro",
      "<p><strong>Dynamic programming</strong> = remembering answers to subproblems. DP applies when (1) the problem breaks into smaller same-shape subproblems (overlapping subproblems), and (2) an optimal solution to the big problem can be built from optimal solutions to the smaller ones (optimal substructure).</p><p>Yesterday&apos;s memoized Fibonacci was DP — we just didn&apos;t call it that.</p>",
    ),
    teach(
      "d13-stairs",
      "<p><strong>Climb stairs.</strong> You can take 1 or 2 steps at a time. How many ways to climb <code>n</code> stairs?</p><p>Let <code>f(n)</code> = number of ways to reach step <code>n</code>. To reach step <code>n</code>, you either came from <code>n-1</code> (one step) or <code>n-2</code> (two steps). So:</p><pre><code>f(n) = f(n-1) + f(n-2)\nf(0) = 1, f(1) = 1</code></pre><p>That&apos;s Fibonacci!</p>",
    ),
    exercise(
      "d13-ex-stairs",
      "<p><strong>LeetCode #70 — Climbing Stairs.</strong> Write <code>climb_stairs(n)</code> in O(n) time and O(1) space (track only the last two values — no array).</p>",
      "def climb_stairs(n):\n    # your code here\n    pass\n",
      "def climb_stairs(n):\n    if n <= 1:\n        return 1\n    prev2, prev1 = 1, 1\n    for _ in range(2, n + 1):\n        prev2, prev1 = prev1, prev1 + prev2\n    return prev1\n",
      "Bottom-up iteration. Only <code>prev1</code> and <code>prev2</code> are needed.",
      [
        { call: "climb_stairs(1)", expected: 1 },
        { call: "climb_stairs(2)", expected: 2 },
        { call: "climb_stairs(3)", expected: 3 },
        { call: "climb_stairs(5)", expected: 8 },
        { call: "climb_stairs(10)", expected: 89 },
      ],
      { fnName: "climb_stairs" },
    ),
    checkpoint(
      "d13-cp",
      "1D DP template",
      "Many DP problems follow the same template: <code>dp[i]</code> represents the best answer using the first <code>i</code> elements. Compute <code>dp[i]</code> from earlier <code>dp[*]</code> values.",
    ),
    teach(
      "d13-template",
      "<p><strong>1D DP template:</strong></p><pre><code>dp = [0] * (n + 1)\ndp[0] = base_case\nfor i in range(1, n + 1):\n    dp[i] = some_formula_of(dp[i-1], dp[i-2], ...)\nreturn dp[n]</code></pre><p>The hard part: figuring out the formula. The rest is mechanical.</p>",
    ),
    exercise(
      "d13-ex-rob",
      "<p><strong>LeetCode #198 — House Robber.</strong> Houses are in a row, each with some cash. You can&apos;t rob two adjacent houses. Return the max cash you can rob.</p><p>Hint: at house <code>i</code>, either skip it (take <code>dp[i-1]</code>) or rob it (take <code>dp[i-2] + nums[i]</code>).</p>",
      "def rob(nums):\n    # your code here\n    pass\n",
      "def rob(nums):\n    if not nums:\n        return 0\n    if len(nums) == 1:\n        return nums[0]\n    prev2, prev1 = 0, 0\n    for x in nums:\n        prev2, prev1 = prev1, max(prev1, prev2 + x)\n    return prev1\n",
      "Rolling variables: <code>prev2</code> = answer 2 houses back, <code>prev1</code> = answer 1 house back. At each house: <code>max(prev1, prev2 + x)</code>.",
      [
        { call: "rob([])", expected: 0 },
        { call: "rob([5])", expected: 5 },
        { call: "rob([1, 2, 3, 1])", expected: 4 },
        { call: "rob([2, 7, 9, 3, 1])", expected: 12 },
        { call: "rob([2, 1, 1, 2])", expected: 4 },
      ],
      { fnName: "rob" },
    ),
    teach(
      "d13-coin",
      "<p><strong>Coin change.</strong> Given coin denominations and a target amount, find the minimum number of coins to make that amount.</p><p><code>dp[a]</code> = min coins to make amount <code>a</code>. Recurrence:</p><pre><code>dp[a] = min(dp[a - c] + 1  for c in coins  if a - c &gt;= 0 and dp[a - c] is reachable)</code></pre>",
    ),
    exercise(
      "d13-ex-coin",
      "<p><strong>LeetCode #322 — Coin Change.</strong> Given a list of coin denominations and an amount, return the minimum number of coins to make the amount. Return <code>-1</code> if impossible.</p>",
      "def coin_change(coins, amount):\n    # your code here\n    pass\n",
      "def coin_change(coins, amount):\n    INF = amount + 1\n    dp = [INF] * (amount + 1)\n    dp[0] = 0\n    for a in range(1, amount + 1):\n        for c in coins:\n            if a - c >= 0 and dp[a - c] + 1 < dp[a]:\n                dp[a] = dp[a - c] + 1\n    return dp[amount] if dp[amount] != INF else -1\n",
      "<code>dp[a]</code> initialized to a sentinel (<code>amount + 1</code>). <code>dp[0] = 0</code>. Fill bottom-up, min over coins.",
      [
        { call: "coin_change([1, 2, 5], 11)", expected: 3 },
        { call: "coin_change([2], 3)", expected: -1 },
        { call: "coin_change([1], 0)", expected: 0 },
        { call: "coin_change([1, 2, 5], 0)", expected: 0 },
        { call: "coin_change([1, 5, 10, 25], 30)", expected: 2 },
      ],
      { fnName: "coin_change" },
    ),
    quizMC(
      "d13-q-when",
      "Which problem is <strong>not</strong> a natural DP problem?",
      [
        "Longest increasing subsequence",
        "Coin change (min coins)",
        "Sort a list of numbers",
        "Edit distance between two strings",
      ],
      2,
      "Sorting doesn&apos;t have overlapping subproblems the way DP needs — comparison sorts are their own thing.",
    ),
    recall(
      "d13-recall",
      "Explain the difference between top-down (memoization) and bottom-up (tabulation) DP, and when you&apos;d pick each.",
      "Top-down writes the natural recursion and caches the results. Easier to think through but uses the call stack. Bottom-up iterates from the base case up, filling a table. Saves stack space and often allows optimization to O(1) space (rolling variables). Both solve the same problem with the same complexity.",
    ),
    teach(
      "d13-wrap",
      "<p>Today:</p><ul><li>DP = overlapping subproblems + optimal substructure</li><li>1D template: <code>dp[i]</code> from earlier <code>dp</code> values</li><li>Rolling variables for O(1) space when you only need the last few entries</li></ul><p>DP has depth beyond today — 2D DP (grid problems), DP on subsets, DP on trees — but this is the shape they all share.</p>",
    ),
  ],
  finalTest: [
    exercise(
      "d13-t-min-path",
      "<p>Write <code>min_path(nums)</code> — given a list of costs, you start at index 0 and can step to <code>i+1</code> or <code>i+2</code>. Return the min total cost to reach the last index.</p>",
      "def min_path(nums):\n    # your code here\n    pass\n",
      "def min_path(nums):\n    n = len(nums)\n    if n == 1:\n        return nums[0]\n    if n == 2:\n        return nums[0] + nums[1]\n    dp = [0] * n\n    dp[0] = nums[0]\n    dp[1] = nums[0] + nums[1]\n    for i in range(2, n):\n        dp[i] = nums[i] + min(dp[i - 1], dp[i - 2])\n    return dp[-1]\n",
      "<code>dp[i]</code> = min cost ending at <code>i</code>. <code>dp[i] = nums[i] + min(dp[i-1], dp[i-2])</code>.",
      [
        { call: "min_path([1])", expected: 1 },
        { call: "min_path([1, 2])", expected: 3 },
        { call: "min_path([1, 100, 1, 1, 100, 1])", expected: 4 },
        { call: "min_path([10, 15, 20])", expected: 30 },
      ],
      { fnName: "min_path" },
    ),
    quizMC(
      "d13-t-space",
      "For <code>climb_stairs</code>, why is O(1) space possible?",
      [
        "Because the problem is trivial",
        "Because we only need the last two values to compute the next",
        "Because of the <code>lru_cache</code> decorator",
        "Because <code>n</code> is always small",
      ],
      1,
      "The recurrence only uses the two prior values — the full table isn&apos;t needed.",
    ),
    exercise(
      "d13-t-max-product",
      "<p>Write <code>max_subarray(nums)</code> — return the max <em>sum</em> of a contiguous subarray (Kadane&apos;s algorithm). Assume non-empty.</p>",
      "def max_subarray(nums):\n    # your code here\n    pass\n",
      "def max_subarray(nums):\n    best = cur = nums[0]\n    for x in nums[1:]:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    return best\n",
      "<code>cur</code> = best sum ending at the current index. Either start fresh at <code>x</code> or extend: <code>max(x, cur + x)</code>.",
      [
        { call: "max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])", expected: 6 },
        { call: "max_subarray([5])", expected: 5 },
        { call: "max_subarray([-1, -2, -3])", expected: -1 },
        { call: "max_subarray([1, 2, 3])", expected: 6 },
      ],
      { fnName: "max_subarray" },
    ),
  ],
};

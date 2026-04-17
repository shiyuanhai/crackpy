import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day13: Day = {
  id: 13,
  title: {
    en: "Dynamic programming — the intro",
    zh: "动态规划 —— 入门",
  },
  subtitle: {
    en: "DP is memoization + shrewd subproblem choice. Today: climb stairs, house robber, coin change — the canonical ladder.",
    zh: "DP 就是记忆化加上精明的子问题拆分。今天走经典三连:爬楼梯、打家劫舍、零钱兑换。",
  },
  estimatedTime: {
    en: "60–75 min",
    zh: "60–75 分钟",
  },
  goals: [
    {
      en: "Identify when a problem is DP-shaped (overlapping subproblems, optimal substructure)",
      zh: "识别一道题是不是 DP 形(重叠子问题、最优子结构)",
    },
    {
      en: "Write a top-down memoized solution",
      zh: "写自顶向下带记忆化的解法",
    },
    {
      en: "Convert to bottom-up iterative DP",
      zh: "转成自底向上的迭代 DP",
    },
    {
      en: "Recognize the 1D DP template",
      zh: "认出一维 DP 模板",
    },
  ],
  youWillBuild: {
    en: "Climb stairs, house robber, coin change — three canonical entry points to DP.",
    zh: "爬楼梯、打家劫舍、零钱兑换 —— DP 入门的三道经典敲门砖。",
  },
  steps: [
    teach(
      "d13-intro",
      {
        en: "<p><strong>Dynamic programming</strong> = remembering answers to subproblems. DP applies when (1) the problem breaks into smaller same-shape subproblems (overlapping subproblems), and (2) an optimal solution to the big problem can be built from optimal solutions to the smaller ones (optimal substructure).</p><p>Yesterday&apos;s memoized Fibonacci was DP — we just didn&apos;t call it that.</p>",
        zh: "<p><strong>动态规划</strong>就是把子问题答案记住。用 DP 的条件:(1)问题能拆成同构的子问题(重叠子问题);(2)大问题的最优解可以用小问题的最优解拼出来(最优子结构)。</p><p>昨天那个带记忆化的斐波那契其实就是 DP —— 只不过当时没起这个名字。</p>",
      },
    ),
    teach(
      "d13-stairs",
      {
        en: "<p><strong>Climb stairs.</strong> You can take 1 or 2 steps at a time. How many ways to climb <code>n</code> stairs?</p><p>Let <code>f(n)</code> = number of ways to reach step <code>n</code>. To reach step <code>n</code>, you either came from <code>n-1</code> (one step) or <code>n-2</code> (two steps). So:</p><pre><code>f(n) = f(n-1) + f(n-2)\nf(0) = 1, f(1) = 1</code></pre><p>That&apos;s Fibonacci!</p>",
        zh: "<p><strong>爬楼梯。</strong>一次能迈 1 阶或 2 阶。走完 <code>n</code> 阶有多少种走法?</p><p>令 <code>f(n)</code> = 到第 <code>n</code> 阶的走法数。到第 <code>n</code> 阶要么从 <code>n-1</code> 迈 1 步上来,要么从 <code>n-2</code> 迈 2 步上来。所以:</p><pre><code>f(n) = f(n-1) + f(n-2)\nf(0) = 1, f(1) = 1</code></pre><p>就是斐波那契!</p>",
      },
    ),
    exercise(
      "d13-ex-stairs",
      {
        en: "<p><strong>LeetCode #70 — Climbing Stairs.</strong> Write <code>climb_stairs(n)</code> in O(n) time and O(1) space (track only the last two values — no array).</p>",
        zh: "<p><strong>LeetCode #70 —— 爬楼梯。</strong>写一个 O(n) 时间、O(1) 空间的 <code>climb_stairs(n)</code>(只记最近两个值,不要开数组)。</p>",
      },
      "def climb_stairs(n):\n    # your code here\n    pass\n",
      "def climb_stairs(n):\n    if n <= 1:\n        return 1\n    prev2, prev1 = 1, 1\n    for _ in range(2, n + 1):\n        prev2, prev1 = prev1, prev1 + prev2\n    return prev1\n",
      {
        en: "Bottom-up iteration. Only <code>prev1</code> and <code>prev2</code> are needed.",
        zh: "自底向上迭代。只要 <code>prev1</code> 和 <code>prev2</code> 两个变量。",
      },
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
      {
        en: "1D DP template",
        zh: "一维 DP 模板",
      },
      {
        en: "Many DP problems follow the same template: <code>dp[i]</code> represents the best answer using the first <code>i</code> elements. Compute <code>dp[i]</code> from earlier <code>dp[*]</code> values.",
        zh: "很多 DP 题都是一个模板:<code>dp[i]</code> 代表用前 <code>i</code> 个元素能得到的最好答案。由之前的 <code>dp[*]</code> 推出 <code>dp[i]</code>。",
      },
    ),
    teach(
      "d13-template",
      {
        en: "<p><strong>1D DP template:</strong></p><pre><code>dp = [0] * (n + 1)\ndp[0] = base_case\nfor i in range(1, n + 1):\n    dp[i] = some_formula_of(dp[i-1], dp[i-2], ...)\nreturn dp[n]</code></pre><p>The hard part: figuring out the formula. The rest is mechanical.</p>",
        zh: "<p><strong>一维 DP 模板:</strong></p><pre><code>dp = [0] * (n + 1)\ndp[0] = base_case\nfor i in range(1, n + 1):\n    dp[i] = some_formula_of(dp[i-1], dp[i-2], ...)\nreturn dp[n]</code></pre><p>难的是想公式。剩下的就是套。</p>",
      },
    ),
    exercise(
      "d13-ex-rob",
      {
        en: "<p><strong>LeetCode #198 — House Robber.</strong> Houses are in a row, each with some cash. You can&apos;t rob two adjacent houses. Return the max cash you can rob.</p><p>Hint: at house <code>i</code>, either skip it (take <code>dp[i-1]</code>) or rob it (take <code>dp[i-2] + nums[i]</code>).</p>",
        zh: "<p><strong>LeetCode #198 —— 打家劫舍。</strong>一排房子每家有点钱,相邻两家不能同时抢。返回最多能抢到多少。</p><p>提示:走到第 <code>i</code> 家,要么跳过(取 <code>dp[i-1]</code>),要么抢它(取 <code>dp[i-2] + nums[i]</code>)。</p>",
      },
      "def rob(nums):\n    # your code here\n    pass\n",
      "def rob(nums):\n    if not nums:\n        return 0\n    if len(nums) == 1:\n        return nums[0]\n    prev2, prev1 = 0, 0\n    for x in nums:\n        prev2, prev1 = prev1, max(prev1, prev2 + x)\n    return prev1\n",
      {
        en: "Rolling variables: <code>prev2</code> = answer 2 houses back, <code>prev1</code> = answer 1 house back. At each house: <code>max(prev1, prev2 + x)</code>.",
        zh: "滚动变量:<code>prev2</code> = 前两家的答案,<code>prev1</code> = 前一家的答案。到这一家就取 <code>max(prev1, prev2 + x)</code>。",
      },
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
      {
        en: "<p><strong>Coin change.</strong> Given coin denominations and a target amount, find the minimum number of coins to make that amount.</p><p><code>dp[a]</code> = min coins to make amount <code>a</code>. Recurrence:</p><pre><code>dp[a] = min(dp[a - c] + 1  for c in coins  if a - c &gt;= 0 and dp[a - c] is reachable)</code></pre>",
        zh: "<p><strong>零钱兑换。</strong>给一组硬币面额和目标金额,求凑出目标金额的最少硬币数。</p><p><code>dp[a]</code> = 凑出金额 <code>a</code> 所需的最少硬币数。递推:</p><pre><code>dp[a] = min(dp[a - c] + 1  for c in coins  if a - c &gt;= 0 and dp[a - c] is reachable)</code></pre>",
      },
    ),
    exercise(
      "d13-ex-coin",
      {
        en: "<p><strong>LeetCode #322 — Coin Change.</strong> Given a list of coin denominations and an amount, return the minimum number of coins to make the amount. Return <code>-1</code> if impossible.</p>",
        zh: "<p><strong>LeetCode #322 —— 零钱兑换。</strong>给一组面额和目标金额,返回凑出目标金额的最少硬币数。凑不出就 <code>-1</code>。</p>",
      },
      "def coin_change(coins, amount):\n    # your code here\n    pass\n",
      "def coin_change(coins, amount):\n    INF = amount + 1\n    dp = [INF] * (amount + 1)\n    dp[0] = 0\n    for a in range(1, amount + 1):\n        for c in coins:\n            if a - c >= 0 and dp[a - c] + 1 < dp[a]:\n                dp[a] = dp[a - c] + 1\n    return dp[amount] if dp[amount] != INF else -1\n",
      {
        en: "<code>dp[a]</code> initialized to a sentinel (<code>amount + 1</code>). <code>dp[0] = 0</code>. Fill bottom-up, min over coins.",
        zh: "<code>dp[a]</code> 初始化为哨兵值 (<code>amount + 1</code>)。<code>dp[0] = 0</code>。自底向上填,在所有硬币里取 min。",
      },
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
      {
        en: "Which problem is <strong>not</strong> a natural DP problem?",
        zh: "下面哪道题<strong>不</strong>是典型的 DP 题?",
      },
      [
        {
          en: "Longest increasing subsequence",
          zh: "最长递增子序列",
        },
        {
          en: "Coin change (min coins)",
          zh: "零钱兑换(最少硬币数)",
        },
        {
          en: "Sort a list of numbers",
          zh: "给一组数排序",
        },
        {
          en: "Edit distance between two strings",
          zh: "两个字符串的编辑距离",
        },
      ],
      2,
      {
        en: "Sorting doesn&apos;t have overlapping subproblems the way DP needs — comparison sorts are their own thing.",
        zh: "排序没有 DP 所需的重叠子问题 —— 基于比较的排序是另一套算法。",
      },
    ),
    recall(
      "d13-recall",
      {
        en: "Explain the difference between top-down (memoization) and bottom-up (tabulation) DP, and when you&apos;d pick each.",
        zh: "讲讲自顶向下(记忆化)和自底向上(表格填充)DP 的区别,什么时候选哪种。",
      },
      {
        en: "Top-down writes the natural recursion and caches the results. Easier to think through but uses the call stack. Bottom-up iterates from the base case up, filling a table. Saves stack space and often allows optimization to O(1) space (rolling variables). Both solve the same problem with the same complexity.",
        zh: "自顶向下就是自然地写递归再把结果缓存下来,思路更直接但会吃调用栈。自底向上从基准出发迭代填表,省调用栈,很多时候还能进一步压到 O(1) 空间(滚动变量)。两种方式解同一道题,复杂度一样。",
      },
    ),
    teach(
      "d13-wrap",
      {
        en: "<p>Today:</p><ul><li>DP = overlapping subproblems + optimal substructure</li><li>1D template: <code>dp[i]</code> from earlier <code>dp</code> values</li><li>Rolling variables for O(1) space when you only need the last few entries</li></ul><p>DP has depth beyond today — 2D DP (grid problems), DP on subsets, DP on trees — but this is the shape they all share.</p>",
        zh: "<p>今天收获:</p><ul><li>DP = 重叠子问题 + 最优子结构</li><li>一维模板:<code>dp[i]</code> 由前面的 <code>dp</code> 推出来</li><li>只需要最后几项时,用滚动变量压到 O(1) 空间</li></ul><p>DP 还有更深的玩法 —— 二维 DP(网格)、子集 DP、树形 DP —— 但骨架都一样。</p>",
      },
    ),
  ],
  finalTest: [
    exercise(
      "d13-t-min-path",
      {
        en: "<p>Write <code>min_path(nums)</code> — given a list of costs, you start at index 0 and can step to <code>i+1</code> or <code>i+2</code>. Return the min total cost to reach the last index.</p>",
        zh: "<p>写一个 <code>min_path(nums)</code> —— 给一个代价列表,从下标 0 出发,每步可以到 <code>i+1</code> 或 <code>i+2</code>。返回到最后一个下标的最小总代价。</p>",
      },
      "def min_path(nums):\n    # your code here\n    pass\n",
      "def min_path(nums):\n    n = len(nums)\n    if n == 1:\n        return nums[0]\n    if n == 2:\n        return nums[0] + nums[1]\n    dp = [0] * n\n    dp[0] = nums[0]\n    dp[1] = nums[0] + nums[1]\n    for i in range(2, n):\n        dp[i] = nums[i] + min(dp[i - 1], dp[i - 2])\n    return dp[-1]\n",
      {
        en: "<code>dp[i]</code> = min cost ending at <code>i</code>. <code>dp[i] = nums[i] + min(dp[i-1], dp[i-2])</code>.",
        zh: "<code>dp[i]</code> = 走到下标 <code>i</code> 的最小代价。<code>dp[i] = nums[i] + min(dp[i-1], dp[i-2])</code>。",
      },
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
      {
        en: "For <code>climb_stairs</code>, why is O(1) space possible?",
        zh: "为什么 <code>climb_stairs</code> 能做到 O(1) 空间?",
      },
      [
        {
          en: "Because the problem is trivial",
          zh: "因为题本身很简单",
        },
        {
          en: "Because we only need the last two values to compute the next",
          zh: "因为只用最近两项就能算下一项",
        },
        {
          en: "Because of the <code>lru_cache</code> decorator",
          zh: "因为用了 <code>lru_cache</code> 装饰器",
        },
        {
          en: "Because <code>n</code> is always small",
          zh: "因为 <code>n</code> 永远很小",
        },
      ],
      1,
      {
        en: "The recurrence only uses the two prior values — the full table isn&apos;t needed.",
        zh: "递推只用到前两项 —— 根本不需要整张表。",
      },
    ),
    exercise(
      "d13-t-max-product",
      {
        en: "<p>Write <code>max_subarray(nums)</code> — return the max <em>sum</em> of a contiguous subarray (Kadane&apos;s algorithm). Assume non-empty.</p>",
        zh: "<p>写一个 <code>max_subarray(nums)</code> —— 返回连续子数组的最大<em>和</em>(Kadane 算法)。保证非空。</p>",
      },
      "def max_subarray(nums):\n    # your code here\n    pass\n",
      "def max_subarray(nums):\n    best = cur = nums[0]\n    for x in nums[1:]:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    return best\n",
      {
        en: "<code>cur</code> = best sum ending at the current index. Either start fresh at <code>x</code> or extend: <code>max(x, cur + x)</code>.",
        zh: "<code>cur</code> = 以当前下标结尾的最大和。要么从 <code>x</code> 重新开,要么续上:<code>max(x, cur + x)</code>。",
      },
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

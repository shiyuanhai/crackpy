import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day12: Day = {
  id: 12,
  title: {
    en: "Recursion and backtracking",
    zh: "递归与回溯",
  },
  subtitle: {
    en: "Recursion is natural for trees, combinations, and &quot;try-every-choice&quot; problems. Today: base cases, recursion trees, and the backtracking template.",
    zh: "树、组合、「把所有选择都试一遍」的题,递归最顺手。今天搞定:基准情形、递归树、回溯模板。",
  },
  estimatedTime: {
    en: "60–75 min",
    zh: "60–75 分钟",
  },
  goals: [
    {
      en: "Write recursive functions with clear base cases",
      zh: "写基准情形清晰的递归函数",
    },
    {
      en: "Trust the recursion — believe the recursive call works",
      zh: "相信递归 —— 假设递归调用本身就对",
    },
    {
      en: "Apply the backtracking template (choose → recurse → unchoose)",
      zh: "套回溯模板(选择 → 递归 → 撤销)",
    },
  ],
  youWillBuild: {
    en: "Fibonacci, subsets, and permutations — three drills that teach the backtracking pattern.",
    zh: "斐波那契、子集、全排列 —— 三道练习把回溯套路刻进脑子。",
  },
  steps: [
    teach(
      "d12-intro",
      {
        en: "<p>A recursive function solves a problem by calling itself on a smaller version of the problem.</p><p>Two things to always get right: (1) the <strong>base case</strong> — where the recursion stops; (2) the <strong>recursive step</strong> — how the current call uses the result of smaller calls.</p>",
        zh: "<p>递归函数就是把问题变小一点,再调自己。</p><p>两件事一定要想清楚:(1)<strong>基准情形</strong> —— 递归在哪停;(2)<strong>递归步骤</strong> —— 当前调用怎么利用小规模调用的结果。</p>",
      },
    ),
    teach(
      "d12-fib",
      {
        en: "<p>Classic starter — factorial and Fibonacci:</p><pre><code>def factorial(n):\n    if n &lt;= 1:   # base case\n        return 1\n    return n * factorial(n - 1)\n\ndef fib(n):\n    if n &lt; 2:\n        return n\n    return fib(n - 1) + fib(n - 2)</code></pre><p>Key mental move: <em>trust</em> that <code>factorial(n - 1)</code> returns the right value. Don&apos;t try to trace through 5 levels — reason about one level at a time.</p>",
        zh: "<p>经典开局 —— 阶乘和斐波那契:</p><pre><code>def factorial(n):\n    if n &lt;= 1:   # 基准情形\n        return 1\n    return n * factorial(n - 1)\n\ndef fib(n):\n    if n &lt; 2:\n        return n\n    return fib(n - 1) + fib(n - 2)</code></pre><p>关键心法:<em>相信</em> <code>factorial(n - 1)</code> 会返回正确的值。别去脑内跑五层调用栈 —— 只推一层就够了。</p>",
      },
    ),
    exercise(
      "d12-ex-fact",
      {
        en: "<p>Write <code>factorial(n)</code> recursively. <code>n &gt;= 0</code>. <code>factorial(0) == 1</code>.</p>",
        zh: "<p>用递归写 <code>factorial(n)</code>。<code>n &gt;= 0</code>。<code>factorial(0) == 1</code>。</p>",
      },
      "def factorial(n):\n    # your code here\n    pass\n",
      "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n",
      {
        en: "Base case: <code>n &lt;= 1</code> returns 1. Else return <code>n * factorial(n - 1)</code>.",
        zh: "基准:<code>n &lt;= 1</code> 返回 1。否则返回 <code>n * factorial(n - 1)</code>。",
      },
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
      {
        en: "<p>Naive <code>fib(n)</code> is exponential — it recomputes the same values repeatedly. To fix: <strong>memoization</strong>. Cache subproblem answers.</p><pre><code>from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n &lt; 2:\n        return n\n    return fib(n - 1) + fib(n - 2)</code></pre><p>Memoization is the bridge to dynamic programming (Day 13).</p>",
        zh: "<p>朴素的 <code>fib(n)</code> 是指数级的 —— 同一个值被反复算。解决办法:<strong>记忆化</strong>,把子问题答案缓存下来。</p><pre><code>from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n &lt; 2:\n        return n\n    return fib(n - 1) + fib(n - 2)</code></pre><p>记忆化就是通往动态规划(Day 13)的桥。</p>",
      },
    ),
    demo(
      "d12-fib-demo",
      {
        en: "<p>Watch the speedup:</p>",
        zh: "<p>看看提速有多夸张:</p>",
      },
      "import time\nfrom functools import lru_cache\n\ndef fib_slow(n):\n    if n < 2:\n        return n\n    return fib_slow(n - 1) + fib_slow(n - 2)\n\n@lru_cache(maxsize=None)\ndef fib_fast(n):\n    if n < 2:\n        return n\n    return fib_fast(n - 1) + fib_fast(n - 2)\n\nt0 = time.time()\nprint(fib_slow(30), round(time.time() - t0, 3), \"s\")\nt0 = time.time()\nprint(fib_fast(100), round(time.time() - t0, 3), \"s\")",
    ),
    checkpoint(
      "d12-cp",
      {
        en: "Backtracking template",
        zh: "回溯模板",
      },
      {
        en: "For combinations, subsets, permutations, and puzzles (sudoku, n-queens) — you explore choices, recurse, then undo. The shape is almost identical every time.",
        zh: "组合、子集、排列,以及各种谜题(数独、N 皇后)—— 都是「尝试选择、递归、撤销」。模板基本都长一个样。",
      },
    ),
    teach(
      "d12-backtrack",
      {
        en: "<p><strong>Backtracking template:</strong></p><pre><code>def solve(partial, remaining, result):\n    if is_solution(partial):\n        result.append(list(partial))   # copy!\n        return\n    for choice in choices(remaining):\n        partial.append(choice)                    # choose\n        solve(partial, remaining_without(choice), result)  # recurse\n        partial.pop()                             # unchoose</code></pre><p>The <code>list(partial)</code> copy matters — if you append <code>partial</code> itself, all entries in <code>result</code> end up pointing to the same mutating list.</p>",
        zh: "<p><strong>回溯模板:</strong></p><pre><code>def solve(partial, remaining, result):\n    if is_solution(partial):\n        result.append(list(partial))   # 一定要拷贝!\n        return\n    for choice in choices(remaining):\n        partial.append(choice)                    # 选择\n        solve(partial, remaining_without(choice), result)  # 递归\n        partial.pop()                             # 撤销</code></pre><p><code>list(partial)</code> 的拷贝很关键 —— 要是直接 append <code>partial</code>,<code>result</code> 里所有「答案」最后都指向同一个还在变的列表。</p>",
      },
    ),
    exercise(
      "d12-ex-subsets",
      {
        en: "<p><strong>LeetCode #78 — Subsets.</strong> Given a list of <em>distinct</em> integers, return all subsets. Order of subsets doesn&apos;t matter but we&apos;ll sort for a deterministic test.</p>",
        zh: "<p><strong>LeetCode #78 —— 子集。</strong>给一组<em>不重复</em>的整数,返回所有子集。子集之间的顺序无所谓,我们会排序来保证测试结果稳定。</p>",
      },
      "def subsets(nums):\n    # your code here\n    pass\n",
      "def subsets(nums):\n    result = []\n    def backtrack(start, path):\n        result.append(list(path))\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return sorted(result, key=lambda s: (len(s), s))\n",
      {
        en: "Start with the empty subset. At each position decide &quot;include this or not&quot; — we implement this as: at each index, choose any later element to include. The template writes itself.",
        zh: "从空子集开始。每个位置决定「选不选」—— 实现方式是:在每个索引处,往后选一个元素加进来。模板几乎自己就写出来了。",
      },
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
      {
        en: "<p><strong>LeetCode #46 — Permutations.</strong> Given a list of distinct integers, return all permutations. Sort the result for a deterministic test.</p>",
        zh: "<p><strong>LeetCode #46 —— 全排列。</strong>给一组不重复的整数,返回所有排列。结果排下序,方便稳定判题。</p>",
      },
      "def permutations(nums):\n    # your code here\n    pass\n",
      "def permutations(nums):\n    result = []\n    def backtrack(path, used):\n        if len(path) == len(nums):\n            result.append(list(path))\n            return\n        for i in range(len(nums)):\n            if used[i]:\n                continue\n            used[i] = True\n            path.append(nums[i])\n            backtrack(path, used)\n            path.pop()\n            used[i] = False\n    backtrack([], [False] * len(nums))\n    return sorted(result)\n",
      {
        en: "Backtracking with a <code>used</code> array. Base case: <code>path</code> has <code>n</code> elements.",
        zh: "用 <code>used</code> 数组标记已用元素的回溯。基准:<code>path</code> 凑够 <code>n</code> 个元素。",
      },
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
      {
        en: "Why do we append <code>list(path)</code> and not just <code>path</code> to the result?",
        zh: "为什么要 append <code>list(path)</code> 而不是直接 append <code>path</code>?",
      },
      [
        {
          en: "It&apos;s faster",
          zh: "这样更快",
        },
        {
          en: "<code>path</code> is a list we&apos;re mutating; appending a reference would make every stored &quot;answer&quot; point to the same list",
          zh: "<code>path</code> 是一直在改的列表;直接放引用会让所有「答案」都指向同一个列表",
        },
        {
          en: "Python doesn&apos;t allow storing lists in lists",
          zh: "Python 不允许列表里套列表",
        },
        {
          en: "<code>list()</code> converts it to an immutable tuple",
          zh: "<code>list()</code> 会转成不可变的 tuple",
        },
      ],
      1,
      {
        en: "Day 3 aliasing callback. <code>path</code> keeps mutating; you need a snapshot copy.",
        zh: "这就是 Day 3 的别名陷阱。<code>path</code> 会一直变,得存一份快照。",
      },
    ),
    recall(
      "d12-recall",
      {
        en: "What&apos;s the shape of the backtracking template? Say the three steps in order.",
        zh: "回溯模板长什么样?按顺序说出三步。",
      },
      {
        en: "Choose — make a decision (add to <code>path</code>). Recurse — call yourself with the updated state. Unchoose — undo the decision (pop from <code>path</code>) so the next iteration of the loop has a clean slate.",
        zh: "选择 —— 做出决定(加进 <code>path</code>)。递归 —— 用更新后的状态调自己。撤销 —— 收回决定(从 <code>path</code> pop 掉),让下一轮循环干净。",
      },
    ),
    teach(
      "d12-wrap",
      {
        en: "<p>Today you wrote factorial, subsets, and permutations. With these three under your belt, you can attack most backtracking interview problems — N-Queens, combination sum, word search, etc. all follow the same shape.</p>",
        zh: "<p>今天你写了阶乘、子集、全排列。这三道手上有了,大部分回溯面试题都能正面刚 —— N 皇后、组合总和、单词搜索,全是一个套路。</p>",
      },
    ),
  ],
  finalTest: [
    exercise(
      "d12-t-sumdigits",
      {
        en: "<p>Write <code>sum_digits(n)</code> recursively — the sum of digits of a non-negative integer.</p>",
        zh: "<p>用递归写 <code>sum_digits(n)</code> —— 非负整数的各位数字之和。</p>",
      },
      "def sum_digits(n):\n    # your code here\n    pass\n",
      "def sum_digits(n):\n    if n < 10:\n        return n\n    return n % 10 + sum_digits(n // 10)\n",
      {
        en: "Base: single digit returns itself. Else last digit (<code>n % 10</code>) plus recurse on the rest (<code>n // 10</code>).",
        zh: "基准:个位数直接返回自己。否则末位 (<code>n % 10</code>) 加上剩下的部分 (<code>n // 10</code>) 递归。",
      },
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
      {
        en: "<p><strong>LeetCode #77 — Combinations.</strong> Return all combinations of <code>k</code> numbers from <code>1</code> to <code>n</code>. Sort the result for a deterministic test.</p>",
        zh: "<p><strong>LeetCode #77 —— 组合。</strong>从 <code>1</code> 到 <code>n</code> 中选 <code>k</code> 个数,返回所有组合。结果排序,判题稳定。</p>",
      },
      "def combinations(n, k):\n    # your code here\n    pass\n",
      "def combinations(n, k):\n    result = []\n    def backtrack(start, path):\n        if len(path) == k:\n            result.append(list(path))\n            return\n        for i in range(start, n + 1):\n            path.append(i)\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(1, [])\n    return sorted(result)\n",
      {
        en: "Same template as subsets but with a size-k goal.",
        zh: "跟子集是一个模板,只是目标长度固定为 k。",
      },
      [
        { call: "combinations(1, 1)", expected: [[1]] },
        { call: "combinations(4, 2)", expected: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]] },
        { call: "combinations(3, 3)", expected: [[1, 2, 3]] },
      ],
      { fnName: "combinations" },
    ),
    quizMC(
      "d12-t-memo",
      {
        en: "What problem does <code>@lru_cache</code> solve for recursive functions like naive Fibonacci?",
        zh: "对朴素斐波那契这种递归函数,<code>@lru_cache</code> 解决的是什么问题?",
      },
      [
        {
          en: "Stack overflow",
          zh: "栈溢出",
        },
        {
          en: "Exponential repeated work — caches subproblem answers",
          zh: "指数级的重复计算 —— 它把子问题答案缓存起来",
        },
        {
          en: "Makes the code shorter",
          zh: "让代码更短",
        },
        {
          en: "Handles large numbers",
          zh: "处理大数",
        },
      ],
      1,
      {
        en: "Without memoization, <code>fib(n)</code> recomputes <code>fib(n-3)</code>, <code>fib(n-4)</code>, etc., many times — exponential. Caching collapses it to linear.",
        zh: "没有记忆化的 <code>fib(n)</code> 会把 <code>fib(n-3)</code>、<code>fib(n-4)</code> 之类反复算很多次 —— 指数级。缓存后直接压到线性。",
      },
    ),
    exercise(
      "d12-t-pow",
      {
        en: "<p>Write <code>my_pow(x, n)</code> — compute <code>x ** n</code> for integer <code>n</code> in O(log n) time using recursion. Handle negative <code>n</code>.</p>",
        zh: "<p>写 <code>my_pow(x, n)</code> —— 用递归在 O(log n) 时间内算 <code>x ** n</code>(整数 <code>n</code>)。负数 <code>n</code> 也要处理。</p>",
      },
      "def my_pow(x, n):\n    # your code here\n    pass\n",
      "def my_pow(x, n):\n    if n == 0:\n        return 1.0\n    if n < 0:\n        return 1 / my_pow(x, -n)\n    half = my_pow(x, n // 2)\n    if n % 2 == 0:\n        return half * half\n    return half * half * x\n",
      {
        en: "Fast exponentiation: <code>x^n = (x^(n/2))²</code> — halves the problem each recursion, O(log n).",
        zh: "快速幂:<code>x^n = (x^(n/2))²</code> —— 每次递归把问题砍半,O(log n)。",
      },
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

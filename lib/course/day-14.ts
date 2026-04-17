import type { Day } from "../types";
import { teach, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day14: Day = {
  id: 14,
  title: {
    en: "Interview strategy — the capstone",
    zh: "面试策略 —— 收官篇",
  },
  subtitle: {
    en: "Pattern recognition, complexity talk, and a mock set that touches every topic from Days 1–13.",
    zh: "套路识别、复杂度讲解,加一套把 Day 1–13 所有知识点串起来的模拟题。",
  },
  estimatedTime: {
    en: "70–90 min",
    zh: "70–90 分钟",
  },
  goals: [
    {
      en: "Recognize which pattern a problem asks for in under 60 seconds",
      zh: "60 秒内判断出题目该用哪种套路",
    },
    {
      en: "State time and space complexity confidently",
      zh: "自信地说出时间和空间复杂度",
    },
    {
      en: "Walk through a problem out loud: clarify → plan → code → test",
      zh: "出声把一道题走完:澄清 → 规划 → 写码 → 测试",
    },
    {
      en: "Finish the 14-day arc with a mock mini-set",
      zh: "用一套迷你模拟题给 14 天收尾",
    },
  ],
  youWillBuild: {
    en: "A mixed mock: hash map, two pointers, BFS, DP, recursion — five problems, no warnings about which is which.",
    zh: "一套混合模拟:哈希表、双指针、BFS、DP、递归 —— 五道题,不告诉你该用哪种。",
  },
  steps: [
    teach(
      "d14-intro",
      {
        en: "<p>Today is a capstone — no new syntax, no new data structures. Instead: how to <em>attack</em> a problem you&apos;ve never seen before, and a mock set that blends everything.</p><p>The interview isn&apos;t about memorizing 150 LeetCode solutions. It&apos;s about having the right reflexes.</p>",
        zh: "<p>今天是收官 —— 不讲新语法,不讲新数据结构。只讲怎么<em>正面刚</em>一道没见过的题,再给一套把前面所有东西揉在一起的模拟题。</p><p>面试不是背 150 道 LeetCode 题解。是练出该有的条件反射。</p>",
      },
    ),
    teach(
      "d14-patterns",
      {
        en: "<p><strong>The pattern cheat sheet.</strong> When you see a problem, match it to a pattern in under a minute:</p><ul><li><strong>Sorted array + target value</strong> → binary search (Day 10)</li><li><strong>&quot;Find pair/triplet that sums to X&quot;</strong> → hash map (Day 8) or two pointers on sorted (Day 7)</li><li><strong>&quot;Longest/shortest substring with property&quot;</strong> → sliding window (Day 7)</li><li><strong>&quot;Count/find anagrams, frequency-based&quot;</strong> → Counter / dict (Days 5, 8)</li><li><strong>Nested structure, next greater, matching brackets</strong> → stack (Day 9)</li><li><strong>Tree / level order / shortest path</strong> → BFS or DFS (Day 11)</li><li><strong>&quot;All combinations / permutations / subsets&quot;</strong> → backtracking (Day 12)</li><li><strong>&quot;Min/max cost to reach&quot;, &quot;number of ways&quot;, overlapping subproblems</strong> → DP (Day 13)</li></ul>",
        zh: "<p><strong>套路备忘单。</strong>看到题,一分钟内把它对上一个套路:</p><ul><li><strong>有序数组 + 目标值</strong> → 二分(Day 10)</li><li><strong>「找和为 X 的二元/三元组」</strong> → 哈希表(Day 8)或有序数组上的双指针(Day 7)</li><li><strong>「满足某条件的最长/最短子串」</strong> → 滑动窗口(Day 7)</li><li><strong>「数/找异位词、跟频次有关」</strong> → Counter / dict(Day 5、8)</li><li><strong>嵌套、下一个更大、括号匹配</strong> → 栈(Day 9)</li><li><strong>树 / 层序 / 最短路径</strong> → BFS 或 DFS(Day 11)</li><li><strong>「所有组合 / 排列 / 子集」</strong> → 回溯(Day 12)</li><li><strong>「到达的最小/最大代价」、「方案数」、重叠子问题</strong> → DP(Day 13)</li></ul>",
      },
    ),
    teach(
      "d14-talk",
      {
        en: "<p><strong>How to talk through a problem.</strong> Four beats — don&apos;t skip any:</p><ol><li><strong>Clarify.</strong> Ask about constraints, edge cases, input types. <em>&quot;Can the array be empty? Are values negative? Is it sorted?&quot;</em></li><li><strong>Plan.</strong> State your approach and complexity <em>before</em> writing code. <em>&quot;I&apos;ll use a hash map to store seen values. O(n) time, O(n) space.&quot;</em></li><li><strong>Code.</strong> Narrate as you type. Use descriptive names.</li><li><strong>Test.</strong> Walk through a small example by hand. Then edge cases: empty, one element, duplicates, negatives.</li></ol><p>Interviewers want to hear your reasoning. Silence feels like you&apos;re stuck.</p>",
        zh: "<p><strong>怎么把一道题讲出来。</strong>四拍 —— 一拍都别漏:</p><ol><li><strong>澄清。</strong>问约束、边界、输入类型。<em>「数组能不能空?有没有负数?是否有序?」</em></li><li><strong>规划。</strong>动手前先说清思路和复杂度。<em>「我用哈希表存见过的值,时间 O(n),空间 O(n)。」</em></li><li><strong>写码。</strong>一边写一边讲,用有意义的名字。</li><li><strong>测试。</strong>手动过一个小例子,再过边界:空、单元素、重复、负数。</li></ol><p>面试官想听你的思路。沉默会让他们以为你卡住了。</p>",
      },
    ),
    recall(
      "d14-recall-patterns",
      {
        en: "Name the pattern for: (a) &quot;longest substring without repeating characters&quot;; (b) &quot;min coins to make amount N&quot;; (c) &quot;number of islands in a grid&quot;; (d) &quot;valid parentheses&quot;.",
        zh: "说出每道题的套路:(a)「无重复字符的最长子串」;(b)「凑出金额 N 的最少硬币数」;(c)「网格中的岛屿数量」;(d)「有效的括号」。",
      },
      {
        en: "(a) Sliding window + hash set — Day 7/8. (b) DP (unbounded knapsack flavor) — Day 13. (c) BFS or DFS on grid — Day 11 pattern. (d) Stack — Day 9.",
        zh: "(a)滑动窗口 + 哈希集合 —— Day 7/8。(b)DP(完全背包味)—— Day 13。(c)网格上的 BFS 或 DFS —— Day 11 的套路。(d)栈 —— Day 9。",
      },
    ),
    checkpoint(
      "d14-cp",
      {
        en: "Mock set begins",
        zh: "模拟题开考",
      },
      {
        en: "Five problems. Each a real mix — you decide the pattern. Read slowly, think before coding. This is your final exam.",
        zh: "五道题,全是混合口味 —— 套路自己判断。慢慢读、想清楚再动手。这就是你的期末考。",
      },
    ),
    exercise(
      "d14-mock-1",
      {
        en: "<p><strong>Mock #1.</strong> <code>first_unique_char(s)</code> — return the index of the first non-repeating character in <code>s</code>, or <code>-1</code> if none. (LeetCode #387.)</p><p>Example: <code>&quot;leetcode&quot;</code> → 0. <code>&quot;loveleetcode&quot;</code> → 2. <code>&quot;aabb&quot;</code> → -1.</p>",
        zh: "<p><strong>模拟 #1。</strong><code>first_unique_char(s)</code> —— 返回 <code>s</code> 中第一个不重复字符的下标,没有就 <code>-1</code>。(LeetCode #387。)</p><p>例:<code>&quot;leetcode&quot;</code> → 0。<code>&quot;loveleetcode&quot;</code> → 2。<code>&quot;aabb&quot;</code> → -1。</p>",
      },
      "def first_unique_char(s):\n    # your code here\n    pass\n",
      "def first_unique_char(s):\n    from collections import Counter\n    counts = Counter(s)\n    for i, ch in enumerate(s):\n        if counts[ch] == 1:\n            return i\n    return -1\n",
      {
        en: "Two passes: <code>Counter(s)</code> to get frequencies, then linear scan for the first count-1 char. O(n) time, O(1) extra space (26 letters max).",
        zh: "两遍扫:<code>Counter(s)</code> 拿到频次,再顺序扫一遍找第一个频次为 1 的字符。O(n) 时间,O(1) 额外空间(字母最多 26 个)。",
      },
      [
        { call: 'first_unique_char("leetcode")', expected: 0 },
        { call: 'first_unique_char("loveleetcode")', expected: 2 },
        { call: 'first_unique_char("aabb")', expected: -1 },
        { call: 'first_unique_char("z")', expected: 0 },
        { call: 'first_unique_char("")', expected: -1 },
      ],
      { fnName: "first_unique_char" },
    ),
    exercise(
      "d14-mock-2",
      {
        en: "<p><strong>Mock #2.</strong> <code>move_zeroes(nums)</code> — move all zeros to the end of <code>nums</code> <em>in place</em>, preserving the relative order of non-zero elements. Return the modified list. (LeetCode #283.)</p><p>Example: <code>[0,1,0,3,12]</code> → <code>[1,3,12,0,0]</code>.</p>",
        zh: "<p><strong>模拟 #2。</strong><code>move_zeroes(nums)</code> —— <em>原地</em>把所有 0 挪到 <code>nums</code> 末尾,保持非零元素的相对顺序。返回改完的列表。(LeetCode #283。)</p><p>例:<code>[0,1,0,3,12]</code> → <code>[1,3,12,0,0]</code>。</p>",
      },
      "def move_zeroes(nums):\n    # your code here\n    pass\n",
      "def move_zeroes(nums):\n    write = 0\n    for read in range(len(nums)):\n        if nums[read] != 0:\n            nums[write], nums[read] = nums[read], nums[write]\n            write += 1\n    return nums\n",
      {
        en: "Two-pointer in place: <code>write</code> marks the next slot for a non-zero; <code>read</code> scans. Swap when <code>read</code> is non-zero. O(n) time, O(1) space.",
        zh: "原地双指针:<code>write</code> 标记非零元素该放的位置,<code>read</code> 扫过去。<code>read</code> 指向非零时就交换。O(n) 时间,O(1) 空间。",
      },
      [
        { call: "move_zeroes([0, 1, 0, 3, 12])", expected: [1, 3, 12, 0, 0] },
        { call: "move_zeroes([0])", expected: [0] },
        { call: "move_zeroes([1, 2, 3])", expected: [1, 2, 3] },
        { call: "move_zeroes([0, 0, 1])", expected: [1, 0, 0] },
        { call: "move_zeroes([])", expected: [] },
      ],
      { fnName: "move_zeroes" },
    ),
    exercise(
      "d14-mock-3",
      {
        en: "<p><strong>Mock #3.</strong> <code>num_islands(grid)</code> — given a 2D grid of <code>&quot;1&quot;</code> (land) and <code>&quot;0&quot;</code> (water), count the number of islands. An island is a group of 1&apos;s connected horizontally or vertically. (LeetCode #200.)</p>",
        zh: "<p><strong>模拟 #3。</strong><code>num_islands(grid)</code> —— 给一个二维网格,<code>&quot;1&quot;</code> 代表陆地,<code>&quot;0&quot;</code> 代表水,数岛屿个数。一座岛是一组水平或垂直相连的 1。(LeetCode #200。)</p>",
      },
      "def num_islands(grid):\n    # your code here\n    pass\n",
      'def num_islands(grid):\n    if not grid or not grid[0]:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n    count = 0\n    def sink(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":\n            return\n        grid[r][c] = "0"\n        sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == "1":\n                count += 1\n                sink(r, c)\n    return count\n',
      {
        en: "DFS flood-fill: scan every cell. When you find a <code>&quot;1&quot;</code>, increment the counter and sink the whole connected island to <code>&quot;0&quot;</code>. O(rows × cols) time.",
        zh: "DFS 灌水:扫每个格子。遇到 <code>&quot;1&quot;</code> 就计数器 +1,然后把相连的整座岛沉成 <code>&quot;0&quot;</code>。O(rows × cols) 时间。",
      },
      [
        {
          call:
            'num_islands([["1","1","0"],["1","0","0"],["0","0","1"]])',
          expected: 2,
        },
        {
          call: 'num_islands([["1","1","1"],["1","1","1"]])',
          expected: 1,
        },
        { call: "num_islands([])", expected: 0 },
        {
          call: 'num_islands([["0","0"],["0","0"]])',
          expected: 0,
        },
      ],
      { fnName: "num_islands" },
    ),
    exercise(
      "d14-mock-4",
      {
        en: "<p><strong>Mock #4.</strong> <code>longest_unique(s)</code> — return the length of the longest substring of <code>s</code> without repeating characters. (LeetCode #3.)</p><p>Example: <code>&quot;abcabcbb&quot;</code> → 3 (<code>&quot;abc&quot;</code>). <code>&quot;bbbbb&quot;</code> → 1.</p>",
        zh: "<p><strong>模拟 #4。</strong><code>longest_unique(s)</code> —— 返回 <code>s</code> 中无重复字符的最长子串长度。(LeetCode #3。)</p><p>例:<code>&quot;abcabcbb&quot;</code> → 3(<code>&quot;abc&quot;</code>)。<code>&quot;bbbbb&quot;</code> → 1。</p>",
      },
      "def longest_unique(s):\n    # your code here\n    pass\n",
      "def longest_unique(s):\n    seen = {}\n    left = 0\n    best = 0\n    for right, ch in enumerate(s):\n        if ch in seen and seen[ch] >= left:\n            left = seen[ch] + 1\n        seen[ch] = right\n        best = max(best, right - left + 1)\n    return best\n",
      {
        en: "Sliding window with a dict mapping char → last seen index. When a repeat lands inside the window, advance <code>left</code> past the previous occurrence. O(n).",
        zh: "滑动窗口 + 字典「字符 → 上次出现下标」。重复字符落在窗口里就把 <code>left</code> 推过上次出现的位置。O(n)。",
      },
      [
        { call: 'longest_unique("abcabcbb")', expected: 3 },
        { call: 'longest_unique("bbbbb")', expected: 1 },
        { call: 'longest_unique("pwwkew")', expected: 3 },
        { call: 'longest_unique("")', expected: 0 },
        { call: 'longest_unique("abcdef")', expected: 6 },
      ],
      { fnName: "longest_unique" },
    ),
    exercise(
      "d14-mock-5",
      {
        en: "<p><strong>Mock #5.</strong> <code>min_cost_climb(cost)</code> — given a list of costs where <code>cost[i]</code> is the cost of step <code>i</code>, you can start at index 0 or 1 and at each step take 1 or 2 steps up. Return the min cost to reach <em>past</em> the last step (i.e., index <code>len(cost)</code>). (LeetCode #746.)</p><p>Example: <code>[10, 15, 20]</code> → 15 (start at index 1, jump two past the top).</p>",
        zh: "<p><strong>模拟 #5。</strong><code>min_cost_climb(cost)</code> —— 给一个代价列表,<code>cost[i]</code> 是第 <code>i</code> 级台阶的代价,可以从下标 0 或 1 起跳,每次走 1 或 2 级。返回跨过<em>最后一级</em>(即到达下标 <code>len(cost)</code>)的最小总代价。(LeetCode #746。)</p><p>例:<code>[10, 15, 20]</code> → 15(从下标 1 起跳,两级跨过顶)。</p>",
      },
      "def min_cost_climb(cost):\n    # your code here\n    pass\n",
      "def min_cost_climb(cost):\n    n = len(cost)\n    prev2, prev1 = 0, 0\n    for i in range(2, n + 1):\n        cur = min(prev1 + cost[i - 1], prev2 + cost[i - 2])\n        prev2, prev1 = prev1, cur\n    return prev1\n",
      {
        en: "DP. <code>dp[i]</code> = min cost to reach index <code>i</code>. <code>dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])</code>. Final answer: <code>dp[n]</code>. Rolling variables → O(1) space.",
        zh: "DP。<code>dp[i]</code> = 到达下标 <code>i</code> 的最小代价。<code>dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])</code>。最终答案:<code>dp[n]</code>。滚动变量 → O(1) 空间。",
      },
      [
        { call: "min_cost_climb([10, 15, 20])", expected: 15 },
        { call: "min_cost_climb([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])", expected: 6 },
        { call: "min_cost_climb([0, 0])", expected: 0 },
        { call: "min_cost_climb([5, 5])", expected: 5 },
      ],
      { fnName: "min_cost_climb" },
    ),
    quizMC(
      "d14-q-complexity",
      {
        en: "A hash map lookup is amortized O(1). When could it degrade to O(n)?",
        zh: "哈希表查找摊还 O(1)。什么情况下会退化到 O(n)?",
      },
      [
        {
          en: "Never — hash maps are always O(1)",
          zh: "永远不会 —— 哈希表一直是 O(1)",
        },
        {
          en: "When all keys hash to the same bucket — worst-case collision",
          zh: "当所有 key 哈希到同一个桶 —— 最坏情况冲突",
        },
        {
          en: "When the map has more than 1,000 entries",
          zh: "当表里超过 1000 个元素",
        },
        {
          en: "When keys are strings instead of integers",
          zh: "当 key 是字符串而不是整数",
        },
      ],
      1,
      {
        en: "Hash maps depend on a good hash function. If every key collides, every lookup walks a chain of <code>n</code> entries. In practice Python&apos;s hash is strong enough that this doesn&apos;t happen — but it&apos;s worth knowing.",
        zh: "哈希表靠好的哈希函数撑着。如果所有 key 都冲突,每次查找就要扫 <code>n</code> 个元素的链。实际上 Python 的哈希足够强,基本不会出事 —— 但这点心里要有数。",
      },
    ),
    recall(
      "d14-recall-talk",
      {
        en: "An interviewer gives you a problem. What are the four beats you should hit before declaring &quot;done&quot;?",
        zh: "面试官给你一道题,收工之前必须打满哪四拍?",
      },
      {
        en: "(1) Clarify — ask about constraints and edge cases. (2) Plan — state approach and complexity before coding. (3) Code — narrate as you type. (4) Test — trace through an example and edge cases out loud.",
        zh: "(1)澄清 —— 问约束和边界。(2)规划 —— 动手前讲清思路和复杂度。(3)写码 —— 边写边讲。(4)测试 —— 出声走一个例子再过边界。",
      },
    ),
    teach(
      "d14-wrap",
      {
        en: "<p>You made it.</p><p>Over 14 days you built up: fundamentals → strings → lists → loops → dicts/sets → functions → two pointers → hash maps → stacks/queues → binary search → trees → recursion → DP → strategy.</p><p>That&apos;s enough to attack 80% of coding interview problems with confidence. The remaining 20% is volume — grind a handful of LeetCode mediums a week and keep the pattern cheat sheet from today in your back pocket.</p><p>Good luck. Go crack it.</p>",
        zh: "<p>你坚持下来了。</p><p>这 14 天你一路搭起来的技能是:基础 → 字符串 → 列表 → 循环 → 字典/集合 → 函数 → 双指针 → 哈希表 → 栈/队列 → 二分 → 树 → 递归 → DP → 策略。</p><p>这些足够让你有信心面对 80% 的算法面试题。剩下 20% 靠量 —— 一周刷几道 LeetCode 中等题,把今天的套路备忘单揣在兜里。</p><p>祝好运,上去拿下它。</p>",
      },
    ),
  ],
  finalTest: [
    exercise(
      "d14-t-longest-palindrome",
      {
        en: "<p>Write <code>longest_palindrome_len(s)</code> — return the length of the longest palindrome that can be <em>built</em> using the characters of <code>s</code>. (LeetCode #409.)</p><p>Example: <code>&quot;abccccdd&quot;</code> → 7 (e.g., <code>&quot;dccaccd&quot;</code>).</p>",
        zh: "<p>写一个 <code>longest_palindrome_len(s)</code> —— 用 <code>s</code> 里的字符能<em>拼出</em>的最长回文长度。(LeetCode #409。)</p><p>例:<code>&quot;abccccdd&quot;</code> → 7(比如 <code>&quot;dccaccd&quot;</code>)。</p>",
      },
      "def longest_palindrome_len(s):\n    # your code here\n    pass\n",
      "def longest_palindrome_len(s):\n    from collections import Counter\n    counts = Counter(s)\n    total = 0\n    has_odd = False\n    for c in counts.values():\n        total += (c // 2) * 2\n        if c % 2 == 1:\n            has_odd = True\n    return total + (1 if has_odd else 0)\n",
      {
        en: "Every pair of a character contributes 2 to the palindrome. If any character has an odd count, one of them can sit in the middle.",
        zh: "每对字符给回文贡献 2。只要有一个字符出现奇数次,就能放一个在正中间。",
      },
      [
        { call: 'longest_palindrome_len("abccccdd")', expected: 7 },
        { call: 'longest_palindrome_len("a")', expected: 1 },
        { call: 'longest_palindrome_len("bb")', expected: 2 },
        { call: 'longest_palindrome_len("")', expected: 0 },
        { call: 'longest_palindrome_len("abc")', expected: 1 },
      ],
      { fnName: "longest_palindrome_len" },
    ),
    quizMC(
      "d14-t-pattern",
      {
        en: "You see: <em>&quot;Given a rotated sorted array, find the index of target in O(log n).&quot;</em> Which pattern?",
        zh: "看到题目:<em>「给一个旋转后的有序数组,O(log n) 找到 target 的下标。」</em>用哪种套路?",
      },
      [
        {
          en: "Two pointers",
          zh: "双指针",
        },
        {
          en: "Modified binary search",
          zh: "改造版二分",
        },
        {
          en: "Sliding window",
          zh: "滑动窗口",
        },
        {
          en: "Backtracking",
          zh: "回溯",
        },
      ],
      1,
      {
        en: "The &quot;sorted&quot; and &quot;O(log n)&quot; signals scream binary search. The twist is handling the rotation — one half is always sorted; you decide which half to search.",
        zh: "「有序」和「O(log n)」这两个信号直接指向二分。关键是处理旋转 —— 两半里总有一半是有序的,判断该去哪一半找。",
      },
    ),
    exercise(
      "d14-t-climb-ways",
      {
        en: "<p>Write <code>climb_ways(n, steps)</code> — number of distinct ways to climb to step <code>n</code> if at each move you can take any value from <code>steps</code> (a list of positive ints).</p><p>Example: <code>climb_ways(4, [1, 2])</code> → 5 (the Fibonacci-style count).</p>",
        zh: "<p>写一个 <code>climb_ways(n, steps)</code> —— 每次能跨 <code>steps</code>(一个正整数列表)中的任意一个值,返回爬到第 <code>n</code> 级的方案数。</p><p>例:<code>climb_ways(4, [1, 2])</code> → 5(斐波那契风格的计数)。</p>",
      },
      "def climb_ways(n, steps):\n    # your code here\n    pass\n",
      "def climb_ways(n, steps):\n    dp = [0] * (n + 1)\n    dp[0] = 1\n    for i in range(1, n + 1):\n        for s in steps:\n            if i - s >= 0:\n                dp[i] += dp[i - s]\n    return dp[n]\n",
      {
        en: "Generalized climb-stairs. <code>dp[i] = sum(dp[i - s] for s in steps if i - s &gt;= 0)</code>. Base: <code>dp[0] = 1</code>.",
        zh: "广义爬楼梯。<code>dp[i] = sum(dp[i - s] for s in steps if i - s &gt;= 0)</code>。基准:<code>dp[0] = 1</code>。",
      },
      [
        { call: "climb_ways(4, [1, 2])", expected: 5 },
        { call: "climb_ways(0, [1, 2])", expected: 1 },
        { call: "climb_ways(3, [1, 3])", expected: 2 },
        { call: "climb_ways(5, [1, 2, 3])", expected: 13 },
      ],
      { fnName: "climb_ways" },
    ),
    exercise(
      "d14-t-majority",
      {
        en: "<p><strong>LeetCode #169 — Majority Element.</strong> Given a list where one element appears more than <code>n/2</code> times, return it. O(n) time, O(1) extra space. (Hint: Boyer-Moore voting.)</p>",
        zh: "<p><strong>LeetCode #169 —— 多数元素。</strong>列表里有一个元素出现次数超过 <code>n/2</code>,返回它。O(n) 时间,O(1) 额外空间。(提示:Boyer-Moore 投票。)</p>",
      },
      "def majority(nums):\n    # your code here\n    pass\n",
      "def majority(nums):\n    candidate = None\n    count = 0\n    for x in nums:\n        if count == 0:\n            candidate = x\n        count += 1 if x == candidate else -1\n    return candidate\n",
      {
        en: "Boyer-Moore majority vote. Cancel pairs of different elements; the majority element survives because there are more of it than everything else combined.",
        zh: "Boyer-Moore 投票。不同元素两两抵消,多数元素一定活到最后,因为它比其他元素加起来还多。",
      },
      [
        { call: "majority([3, 2, 3])", expected: 3 },
        { call: "majority([2, 2, 1, 1, 1, 2, 2])", expected: 2 },
        { call: "majority([1])", expected: 1 },
        { call: "majority([5, 5, 5, 2, 5])", expected: 5 },
      ],
      { fnName: "majority" },
    ),
    quizMC(
      "d14-t-talk",
      {
        en: "Your interviewer gives you a problem. What should you do <em>before</em> typing any code?",
        zh: "面试官给了一道题。动手敲代码<em>之前</em>你该做什么?",
      },
      [
        {
          en: "Start coding immediately to show confidence",
          zh: "立刻开敲来表现自信",
        },
        {
          en: "Clarify constraints and state your plan + complexity",
          zh: "澄清约束,讲清思路和复杂度",
        },
        {
          en: "Ask for the optimal solution",
          zh: "问面试官最优解是什么",
        },
        {
          en: "Write tests first",
          zh: "先写测试用例",
        },
      ],
      1,
      {
        en: "Clarify + plan. Jumping into code looks fast but often ends in a rewrite. A 60-second plan saves 10 minutes of backtracking.",
        zh: "澄清 + 规划。直接开敲看着快,往往重写一遍。花 60 秒想清楚能省 10 分钟返工。",
      },
    ),
  ],
};

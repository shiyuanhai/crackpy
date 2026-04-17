import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day04: Day = {
  id: 4,
  title: { en: "Loops and control flow", zh: "循环与控制流" },
  subtitle: {
    en: "Loops are where your programs earn their keep. Today: <code>for</code>, <code>while</code>, <code>range</code>, <code>break</code>, <code>continue</code>, and the loop patterns interviewers love.",
    zh: "循环才是程序真正干活的地方。今天:<code>for</code>、<code>while</code>、<code>range</code>、<code>break</code>、<code>continue</code>,以及面试官最爱考的循环套路。",
  },
  estimatedTime: { en: "50–60 min", zh: "50–60 分钟" },
  goals: [
    {
      en: "Write <code>for</code> loops over lists, ranges, and strings",
      zh: "用 <code>for</code> 遍历列表、range、字符串",
    },
    {
      en: "Use <code>while</code> loops for conditions that aren&apos;t tied to a counter",
      zh: "在不依赖计数器的条件下,用 <code>while</code> 循环",
    },
    {
      en: "Apply <code>break</code> and <code>continue</code> correctly",
      zh: "正确使用 <code>break</code> 和 <code>continue</code>",
    },
    {
      en: "Recognize the three archetypal loop patterns: accumulator, search, two-pointer",
      zh: "识别三种经典循环套路:累加器、早退出搜索、双指针",
    },
  ],
  youWillBuild: {
    en: "Counter, searcher, and a small algorithm: find the first pair that sums to a target.",
    zh: "计数器、搜索,加一个小算法:找到第一对和为 target 的元素。",
  },
  steps: [
    teach(
      "d4-intro",
      {
        en: "<p>A quick spaced-repetition callback to Day 3: you already wrote <code>my_sum</code>, which used the <em>accumulator pattern</em> — a variable outside the loop that grows with each iteration. Today we&apos;ll generalize that pattern and add two more.</p>",
        zh: "<p>先回忆一下第 3 天:你已经写过 <code>my_sum</code>,用的就是<em>累加器模式</em> —— 一个在循环外定义、每次迭代都在增长的变量。今天我们把这个模式推广开,再加两个。</p>",
      },
    ),
    teach(
      "d4-for",
      {
        en: "<p>The <code>for</code> loop iterates over any iterable — a list, string, range, dict, etc.:</p><pre><code>for x in [1, 2, 3]:\n    print(x)\n\nfor ch in \"hello\":\n    print(ch)\n\nfor i in range(5):\n    print(i)   # 0 1 2 3 4</code></pre><p><code>range(n)</code> → 0 to n-1. <code>range(a, b)</code> → a to b-1. <code>range(a, b, step)</code> → every <code>step</code>.</p>",
        zh: "<p><code>for</code> 循环可以遍历任意可迭代对象 —— 列表、字符串、range、字典等:</p><pre><code>for x in [1, 2, 3]:\n    print(x)\n\nfor ch in \"hello\":\n    print(ch)\n\nfor i in range(5):\n    print(i)   # 0 1 2 3 4</code></pre><p><code>range(n)</code> → 0 到 n-1。<code>range(a, b)</code> → a 到 b-1。<code>range(a, b, step)</code> → 每隔 <code>step</code>。</p>",
      },
    ),
    demo(
      "d4-for-demo",
      {
        en: "<p>Run each and predict:</p>",
        zh: "<p>分别跑一下,提前猜输出:</p>",
      },
      'for i in range(1, 6):\n    print(i)\nprint("---")\nfor i in range(0, 10, 2):\n    print(i)\nprint("---")\nfor i in range(5, 0, -1):\n    print(i)',
    ),
    teach(
      "d4-while",
      {
        en: "<p><code>while</code> loops run as long as a condition is true:</p><pre><code>i = 0\nwhile i &lt; 5:\n    print(i)\n    i += 1</code></pre><p>Use <code>for</code> when you&apos;re iterating a known number of times. Use <code>while</code> when you don&apos;t know when the loop will end — e.g., waiting for user input to match, walking pointers toward each other.</p>",
        zh: "<p><code>while</code> 循环在条件为真时一直执行:</p><pre><code>i = 0\nwhile i &lt; 5:\n    print(i)\n    i += 1</code></pre><p>次数已知,用 <code>for</code>。次数不确定(比如等用户输入符合条件、双指针向中间走),用 <code>while</code>。</p>",
      },
    ),
    teach(
      "d4-break",
      {
        en: "<p>Two ways to escape a loop early:</p><ul><li><code>break</code> — stop the loop entirely</li><li><code>continue</code> — skip to the next iteration</li></ul><pre><code>for x in nums:\n    if x &lt; 0:\n        continue      # skip negatives\n    if x &gt; 100:\n        break         # stop when we see a big number\n    print(x)</code></pre>",
        zh: "<p>两种提前跳出循环的方式:</p><ul><li><code>break</code> —— 整个循环结束</li><li><code>continue</code> —— 跳到下一轮迭代</li></ul><pre><code>for x in nums:\n    if x &lt; 0:\n        continue      # 跳过负数\n    if x &gt; 100:\n        break         # 遇到大数就停下\n    print(x)</code></pre>",
      },
    ),
    demo(
      "d4-break-demo",
      { en: "<p>Run it:</p>", zh: "<p>跑一下:</p>" },
      "nums = [1, -2, 3, -4, 5, 200, 10]\nfor x in nums:\n    if x < 0:\n        continue\n    if x > 100:\n        print(\"stopping at\", x)\n        break\n    print(\"seeing\", x)",
    ),
    quizMC(
      "d4-q-break",
      {
        en: "What does <code>continue</code> do inside a loop?",
        zh: "在循环里 <code>continue</code> 做什么?",
      },
      [
        { en: "Exits the loop completely", zh: "完全退出循环" },
        { en: "Skips the rest of the current iteration and moves to the next", zh: "跳过当前迭代剩下的代码,进入下一轮" },
        { en: "Restarts the loop from the beginning", zh: "从头重新开始循环" },
        { en: "Pauses the loop", zh: "暂停循环" },
      ],
      1,
      {
        en: "<code>continue</code> jumps to the next iteration. <code>break</code> is the one that exits entirely.",
        zh: "<code>continue</code> 跳到下一轮。完全退出的是 <code>break</code>。",
      },
    ),
    teach(
      "d4-pat-accum",
      {
        en: "<p><strong>Pattern 1 — Accumulator.</strong> Build up a result as you go:</p><pre><code>result = 0   # or [], or \"\", or {}\nfor x in nums:\n    result += x       # or result.append(...), etc.\nreturn result</code></pre><p>You already used this for <code>my_sum</code> on Day 3. This pattern covers: sum, product, count, concatenation, building a filtered list.</p>",
        zh: "<p><strong>模式 1 —— 累加器。</strong>边遍历边构造结果:</p><pre><code>result = 0   # 或 []、\"\"、{}\nfor x in nums:\n    result += x       # 或 result.append(...),等等\nreturn result</code></pre><p>第 3 天写 <code>my_sum</code> 时就用过。求和、求积、计数、拼接、过滤构造列表都是这个模式。</p>",
      },
    ),
    exercise(
      "d4-ex-count",
      {
        en: "<p>Write <code>count_multiples(nums, k)</code> — return how many numbers in the list are divisible by <code>k</code>.</p>",
        zh: "<p>写一个 <code>count_multiples(nums, k)</code> —— 返回列表里有多少个数能被 <code>k</code> 整除。</p>",
      },
      "def count_multiples(nums, k):\n    # your code here\n    pass\n",
      "def count_multiples(nums, k):\n    count = 0\n    for x in nums:\n        if x % k == 0:\n            count += 1\n    return count\n",
      {
        en: "Accumulator pattern: start <code>count = 0</code>, loop, increment when divisible.",
        zh: "累加器模式:<code>count = 0</code>,循环,能整除就 +1。",
      },
      [
        { call: "count_multiples([1, 2, 3, 4, 5, 6], 2)", expected: 3 },
        { call: "count_multiples([3, 6, 9], 3)", expected: 3 },
        { call: "count_multiples([1, 2, 4], 5)", expected: 0 },
      ],
      { fnName: "count_multiples" },
    ),
    teach(
      "d4-pat-search",
      {
        en: "<p><strong>Pattern 2 — Search / early exit.</strong> Find the first thing that matches, stop immediately:</p><pre><code>for i, x in enumerate(nums):\n    if x == target:\n        return i\nreturn -1   # not found</code></pre><p>This is the right shape for &quot;find the first...&quot; or &quot;does any...&quot; questions. Notice how <code>return</code> acts as an implicit <code>break</code>.</p>",
        zh: "<p><strong>模式 2 —— 早退出搜索。</strong>找到第一个匹配就立刻停:</p><pre><code>for i, x in enumerate(nums):\n    if x == target:\n        return i\nreturn -1   # 没找到</code></pre><p>「找第一个……」「是否存在……」这类题用这个形状。注意 <code>return</code> 起了隐式 <code>break</code> 的作用。</p>",
      },
    ),
    exercise(
      "d4-ex-find",
      {
        en: "<p>Write <code>find_first(nums, target)</code> — return the index of the first occurrence of <code>target</code>, or <code>-1</code> if not present.</p>",
        zh: "<p>写一个 <code>find_first(nums, target)</code> —— 返回 <code>target</code> 第一次出现的索引,如果不存在返回 <code>-1</code>。</p>",
      },
      "def find_first(nums, target):\n    # your code here\n    pass\n",
      "def find_first(nums, target):\n    for i, x in enumerate(nums):\n        if x == target:\n            return i\n    return -1\n",
      {
        en: "Use <code>enumerate</code> to get index + value. Return as soon as you find it. If the loop finishes, return <code>-1</code>.",
        zh: "用 <code>enumerate</code> 拿到索引 + 值。一找到就返回。循环走完都没找到,返回 <code>-1</code>。",
      },
      [
        { call: "find_first([3, 1, 4, 1, 5], 1)", expected: 1 },
        { call: "find_first([3, 1, 4], 9)", expected: -1 },
        { call: "find_first([], 0)", expected: -1 },
        { call: "find_first([0, 0, 0], 0)", expected: 0 },
      ],
      { fnName: "find_first" },
    ),
    checkpoint(
      "d4-cp",
      { en: "Two patterns down", zh: "两个模式拿下了" },
      {
        en: "Accumulator and early-exit are ~70% of interview loops. The third is the two-pointer, which we&apos;ll introduce briefly now and go deep on Day 7.",
        zh: "累加器和早退出大概覆盖了面试里 70% 的循环。第三个是双指针,先简单引入,第 7 天再深入。",
      },
    ),
    teach(
      "d4-pat-two",
      {
        en: "<p><strong>Pattern 3 — Two pointers (preview).</strong> For sorted arrays, start <code>left = 0</code> and <code>right = len - 1</code>, move them toward each other based on a condition:</p><pre><code>left, right = 0, len(nums) - 1\nwhile left &lt; right:\n    if nums[left] + nums[right] == target:\n        return [left, right]\n    elif nums[left] + nums[right] &lt; target:\n        left += 1\n    else:\n        right -= 1</code></pre><p>This finds a pair summing to target in O(n) on a <em>sorted</em> array. Don&apos;t worry if it&apos;s fuzzy — Day 7 will drill it.</p>",
        zh: "<p><strong>模式 3 —— 双指针(预告)。</strong>对有序数组,<code>left = 0</code>、<code>right = len - 1</code>,根据条件向中间靠:</p><pre><code>left, right = 0, len(nums) - 1\nwhile left &lt; right:\n    if nums[left] + nums[right] == target:\n        return [left, right]\n    elif nums[left] + nums[right] &lt; target:\n        left += 1\n    else:\n        right -= 1</code></pre><p>在<em>有序</em>数组上 O(n) 找到和为 target 的一对。现在模糊没关系 —— 第 7 天会反复练。</p>",
      },
    ),
    exercise(
      "d4-ex-two-sum-sorted",
      {
        en: "<p><strong>LeetCode #167 (preview).</strong> Given a sorted list and a target, return a list <code>[i, j]</code> of indices (<code>i &lt; j</code>) whose values sum to the target. Assume exactly one solution exists.</p><p>Use two pointers.</p>",
        zh: "<p><strong>LeetCode #167(预告)。</strong>给定有序列表和 target,返回两个索引 <code>[i, j]</code>(<code>i &lt; j</code>),使对应的值之和等于 target。假设答案唯一。</p><p>用双指针。</p>",
      },
      "def two_sum_sorted(nums, target):\n    # your code here\n    pass\n",
      "def two_sum_sorted(nums, target):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        s = nums[left] + nums[right]\n        if s == target:\n            return [left, right]\n        if s < target:\n            left += 1\n        else:\n            right -= 1\n    return [-1, -1]\n",
      {
        en: "Start with pointers at the two ends. If sum is too small, move <code>left</code> right. If too big, move <code>right</code> left. If equal, you&apos;re done.",
        zh: "两端各放一个指针。和太小,<code>left</code> 右移;和太大,<code>right</code> 左移;相等,结束。",
      },
      [
        { call: "two_sum_sorted([1, 2, 4, 7, 11], 9)", expected: [1, 3] },
        { call: "two_sum_sorted([2, 5, 8, 12], 10)", expected: [0, 2] },
        { call: "two_sum_sorted([1, 3], 4)", expected: [0, 1] },
      ],
      { fnName: "two_sum_sorted" },
    ),
    recall(
      "d4-recall",
      {
        en: "Why do we use two pointers on a <em>sorted</em> array instead of two nested loops?",
        zh: "为什么在<em>有序</em>数组上用双指针,而不是两层嵌套循环?",
      },
      {
        en: "Nested loops check every pair — O(n²). Two pointers on a sorted array converge in O(n) because sortedness lets you know which way to move: if the sum is too small, only moving left forward can help, and vice versa.",
        zh: "嵌套循环会检查所有配对 —— O(n²)。有序数组上双指针 O(n) 就能收敛,因为有序让你知道该往哪边走:和太小,只能向右挪 left 才可能变大,反之亦然。",
      },
    ),
    teach(
      "d4-wrap",
      {
        en: "<p>Today:</p><ul><li><code>for</code> / <code>while</code> / <code>range</code></li><li><code>break</code> / <code>continue</code></li><li>Accumulator, early-exit, two-pointer (preview)</li></ul>",
        zh: "<p>今天:</p><ul><li><code>for</code> / <code>while</code> / <code>range</code></li><li><code>break</code> / <code>continue</code></li><li>累加器、早退出、双指针(预告)</li></ul>",
      },
    ),
  ],
  finalTest: [
    quizMC(
      "d4-t-range",
      {
        en: "What does <code>range(1, 10, 3)</code> produce?",
        zh: "<code>range(1, 10, 3)</code> 产生什么?",
      },
      [
        { en: "<code>1, 2, 3, 4, 5, 6, 7, 8, 9, 10</code>", zh: "<code>1, 2, 3, 4, 5, 6, 7, 8, 9, 10</code>" },
        { en: "<code>1, 4, 7</code>", zh: "<code>1, 4, 7</code>" },
        { en: "<code>1, 4, 7, 10</code>", zh: "<code>1, 4, 7, 10</code>" },
        { en: "<code>3, 6, 9</code>", zh: "<code>3, 6, 9</code>" },
      ],
      1,
      {
        en: "Start 1, stop before 10, step 3: <code>1, 4, 7</code>. The stop is exclusive.",
        zh: "从 1 开始,10 之前停,步长 3:<code>1, 4, 7</code>。终点是不包含的。",
      },
    ),
    exercise(
      "d4-t-sum-odd",
      {
        en: "<p>Write <code>sum_odd(nums)</code> — return the sum of odd numbers in the list.</p>",
        zh: "<p>写一个 <code>sum_odd(nums)</code> —— 返回列表里所有奇数之和。</p>",
      },
      "def sum_odd(nums):\n    # your code here\n    pass\n",
      "def sum_odd(nums):\n    total = 0\n    for x in nums:\n        if x % 2 != 0:\n            total += x\n    return total\n",
      {
        en: "Accumulator. Guard with <code>if x % 2 != 0</code>.",
        zh: "累加器。用 <code>if x % 2 != 0</code> 过滤。",
      },
      [
        { call: "sum_odd([1, 2, 3, 4, 5])", expected: 9 },
        { call: "sum_odd([2, 4, 6])", expected: 0 },
        { call: "sum_odd([])", expected: 0 },
        { call: "sum_odd([-1, -3])", expected: -4 },
      ],
      { fnName: "sum_odd" },
    ),
    exercise(
      "d4-t-contains",
      {
        en: "<p>Write <code>contains_negative(nums)</code> — return <code>True</code> as soon as you find a negative number; return <code>False</code> if none.</p>",
        zh: "<p>写一个 <code>contains_negative(nums)</code> —— 一旦找到负数就返回 <code>True</code>;没有就返回 <code>False</code>。</p>",
      },
      "def contains_negative(nums):\n    # your code here\n    pass\n",
      "def contains_negative(nums):\n    for x in nums:\n        if x < 0:\n            return True\n    return False\n",
      { en: "Early-exit pattern.", zh: "早退出模式。" },
      [
        { call: "contains_negative([1, 2, 3])", expected: false },
        { call: "contains_negative([1, -2, 3])", expected: true },
        { call: "contains_negative([])", expected: false },
      ],
      { fnName: "contains_negative" },
    ),
    quizMC(
      "d4-t-ret",
      {
        en: "<code>sorted([3, 1, 2])</code> returns a new list; what does <code>[3, 1, 2].sort()</code> return?",
        zh: "<code>sorted([3, 1, 2])</code> 返回新列表;那 <code>[3, 1, 2].sort()</code> 返回什么?",
      },
      [
        { en: "<code>[1, 2, 3]</code>", zh: "<code>[1, 2, 3]</code>" },
        { en: "<code>[3, 1, 2]</code>", zh: "<code>[3, 1, 2]</code>" },
        { en: "<code>None</code>", zh: "<code>None</code>" },
        { en: "An error", zh: "报错" },
      ],
      2,
      {
        en: "Day 3 callback — <code>.sort()</code> mutates in place and returns <code>None</code>.",
        zh: "第 3 天回顾 —— <code>.sort()</code> 原地修改,返回 <code>None</code>。",
      },
    ),
    exercise(
      "d4-t-first-dup",
      {
        en: "<p>Write <code>first_duplicate(nums)</code> — return the first element that appears twice (the duplicate whose second appearance comes earliest). Return <code>-1</code> if no duplicates.</p>",
        zh: "<p>写一个 <code>first_duplicate(nums)</code> —— 返回第一个出现两次的元素(即第二次出现最早的那个重复值)。没有重复则返回 <code>-1</code>。</p>",
      },
      "def first_duplicate(nums):\n    # your code here\n    pass\n",
      "def first_duplicate(nums):\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return x\n        seen.add(x)\n    return -1\n",
      {
        en: "Keep a <code>set</code> of values you&apos;ve seen. Check membership; add new ones. Returns on first repeat.",
        zh: "用 <code>set</code> 记录见过的值。检查是否出现过,新值就加入。第一次重复时返回。",
      },
      [
        { call: "first_duplicate([1, 2, 3, 2, 1])", expected: 2 },
        { call: "first_duplicate([1, 2, 3])", expected: -1 },
        { call: "first_duplicate([5, 5, 5])", expected: 5 },
      ],
      { fnName: "first_duplicate" },
    ),
  ],
};

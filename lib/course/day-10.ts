import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day10: Day = {
  id: 10,
  title: {
    en: "Binary search",
    zh: "二分查找",
  },
  subtitle: {
    en: "Given a sorted array, find an item in O(log n). Today we master the template that handles all the edge cases.",
    zh: "有序数组里 O(log n) 找一个元素。今天我们把能搞定所有边界的模板吃透。",
  },
  estimatedTime: {
    en: "55–65 min",
    zh: "55–65 分钟",
  },
  goals: [
    {
      en: "Write the classic binary search without off-by-one bugs",
      zh: "写经典二分查找,不踩 off-by-one 的坑",
    },
    {
      en: "Find <em>lower bound</em> / <em>upper bound</em> (leftmost/rightmost insertion points)",
      zh: "找<em>下界</em>/<em>上界</em>(最左/最右插入位置)",
    },
    {
      en: "Recognize binary-search-on-answer problems",
      zh: "识别「二分答案」类题目",
    },
  ],
  youWillBuild: {
    en: "Basic binary search, search insert position, and a sneaky &quot;search in rotated sorted array&quot;.",
    zh: "基础二分、搜索插入位置,还有一道偷偷藏心机的「旋转有序数组搜索」。",
  },
  steps: [
    teach(
      "d10-intro",
      {
        en: "<p>Binary search is the fastest way to find an item in a sorted array. O(log n) — for a billion items, about 30 comparisons.</p><p>The trap: off-by-one errors. Today we learn a template that makes them rare.</p>",
        zh: "<p>二分是有序数组里最快的查找方式。O(log n) —— 十亿个元素也只需要大约 30 次比较。</p><p>坑在哪:off-by-one。今天学一个模板,让它很少出错。</p>",
      },
    ),
    teach(
      "d10-classic",
      {
        en: "<p><strong>Classic.</strong> Invariant: the target, if present, is in <code>[left, right]</code>:</p><pre><code>def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left &lt;= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] &lt; target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1</code></pre><p>Key points: <code>left &lt;= right</code> (inclusive), <code>mid + 1</code> / <code>mid - 1</code> to make progress.</p>",
        zh: "<p><strong>经典款。</strong>不变量:目标若存在,一定在 <code>[left, right]</code> 区间里:</p><pre><code>def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left &lt;= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] &lt; target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1</code></pre><p>关键点:<code>left &lt;= right</code>(闭区间),<code>mid + 1</code>/<code>mid - 1</code> 推进。</p>",
      },
    ),
    exercise(
      "d10-ex-search",
      {
        en: "<p><strong>LeetCode #704.</strong> Write <code>binary_search(nums, target)</code> — return the index of <code>target</code> in the sorted list, or <code>-1</code> if absent.</p>",
        zh: "<p><strong>LeetCode #704。</strong>写一个 <code>binary_search(nums, target)</code> —— 返回 <code>target</code> 在有序列表中的下标,不存在就 <code>-1</code>。</p>",
      },
      "def binary_search(nums, target):\n    # your code here\n    pass\n",
      "def binary_search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n",
      {
        en: "Follow the template exactly: <code>&lt;=</code> in the loop, <code>mid ± 1</code> to narrow.",
        zh: "严格按模板写:循环条件 <code>&lt;=</code>,用 <code>mid ± 1</code> 缩区间。",
      },
      [
        { call: "binary_search([-1, 0, 3, 5, 9, 12], 9)", expected: 4 },
        { call: "binary_search([-1, 0, 3, 5, 9, 12], 2)", expected: -1 },
        { call: "binary_search([5], 5)", expected: 0 },
        { call: "binary_search([], 0)", expected: -1 },
      ],
      { fnName: "binary_search" },
    ),
    teach(
      "d10-bounds",
      {
        en: "<p><strong>Lower bound</strong> — the leftmost index where you could insert <code>target</code> to keep the array sorted:</p><pre><code>def lower_bound(nums, target):\n    left, right = 0, len(nums)   # note: right = len, not len-1\n    while left &lt; right:          # strict &lt;\n        mid = (left + right) // 2\n        if nums[mid] &lt; target:\n            left = mid + 1\n        else:\n            right = mid\n    return left</code></pre><p>Useful for &quot;insert position&quot;, &quot;count of target&quot; (lower_bound − upper_bound), and range queries.</p>",
        zh: "<p><strong>下界</strong> —— 把 <code>target</code> 插进去仍保持有序的最左位置:</p><pre><code>def lower_bound(nums, target):\n    left, right = 0, len(nums)   # 注意这里 right = len,不是 len-1\n    while left &lt; right:          # 严格 &lt;\n        mid = (left + right) // 2\n        if nums[mid] &lt; target:\n            left = mid + 1\n        else:\n            right = mid\n    return left</code></pre><p>适用于「插入位置」、「目标出现次数」(lower_bound − upper_bound)、区间查询。</p>",
      },
    ),
    demo(
      "d10-bounds-demo",
      {
        en: "<p>Play with it:</p>",
        zh: "<p>玩一下:</p>",
      },
      "def lower_bound(nums, target):\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid\n    return left\n\nnums = [1, 2, 4, 4, 4, 7]\nfor t in [0, 1, 4, 5, 7, 9]:\n    print(f\"insert {t} at index {lower_bound(nums, t)}\")",
    ),
    exercise(
      "d10-ex-insert",
      {
        en: "<p><strong>LeetCode #35 — Search Insert Position.</strong> Return the index the target would be inserted at to keep the array sorted (= lower bound).</p>",
        zh: "<p><strong>LeetCode #35 —— 搜索插入位置。</strong>返回保持有序时 target 应插入的下标(也就是下界)。</p>",
      },
      "def search_insert(nums, target):\n    # your code here\n    pass\n",
      "def search_insert(nums, target):\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid\n    return left\n",
      {
        en: "Lower-bound template.",
        zh: "下界模板。",
      },
      [
        { call: "search_insert([1, 3, 5, 6], 5)", expected: 2 },
        { call: "search_insert([1, 3, 5, 6], 2)", expected: 1 },
        { call: "search_insert([1, 3, 5, 6], 7)", expected: 4 },
        { call: "search_insert([1, 3, 5, 6], 0)", expected: 0 },
      ],
      { fnName: "search_insert" },
    ),
    checkpoint(
      "d10-cp",
      {
        en: "Binary search on answer — the twist",
        zh: "二分答案 —— 进阶玩法",
      },
      {
        en: "Sometimes the &quot;array&quot; is implicit — the range of possible answers. You binary-search on the answer itself. One classic example next.",
        zh: "有时候「数组」是隐含的 —— 答案的取值范围。我们直接在答案空间上二分。下面来看个经典例子。",
      },
    ),
    teach(
      "d10-on-answer",
      {
        en: "<p><strong>Binary search on answer.</strong> Many problems ask for the min/max value satisfying some condition. The space of answers is sorted in the sense that if <code>x</code> works, all bigger (or smaller) values work too. Binary-search on that space.</p><pre><code>left, right = min_possible, max_possible\nwhile left &lt; right:\n    mid = (left + right) // 2\n    if feasible(mid):\n        right = mid\n    else:\n        left = mid + 1\nreturn left</code></pre><p>&quot;Find min capacity to ship packages in D days&quot;, &quot;find min speed to finish bananas in H hours&quot; — both are this pattern.</p>",
        zh: "<p><strong>二分答案。</strong>很多题问「满足条件的最小/最大值」。答案空间在某种意义上是有序的 —— 如果 <code>x</code> 可行,所有更大(或更小)的值也可行。直接在答案空间上二分。</p><pre><code>left, right = min_possible, max_possible\nwhile left &lt; right:\n    mid = (left + right) // 2\n    if feasible(mid):\n        right = mid\n    else:\n        left = mid + 1\nreturn left</code></pre><p>「D 天运完包裹的最小载重」、「H 小时吃完香蕉的最小速度」—— 都是这个套路。</p>",
      },
    ),
    exercise(
      "d10-ex-sqrt",
      {
        en: "<p><strong>LeetCode #69.</strong> Write <code>my_sqrt(n)</code> that returns the integer square root of <code>n</code> (the floor of <code>√n</code>). <code>n &gt;= 0</code>. No <code>**</code> or <code>math.sqrt</code>.</p>",
        zh: "<p><strong>LeetCode #69。</strong>写 <code>my_sqrt(n)</code>,返回 <code>n</code> 的整数平方根(<code>√n</code> 向下取整)。<code>n &gt;= 0</code>。不能用 <code>**</code> 或 <code>math.sqrt</code>。</p>",
      },
      "def my_sqrt(n):\n    # your code here\n    pass\n",
      "def my_sqrt(n):\n    if n < 2:\n        return n\n    left, right = 1, n\n    while left < right:\n        mid = (left + right + 1) // 2\n        if mid * mid <= n:\n            left = mid\n        else:\n            right = mid - 1\n    return left\n",
      {
        en: "Binary search for the largest <code>x</code> with <code>x² ≤ n</code>. Use the &quot;upper-bound&quot;-style template with <code>mid + 1</code> on the right side.",
        zh: "二分找满足 <code>x² ≤ n</code> 的最大 <code>x</code>。用「上界」风格模板,right 那侧要 <code>mid + 1</code>。",
      },
      [
        { call: "my_sqrt(4)", expected: 2 },
        { call: "my_sqrt(8)", expected: 2 },
        { call: "my_sqrt(0)", expected: 0 },
        { call: "my_sqrt(1)", expected: 1 },
        { call: "my_sqrt(16)", expected: 4 },
        { call: "my_sqrt(99)", expected: 9 },
      ],
      { fnName: "my_sqrt" },
    ),
    quizMC(
      "d10-q-midbug",
      {
        en: "In some languages <code>(left + right) / 2</code> overflows. Why doesn&apos;t this matter in Python?",
        zh: "有些语言里 <code>(left + right) / 2</code> 会溢出。为什么 Python 里不用担心?",
      },
      [
        {
          en: "Python&apos;s ints are arbitrary precision — no overflow",
          zh: "Python 的 int 是任意精度的 —— 不会溢出",
        },
        {
          en: "Python uses <code>//</code> which is safer",
          zh: "Python 用 <code>//</code>,更安全",
        },
        {
          en: "Python caches small ints",
          zh: "Python 缓存了小整数",
        },
        {
          en: "It does matter — use <code>left + (right - left) // 2</code>",
          zh: "其实也要担心 —— 要写成 <code>left + (right - left) // 2</code>",
        },
      ],
      0,
      {
        en: "In Python, ints grow as needed — no overflow. In languages with fixed-size ints (C, Java), <code>left + (right - left) // 2</code> is the safe form.",
        zh: "Python 的 int 按需扩展 —— 不会溢出。C、Java 这类定长 int 的语言才需要写 <code>left + (right - left) // 2</code>。",
      },
    ),
    recall(
      "d10-recall",
      {
        en: "When would you reach for binary search? Describe the telltale signals.",
        zh: "什么时候该想到用二分?说说典型信号。",
      },
      {
        en: "The data is sorted (or monotonic), and you&apos;re searching for a target value, insertion point, or boundary; OR the answer space is monotonic (some threshold separates feasible from infeasible) and you can test feasibility in reasonable time.",
        zh: "数据有序(或单调),你在找目标值、插入点或边界;或者答案空间单调(存在一个阈值把可行和不可行分开),并且判断可行性的代价可控。",
      },
    ),
    teach(
      "d10-wrap",
      {
        en: "<p>Today:</p><ul><li>Classic binary search — <code>[left, right]</code> inclusive, <code>&lt;=</code>, <code>mid ± 1</code></li><li>Lower bound — <code>[left, right)</code>, <code>&lt;</code>, <code>right = mid</code></li><li>Binary search on answer space</li></ul>",
        zh: "<p>今天收获:</p><ul><li>经典二分 —— <code>[left, right]</code> 闭区间、<code>&lt;=</code>、<code>mid ± 1</code></li><li>下界 —— <code>[left, right)</code>、<code>&lt;</code>、<code>right = mid</code></li><li>在答案空间上二分</li></ul>",
      },
    ),
  ],
  finalTest: [
    exercise(
      "d10-t-first-bad",
      {
        en: "<p>Suppose <code>is_bad(k)</code> is monotonic — once <code>True</code>, stays <code>True</code>. Write <code>first_bad(n, is_bad)</code> that returns the smallest <code>k</code> in <code>[1, n]</code> where <code>is_bad(k)</code> is <code>True</code>. (Assume at least one bad exists.)</p>",
        zh: "<p>假设 <code>is_bad(k)</code> 单调 —— 一旦 <code>True</code> 就永远 <code>True</code>。写 <code>first_bad(n, is_bad)</code>,返回 <code>[1, n]</code> 中最小的使 <code>is_bad(k)</code> 为 <code>True</code> 的 <code>k</code>。(保证至少有一个坏的。)</p>",
      },
      "def first_bad(n, is_bad):\n    # your code here\n    pass\n",
      "def first_bad(n, is_bad):\n    left, right = 1, n\n    while left < right:\n        mid = (left + right) // 2\n        if is_bad(mid):\n            right = mid\n        else:\n            left = mid + 1\n    return left\n",
      {
        en: "Lower bound for <code>is_bad</code>.",
        zh: "就是 <code>is_bad</code> 的下界。",
      },
      [
        { call: "first_bad(5, lambda k: k >= 4)", expected: 4 },
        { call: "first_bad(10, lambda k: k >= 1)", expected: 1 },
        { call: "first_bad(10, lambda k: k >= 10)", expected: 10 },
      ],
      { fnName: "first_bad" },
    ),
    exercise(
      "d10-t-search-range",
      {
        en: "<p><strong>LeetCode #34.</strong> Write <code>search_range(nums, target)</code> — return <code>[first, last]</code> indices of <code>target</code> in the sorted list, or <code>[-1, -1]</code> if absent.</p>",
        zh: "<p><strong>LeetCode #34。</strong>写 <code>search_range(nums, target)</code> —— 返回有序列表里 <code>target</code> 的 <code>[first, last]</code> 下标,没有就 <code>[-1, -1]</code>。</p>",
      },
      "def search_range(nums, target):\n    # your code here\n    pass\n",
      "def search_range(nums, target):\n    def lb(x):\n        lo, hi = 0, len(nums)\n        while lo < hi:\n            m = (lo + hi) // 2\n            if nums[m] < x:\n                lo = m + 1\n            else:\n                hi = m\n        return lo\n    start = lb(target)\n    if start == len(nums) or nums[start] != target:\n        return [-1, -1]\n    end = lb(target + 1) - 1\n    return [start, end]\n",
      {
        en: "Use lower_bound twice: one for <code>target</code>, one for <code>target + 1</code>. The range is <code>[lb(t), lb(t+1) - 1]</code>.",
        zh: "用两次 lower_bound:一次找 <code>target</code>,一次找 <code>target + 1</code>。区间就是 <code>[lb(t), lb(t+1) - 1]</code>。",
      },
      [
        { call: "search_range([5, 7, 7, 8, 8, 10], 8)", expected: [3, 4] },
        { call: "search_range([5, 7, 7, 8, 8, 10], 6)", expected: [-1, -1] },
        { call: "search_range([], 0)", expected: [-1, -1] },
        { call: "search_range([1], 1)", expected: [0, 0] },
      ],
      { fnName: "search_range" },
    ),
    quizMC(
      "d10-t-complexity",
      {
        en: "Time complexity of binary search?",
        zh: "二分查找的时间复杂度?",
      },
      [
        { en: "O(n)", zh: "O(n)" },
        { en: "O(log n)", zh: "O(log n)" },
        { en: "O(n log n)", zh: "O(n log n)" },
        { en: "O(1)", zh: "O(1)" },
      ],
      1,
      {
        en: "Each step halves the remaining space — O(log n).",
        zh: "每一步把剩余范围砍半 —— O(log n)。",
      },
    ),
    exercise(
      "d10-t-peak",
      {
        en: "<p><strong>LeetCode #162 — Find Peak Element.</strong> Given <code>nums</code> where <code>nums[i] != nums[i+1]</code>, a peak is any index where <code>nums[i]</code> is strictly greater than its neighbors (imagine <code>-∞</code> outside). Return the index of any peak in O(log n).</p>",
        zh: "<p><strong>LeetCode #162 —— 寻找峰值。</strong><code>nums</code> 满足 <code>nums[i] != nums[i+1]</code>,峰值是严格大于两边邻居的位置(边界外视作 <code>-∞</code>)。O(log n) 返回任意一个峰值的下标。</p>",
      },
      "def find_peak(nums):\n    # your code here\n    pass\n",
      "def find_peak(nums):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] > nums[mid + 1]:\n            right = mid\n        else:\n            left = mid + 1\n    return left\n",
      {
        en: "If <code>nums[mid] &gt; nums[mid+1]</code>, a peak exists in <code>[0, mid]</code>. Otherwise in <code>[mid+1, n-1]</code>.",
        zh: "如果 <code>nums[mid] &gt; nums[mid+1]</code>,峰值在 <code>[0, mid]</code>。否则在 <code>[mid+1, n-1]</code>。",
      },
      [
        { call: "find_peak([1, 2, 3, 1])", expected: 2 },
        { call: "find_peak([1, 2, 1, 3, 5, 6, 4])", expected: 5 },
        { call: "find_peak([1])", expected: 0 },
      ],
      { fnName: "find_peak" },
    ),
  ],
};

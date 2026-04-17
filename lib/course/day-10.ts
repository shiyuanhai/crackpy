import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day10: Day = {
  id: 10,
  title: "Binary search",
  subtitle: "Given a sorted array, find an item in O(log n). Today we master the template that handles all the edge cases.",
  estimatedTime: "55–65 min",
  goals: [
    "Write the classic binary search without off-by-one bugs",
    "Find <em>lower bound</em> / <em>upper bound</em> (leftmost/rightmost insertion points)",
    "Recognize binary-search-on-answer problems",
  ],
  youWillBuild: "Basic binary search, search insert position, and a sneaky &quot;search in rotated sorted array&quot;.",
  steps: [
    teach(
      "d10-intro",
      "<p>Binary search is the fastest way to find an item in a sorted array. O(log n) — for a billion items, about 30 comparisons.</p><p>The trap: off-by-one errors. Today we learn a template that makes them rare.</p>",
    ),
    teach(
      "d10-classic",
      "<p><strong>Classic.</strong> Invariant: the target, if present, is in <code>[left, right]</code>:</p><pre><code>def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left &lt;= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] &lt; target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1</code></pre><p>Key points: <code>left &lt;= right</code> (inclusive), <code>mid + 1</code> / <code>mid - 1</code> to make progress.</p>",
    ),
    exercise(
      "d10-ex-search",
      "<p><strong>LeetCode #704.</strong> Write <code>binary_search(nums, target)</code> — return the index of <code>target</code> in the sorted list, or <code>-1</code> if absent.</p>",
      "def binary_search(nums, target):\n    # your code here\n    pass\n",
      "def binary_search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n",
      "Follow the template exactly: <code>&lt;=</code> in the loop, <code>mid ± 1</code> to narrow.",
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
      "<p><strong>Lower bound</strong> — the leftmost index where you could insert <code>target</code> to keep the array sorted:</p><pre><code>def lower_bound(nums, target):\n    left, right = 0, len(nums)   # note: right = len, not len-1\n    while left &lt; right:          # strict &lt;\n        mid = (left + right) // 2\n        if nums[mid] &lt; target:\n            left = mid + 1\n        else:\n            right = mid\n    return left</code></pre><p>Useful for &quot;insert position&quot;, &quot;count of target&quot; (lower_bound − upper_bound), and range queries.</p>",
    ),
    demo(
      "d10-bounds-demo",
      "<p>Play with it:</p>",
      "def lower_bound(nums, target):\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid\n    return left\n\nnums = [1, 2, 4, 4, 4, 7]\nfor t in [0, 1, 4, 5, 7, 9]:\n    print(f\"insert {t} at index {lower_bound(nums, t)}\")",
    ),
    exercise(
      "d10-ex-insert",
      "<p><strong>LeetCode #35 — Search Insert Position.</strong> Return the index the target would be inserted at to keep the array sorted (= lower bound).</p>",
      "def search_insert(nums, target):\n    # your code here\n    pass\n",
      "def search_insert(nums, target):\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid\n    return left\n",
      "Lower-bound template.",
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
      "Binary search on answer — the twist",
      "Sometimes the &quot;array&quot; is implicit — the range of possible answers. You binary-search on the answer itself. One classic example next.",
    ),
    teach(
      "d10-on-answer",
      "<p><strong>Binary search on answer.</strong> Many problems ask for the min/max value satisfying some condition. The space of answers is sorted in the sense that if <code>x</code> works, all bigger (or smaller) values work too. Binary-search on that space.</p><pre><code>left, right = min_possible, max_possible\nwhile left &lt; right:\n    mid = (left + right) // 2\n    if feasible(mid):\n        right = mid\n    else:\n        left = mid + 1\nreturn left</code></pre><p>&quot;Find min capacity to ship packages in D days&quot;, &quot;find min speed to finish bananas in H hours&quot; — both are this pattern.</p>",
    ),
    exercise(
      "d10-ex-sqrt",
      "<p><strong>LeetCode #69.</strong> Write <code>my_sqrt(n)</code> that returns the integer square root of <code>n</code> (the floor of <code>√n</code>). <code>n &gt;= 0</code>. No <code>**</code> or <code>math.sqrt</code>.</p>",
      "def my_sqrt(n):\n    # your code here\n    pass\n",
      "def my_sqrt(n):\n    if n < 2:\n        return n\n    left, right = 1, n\n    while left < right:\n        mid = (left + right + 1) // 2\n        if mid * mid <= n:\n            left = mid\n        else:\n            right = mid - 1\n    return left\n",
      "Binary search for the largest <code>x</code> with <code>x² ≤ n</code>. Use the &quot;upper-bound&quot;-style template with <code>mid + 1</code> on the right side.",
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
      "In some languages <code>(left + right) / 2</code> overflows. Why doesn&apos;t this matter in Python?",
      [
        "Python&apos;s ints are arbitrary precision — no overflow",
        "Python uses <code>//</code> which is safer",
        "Python caches small ints",
        "It does matter — use <code>left + (right - left) // 2</code>",
      ],
      0,
      "In Python, ints grow as needed — no overflow. In languages with fixed-size ints (C, Java), <code>left + (right - left) // 2</code> is the safe form.",
    ),
    recall(
      "d10-recall",
      "When would you reach for binary search? Describe the telltale signals.",
      "The data is sorted (or monotonic), and you&apos;re searching for a target value, insertion point, or boundary; OR the answer space is monotonic (some threshold separates feasible from infeasible) and you can test feasibility in reasonable time.",
    ),
    teach(
      "d10-wrap",
      "<p>Today:</p><ul><li>Classic binary search — <code>[left, right]</code> inclusive, <code>&lt;=</code>, <code>mid ± 1</code></li><li>Lower bound — <code>[left, right)</code>, <code>&lt;</code>, <code>right = mid</code></li><li>Binary search on answer space</li></ul>",
    ),
  ],
  finalTest: [
    exercise(
      "d10-t-first-bad",
      "<p>Suppose <code>is_bad(k)</code> is monotonic — once <code>True</code>, stays <code>True</code>. Write <code>first_bad(n, is_bad)</code> that returns the smallest <code>k</code> in <code>[1, n]</code> where <code>is_bad(k)</code> is <code>True</code>. (Assume at least one bad exists.)</p>",
      "def first_bad(n, is_bad):\n    # your code here\n    pass\n",
      "def first_bad(n, is_bad):\n    left, right = 1, n\n    while left < right:\n        mid = (left + right) // 2\n        if is_bad(mid):\n            right = mid\n        else:\n            left = mid + 1\n    return left\n",
      "Lower bound for <code>is_bad</code>.",
      [
        { call: "first_bad(5, lambda k: k >= 4)", expected: 4 },
        { call: "first_bad(10, lambda k: k >= 1)", expected: 1 },
        { call: "first_bad(10, lambda k: k >= 10)", expected: 10 },
      ],
      { fnName: "first_bad" },
    ),
    exercise(
      "d10-t-search-range",
      "<p><strong>LeetCode #34.</strong> Write <code>search_range(nums, target)</code> — return <code>[first, last]</code> indices of <code>target</code> in the sorted list, or <code>[-1, -1]</code> if absent.</p>",
      "def search_range(nums, target):\n    # your code here\n    pass\n",
      "def search_range(nums, target):\n    def lb(x):\n        lo, hi = 0, len(nums)\n        while lo < hi:\n            m = (lo + hi) // 2\n            if nums[m] < x:\n                lo = m + 1\n            else:\n                hi = m\n        return lo\n    start = lb(target)\n    if start == len(nums) or nums[start] != target:\n        return [-1, -1]\n    end = lb(target + 1) - 1\n    return [start, end]\n",
      "Use lower_bound twice: one for <code>target</code>, one for <code>target + 1</code>. The range is <code>[lb(t), lb(t+1) - 1]</code>.",
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
      "Time complexity of binary search?",
      ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      1,
      "Each step halves the remaining space — O(log n).",
    ),
    exercise(
      "d10-t-peak",
      "<p><strong>LeetCode #162 — Find Peak Element.</strong> Given <code>nums</code> where <code>nums[i] != nums[i+1]</code>, a peak is any index where <code>nums[i]</code> is strictly greater than its neighbors (imagine <code>-∞</code> outside). Return the index of any peak in O(log n).</p>",
      "def find_peak(nums):\n    # your code here\n    pass\n",
      "def find_peak(nums):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] > nums[mid + 1]:\n            right = mid\n        else:\n            left = mid + 1\n    return left\n",
      "If <code>nums[mid] &gt; nums[mid+1]</code>, a peak exists in <code>[0, mid]</code>. Otherwise in <code>[mid+1, n-1]</code>.",
      [
        { call: "find_peak([1, 2, 3, 1])", expected: 2 },
        { call: "find_peak([1, 2, 1, 3, 5, 6, 4])", expected: 5 },
        { call: "find_peak([1])", expected: 0 },
      ],
      { fnName: "find_peak" },
    ),
  ],
};

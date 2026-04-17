import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day04: Day = {
  id: 4,
  title: "Loops and control flow",
  subtitle: "Loops are where your programs earn their keep. Today: <code>for</code>, <code>while</code>, <code>range</code>, <code>break</code>, <code>continue</code>, and the loop patterns interviewers love.",
  estimatedTime: "50–60 min",
  goals: [
    "Write <code>for</code> loops over lists, ranges, and strings",
    "Use <code>while</code> loops for conditions that aren&apos;t tied to a counter",
    "Apply <code>break</code> and <code>continue</code> correctly",
    "Recognize the three archetypal loop patterns: accumulator, search, two-pointer",
  ],
  youWillBuild: "Counter, searcher, and a small algorithm: find the first pair that sums to a target.",
  steps: [
    teach(
      "d4-intro",
      "<p>A quick spaced-repetition callback to Day 3: you already wrote <code>my_sum</code>, which used the <em>accumulator pattern</em> — a variable outside the loop that grows with each iteration. Today we&apos;ll generalize that pattern and add two more.</p>",
    ),
    teach(
      "d4-for",
      "<p>The <code>for</code> loop iterates over any iterable — a list, string, range, dict, etc.:</p><pre><code>for x in [1, 2, 3]:\n    print(x)\n\nfor ch in \"hello\":\n    print(ch)\n\nfor i in range(5):\n    print(i)   # 0 1 2 3 4</code></pre><p><code>range(n)</code> → 0 to n-1. <code>range(a, b)</code> → a to b-1. <code>range(a, b, step)</code> → every <code>step</code>.</p>",
    ),
    demo(
      "d4-for-demo",
      "<p>Run each and predict:</p>",
      'for i in range(1, 6):\n    print(i)\nprint("---")\nfor i in range(0, 10, 2):\n    print(i)\nprint("---")\nfor i in range(5, 0, -1):\n    print(i)',
    ),
    teach(
      "d4-while",
      "<p><code>while</code> loops run as long as a condition is true:</p><pre><code>i = 0\nwhile i &lt; 5:\n    print(i)\n    i += 1</code></pre><p>Use <code>for</code> when you&apos;re iterating a known number of times. Use <code>while</code> when you don&apos;t know when the loop will end — e.g., waiting for user input to match, walking pointers toward each other.</p>",
    ),
    teach(
      "d4-break",
      "<p>Two ways to escape a loop early:</p><ul><li><code>break</code> — stop the loop entirely</li><li><code>continue</code> — skip to the next iteration</li></ul><pre><code>for x in nums:\n    if x &lt; 0:\n        continue      # skip negatives\n    if x &gt; 100:\n        break         # stop when we see a big number\n    print(x)</code></pre>",
    ),
    demo(
      "d4-break-demo",
      "<p>Run it:</p>",
      "nums = [1, -2, 3, -4, 5, 200, 10]\nfor x in nums:\n    if x < 0:\n        continue\n    if x > 100:\n        print(\"stopping at\", x)\n        break\n    print(\"seeing\", x)",
    ),
    quizMC(
      "d4-q-break",
      "What does <code>continue</code> do inside a loop?",
      [
        "Exits the loop completely",
        "Skips the rest of the current iteration and moves to the next",
        "Restarts the loop from the beginning",
        "Pauses the loop",
      ],
      1,
      "<code>continue</code> jumps to the next iteration. <code>break</code> is the one that exits entirely.",
    ),
    teach(
      "d4-pat-accum",
      "<p><strong>Pattern 1 — Accumulator.</strong> Build up a result as you go:</p><pre><code>result = 0   # or [], or \"\", or {}\nfor x in nums:\n    result += x       # or result.append(...), etc.\nreturn result</code></pre><p>You already used this for <code>my_sum</code> on Day 3. This pattern covers: sum, product, count, concatenation, building a filtered list.</p>",
    ),
    exercise(
      "d4-ex-count",
      "<p>Write <code>count_multiples(nums, k)</code> — return how many numbers in the list are divisible by <code>k</code>.</p>",
      "def count_multiples(nums, k):\n    # your code here\n    pass\n",
      "def count_multiples(nums, k):\n    count = 0\n    for x in nums:\n        if x % k == 0:\n            count += 1\n    return count\n",
      "Accumulator pattern: start <code>count = 0</code>, loop, increment when divisible.",
      [
        { call: "count_multiples([1, 2, 3, 4, 5, 6], 2)", expected: 3 },
        { call: "count_multiples([3, 6, 9], 3)", expected: 3 },
        { call: "count_multiples([1, 2, 4], 5)", expected: 0 },
      ],
      { fnName: "count_multiples" },
    ),
    teach(
      "d4-pat-search",
      "<p><strong>Pattern 2 — Search / early exit.</strong> Find the first thing that matches, stop immediately:</p><pre><code>for i, x in enumerate(nums):\n    if x == target:\n        return i\nreturn -1   # not found</code></pre><p>This is the right shape for &quot;find the first...&quot; or &quot;does any...&quot; questions. Notice how <code>return</code> acts as an implicit <code>break</code>.</p>",
    ),
    exercise(
      "d4-ex-find",
      "<p>Write <code>find_first(nums, target)</code> — return the index of the first occurrence of <code>target</code>, or <code>-1</code> if not present.</p>",
      "def find_first(nums, target):\n    # your code here\n    pass\n",
      "def find_first(nums, target):\n    for i, x in enumerate(nums):\n        if x == target:\n            return i\n    return -1\n",
      "Use <code>enumerate</code> to get index + value. Return as soon as you find it. If the loop finishes, return <code>-1</code>.",
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
      "Two patterns down",
      "Accumulator and early-exit are ~70% of interview loops. The third is the two-pointer, which we&apos;ll introduce briefly now and go deep on Day 7.",
    ),
    teach(
      "d4-pat-two",
      "<p><strong>Pattern 3 — Two pointers (preview).</strong> For sorted arrays, start <code>left = 0</code> and <code>right = len - 1</code>, move them toward each other based on a condition:</p><pre><code>left, right = 0, len(nums) - 1\nwhile left &lt; right:\n    if nums[left] + nums[right] == target:\n        return [left, right]\n    elif nums[left] + nums[right] &lt; target:\n        left += 1\n    else:\n        right -= 1</code></pre><p>This finds a pair summing to target in O(n) on a <em>sorted</em> array. Don&apos;t worry if it&apos;s fuzzy — Day 7 will drill it.</p>",
    ),
    exercise(
      "d4-ex-two-sum-sorted",
      "<p><strong>LeetCode #167 (preview).</strong> Given a sorted list and a target, return a list <code>[i, j]</code> of indices (<code>i &lt; j</code>) whose values sum to the target. Assume exactly one solution exists.</p><p>Use two pointers.</p>",
      "def two_sum_sorted(nums, target):\n    # your code here\n    pass\n",
      "def two_sum_sorted(nums, target):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        s = nums[left] + nums[right]\n        if s == target:\n            return [left, right]\n        if s < target:\n            left += 1\n        else:\n            right -= 1\n    return [-1, -1]\n",
      "Start with pointers at the two ends. If sum is too small, move <code>left</code> right. If too big, move <code>right</code> left. If equal, you&apos;re done.",
      [
        { call: "two_sum_sorted([1, 2, 4, 7, 11], 9)", expected: [1, 3] },
        { call: "two_sum_sorted([2, 5, 8, 12], 10)", expected: [0, 2] },
        { call: "two_sum_sorted([1, 3], 4)", expected: [0, 1] },
      ],
      { fnName: "two_sum_sorted" },
    ),
    recall(
      "d4-recall",
      "Why do we use two pointers on a <em>sorted</em> array instead of two nested loops?",
      "Nested loops check every pair — O(n²). Two pointers on a sorted array converge in O(n) because sortedness lets you know which way to move: if the sum is too small, only moving left forward can help, and vice versa.",
    ),
    teach(
      "d4-wrap",
      "<p>Today:</p><ul><li><code>for</code> / <code>while</code> / <code>range</code></li><li><code>break</code> / <code>continue</code></li><li>Accumulator, early-exit, two-pointer (preview)</li></ul>",
    ),
  ],
  finalTest: [
    quizMC(
      "d4-t-range",
      "What does <code>range(1, 10, 3)</code> produce?",
      ["<code>1, 2, 3, 4, 5, 6, 7, 8, 9, 10</code>", "<code>1, 4, 7</code>", "<code>1, 4, 7, 10</code>", "<code>3, 6, 9</code>"],
      1,
      "Start 1, stop before 10, step 3: <code>1, 4, 7</code>. The stop is exclusive.",
    ),
    exercise(
      "d4-t-sum-odd",
      "<p>Write <code>sum_odd(nums)</code> — return the sum of odd numbers in the list.</p>",
      "def sum_odd(nums):\n    # your code here\n    pass\n",
      "def sum_odd(nums):\n    total = 0\n    for x in nums:\n        if x % 2 != 0:\n            total += x\n    return total\n",
      "Accumulator. Guard with <code>if x % 2 != 0</code>.",
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
      "<p>Write <code>contains_negative(nums)</code> — return <code>True</code> as soon as you find a negative number; return <code>False</code> if none.</p>",
      "def contains_negative(nums):\n    # your code here\n    pass\n",
      "def contains_negative(nums):\n    for x in nums:\n        if x < 0:\n            return True\n    return False\n",
      "Early-exit pattern.",
      [
        { call: "contains_negative([1, 2, 3])", expected: false },
        { call: "contains_negative([1, -2, 3])", expected: true },
        { call: "contains_negative([])", expected: false },
      ],
      { fnName: "contains_negative" },
    ),
    quizMC(
      "d4-t-ret",
      "<code>sorted([3, 1, 2])</code> returns a new list; what does <code>[3, 1, 2].sort()</code> return?",
      ["<code>[1, 2, 3]</code>", "<code>[3, 1, 2]</code>", "<code>None</code>", "An error"],
      2,
      "Day 3 callback — <code>.sort()</code> mutates in place and returns <code>None</code>.",
    ),
    exercise(
      "d4-t-first-dup",
      "<p>Write <code>first_duplicate(nums)</code> — return the first element that appears twice (the duplicate whose second appearance comes earliest). Return <code>-1</code> if no duplicates.</p>",
      "def first_duplicate(nums):\n    # your code here\n    pass\n",
      "def first_duplicate(nums):\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return x\n        seen.add(x)\n    return -1\n",
      "Keep a <code>set</code> of values you&apos;ve seen. Check membership; add new ones. Returns on first repeat.",
      [
        { call: "first_duplicate([1, 2, 3, 2, 1])", expected: 2 },
        { call: "first_duplicate([1, 2, 3])", expected: -1 },
        { call: "first_duplicate([5, 5, 5])", expected: 5 },
      ],
      { fnName: "first_duplicate" },
    ),
  ],
};

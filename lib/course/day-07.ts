import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day07: Day = {
  id: 7,
  title: "Two pointers and sliding window",
  subtitle: "Two of the most common interview patterns for array and string problems. Today you drill them until they&apos;re reflex.",
  estimatedTime: "60–75 min",
  goals: [
    "Recognize when a problem fits the two-pointer pattern",
    "Write opposite-ends and same-direction two-pointer loops",
    "Apply sliding window for max/min subarray problems",
    "Pick the right variable naming: <code>left</code>/<code>right</code>, <code>slow</code>/<code>fast</code>",
  ],
  youWillBuild: "Reverse-in-place, remove duplicates from sorted array, longest substring without repeating characters.",
  steps: [
    teach(
      "d7-intro",
      "<p>Two patterns to add to your Day 4 toolkit (accumulator, early-exit, two-pointer). Today we give the third pattern its due.</p><p>Two pointers show up when: the array is sorted; we need pairs; we need to shrink/grow a window; we need in-place manipulation. Sliding window is a twist on two pointers that tracks a range.</p>",
    ),
    teach(
      "d7-opposite",
      "<p><strong>Opposite ends.</strong> Start at both ends, converge:</p><pre><code>left, right = 0, len(nums) - 1\nwhile left &lt; right:\n    # examine nums[left] and nums[right]\n    # decide which pointer to move</code></pre><p>Good for: palindrome checks, Two Sum on sorted arrays, reversing in place.</p>",
    ),
    exercise(
      "d7-ex-reverse-in-place",
      "<p>Write <code>reverse_in_place(nums)</code> that reverses the list <em>in place</em> using two pointers (don&apos;t use <code>[::-1]</code> or <code>.reverse()</code>). Return the mutated list.</p>",
      "def reverse_in_place(nums):\n    # your code here\n    pass\n",
      "def reverse_in_place(nums):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        nums[left], nums[right] = nums[right], nums[left]\n        left += 1\n        right -= 1\n    return nums\n",
      "Swap <code>nums[left]</code> and <code>nums[right]</code>, then move pointers inward. Python swap: <code>a, b = b, a</code>.",
      [
        { call: "reverse_in_place([1, 2, 3, 4])", expected: [4, 3, 2, 1] },
        { call: "reverse_in_place([1])", expected: [1] },
        { call: "reverse_in_place([])", expected: [] },
        { call: "reverse_in_place([1, 2, 3])", expected: [3, 2, 1] },
      ],
      { fnName: "reverse_in_place" },
    ),
    teach(
      "d7-same",
      "<p><strong>Same-direction (slow/fast).</strong> Both pointers move forward but at different speeds or conditions:</p><pre><code>slow = 0\nfor fast in range(len(nums)):\n    if should_keep(nums[fast]):\n        nums[slow] = nums[fast]\n        slow += 1</code></pre><p>Good for: in-place filter, remove duplicates, partition.</p>",
    ),
    exercise(
      "d7-ex-remove-dupes",
      "<p><strong>LeetCode #26.</strong> Given a sorted list <code>nums</code>, remove duplicates <em>in place</em> so each element appears once. Return the new length <code>k</code>. The first <code>k</code> elements of <code>nums</code> should be the unique values in order.</p>",
      "def remove_duplicates(nums):\n    # your code here\n    pass\n",
      "def remove_duplicates(nums):\n    if not nums:\n        return 0\n    slow = 0\n    for fast in range(1, len(nums)):\n        if nums[fast] != nums[slow]:\n            slow += 1\n            nums[slow] = nums[fast]\n    return slow + 1\n",
      "Handle empty edge case. Keep <code>slow</code> at the last written index. Walk <code>fast</code> forward; when you see a new value, advance <code>slow</code> and write there.",
      [
        { call: "remove_duplicates([1, 1, 2])", expected: 2 },
        { call: "remove_duplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])", expected: 5 },
        { call: "remove_duplicates([])", expected: 0 },
        { call: "remove_duplicates([1])", expected: 1 },
      ],
      { fnName: "remove_duplicates" },
    ),
    checkpoint(
      "d7-cp",
      "Sliding window",
      "Sliding window is a specialized two-pointer pattern where you maintain a &quot;window&quot; <code>[left, right]</code> and slide it along.",
    ),
    teach(
      "d7-window",
      "<p><strong>Sliding window</strong> — grow <code>right</code>, shrink <code>left</code>:</p><pre><code>left = 0\nfor right in range(len(nums)):\n    # extend window by including nums[right]\n    \n    while window_is_invalid():\n        # shrink window from the left\n        left += 1\n    \n    # update answer based on current valid window</code></pre><p>Good for: longest/shortest substring with a property, max sum of k consecutive, count subarrays meeting a condition.</p>",
    ),
    demo(
      "d7-window-demo",
      "<p>Walk-through — max sum of any 3 consecutive elements:</p>",
      'def max_sum_k(nums, k):\n    if len(nums) < k:\n        return 0\n    window_sum = sum(nums[:k])\n    best = window_sum\n    for right in range(k, len(nums)):\n        window_sum += nums[right] - nums[right - k]   # slide: add new, drop old\n        best = max(best, window_sum)\n    return best\n\nprint(max_sum_k([1, 5, 2, 9, 3, 1, 7], 3))',
      "Fixed-size window — you slide by adding the new element and dropping the oldest.",
    ),
    exercise(
      "d7-ex-longest-sub",
      "<p><strong>LeetCode #3 — Longest Substring Without Repeating Characters.</strong> Given a string, return the length of the longest substring containing no repeated characters.</p><p>Use a sliding window with a set.</p>",
      "def longest_unique_substring(s):\n    # your code here\n    pass\n",
      "def longest_unique_substring(s):\n    seen = set()\n    left = 0\n    best = 0\n    for right in range(len(s)):\n        while s[right] in seen:\n            seen.remove(s[left])\n            left += 1\n        seen.add(s[right])\n        best = max(best, right - left + 1)\n    return best\n",
      "Expand <code>right</code>, track seen chars. If <code>s[right]</code> already seen, shrink from <code>left</code> until it&apos;s not. Track max window length.",
      [
        { call: 'longest_unique_substring("abcabcbb")', expected: 3 },
        { call: 'longest_unique_substring("bbbbb")', expected: 1 },
        { call: 'longest_unique_substring("pwwkew")', expected: 3 },
        { call: 'longest_unique_substring("")', expected: 0 },
        { call: 'longest_unique_substring("abcdef")', expected: 6 },
      ],
      { fnName: "longest_unique_substring" },
    ),
    quizMC(
      "d7-q-when",
      "Which problem is <strong>not</strong> a good fit for two pointers or sliding window?",
      [
        "Check if a string is a palindrome",
        "Find max sum of any 4 consecutive elements",
        "Find the kth largest element in an unsorted array",
        "Remove duplicates from a sorted array",
      ],
      2,
      "Kth largest on unsorted data wants a heap or quickselect. Two pointers needs a sorted or sequential structure.",
    ),
    recall(
      "d7-recall",
      "You see a problem: &quot;find the shortest subarray whose sum is at least K.&quot; What pattern comes to mind and why?",
      "Sliding window. You&apos;re looking for a contiguous range with a property — grow <code>right</code> until the sum hits K, then shrink <code>left</code> as long as it still does, tracking min length.",
    ),
    teach(
      "d7-wrap",
      "<p>Today you added to your pattern library:</p><ul><li>Opposite ends — palindromes, pairs on sorted arrays</li><li>Slow/fast — in-place filters, remove duplicates</li><li>Sliding window — subarrays/substrings with a property</li></ul>",
    ),
  ],
  finalTest: [
    exercise(
      "d7-t-squares-sorted",
      "<p><strong>LeetCode #977.</strong> Given a list sorted in non-decreasing order, return a list of each element&apos;s square, also sorted non-decreasing. Do it in O(n) with two pointers (the inputs may be negative!).</p>",
      "def sorted_squares(nums):\n    # your code here\n    pass\n",
      "def sorted_squares(nums):\n    n = len(nums)\n    result = [0] * n\n    left, right = 0, n - 1\n    idx = n - 1\n    while left <= right:\n        if abs(nums[left]) > abs(nums[right]):\n            result[idx] = nums[left] ** 2\n            left += 1\n        else:\n            result[idx] = nums[right] ** 2\n            right -= 1\n        idx -= 1\n    return result\n",
      "The largest square is at one end. Fill the result right-to-left, comparing <code>|nums[left]|</code> vs <code>|nums[right]|</code>.",
      [
        { call: "sorted_squares([-4, -1, 0, 3, 10])", expected: [0, 1, 9, 16, 100] },
        { call: "sorted_squares([-7, -3, 2, 3, 11])", expected: [4, 9, 9, 49, 121] },
        { call: "sorted_squares([1, 2, 3])", expected: [1, 4, 9] },
      ],
      { fnName: "sorted_squares" },
    ),
    exercise(
      "d7-t-move-zeros",
      "<p><strong>LeetCode #283.</strong> Move all zeros in <code>nums</code> to the end, keeping the relative order of the non-zero elements. Modify <em>in place</em> and return the list.</p>",
      "def move_zeros(nums):\n    # your code here\n    pass\n",
      "def move_zeros(nums):\n    slow = 0\n    for fast in range(len(nums)):\n        if nums[fast] != 0:\n            nums[slow], nums[fast] = nums[fast], nums[slow]\n            slow += 1\n    return nums\n",
      "Slow/fast. Swap non-zero into <code>nums[slow]</code>, advance <code>slow</code>. Zeros end up collected at the back.",
      [
        { call: "move_zeros([0, 1, 0, 3, 12])", expected: [1, 3, 12, 0, 0] },
        { call: "move_zeros([0])", expected: [0] },
        { call: "move_zeros([1, 2, 3])", expected: [1, 2, 3] },
        { call: "move_zeros([0, 0, 1])", expected: [1, 0, 0] },
      ],
      { fnName: "move_zeros" },
    ),
    quizMC(
      "d7-t-window",
      "In a sliding window loop, when do you typically move the <code>left</code> pointer?",
      [
        "Every iteration",
        "Only when the window becomes invalid",
        "After moving <code>right</code> every time",
        "Never — only <code>right</code> moves",
      ],
      1,
      "Expand <code>right</code> until invalid, then shrink <code>left</code> until valid again. Move <code>left</code> only when needed.",
    ),
    exercise(
      "d7-t-window-k",
      "<p>Write <code>max_window_sum(nums, k)</code> — return the maximum sum of any <em>k</em> consecutive elements. Assume <code>len(nums) &gt;= k &gt;= 1</code>.</p>",
      "def max_window_sum(nums, k):\n    # your code here\n    pass\n",
      "def max_window_sum(nums, k):\n    window = sum(nums[:k])\n    best = window\n    for i in range(k, len(nums)):\n        window += nums[i] - nums[i - k]\n        best = max(best, window)\n    return best\n",
      "Fixed-size sliding window: compute initial sum, then slide by adding the new and subtracting the old.",
      [
        { call: "max_window_sum([1, 2, 3, 4, 5], 2)", expected: 9 },
        { call: "max_window_sum([1, 5, 2, 9, 3, 1, 7], 3)", expected: 14 },
        { call: "max_window_sum([5], 1)", expected: 5 },
      ],
      { fnName: "max_window_sum" },
    ),
  ],
};

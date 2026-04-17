import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day07: Day = {
  id: 7,
  title: { en: "Two pointers and sliding window", zh: "双指针与滑动窗口" },
  subtitle: {
    en: "Two of the most common interview patterns for array and string problems. Today you drill them until they&apos;re reflex.",
    zh: "数组和字符串题里最常见的两种套路。今天我们练到成反射。",
  },
  estimatedTime: { en: "60–75 min", zh: "60–75 分钟" },
  goals: [
    {
      en: "Recognize when a problem fits the two-pointer pattern",
      zh: "识别什么时候题目适合用双指针",
    },
    {
      en: "Write opposite-ends and same-direction two-pointer loops",
      zh: "会写「两端相向」和「同向快慢」两种双指针写法",
    },
    {
      en: "Apply sliding window for max/min subarray problems",
      zh: "用滑动窗口解最大/最小子数组类问题",
    },
    {
      en: "Pick the right variable naming: <code>left</code>/<code>right</code>, <code>slow</code>/<code>fast</code>",
      zh: "用合适的变量命名:<code>left</code>/<code>right</code>、<code>slow</code>/<code>fast</code>",
    },
  ],
  youWillBuild: {
    en: "Reverse-in-place, remove duplicates from sorted array, longest substring without repeating characters.",
    zh: "原地反转、有序数组去重、最长无重复字符子串。",
  },
  steps: [
    teach(
      "d7-intro",
      {
        en: "<p>Two patterns to add to your Day 4 toolkit (accumulator, early-exit, two-pointer). Today we give the third pattern its due.</p><p>Two pointers show up when: the array is sorted; we need pairs; we need to shrink/grow a window; we need in-place manipulation. Sliding window is a twist on two pointers that tracks a range.</p>",
        zh: "<p>在第 4 天的工具集(累加器、早退出、双指针)基础上再加两招。今天把第三招讲透。</p><p>双指针适用于:数组有序;要找配对;要伸缩一个窗口;需要原地操作。滑动窗口是双指针的一种变体,维护的是一段区间。</p>",
      },
    ),
    teach(
      "d7-opposite",
      {
        en: "<p><strong>Opposite ends.</strong> Start at both ends, converge:</p><pre><code>left, right = 0, len(nums) - 1\nwhile left &lt; right:\n    # examine nums[left] and nums[right]\n    # decide which pointer to move</code></pre><p>Good for: palindrome checks, Two Sum on sorted arrays, reversing in place.</p>",
        zh: "<p><strong>两端相向。</strong>两端各一个指针,向中间靠:</p><pre><code>left, right = 0, len(nums) - 1\nwhile left &lt; right:\n    # 看 nums[left] 和 nums[right]\n    # 决定动哪边</code></pre><p>适合:回文判断、有序数组上的 Two Sum、原地反转。</p>",
      },
    ),
    exercise(
      "d7-ex-reverse-in-place",
      {
        en: "<p>Write <code>reverse_in_place(nums)</code> that reverses the list <em>in place</em> using two pointers (don&apos;t use <code>[::-1]</code> or <code>.reverse()</code>). Return the mutated list.</p>",
        zh: "<p>写一个 <code>reverse_in_place(nums)</code>,用双指针<em>原地</em>反转列表(不能用 <code>[::-1]</code> 或 <code>.reverse()</code>)。返回被修改的列表。</p>",
      },
      "def reverse_in_place(nums):\n    # your code here\n    pass\n",
      "def reverse_in_place(nums):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        nums[left], nums[right] = nums[right], nums[left]\n        left += 1\n        right -= 1\n    return nums\n",
      {
        en: "Swap <code>nums[left]</code> and <code>nums[right]</code>, then move pointers inward. Python swap: <code>a, b = b, a</code>.",
        zh: "交换 <code>nums[left]</code> 和 <code>nums[right]</code>,然后指针向中间挪。Python 交换变量:<code>a, b = b, a</code>。",
      },
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
      {
        en: "<p><strong>Same-direction (slow/fast).</strong> Both pointers move forward but at different speeds or conditions:</p><pre><code>slow = 0\nfor fast in range(len(nums)):\n    if should_keep(nums[fast]):\n        nums[slow] = nums[fast]\n        slow += 1</code></pre><p>Good for: in-place filter, remove duplicates, partition.</p>",
        zh: "<p><strong>同向(快慢指针)。</strong>两个指针都向前,但速度或条件不同:</p><pre><code>slow = 0\nfor fast in range(len(nums)):\n    if should_keep(nums[fast]):\n        nums[slow] = nums[fast]\n        slow += 1</code></pre><p>适合:原地过滤、去重、分区。</p>",
      },
    ),
    exercise(
      "d7-ex-remove-dupes",
      {
        en: "<p><strong>LeetCode #26.</strong> Given a sorted list <code>nums</code>, remove duplicates <em>in place</em> so each element appears once. Return the new length <code>k</code>. The first <code>k</code> elements of <code>nums</code> should be the unique values in order.</p>",
        zh: "<p><strong>LeetCode #26。</strong>给定有序列表 <code>nums</code>,<em>原地</em>删除重复元素,使每个元素只出现一次。返回新的长度 <code>k</code>。<code>nums</code> 的前 <code>k</code> 个元素应按顺序装着所有不重复的值。</p>",
      },
      "def remove_duplicates(nums):\n    # your code here\n    pass\n",
      "def remove_duplicates(nums):\n    if not nums:\n        return 0\n    slow = 0\n    for fast in range(1, len(nums)):\n        if nums[fast] != nums[slow]:\n            slow += 1\n            nums[slow] = nums[fast]\n    return slow + 1\n",
      {
        en: "Handle empty edge case. Keep <code>slow</code> at the last written index. Walk <code>fast</code> forward; when you see a new value, advance <code>slow</code> and write there.",
        zh: "先处理空数组边界。<code>slow</code> 指向最后一个写入位置。<code>fast</code> 往前走,遇到新值就推进 <code>slow</code> 并写入。",
      },
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
      { en: "Sliding window", zh: "滑动窗口" },
      {
        en: "Sliding window is a specialized two-pointer pattern where you maintain a &quot;window&quot; <code>[left, right]</code> and slide it along.",
        zh: "滑动窗口是双指针的一种特化 —— 维护一个「窗口」<code>[left, right]</code>,沿着数组滑。",
      },
    ),
    teach(
      "d7-window",
      {
        en: "<p><strong>Sliding window</strong> — grow <code>right</code>, shrink <code>left</code>:</p><pre><code>left = 0\nfor right in range(len(nums)):\n    # extend window by including nums[right]\n    \n    while window_is_invalid():\n        # shrink window from the left\n        left += 1\n    \n    # update answer based on current valid window</code></pre><p>Good for: longest/shortest substring with a property, max sum of k consecutive, count subarrays meeting a condition.</p>",
        zh: "<p><strong>滑动窗口</strong> —— <code>right</code> 扩,<code>left</code> 缩:</p><pre><code>left = 0\nfor right in range(len(nums)):\n    # 把 nums[right] 纳入窗口\n    \n    while window_is_invalid():\n        # 从左边收缩\n        left += 1\n    \n    # 根据当前合法窗口更新答案</code></pre><p>适合:满足某性质的最长/最短子串、k 个连续元素的最大和、满足条件的子数组计数。</p>",
      },
    ),
    demo(
      "d7-window-demo",
      {
        en: "<p>Walk-through — max sum of any 3 consecutive elements:</p>",
        zh: "<p>走一遍例子 —— 任意 3 个连续元素的最大和:</p>",
      },
      'def max_sum_k(nums, k):\n    if len(nums) < k:\n        return 0\n    window_sum = sum(nums[:k])\n    best = window_sum\n    for right in range(k, len(nums)):\n        window_sum += nums[right] - nums[right - k]   # 滑窗:加新的,减旧的\n        best = max(best, window_sum)\n    return best\n\nprint(max_sum_k([1, 5, 2, 9, 3, 1, 7], 3))',
      {
        en: "Fixed-size window — you slide by adding the new element and dropping the oldest.",
        zh: "固定大小窗口 —— 滑动时加上新元素,减掉最旧的那个。",
      },
    ),
    exercise(
      "d7-ex-longest-sub",
      {
        en: "<p><strong>LeetCode #3 — Longest Substring Without Repeating Characters.</strong> Given a string, return the length of the longest substring containing no repeated characters.</p><p>Use a sliding window with a set.</p>",
        zh: "<p><strong>LeetCode #3 —— 无重复字符的最长子串。</strong>给定字符串,返回不含重复字符的最长子串长度。</p><p>用滑动窗口 + set。</p>",
      },
      "def longest_unique_substring(s):\n    # your code here\n    pass\n",
      "def longest_unique_substring(s):\n    seen = set()\n    left = 0\n    best = 0\n    for right in range(len(s)):\n        while s[right] in seen:\n            seen.remove(s[left])\n            left += 1\n        seen.add(s[right])\n        best = max(best, right - left + 1)\n    return best\n",
      {
        en: "Expand <code>right</code>, track seen chars. If <code>s[right]</code> already seen, shrink from <code>left</code> until it&apos;s not. Track max window length.",
        zh: "<code>right</code> 扩,记录见过的字符。如果 <code>s[right]</code> 已经在窗口里,就从左边收缩直到它不在为止。记录最大窗口长度。",
      },
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
      {
        en: "Which problem is <strong>not</strong> a good fit for two pointers or sliding window?",
        zh: "哪道题<strong>不</strong>适合用双指针或滑动窗口?",
      },
      [
        { en: "Check if a string is a palindrome", zh: "判断字符串是否为回文" },
        { en: "Find max sum of any 4 consecutive elements", zh: "任意 4 个连续元素的最大和" },
        { en: "Find the kth largest element in an unsorted array", zh: "无序数组里的第 k 大元素" },
        { en: "Remove duplicates from a sorted array", zh: "有序数组去重" },
      ],
      2,
      {
        en: "Kth largest on unsorted data wants a heap or quickselect. Two pointers needs a sorted or sequential structure.",
        zh: "无序数据上的第 k 大要用堆或快速选择。双指针需要有序或顺序结构。",
      },
    ),
    recall(
      "d7-recall",
      {
        en: "You see a problem: &quot;find the shortest subarray whose sum is at least K.&quot; What pattern comes to mind and why?",
        zh: "看到题目:「找和至少为 K 的最短子数组」。第一反应是哪种套路?为什么?",
      },
      {
        en: "Sliding window. You&apos;re looking for a contiguous range with a property — grow <code>right</code> until the sum hits K, then shrink <code>left</code> as long as it still does, tracking min length.",
        zh: "滑动窗口。要找满足性质的连续区间 —— <code>right</code> 扩到和达到 K 为止,然后只要仍满足就 <code>left</code> 收缩,一路记录最小长度。",
      },
    ),
    teach(
      "d7-wrap",
      {
        en: "<p>Today you added to your pattern library:</p><ul><li>Opposite ends — palindromes, pairs on sorted arrays</li><li>Slow/fast — in-place filters, remove duplicates</li><li>Sliding window — subarrays/substrings with a property</li></ul>",
        zh: "<p>今天给你的套路库加了:</p><ul><li>两端相向 —— 回文、有序数组上的配对</li><li>快慢指针 —— 原地过滤、去重</li><li>滑动窗口 —— 满足某性质的子数组/子串</li></ul>",
      },
    ),
  ],
  finalTest: [
    exercise(
      "d7-t-squares-sorted",
      {
        en: "<p><strong>LeetCode #977.</strong> Given a list sorted in non-decreasing order, return a list of each element&apos;s square, also sorted non-decreasing. Do it in O(n) with two pointers (the inputs may be negative!).</p>",
        zh: "<p><strong>LeetCode #977。</strong>给定一个非递减有序列表,返回每个元素平方后组成的、也非递减有序的列表。用双指针 O(n) 完成(输入可能是负数!)。</p>",
      },
      "def sorted_squares(nums):\n    # your code here\n    pass\n",
      "def sorted_squares(nums):\n    n = len(nums)\n    result = [0] * n\n    left, right = 0, n - 1\n    idx = n - 1\n    while left <= right:\n        if abs(nums[left]) > abs(nums[right]):\n            result[idx] = nums[left] ** 2\n            left += 1\n        else:\n            result[idx] = nums[right] ** 2\n            right -= 1\n        idx -= 1\n    return result\n",
      {
        en: "The largest square is at one end. Fill the result right-to-left, comparing <code>|nums[left]|</code> vs <code>|nums[right]|</code>.",
        zh: "最大的平方值一定在两端之一。从右往左填结果,比较 <code>|nums[left]|</code> 和 <code>|nums[right]|</code>。",
      },
      [
        { call: "sorted_squares([-4, -1, 0, 3, 10])", expected: [0, 1, 9, 16, 100] },
        { call: "sorted_squares([-7, -3, 2, 3, 11])", expected: [4, 9, 9, 49, 121] },
        { call: "sorted_squares([1, 2, 3])", expected: [1, 4, 9] },
      ],
      { fnName: "sorted_squares" },
    ),
    exercise(
      "d7-t-move-zeros",
      {
        en: "<p><strong>LeetCode #283.</strong> Move all zeros in <code>nums</code> to the end, keeping the relative order of the non-zero elements. Modify <em>in place</em> and return the list.</p>",
        zh: "<p><strong>LeetCode #283。</strong>把 <code>nums</code> 里所有的 0 移到末尾,保持非 0 元素的相对顺序。<em>原地</em>修改并返回。</p>",
      },
      "def move_zeros(nums):\n    # your code here\n    pass\n",
      "def move_zeros(nums):\n    slow = 0\n    for fast in range(len(nums)):\n        if nums[fast] != 0:\n            nums[slow], nums[fast] = nums[fast], nums[slow]\n            slow += 1\n    return nums\n",
      {
        en: "Slow/fast. Swap non-zero into <code>nums[slow]</code>, advance <code>slow</code>. Zeros end up collected at the back.",
        zh: "快慢指针。把非 0 元素交换到 <code>nums[slow]</code>,然后 <code>slow</code> 前进。0 自然被挤到后面。",
      },
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
      {
        en: "In a sliding window loop, when do you typically move the <code>left</code> pointer?",
        zh: "滑动窗口循环里,通常什么时候挪动 <code>left</code> 指针?",
      },
      [
        { en: "Every iteration", zh: "每次迭代都挪" },
        { en: "Only when the window becomes invalid", zh: "只在窗口变得不合法时挪" },
        { en: "After moving <code>right</code> every time", zh: "每次挪完 <code>right</code> 都挪一次" },
        { en: "Never — only <code>right</code> moves", zh: "不挪 —— 只挪 <code>right</code>" },
      ],
      1,
      {
        en: "Expand <code>right</code> until invalid, then shrink <code>left</code> until valid again. Move <code>left</code> only when needed.",
        zh: "<code>right</code> 扩到窗口不合法时,才收缩 <code>left</code> 直到合法。需要时才挪 <code>left</code>。",
      },
    ),
    exercise(
      "d7-t-window-k",
      {
        en: "<p>Write <code>max_window_sum(nums, k)</code> — return the maximum sum of any <em>k</em> consecutive elements. Assume <code>len(nums) &gt;= k &gt;= 1</code>.</p>",
        zh: "<p>写一个 <code>max_window_sum(nums, k)</code> —— 返回任意 <em>k</em> 个连续元素的最大和。假设 <code>len(nums) &gt;= k &gt;= 1</code>。</p>",
      },
      "def max_window_sum(nums, k):\n    # your code here\n    pass\n",
      "def max_window_sum(nums, k):\n    window = sum(nums[:k])\n    best = window\n    for i in range(k, len(nums)):\n        window += nums[i] - nums[i - k]\n        best = max(best, window)\n    return best\n",
      {
        en: "Fixed-size sliding window: compute initial sum, then slide by adding the new and subtracting the old.",
        zh: "固定大小滑窗:先算初始和,然后每滑一步,加新的、减旧的。",
      },
      [
        { call: "max_window_sum([1, 2, 3, 4, 5], 2)", expected: 9 },
        { call: "max_window_sum([1, 5, 2, 9, 3, 1, 7], 3)", expected: 14 },
        { call: "max_window_sum([5], 1)", expected: 5 },
      ],
      { fnName: "max_window_sum" },
    ),
  ],
};

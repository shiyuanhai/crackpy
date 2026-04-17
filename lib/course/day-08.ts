import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day08: Day = {
  id: 8,
  title: "Hash map patterns",
  subtitle: "Hash maps turn O(n²) into O(n). Today we internalize the 3 classic hash-map patterns every interviewer asks about.",
  estimatedTime: "55–70 min",
  goals: [
    "Apply the &quot;look for complement&quot; pattern (Two Sum family)",
    "Apply the &quot;count then compare&quot; pattern (anagrams, frequency)",
    "Apply the &quot;group by signature&quot; pattern (group anagrams)",
  ],
  youWillBuild: "Three full problems from the top-frequency interview list: Two Sum, Valid Anagram, Group Anagrams.",
  steps: [
    teach(
      "d8-intro",
      "<p>Day 5 spaced-repetition callback: you already wrote <code>two_sum</code> and <code>is_anagram</code>. Today we formalize <em>why</em> these patterns work and practice until they&apos;re reflex.</p>",
    ),
    teach(
      "d8-p1",
      "<p><strong>Pattern 1 — Complement lookup.</strong> &quot;Has the thing I need already been seen?&quot;</p><pre><code>seen = {}\nfor i, x in enumerate(nums):\n    need = target - x\n    if need in seen:\n        return [seen[need], i]\n    seen[x] = i</code></pre><p>Works for Two Sum, &quot;subarray sum equals K&quot; (with prefix sums), and more.</p>",
    ),
    exercise(
      "d8-ex-twosum-rep",
      "<p>Warmup — rewrite Two Sum from memory (Day 5 callback). Return indices <code>[i, j]</code>.</p>",
      "def two_sum(nums, target):\n    # your code here\n    pass\n",
      "def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        need = target - x\n        if need in seen:\n            return [seen[need], i]\n        seen[x] = i\n    return [-1, -1]\n",
      "<code>seen</code> maps value → index. For each number, check if the complement is there.",
      [
        { call: "two_sum([2, 7, 11, 15], 9)", expected: [0, 1] },
        { call: "two_sum([3, 2, 4], 6)", expected: [1, 2] },
        { call: "two_sum([3, 3], 6)", expected: [0, 1] },
      ],
      { fnName: "two_sum" },
    ),
    teach(
      "d8-p2",
      "<p><strong>Pattern 2 — Count then compare.</strong> Many problems become easy when you reduce each string/list to a frequency map and compare.</p><p>Anagram check: two strings are anagrams iff their character counts match.</p><p>&quot;Check if permutation of a palindrome&quot;: count chars, at most one can have odd count.</p>",
    ),
    exercise(
      "d8-ex-anagram",
      "<p><strong>LeetCode #242.</strong> Rewrite <code>is_anagram</code> using Counter.</p>",
      "def is_anagram(s, t):\n    # your code here\n    pass\n",
      "def is_anagram(s, t):\n    from collections import Counter\n    return Counter(s) == Counter(t)\n",
      "<code>Counter(s)</code> gives a dict-like of counts. Two Counters compare equal iff they have the same keys and values.",
      [
        { call: 'is_anagram("listen", "silent")', expected: true },
        { call: 'is_anagram("abc", "abd")', expected: false },
        { call: 'is_anagram("", "")', expected: true },
      ],
      { fnName: "is_anagram" },
    ),
    exercise(
      "d8-ex-palindrome-perm",
      "<p>Write <code>can_be_palindrome(s)</code> — return <code>True</code> if the characters of <code>s</code> can be rearranged into a palindrome.</p><p>(Hint: in a palindrome, at most one character can have an odd count.)</p>",
      "def can_be_palindrome(s):\n    # your code here\n    pass\n",
      "def can_be_palindrome(s):\n    from collections import Counter\n    counts = Counter(s)\n    odd = sum(1 for v in counts.values() if v % 2 == 1)\n    return odd <= 1\n",
      "Count chars. Count how many have odd frequency. At most 1 odd is allowed.",
      [
        { call: 'can_be_palindrome("racecar")', expected: true },
        { call: 'can_be_palindrome("aabb")', expected: true },
        { call: 'can_be_palindrome("abc")', expected: false },
        { call: 'can_be_palindrome("")', expected: true },
      ],
      { fnName: "can_be_palindrome" },
    ),
    checkpoint(
      "d8-cp",
      "The grouping trick",
      "Third pattern coming up. This one is elegant — it&apos;s how you group objects that are &quot;the same under some transformation.&quot;",
    ),
    teach(
      "d8-p3",
      "<p><strong>Pattern 3 — Group by signature.</strong> For each item, compute a <em>canonical key</em>. Items with the same key belong to the same group.</p><pre><code>groups = {}\nfor item in items:\n    key = signature(item)\n    groups.setdefault(key, []).append(item)</code></pre><p>For anagram grouping, the signature is the sorted string: <code>&quot;eat&quot;</code> and <code>&quot;tea&quot;</code> both have signature <code>&quot;aet&quot;</code>.</p><p><code>setdefault(k, default)</code> — looks up <code>k</code>; if missing, inserts <code>default</code> and returns it. Very handy.</p>",
    ),
    demo(
      "d8-p3-demo",
      "<p>See it on a small example:</p>",
      'words = ["eat", "tea", "tan", "ate", "nat", "bat"]\ngroups = {}\nfor w in words:\n    key = "".join(sorted(w))\n    groups.setdefault(key, []).append(w)\nprint(groups)',
    ),
    exercise(
      "d8-ex-group-anagrams",
      "<p><strong>LeetCode #49.</strong> Given a list of strings, return lists of anagrams grouped together. Each inner list is sorted alphabetically. The outer list is sorted by inner-list first elements.</p>",
      "def group_anagrams(words):\n    # your code here\n    pass\n",
      'def group_anagrams(words):\n    groups = {}\n    for w in words:\n        key = "".join(sorted(w))\n        groups.setdefault(key, []).append(w)\n    result = [sorted(g) for g in groups.values()]\n    result.sort(key=lambda g: g[0])\n    return result\n',
      "Signature = sorted characters. Group by signature. Sort each group and the overall list for deterministic output.",
      [
        {
          call: 'group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])',
          expected: [["bat"], ["ate", "eat", "tea"], ["nat", "tan"]],
        },
        { call: 'group_anagrams([""])', expected: [[""]] },
        { call: 'group_anagrams(["a"])', expected: [["a"]] },
      ],
      { fnName: "group_anagrams" },
    ),
    recall(
      "d8-recall",
      "You see a new problem: &quot;Given a list of points, group those that lie on the same line through the origin.&quot; How would you attack it with these patterns?",
      "Group by signature. The signature of a point (x, y) is its slope or direction — e.g., reduced fraction <code>(x/g, y/g)</code> with g = gcd. Points with the same signature go in the same group.",
    ),
    teach(
      "d8-wrap",
      "<p>Your hash-map patterns:</p><ul><li>Complement lookup — pairs</li><li>Count then compare — anagrams, frequency</li><li>Group by signature — grouping equivalent items</li></ul><p>When you see a problem and reach for O(n²), stop and ask: is there a hash map that collapses this to O(n)?</p>",
    ),
  ],
  finalTest: [
    exercise(
      "d8-t-majority",
      "<p><strong>LeetCode #169.</strong> The <em>majority element</em> appears more than <code>n/2</code> times. Given a list where a majority element is guaranteed, return it.</p>",
      "def majority_element(nums):\n    # your code here\n    pass\n",
      "def majority_element(nums):\n    from collections import Counter\n    counts = Counter(nums)\n    n = len(nums)\n    for k, v in counts.items():\n        if v > n // 2:\n            return k\n    return -1\n",
      "Counter. The one with count &gt; n/2 is the answer.",
      [
        { call: "majority_element([3, 2, 3])", expected: 3 },
        { call: "majority_element([2, 2, 1, 1, 1, 2, 2])", expected: 2 },
        { call: "majority_element([1])", expected: 1 },
      ],
      { fnName: "majority_element" },
    ),
    exercise(
      "d8-t-happy",
      "<p>Write <code>first_unique_char(s)</code> — return the index of the first character that appears exactly once. Return <code>-1</code> if none.</p>",
      "def first_unique_char(s):\n    # your code here\n    pass\n",
      "def first_unique_char(s):\n    from collections import Counter\n    counts = Counter(s)\n    for i, ch in enumerate(s):\n        if counts[ch] == 1:\n            return i\n    return -1\n",
      "Count chars in one pass. Walk the string again — return the first index where the count is 1.",
      [
        { call: 'first_unique_char("leetcode")', expected: 0 },
        { call: 'first_unique_char("loveleetcode")', expected: 2 },
        { call: 'first_unique_char("aabb")', expected: -1 },
      ],
      { fnName: "first_unique_char" },
    ),
    quizMC(
      "d8-t-why",
      "Why is <code>two_sum</code> with a hash map O(n) instead of O(n²)?",
      [
        "Because hashing is free",
        "Because we avoid nested loops — each lookup is O(1) on average",
        "Because Python dicts are sorted",
        "Because we use less memory",
      ],
      1,
      "The hash map gives us O(1) lookup per element, so a single loop is enough: O(n) total.",
    ),
    exercise(
      "d8-t-contains-dup-near",
      "<p><strong>LeetCode #219.</strong> Given <code>nums</code> and <code>k</code>, return <code>True</code> if there are two indices <code>i, j</code> with <code>nums[i] == nums[j]</code> and <code>|i - j| &lt;= k</code>.</p>",
      "def contains_nearby_duplicate(nums, k):\n    # your code here\n    pass\n",
      "def contains_nearby_duplicate(nums, k):\n    last_seen = {}\n    for i, x in enumerate(nums):\n        if x in last_seen and i - last_seen[x] <= k:\n            return True\n        last_seen[x] = i\n    return False\n",
      "Track last seen index of each value. On a repeat, check distance.",
      [
        { call: "contains_nearby_duplicate([1, 2, 3, 1], 3)", expected: true },
        { call: "contains_nearby_duplicate([1, 0, 1, 1], 1)", expected: true },
        { call: "contains_nearby_duplicate([1, 2, 3, 1, 2, 3], 2)", expected: false },
      ],
      { fnName: "contains_nearby_duplicate" },
    ),
  ],
};

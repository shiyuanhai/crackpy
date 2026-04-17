import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day08: Day = {
  id: 8,
  title: {
    en: "Hash map patterns",
    zh: "哈希表套路",
  },
  subtitle: {
    en: "Hash maps turn O(n²) into O(n). Today we internalize the 3 classic hash-map patterns every interviewer asks about.",
    zh: "哈希表能把 O(n²) 压成 O(n)。今天我们把面试官最爱问的 3 个经典套路彻底吃透。",
  },
  estimatedTime: {
    en: "55–70 min",
    zh: "55–70 分钟",
  },
  goals: [
    {
      en: "Apply the &quot;look for complement&quot; pattern (Two Sum family)",
      zh: "掌握「找补数」套路(Two Sum 系列)",
    },
    {
      en: "Apply the &quot;count then compare&quot; pattern (anagrams, frequency)",
      zh: "掌握「先计数再比较」套路(字母异位词、频次)",
    },
    {
      en: "Apply the &quot;group by signature&quot; pattern (group anagrams)",
      zh: "掌握「按签名分组」套路(异位词分组)",
    },
  ],
  youWillBuild: {
    en: "Three full problems from the top-frequency interview list: Two Sum, Valid Anagram, Group Anagrams.",
    zh: "三道面试高频题完整搞定:Two Sum、Valid Anagram、Group Anagrams。",
  },
  steps: [
    teach(
      "d8-intro",
      {
        en: "<p>Day 5 spaced-repetition callback: you already wrote <code>two_sum</code> and <code>is_anagram</code>. Today we formalize <em>why</em> these patterns work and practice until they&apos;re reflex.</p>",
        zh: "<p>间隔复习,回顾 Day 5:你已经写过 <code>two_sum</code> 和 <code>is_anagram</code>。今天我们把这些套路<em>为什么</em>好用讲清楚,然后练到形成肌肉记忆。</p>",
      },
    ),
    teach(
      "d8-p1",
      {
        en: "<p><strong>Pattern 1 — Complement lookup.</strong> &quot;Has the thing I need already been seen?&quot;</p><pre><code>seen = {}\nfor i, x in enumerate(nums):\n    need = target - x\n    if need in seen:\n        return [seen[need], i]\n    seen[x] = i</code></pre><p>Works for Two Sum, &quot;subarray sum equals K&quot; (with prefix sums), and more.</p>",
        zh: "<p><strong>套路 1 —— 查补数。</strong>「我要的那个数,之前见过没?」</p><pre><code>seen = {}\nfor i, x in enumerate(nums):\n    need = target - x\n    if need in seen:\n        return [seen[need], i]\n    seen[x] = i</code></pre><p>Two Sum、「子数组和等于 K」(配合前缀和)等等都能用。</p>",
      },
    ),
    exercise(
      "d8-ex-twosum-rep",
      {
        en: "<p>Warmup — rewrite Two Sum from memory (Day 5 callback). Return indices <code>[i, j]</code>.</p>",
        zh: "<p>热身 —— 凭记忆把 Two Sum 重写一遍(回顾 Day 5)。返回下标 <code>[i, j]</code>。</p>",
      },
      "def two_sum(nums, target):\n    # your code here\n    pass\n",
      "def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        need = target - x\n        if need in seen:\n            return [seen[need], i]\n        seen[x] = i\n    return [-1, -1]\n",
      {
        en: "<code>seen</code> maps value → index. For each number, check if the complement is there.",
        zh: "<code>seen</code> 存「值 → 下标」。每拿到一个数,就看补数在不在里面。",
      },
      [
        { call: "two_sum([2, 7, 11, 15], 9)", expected: [0, 1] },
        { call: "two_sum([3, 2, 4], 6)", expected: [1, 2] },
        { call: "two_sum([3, 3], 6)", expected: [0, 1] },
      ],
      { fnName: "two_sum" },
    ),
    teach(
      "d8-p2",
      {
        en: "<p><strong>Pattern 2 — Count then compare.</strong> Many problems become easy when you reduce each string/list to a frequency map and compare.</p><p>Anagram check: two strings are anagrams iff their character counts match.</p><p>&quot;Check if permutation of a palindrome&quot;: count chars, at most one can have odd count.</p>",
        zh: "<p><strong>套路 2 —— 先计数再比较。</strong>很多题只要把字符串或列表压成一个频次表再对比,一下就变简单。</p><p>判断异位词:两个字符串字符频次完全一致,就是异位词。</p><p>「能否重排成回文」:数字符频次,最多只能有一个奇数。</p>",
      },
    ),
    exercise(
      "d8-ex-anagram",
      {
        en: "<p><strong>LeetCode #242.</strong> Rewrite <code>is_anagram</code> using Counter.</p>",
        zh: "<p><strong>LeetCode #242。</strong>用 Counter 重写 <code>is_anagram</code>。</p>",
      },
      "def is_anagram(s, t):\n    # your code here\n    pass\n",
      "def is_anagram(s, t):\n    from collections import Counter\n    return Counter(s) == Counter(t)\n",
      {
        en: "<code>Counter(s)</code> gives a dict-like of counts. Two Counters compare equal iff they have the same keys and values.",
        zh: "<code>Counter(s)</code> 返回一个类字典的频次表。两个 Counter 当且仅当键值完全一致才相等。",
      },
      [
        { call: 'is_anagram("listen", "silent")', expected: true },
        { call: 'is_anagram("abc", "abd")', expected: false },
        { call: 'is_anagram("", "")', expected: true },
      ],
      { fnName: "is_anagram" },
    ),
    exercise(
      "d8-ex-palindrome-perm",
      {
        en: "<p>Write <code>can_be_palindrome(s)</code> — return <code>True</code> if the characters of <code>s</code> can be rearranged into a palindrome.</p><p>(Hint: in a palindrome, at most one character can have an odd count.)</p>",
        zh: "<p>写一个 <code>can_be_palindrome(s)</code> —— 如果 <code>s</code> 的字符能重排成回文就返回 <code>True</code>。</p><p>(提示:回文里最多只能有一个字符出现奇数次。)</p>",
      },
      "def can_be_palindrome(s):\n    # your code here\n    pass\n",
      "def can_be_palindrome(s):\n    from collections import Counter\n    counts = Counter(s)\n    odd = sum(1 for v in counts.values() if v % 2 == 1)\n    return odd <= 1\n",
      {
        en: "Count chars. Count how many have odd frequency. At most 1 odd is allowed.",
        zh: "先数字符频次,再数有多少个是奇数。最多允许一个奇数。",
      },
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
      {
        en: "The grouping trick",
        zh: "分组小技巧",
      },
      {
        en: "Third pattern coming up. This one is elegant — it&apos;s how you group objects that are &quot;the same under some transformation.&quot;",
        zh: "下一个套路登场。这招特别优雅 —— 用来把「在某种变换下等价」的对象归成一组。",
      },
    ),
    teach(
      "d8-p3",
      {
        en: "<p><strong>Pattern 3 — Group by signature.</strong> For each item, compute a <em>canonical key</em>. Items with the same key belong to the same group.</p><pre><code>groups = {}\nfor item in items:\n    key = signature(item)\n    groups.setdefault(key, []).append(item)</code></pre><p>For anagram grouping, the signature is the sorted string: <code>&quot;eat&quot;</code> and <code>&quot;tea&quot;</code> both have signature <code>&quot;aet&quot;</code>.</p><p><code>setdefault(k, default)</code> — looks up <code>k</code>; if missing, inserts <code>default</code> and returns it. Very handy.</p>",
        zh: "<p><strong>套路 3 —— 按签名分组。</strong>给每个元素算一个<em>标准化的 key</em>,key 相同的归到同一组。</p><pre><code>groups = {}\nfor item in items:\n    key = signature(item)\n    groups.setdefault(key, []).append(item)</code></pre><p>异位词分组里,签名就是排序后的字符串:<code>&quot;eat&quot;</code> 和 <code>&quot;tea&quot;</code> 签名都是 <code>&quot;aet&quot;</code>。</p><p><code>setdefault(k, default)</code> —— 查 <code>k</code>,没有就插入 <code>default</code> 并返回。非常好用。</p>",
      },
    ),
    demo(
      "d8-p3-demo",
      {
        en: "<p>See it on a small example:</p>",
        zh: "<p>用一个小例子看一下效果:</p>",
      },
      'words = ["eat", "tea", "tan", "ate", "nat", "bat"]\ngroups = {}\nfor w in words:\n    key = "".join(sorted(w))\n    groups.setdefault(key, []).append(w)\nprint(groups)',
    ),
    exercise(
      "d8-ex-group-anagrams",
      {
        en: "<p><strong>LeetCode #49.</strong> Given a list of strings, return lists of anagrams grouped together. Each inner list is sorted alphabetically. The outer list is sorted by inner-list first elements.</p>",
        zh: "<p><strong>LeetCode #49。</strong>给一组字符串,返回异位词分组后的列表。每个内层列表按字母序排,外层按每组首元素排。</p>",
      },
      "def group_anagrams(words):\n    # your code here\n    pass\n",
      'def group_anagrams(words):\n    groups = {}\n    for w in words:\n        key = "".join(sorted(w))\n        groups.setdefault(key, []).append(w)\n    result = [sorted(g) for g in groups.values()]\n    result.sort(key=lambda g: g[0])\n    return result\n',
      {
        en: "Signature = sorted characters. Group by signature. Sort each group and the overall list for deterministic output.",
        zh: "签名 = 排序后的字符。按签名分组。再把每组内部排序、整体排序,保证输出确定。",
      },
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
      {
        en: "You see a new problem: &quot;Given a list of points, group those that lie on the same line through the origin.&quot; How would you attack it with these patterns?",
        zh: "碰到一道新题:「给一组点,把所有过原点的同一条直线上的点分组。」用今天的套路怎么下手?",
      },
      {
        en: "Group by signature. The signature of a point (x, y) is its slope or direction — e.g., reduced fraction <code>(x/g, y/g)</code> with g = gcd. Points with the same signature go in the same group.",
        zh: "按签名分组。点 (x, y) 的签名就是它的斜率或方向 —— 比如约分后的 <code>(x/g, y/g)</code>,其中 g 是最大公约数。签名相同的归一组。",
      },
    ),
    teach(
      "d8-wrap",
      {
        en: "<p>Your hash-map patterns:</p><ul><li>Complement lookup — pairs</li><li>Count then compare — anagrams, frequency</li><li>Group by signature — grouping equivalent items</li></ul><p>When you see a problem and reach for O(n²), stop and ask: is there a hash map that collapses this to O(n)?</p>",
        zh: "<p>你的哈希表套路清单:</p><ul><li>查补数 —— 配对类</li><li>先计数再比较 —— 异位词、频次</li><li>按签名分组 —— 把等价元素归类</li></ul><p>以后看到题想上 O(n²) 前,先停一下问自己:能不能用哈希表把它压到 O(n)?</p>",
      },
    ),
  ],
  finalTest: [
    exercise(
      "d8-t-majority",
      {
        en: "<p><strong>LeetCode #169.</strong> The <em>majority element</em> appears more than <code>n/2</code> times. Given a list where a majority element is guaranteed, return it.</p>",
        zh: "<p><strong>LeetCode #169。</strong><em>多数元素</em>是出现次数超过 <code>n/2</code> 的元素。题目保证存在,返回它。</p>",
      },
      "def majority_element(nums):\n    # your code here\n    pass\n",
      "def majority_element(nums):\n    from collections import Counter\n    counts = Counter(nums)\n    n = len(nums)\n    for k, v in counts.items():\n        if v > n // 2:\n            return k\n    return -1\n",
      {
        en: "Counter. The one with count &gt; n/2 is the answer.",
        zh: "上 Counter。频次 &gt; n/2 的那个就是答案。",
      },
      [
        { call: "majority_element([3, 2, 3])", expected: 3 },
        { call: "majority_element([2, 2, 1, 1, 1, 2, 2])", expected: 2 },
        { call: "majority_element([1])", expected: 1 },
      ],
      { fnName: "majority_element" },
    ),
    exercise(
      "d8-t-happy",
      {
        en: "<p>Write <code>first_unique_char(s)</code> — return the index of the first character that appears exactly once. Return <code>-1</code> if none.</p>",
        zh: "<p>写一个 <code>first_unique_char(s)</code> —— 返回第一个只出现一次的字符下标。没有就返回 <code>-1</code>。</p>",
      },
      "def first_unique_char(s):\n    # your code here\n    pass\n",
      "def first_unique_char(s):\n    from collections import Counter\n    counts = Counter(s)\n    for i, ch in enumerate(s):\n        if counts[ch] == 1:\n            return i\n    return -1\n",
      {
        en: "Count chars in one pass. Walk the string again — return the first index where the count is 1.",
        zh: "先一遍过数字符。再走一遍字符串,碰到频次为 1 的就返回下标。",
      },
      [
        { call: 'first_unique_char("leetcode")', expected: 0 },
        { call: 'first_unique_char("loveleetcode")', expected: 2 },
        { call: 'first_unique_char("aabb")', expected: -1 },
      ],
      { fnName: "first_unique_char" },
    ),
    quizMC(
      "d8-t-why",
      {
        en: "Why is <code>two_sum</code> with a hash map O(n) instead of O(n²)?",
        zh: "用哈希表写的 <code>two_sum</code> 为什么是 O(n) 而不是 O(n²)?",
      },
      [
        {
          en: "Because hashing is free",
          zh: "因为哈希是免费的",
        },
        {
          en: "Because we avoid nested loops — each lookup is O(1) on average",
          zh: "因为避开了嵌套循环 —— 每次查找平均 O(1)",
        },
        {
          en: "Because Python dicts are sorted",
          zh: "因为 Python 字典是有序的",
        },
        {
          en: "Because we use less memory",
          zh: "因为用了更少的内存",
        },
      ],
      1,
      {
        en: "The hash map gives us O(1) lookup per element, so a single loop is enough: O(n) total.",
        zh: "哈希表让每次查找平均 O(1),所以一层循环就够了,整体 O(n)。",
      },
    ),
    exercise(
      "d8-t-contains-dup-near",
      {
        en: "<p><strong>LeetCode #219.</strong> Given <code>nums</code> and <code>k</code>, return <code>True</code> if there are two indices <code>i, j</code> with <code>nums[i] == nums[j]</code> and <code>|i - j| &lt;= k</code>.</p>",
        zh: "<p><strong>LeetCode #219。</strong>给 <code>nums</code> 和 <code>k</code>,若存在两个下标 <code>i, j</code> 满足 <code>nums[i] == nums[j]</code> 且 <code>|i - j| &lt;= k</code>,返回 <code>True</code>。</p>",
      },
      "def contains_nearby_duplicate(nums, k):\n    # your code here\n    pass\n",
      "def contains_nearby_duplicate(nums, k):\n    last_seen = {}\n    for i, x in enumerate(nums):\n        if x in last_seen and i - last_seen[x] <= k:\n            return True\n        last_seen[x] = i\n    return False\n",
      {
        en: "Track last seen index of each value. On a repeat, check distance.",
        zh: "记录每个值最后一次出现的下标。碰到重复就检查距离。",
      },
      [
        { call: "contains_nearby_duplicate([1, 2, 3, 1], 3)", expected: true },
        { call: "contains_nearby_duplicate([1, 0, 1, 1], 1)", expected: true },
        { call: "contains_nearby_duplicate([1, 2, 3, 1, 2, 3], 2)", expected: false },
      ],
      { fnName: "contains_nearby_duplicate" },
    ),
  ],
};

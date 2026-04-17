import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day05: Day = {
  id: 5,
  title: { en: "Dictionaries and sets", zh: "字典与集合" },
  subtitle: {
    en: "Dictionaries (hash maps) and sets are the O(1) lookup kings. Today you&apos;ll use them to crush problems that would otherwise be O(n²).",
    zh: "字典(哈希表)和集合是 O(1) 查找之王。今天你会用它们把原本 O(n²) 的题直接秒掉。",
  },
  estimatedTime: { en: "55–70 min", zh: "55–70 分钟" },
  goals: [
    {
      en: "Create dictionaries and look up / update values",
      zh: "创建字典,查询 / 更新值",
    },
    {
      en: "Use <code>get</code>, <code>in</code>, iteration patterns",
      zh: "使用 <code>get</code>、<code>in</code>,以及各种遍历写法",
    },
    {
      en: "Understand that dict and set lookups are O(1) average",
      zh: "理解 dict 和 set 的查找平均是 O(1)",
    },
    {
      en: "Use sets for uniqueness and membership checks",
      zh: "用 set 做去重和成员判断",
    },
    {
      en: "Apply the &quot;count occurrences&quot; pattern",
      zh: "掌握「统计出现次数」模式",
    },
  ],
  youWillBuild: {
    en: "Word frequency counter, first-unique-character, and a preview of Two Sum (hash map version).",
    zh: "词频统计、第一个唯一字符,还有 Two Sum 的哈希表版(预告)。",
  },
  steps: [
    teach(
      "d5-intro",
      {
        en: "<p>If lists are Python&apos;s primary sequence, dictionaries are its primary map. A dict maps <strong>keys to values</strong>, and looking up a key is O(1) on average (via hashing).</p><p>That O(1) lookup is why so many interview problems collapse from O(n²) to O(n) when you introduce a dict.</p>",
        zh: "<p>如果列表是 Python 的主力序列类型,那字典就是主力映射类型。dict 把<strong>键映射到值</strong>,查键平均 O(1)(通过哈希)。</p><p>这个 O(1) 查找,就是为什么一加上 dict,很多面试题就能从 O(n²) 降到 O(n)。</p>",
      },
    ),
    teach(
      "d5-create",
      {
        en: "<p>Create and use:</p><pre><code>ages = {\"alice\": 30, \"bob\": 25}\nages[\"alice\"]           # 30\nages[\"carol\"] = 40      # add or update\n\"alice\" in ages         # True (O(1))\ndel ages[\"bob\"]         # remove\nlen(ages)               # 2</code></pre><p>Keys must be hashable — strings, numbers, tuples. Lists can&apos;t be keys.</p>",
        zh: "<p>创建和使用:</p><pre><code>ages = {\"alice\": 30, \"bob\": 25}\nages[\"alice\"]           # 30\nages[\"carol\"] = 40      # 新增或更新\n\"alice\" in ages         # True (O(1))\ndel ages[\"bob\"]         # 删除\nlen(ages)               # 2</code></pre><p>键必须是可哈希的 —— 字符串、数字、元组。列表不能当键。</p>",
      },
    ),
    demo(
      "d5-create-demo",
      { en: "<p>Try it:</p>", zh: "<p>试试:</p>" },
      'ages = {"alice": 30, "bob": 25}\nprint(ages["alice"])\nages["carol"] = 40\nprint(ages)\nprint("alice" in ages)\nprint(len(ages))',
    ),
    teach(
      "d5-keyerror",
      {
        en: "<p>Accessing a missing key with <code>d[k]</code> raises <code>KeyError</code>. Two safer ways:</p><pre><code>age = ages.get(\"dave\")          # None if missing\nage = ages.get(\"dave\", 0)       # 0 if missing (default)\n\nif \"dave\" in ages:\n    age = ages[\"dave\"]</code></pre><p><code>.get(k, default)</code> is incredibly useful for counting patterns.</p>",
        zh: "<p>用 <code>d[k]</code> 访问不存在的键会抛 <code>KeyError</code>。两种更安全的办法:</p><pre><code>age = ages.get(\"dave\")          # 没有就返回 None\nage = ages.get(\"dave\", 0)       # 没有就返回默认值 0\n\nif \"dave\" in ages:\n    age = ages[\"dave\"]</code></pre><p><code>.get(k, default)</code> 在计数类模式里超好用。</p>",
      },
    ),
    quizMC(
      "d5-q-get",
      {
        en: "What does <code>{\"a\": 1}.get(\"b\", 5)</code> return?",
        zh: "<code>{\"a\": 1}.get(\"b\", 5)</code> 返回什么?",
      },
      [
        { en: "<code>1</code>", zh: "<code>1</code>" },
        { en: "<code>5</code>", zh: "<code>5</code>" },
        { en: "<code>None</code>", zh: "<code>None</code>" },
        { en: "Raises <code>KeyError</code>", zh: "抛 <code>KeyError</code>" },
      ],
      1,
      {
        en: "<code>.get(k, default)</code> returns the default when <code>k</code> is missing — no exception.",
        zh: "<code>.get(k, default)</code> 在键不存在时返回默认值 —— 不会抛异常。",
      },
    ),
    teach(
      "d5-iterate",
      {
        en: "<p>Iterating dicts:</p><pre><code>for key in d:                # keys\n    print(key)\n\nfor key, value in d.items():  # both\n    print(key, value)\n\nfor value in d.values():      # values only\n    print(value)</code></pre>",
        zh: "<p>遍历 dict:</p><pre><code>for key in d:                # 只取键\n    print(key)\n\nfor key, value in d.items():  # 键和值\n    print(key, value)\n\nfor value in d.values():      # 只取值\n    print(value)</code></pre>",
      },
    ),
    demo(
      "d5-iterate-demo",
      { en: "<p>Run it:</p>", zh: "<p>跑一下:</p>" },
      'prices = {"apple": 1.0, "banana": 0.5, "cherry": 3.0}\nfor fruit, price in prices.items():\n    print(f"{fruit}: ${price:.2f}")',
    ),
    teach(
      "d5-count",
      {
        en: "<p>The classic <strong>count-occurrences</strong> pattern — fundamental for interviews:</p><pre><code>counts = {}\nfor x in items:\n    counts[x] = counts.get(x, 0) + 1</code></pre><p>Or with <code>collections.Counter</code> (even more Pythonic):</p><pre><code>from collections import Counter\ncounts = Counter(items)</code></pre>",
        zh: "<p>经典的<strong>统计出现次数</strong>模式 —— 面试基本功:</p><pre><code>counts = {}\nfor x in items:\n    counts[x] = counts.get(x, 0) + 1</code></pre><p>或者用 <code>collections.Counter</code>(更 Pythonic):</p><pre><code>from collections import Counter\ncounts = Counter(items)</code></pre>",
      },
    ),
    demo(
      "d5-count-demo",
      { en: "<p>Run both approaches:</p>", zh: "<p>两种写法都跑一下:</p>" },
      'words = ["cat", "dog", "cat", "bird", "dog", "cat"]\n\ncounts = {}\nfor w in words:\n    counts[w] = counts.get(w, 0) + 1\nprint(counts)\n\nfrom collections import Counter\nprint(dict(Counter(words)))',
    ),
    exercise(
      "d5-ex-freq",
      {
        en: "<p>Write <code>word_count(words)</code> that returns a dict mapping each word to how many times it appears.</p>",
        zh: "<p>写一个 <code>word_count(words)</code>,返回一个 dict,把每个单词映射到它出现的次数。</p>",
      },
      "def word_count(words):\n    # your code here\n    pass\n",
      "def word_count(words):\n    counts = {}\n    for w in words:\n        counts[w] = counts.get(w, 0) + 1\n    return counts\n",
      {
        en: "Count-occurrences pattern with <code>.get(w, 0) + 1</code>.",
        zh: "统计次数模式,用 <code>.get(w, 0) + 1</code>。",
      },
      [
        { call: 'word_count(["a", "b", "a"])', expected: { a: 2, b: 1 } },
        { call: "word_count([])", expected: {} },
        { call: 'word_count(["x"])', expected: { x: 1 } },
      ],
      { fnName: "word_count" },
    ),
    checkpoint(
      "d5-cp",
      { en: "Sets time", zh: "轮到 set 了" },
      {
        en: "Dicts map keys to values. Sets just hold keys — no values. Useful for uniqueness and fast membership.",
        zh: "dict 把键映射到值,set 只存键 —— 没有值。用来去重和快速判成员关系。",
      },
    ),
    teach(
      "d5-set",
      {
        en: "<p><strong>Sets</strong> — unordered collections of unique values:</p><pre><code>s = {1, 2, 3}\ns.add(4)\ns.remove(2)\n3 in s            # True (O(1))\nlen(s)            # 3\n\nlist_unique = list(set([1, 2, 2, 3]))   # remove dupes</code></pre><p>Empty set is <code>set()</code> — <code>{}</code> is an empty <em>dict</em>. Easy trap.</p><p>Set operations:</p><pre><code>a | b    # union\na &amp; b    # intersection\na - b    # difference</code></pre>",
        zh: "<p><strong>Set(集合)</strong>—— 无序、元素唯一:</p><pre><code>s = {1, 2, 3}\ns.add(4)\ns.remove(2)\n3 in s            # True (O(1))\nlen(s)            # 3\n\nlist_unique = list(set([1, 2, 2, 3]))   # 去重</code></pre><p>空 set 是 <code>set()</code> —— <code>{}</code> 是空<em>字典</em>。这是个容易踩的坑。</p><p>集合运算:</p><pre><code>a | b    # 并集\na &amp; b    # 交集\na - b    # 差集</code></pre>",
      },
    ),
    demo(
      "d5-set-demo",
      { en: "<p>Run:</p>", zh: "<p>跑一下:</p>" },
      'a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint("union:", a | b)\nprint("intersect:", a & b)\nprint("a - b:", a - b)\n\nnums = [1, 2, 2, 3, 3, 3, 4]\nprint("unique:", sorted(set(nums)))',
    ),
    quizMC(
      "d5-q-emptyset",
      {
        en: "What is the type of <code>{}</code> in Python?",
        zh: "<code>{}</code> 在 Python 里是什么类型?",
      },
      [
        { en: "empty set", zh: "空 set" },
        { en: "empty dict", zh: "空 dict" },
        { en: "empty list", zh: "空 list" },
        { en: "empty tuple", zh: "空 tuple" },
      ],
      1,
      {
        en: "<code>{}</code> is an empty <em>dict</em>. Empty set is <code>set()</code>.",
        zh: "<code>{}</code> 是空<em>字典</em>。空 set 要写 <code>set()</code>。",
      },
    ),
    exercise(
      "d5-ex-dedup",
      {
        en: "<p>Write <code>deduplicate(items)</code> that returns the items in their original order, with duplicates removed (keep only the first occurrence).</p>",
        zh: "<p>写一个 <code>deduplicate(items)</code>,按原顺序返回元素,但去掉重复(只保留第一次出现)。</p>",
      },
      "def deduplicate(items):\n    # your code here\n    pass\n",
      "def deduplicate(items):\n    seen = set()\n    result = []\n    for x in items:\n        if x not in seen:\n            seen.add(x)\n            result.append(x)\n    return result\n",
      {
        en: "Keep a <code>seen</code> set. Iterate. Only append to result when not in <code>seen</code>. Add to <code>seen</code>.",
        zh: "维护一个 <code>seen</code> 集合。遍历时,不在 <code>seen</code> 里才 append 到结果,然后加入 <code>seen</code>。",
      },
      [
        { call: "deduplicate([1, 2, 2, 3, 1, 4])", expected: [1, 2, 3, 4] },
        { call: "deduplicate([])", expected: [] },
        { call: 'deduplicate(["a", "b", "a"])', expected: ["a", "b"] },
      ],
      { fnName: "deduplicate" },
    ),
    exercise(
      "d5-ex-two-sum",
      {
        en: "<p><strong>LeetCode #1 — Two Sum (hash map version).</strong> Given a list and a target, return indices <code>[i, j]</code> of two numbers that add up to the target. Assume exactly one solution. The list is <em>not</em> sorted.</p><p>Solve it in a single pass with a dict.</p>",
        zh: "<p><strong>LeetCode #1 —— Two Sum(哈希表版)。</strong>给定列表和 target,返回两个数的索引 <code>[i, j]</code>,使它们相加等于 target。假设答案唯一。列表<em>没有</em>排序。</p><p>用一个 dict 一遍扫完。</p>",
      },
      "def two_sum(nums, target):\n    # your code here\n    pass\n",
      "def two_sum(nums, target):\n    seen = {}  # value -> index\n    for i, x in enumerate(nums):\n        need = target - x\n        if need in seen:\n            return [seen[need], i]\n        seen[x] = i\n    return [-1, -1]\n",
      {
        en: "For each number, check if <code>target - x</code> has already been seen. If yes, you&apos;ve found the pair. Otherwise record this number&apos;s index and continue.",
        zh: "每见到一个数,查 <code>target - x</code> 是否已经见过。如果见过就找到了这一对。否则把当前数的索引记下,继续往下。",
      },
      [
        { call: "two_sum([2, 7, 11, 15], 9)", expected: [0, 1] },
        { call: "two_sum([3, 2, 4], 6)", expected: [1, 2] },
        { call: "two_sum([3, 3], 6)", expected: [0, 1] },
      ],
      { fnName: "two_sum" },
    ),
    recall(
      "d5-recall",
      {
        en: "Why is the dict version of Two Sum O(n) instead of the O(n²) of nested loops?",
        zh: "为什么 Two Sum 的 dict 版是 O(n),而嵌套循环是 O(n²)?",
      },
      {
        en: "Each iteration does O(1) work: one lookup and one insert into the dict. So the whole algorithm is O(n). Nested loops check every pair, which is O(n²). Trading memory (the dict) for time is the core idea.",
        zh: "每次迭代只做 O(1) 的工作:一次查 dict,一次插 dict,所以总共 O(n)。嵌套循环检查所有配对,O(n²)。核心思想:用空间(dict)换时间。",
      },
    ),
    teach(
      "d5-wrap",
      {
        en: "<p>You now have the O(1) lookup in your toolkit:</p><ul><li>Dict — key → value, <code>.get(k, default)</code>, <code>items()</code>, count pattern</li><li>Set — unique values, fast membership, <code>|</code> <code>&amp;</code> <code>-</code></li><li>Empty set is <code>set()</code>, not <code>{}</code></li></ul>",
        zh: "<p>你的工具箱里多了 O(1) 查找:</p><ul><li>dict —— 键 → 值,<code>.get(k, default)</code>、<code>items()</code>、计数模式</li><li>set —— 唯一值、快速成员判断、<code>|</code> <code>&amp;</code> <code>-</code></li><li>空 set 是 <code>set()</code>,不是 <code>{}</code></li></ul>",
      },
    ),
  ],
  finalTest: [
    quizMC(
      "d5-t-lookup",
      {
        en: "Average-case time complexity of <code>x in d</code> where <code>d</code> is a dict?",
        zh: "<code>d</code> 是 dict 时,<code>x in d</code> 的平均时间复杂度?",
      },
      [
        { en: "O(n)", zh: "O(n)" },
        { en: "O(log n)", zh: "O(log n)" },
        { en: "O(1)", zh: "O(1)" },
        { en: "O(n log n)", zh: "O(n log n)" },
      ],
      2,
      {
        en: "Dict lookups are O(1) on average via hashing.",
        zh: "dict 的查找靠哈希,平均 O(1)。",
      },
    ),
    exercise(
      "d5-t-count-chars",
      {
        en: "<p>Write <code>char_count(s)</code> that returns a dict with each character&apos;s count.</p>",
        zh: "<p>写一个 <code>char_count(s)</code>,返回一个 dict,记录每个字符出现的次数。</p>",
      },
      "def char_count(s):\n    # your code here\n    pass\n",
      "def char_count(s):\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    return counts\n",
      {
        en: "Same count pattern, iterating characters.",
        zh: "同样的计数模式,只是遍历字符。",
      },
      [
        { call: 'char_count("abcba")', expected: { a: 2, b: 2, c: 1 } },
        { call: 'char_count("")', expected: {} },
        { call: 'char_count("x")', expected: { x: 1 } },
      ],
      { fnName: "char_count" },
    ),
    exercise(
      "d5-t-is-anagram",
      {
        en: "<p><strong>LeetCode #242.</strong> Write <code>is_anagram(s, t)</code> — return <code>True</code> if the two strings are anagrams of each other.</p>",
        zh: "<p><strong>LeetCode #242。</strong>写一个 <code>is_anagram(s, t)</code> —— 两个字符串是否互为字母异位词,是则返回 <code>True</code>。</p>",
      },
      "def is_anagram(s, t):\n    # your code here\n    pass\n",
      "def is_anagram(s, t):\n    if len(s) != len(t):\n        return False\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    for ch in t:\n        if ch not in counts or counts[ch] == 0:\n            return False\n        counts[ch] -= 1\n    return True\n",
      {
        en: "Count chars in <code>s</code>. Walk <code>t</code> and decrement. Any missing or overdrawn key means no. A one-liner: <code>return sorted(s) == sorted(t)</code>.",
        zh: "统计 <code>s</code> 里的字符。走一遍 <code>t</code>,每见一个就减 1。发现缺失或减到负数,说明不是。一行写法:<code>return sorted(s) == sorted(t)</code>。",
      },
      [
        { call: 'is_anagram("listen", "silent")', expected: true },
        { call: 'is_anagram("hello", "world")', expected: false },
        { call: 'is_anagram("a", "b")', expected: false },
        { call: 'is_anagram("", "")', expected: true },
      ],
      { fnName: "is_anagram" },
    ),
    quizMC(
      "d5-t-emptyset",
      {
        en: "How do you create an empty <em>set</em>?",
        zh: "怎么创建一个空 <em>set</em>?",
      },
      [
        { en: "<code>{}</code>", zh: "<code>{}</code>" },
        { en: "<code>set()</code>", zh: "<code>set()</code>" },
        { en: "<code>set{}</code>", zh: "<code>set{}</code>" },
        { en: "<code>[]</code>", zh: "<code>[]</code>" },
      ],
      1,
      {
        en: "<code>{}</code> is an empty dict. Use <code>set()</code>.",
        zh: "<code>{}</code> 是空 dict。要用 <code>set()</code>。",
      },
    ),
    exercise(
      "d5-t-intersect",
      {
        en: "<p>Write <code>common(a, b)</code> that returns a sorted list of values that appear in both lists. No duplicates in the result.</p>",
        zh: "<p>写一个 <code>common(a, b)</code>,返回同时出现在两个列表里的值,结果要排好序,且不含重复。</p>",
      },
      "def common(a, b):\n    # your code here\n    pass\n",
      "def common(a, b):\n    return sorted(set(a) & set(b))\n",
      {
        en: "Convert both to sets, take intersection, sort.",
        zh: "两边都转成 set,取交集,排序。",
      },
      [
        { call: "common([1, 2, 3], [2, 3, 4])", expected: [2, 3] },
        { call: "common([1, 1, 2], [1, 2, 2])", expected: [1, 2] },
        { call: "common([1, 2], [3, 4])", expected: [] },
      ],
      { fnName: "common" },
    ),
  ],
};

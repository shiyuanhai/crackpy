import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day05: Day = {
  id: 5,
  title: "Dictionaries and sets",
  subtitle: "Dictionaries (hash maps) and sets are the O(1) lookup kings. Today you&apos;ll use them to crush problems that would otherwise be O(n²).",
  estimatedTime: "55–70 min",
  goals: [
    "Create dictionaries and look up / update values",
    "Use <code>get</code>, <code>in</code>, iteration patterns",
    "Understand that dict and set lookups are O(1) average",
    "Use sets for uniqueness and membership checks",
    "Apply the &quot;count occurrences&quot; pattern",
  ],
  youWillBuild: "Word frequency counter, first-unique-character, and a preview of Two Sum (hash map version).",
  steps: [
    teach(
      "d5-intro",
      "<p>If lists are Python&apos;s primary sequence, dictionaries are its primary map. A dict maps <strong>keys to values</strong>, and looking up a key is O(1) on average (via hashing).</p><p>That O(1) lookup is why so many interview problems collapse from O(n²) to O(n) when you introduce a dict.</p>",
    ),
    teach(
      "d5-create",
      "<p>Create and use:</p><pre><code>ages = {\"alice\": 30, \"bob\": 25}\nages[\"alice\"]           # 30\nages[\"carol\"] = 40      # add or update\n\"alice\" in ages         # True (O(1))\ndel ages[\"bob\"]         # remove\nlen(ages)               # 2</code></pre><p>Keys must be hashable — strings, numbers, tuples. Lists can&apos;t be keys.</p>",
    ),
    demo(
      "d5-create-demo",
      "<p>Try it:</p>",
      'ages = {"alice": 30, "bob": 25}\nprint(ages["alice"])\nages["carol"] = 40\nprint(ages)\nprint("alice" in ages)\nprint(len(ages))',
    ),
    teach(
      "d5-keyerror",
      "<p>Accessing a missing key with <code>d[k]</code> raises <code>KeyError</code>. Two safer ways:</p><pre><code>age = ages.get(\"dave\")          # None if missing\nage = ages.get(\"dave\", 0)       # 0 if missing (default)\n\nif \"dave\" in ages:\n    age = ages[\"dave\"]</code></pre><p><code>.get(k, default)</code> is incredibly useful for counting patterns.</p>",
    ),
    quizMC(
      "d5-q-get",
      "What does <code>{\"a\": 1}.get(\"b\", 5)</code> return?",
      ["<code>1</code>", "<code>5</code>", "<code>None</code>", "Raises <code>KeyError</code>"],
      1,
      "<code>.get(k, default)</code> returns the default when <code>k</code> is missing — no exception.",
    ),
    teach(
      "d5-iterate",
      "<p>Iterating dicts:</p><pre><code>for key in d:                # keys\n    print(key)\n\nfor key, value in d.items():  # both\n    print(key, value)\n\nfor value in d.values():      # values only\n    print(value)</code></pre>",
    ),
    demo(
      "d5-iterate-demo",
      "<p>Run it:</p>",
      'prices = {"apple": 1.0, "banana": 0.5, "cherry": 3.0}\nfor fruit, price in prices.items():\n    print(f"{fruit}: ${price:.2f}")',
    ),
    teach(
      "d5-count",
      "<p>The classic <strong>count-occurrences</strong> pattern — fundamental for interviews:</p><pre><code>counts = {}\nfor x in items:\n    counts[x] = counts.get(x, 0) + 1</code></pre><p>Or with <code>collections.Counter</code> (even more Pythonic):</p><pre><code>from collections import Counter\ncounts = Counter(items)</code></pre>",
    ),
    demo(
      "d5-count-demo",
      "<p>Run both approaches:</p>",
      'words = ["cat", "dog", "cat", "bird", "dog", "cat"]\n\ncounts = {}\nfor w in words:\n    counts[w] = counts.get(w, 0) + 1\nprint(counts)\n\nfrom collections import Counter\nprint(dict(Counter(words)))',
    ),
    exercise(
      "d5-ex-freq",
      "<p>Write <code>word_count(words)</code> that returns a dict mapping each word to how many times it appears.</p>",
      "def word_count(words):\n    # your code here\n    pass\n",
      "def word_count(words):\n    counts = {}\n    for w in words:\n        counts[w] = counts.get(w, 0) + 1\n    return counts\n",
      "Count-occurrences pattern with <code>.get(w, 0) + 1</code>.",
      [
        { call: 'word_count(["a", "b", "a"])', expected: { a: 2, b: 1 } },
        { call: "word_count([])", expected: {} },
        { call: 'word_count(["x"])', expected: { x: 1 } },
      ],
      { fnName: "word_count" },
    ),
    checkpoint(
      "d5-cp",
      "Sets time",
      "Dicts map keys to values. Sets just hold keys — no values. Useful for uniqueness and fast membership.",
    ),
    teach(
      "d5-set",
      "<p><strong>Sets</strong> — unordered collections of unique values:</p><pre><code>s = {1, 2, 3}\ns.add(4)\ns.remove(2)\n3 in s            # True (O(1))\nlen(s)            # 3\n\nlist_unique = list(set([1, 2, 2, 3]))   # remove dupes</code></pre><p>Empty set is <code>set()</code> — <code>{}</code> is an empty <em>dict</em>. Easy trap.</p><p>Set operations:</p><pre><code>a | b    # union\na &amp; b    # intersection\na - b    # difference</code></pre>",
    ),
    demo(
      "d5-set-demo",
      "<p>Run:</p>",
      'a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint("union:", a | b)\nprint("intersect:", a & b)\nprint("a - b:", a - b)\n\nnums = [1, 2, 2, 3, 3, 3, 4]\nprint("unique:", sorted(set(nums)))',
    ),
    quizMC(
      "d5-q-emptyset",
      "What is the type of <code>{}</code> in Python?",
      ["empty set", "empty dict", "empty list", "empty tuple"],
      1,
      "<code>{}</code> is an empty <em>dict</em>. Empty set is <code>set()</code>.",
    ),
    exercise(
      "d5-ex-dedup",
      "<p>Write <code>deduplicate(items)</code> that returns the items in their original order, with duplicates removed (keep only the first occurrence).</p>",
      "def deduplicate(items):\n    # your code here\n    pass\n",
      "def deduplicate(items):\n    seen = set()\n    result = []\n    for x in items:\n        if x not in seen:\n            seen.add(x)\n            result.append(x)\n    return result\n",
      "Keep a <code>seen</code> set. Iterate. Only append to result when not in <code>seen</code>. Add to <code>seen</code>.",
      [
        { call: "deduplicate([1, 2, 2, 3, 1, 4])", expected: [1, 2, 3, 4] },
        { call: "deduplicate([])", expected: [] },
        { call: 'deduplicate(["a", "b", "a"])', expected: ["a", "b"] },
      ],
      { fnName: "deduplicate" },
    ),
    exercise(
      "d5-ex-two-sum",
      "<p><strong>LeetCode #1 — Two Sum (hash map version).</strong> Given a list and a target, return indices <code>[i, j]</code> of two numbers that add up to the target. Assume exactly one solution. The list is <em>not</em> sorted.</p><p>Solve it in a single pass with a dict.</p>",
      "def two_sum(nums, target):\n    # your code here\n    pass\n",
      "def two_sum(nums, target):\n    seen = {}  # value -> index\n    for i, x in enumerate(nums):\n        need = target - x\n        if need in seen:\n            return [seen[need], i]\n        seen[x] = i\n    return [-1, -1]\n",
      "For each number, check if <code>target - x</code> has already been seen. If yes, you&apos;ve found the pair. Otherwise record this number&apos;s index and continue.",
      [
        { call: "two_sum([2, 7, 11, 15], 9)", expected: [0, 1] },
        { call: "two_sum([3, 2, 4], 6)", expected: [1, 2] },
        { call: "two_sum([3, 3], 6)", expected: [0, 1] },
      ],
      { fnName: "two_sum" },
    ),
    recall(
      "d5-recall",
      "Why is the dict version of Two Sum O(n) instead of the O(n²) of nested loops?",
      "Each iteration does O(1) work: one lookup and one insert into the dict. So the whole algorithm is O(n). Nested loops check every pair, which is O(n²). Trading memory (the dict) for time is the core idea.",
    ),
    teach(
      "d5-wrap",
      "<p>You now have the O(1) lookup in your toolkit:</p><ul><li>Dict — key → value, <code>.get(k, default)</code>, <code>items()</code>, count pattern</li><li>Set — unique values, fast membership, <code>|</code> <code>&amp;</code> <code>-</code></li><li>Empty set is <code>set()</code>, not <code>{}</code></li></ul>",
    ),
  ],
  finalTest: [
    quizMC(
      "d5-t-lookup",
      "Average-case time complexity of <code>x in d</code> where <code>d</code> is a dict?",
      ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      2,
      "Dict lookups are O(1) on average via hashing.",
    ),
    exercise(
      "d5-t-count-chars",
      "<p>Write <code>char_count(s)</code> that returns a dict with each character&apos;s count.</p>",
      "def char_count(s):\n    # your code here\n    pass\n",
      "def char_count(s):\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    return counts\n",
      "Same count pattern, iterating characters.",
      [
        { call: 'char_count("abcba")', expected: { a: 2, b: 2, c: 1 } },
        { call: 'char_count("")', expected: {} },
        { call: 'char_count("x")', expected: { x: 1 } },
      ],
      { fnName: "char_count" },
    ),
    exercise(
      "d5-t-is-anagram",
      "<p><strong>LeetCode #242.</strong> Write <code>is_anagram(s, t)</code> — return <code>True</code> if the two strings are anagrams of each other.</p>",
      "def is_anagram(s, t):\n    # your code here\n    pass\n",
      "def is_anagram(s, t):\n    if len(s) != len(t):\n        return False\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    for ch in t:\n        if ch not in counts or counts[ch] == 0:\n            return False\n        counts[ch] -= 1\n    return True\n",
      "Count chars in <code>s</code>. Walk <code>t</code> and decrement. Any missing or overdrawn key means no. A one-liner: <code>return sorted(s) == sorted(t)</code>.",
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
      "How do you create an empty <em>set</em>?",
      ["<code>{}</code>", "<code>set()</code>", "<code>set{}</code>", "<code>[]</code>"],
      1,
      "<code>{}</code> is an empty dict. Use <code>set()</code>.",
    ),
    exercise(
      "d5-t-intersect",
      "<p>Write <code>common(a, b)</code> that returns a sorted list of values that appear in both lists. No duplicates in the result.</p>",
      "def common(a, b):\n    # your code here\n    pass\n",
      "def common(a, b):\n    return sorted(set(a) & set(b))\n",
      "Convert both to sets, take intersection, sort.",
      [
        { call: "common([1, 2, 3], [2, 3, 4])", expected: [2, 3] },
        { call: "common([1, 1, 2], [1, 2, 2])", expected: [1, 2] },
        { call: "common([1, 2], [3, 4])", expected: [] },
      ],
      { fnName: "common" },
    ),
  ],
};

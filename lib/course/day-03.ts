import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day03: Day = {
  id: 3,
  title: "Lists — the workhorse",
  subtitle: "Lists are Python&apos;s primary sequence type. You&apos;ll use them in every interview. Today: indexing, methods, comprehensions.",
  estimatedTime: "60–75 min",
  goals: [
    "Create, index, and slice lists",
    "Use the core methods: <code>append</code>, <code>pop</code>, <code>remove</code>, <code>sort</code>, <code>reverse</code>, <code>index</code>",
    "Read and write list comprehensions confidently",
    "Understand that lists are <strong>mutable</strong> (and what that means for aliasing)",
  ],
  youWillBuild: "List manipulation drills and two small algorithm problems: running sum and filtering.",
  steps: [
    teach(
      "d3-intro",
      "<p>Lists are Python&apos;s <em>default</em> data structure. Interviewer says &quot;array&quot;? You use a list.</p><p>They&apos;re ordered, mutable, and can hold mixed types (though in practice you&apos;ll keep them homogeneous).</p>",
    ),
    teach(
      "d3-create",
      "<p>A few ways to create lists:</p><pre><code>nums = [1, 2, 3]\nempty = []\nmixed = [1, \"two\", 3.0, True]\nrepeated = [0] * 5        # [0, 0, 0, 0, 0]\nfrom_range = list(range(5)) # [0, 1, 2, 3, 4]</code></pre><p>Indexing and slicing work exactly like strings: <code>nums[0]</code>, <code>nums[-1]</code>, <code>nums[1:3]</code>.</p>",
    ),
    demo(
      "d3-create-demo",
      "<p>Try it:</p>",
      "nums = [10, 20, 30, 40, 50]\nprint(nums[0])\nprint(nums[-1])\nprint(nums[1:4])\nprint(len(nums))\nprint([0] * 5)",
    ),
    teach(
      "d3-mutate",
      "<p>Unlike strings, lists are <strong>mutable</strong> — you can change them in place:</p><pre><code>nums = [1, 2, 3]\nnums[0] = 99           # [99, 2, 3]\nnums.append(4)         # [99, 2, 3, 4]\nnums.pop()             # removes and returns 4\nnums.pop(0)            # removes and returns 99\nnums.insert(0, 1)      # insert at index 0\nnums.sort()            # in-place sort\nnums.reverse()         # in-place reverse</code></pre><p>Note: <code>sort()</code> and <code>reverse()</code> return <code>None</code>. They mutate the list and return nothing. A common bug: <code>nums = nums.sort()</code> sets <code>nums</code> to <code>None</code>. Just call <code>nums.sort()</code>.</p>",
    ),
    demo(
      "d3-mutate-demo",
      "<p>Watch the list evolve — run it:</p>",
      'nums = [3, 1, 4, 1, 5, 9, 2, 6]\nprint("start:", nums)\nnums.append(10)\nprint("append:", nums)\npopped = nums.pop()\nprint(f"pop: {popped}, list: {nums}")\nnums.sort()\nprint("sort:", nums)\nnums.reverse()\nprint("reverse:", nums)',
    ),
    quizMC(
      "d3-q-sort",
      "What does <code>x = [3, 1, 2].sort()</code> set <code>x</code> to?",
      ["<code>[1, 2, 3]</code>", "<code>[3, 1, 2]</code>", "<code>None</code>", "<code>[3, 2, 1]</code>"],
      2,
      "<code>.sort()</code> mutates the list in place and returns <code>None</code>. To get a <em>new</em> sorted list without mutating, use <code>sorted(lst)</code>.",
    ),
    teach(
      "d3-sorted",
      "<p>When you need a new sorted list (not in-place), use the built-in <code>sorted()</code>:</p><pre><code>nums = [3, 1, 2]\nsorted_nums = sorted(nums)     # [1, 2, 3], new list\nprint(nums)                    # [3, 1, 2], unchanged\nreversed_sorted = sorted(nums, reverse=True)  # descending</code></pre><p>Remember the distinction: <code>list.sort()</code> is a method (in-place); <code>sorted(list)</code> is a function (returns new).</p>",
    ),
    exercise(
      "d3-ex-secondlargest",
      "<p>Write <code>second_largest(nums)</code> that returns the second-largest <em>distinct</em> value in the list. <code>[5, 3, 5, 1]</code> → <code>3</code> (not 5).</p><p>Assume the list has at least 2 distinct values.</p>",
      "def second_largest(nums):\n    # your code here\n    pass\n",
      "def second_largest(nums):\n    unique = sorted(set(nums), reverse=True)\n    return unique[1]\n",
      "Convert to a <code>set</code> to drop duplicates, then sort descending, then take index 1.",
      [
        { call: "second_largest([5, 3, 5, 1])", expected: 3 },
        { call: "second_largest([1, 2, 3, 4, 5])", expected: 4 },
        { call: "second_largest([10, 10, 10, 5])", expected: 5 },
        { call: "second_largest([-1, -2, -3])", expected: -2 },
      ],
      { fnName: "second_largest" },
    ),
    teach(
      "d3-iterate",
      "<p>Three iteration patterns you&apos;ll use constantly:</p><pre><code># 1. just the values\nfor x in nums:\n    print(x)\n\n# 2. index + value (use this often!)\nfor i, x in enumerate(nums):\n    print(i, x)\n\n# 3. parallel iteration\nfor a, b in zip(list1, list2):\n    print(a, b)</code></pre><p><code>enumerate</code> is a workhorse — whenever you need &quot;index and value,&quot; reach for it instead of <code>range(len(...))</code>.</p>",
    ),
    demo(
      "d3-iterate-demo",
      "<p>Run this:</p>",
      'names = ["alice", "bob", "carol"]\nscores = [90, 85, 95]\nfor i, name in enumerate(names):\n    print(f"{i}: {name}")\nprint("---")\nfor n, s in zip(names, scores):\n    print(f"{n} -> {s}")',
    ),
    exercise(
      "d3-ex-sum",
      "<p>Write <code>my_sum(nums)</code> that returns the sum of the list. Don&apos;t use the built-in <code>sum()</code>.</p>",
      "def my_sum(nums):\n    # your code here\n    pass\n",
      "def my_sum(nums):\n    total = 0\n    for x in nums:\n        total += x\n    return total\n",
      "Initialize <code>total = 0</code>. Loop and add each element. Return <code>total</code>. The pattern: accumulator variable + loop is fundamental.",
      [
        { call: "my_sum([1, 2, 3, 4, 5])", expected: 15 },
        { call: "my_sum([])", expected: 0 },
        { call: "my_sum([-1, 1])", expected: 0 },
        { call: "my_sum([100])", expected: 100 },
      ],
      { fnName: "my_sum" },
    ),
    checkpoint(
      "d3-cp",
      "Now the interview superpower",
      "Up next: list comprehensions. These are Python&apos;s most iconic feature, and fluent comprehensions instantly make code more Pythonic. Take a breath — this is where many people stall, so we&apos;ll go slow.",
    ),
    teach(
      "d3-comp-intro",
      "<p>A <strong>list comprehension</strong> builds a new list from an existing iterable. The structure:</p><pre><code>[expression for item in iterable]</code></pre><p>Example — squares of 0..4:</p><pre><code>squares = [x * x for x in range(5)]\n# [0, 1, 4, 9, 16]</code></pre><p>The same loop-based version would be:</p><pre><code>squares = []\nfor x in range(5):\n    squares.append(x * x)</code></pre><p>Same result. The comprehension is just more compact and idiomatic.</p>",
    ),
    teach(
      "d3-comp-filter",
      "<p>You can add a filter — <code>if</code> at the end:</p><pre><code>[expression for item in iterable if condition]</code></pre><p>Example — even numbers only:</p><pre><code>evens = [x for x in range(10) if x % 2 == 0]\n# [0, 2, 4, 6, 8]</code></pre><p>Example — uppercase only short names:</p><pre><code>short = [n.upper() for n in names if len(n) &lt; 5]</code></pre>",
    ),
    demo(
      "d3-comp-demo",
      "<p>Predict each output, then run:</p>",
      "nums = [1, 2, 3, 4, 5]\nprint([x * 2 for x in nums])\nprint([x for x in nums if x > 2])\nprint([x * x for x in nums if x % 2 == 1])\n\nwords = [\"python\", \"go\", \"rust\", \"c\"]\nprint([w.upper() for w in words if len(w) > 2])",
    ),
    quizMC(
      "d3-q-comp",
      "What does <code>[x * 2 for x in range(4) if x != 2]</code> produce?",
      [
        "<code>[0, 2, 4, 6]</code>",
        "<code>[0, 2, 6]</code>",
        "<code>[0, 2, 4]</code>",
        "<code>[2, 4, 6]</code>",
      ],
      1,
      "<code>range(4)</code> gives 0, 1, 2, 3. We skip 2 (the filter), and double the rest: 0, 2, 6.",
    ),
    exercise(
      "d3-ex-squares",
      "<p>Use a list comprehension. Write <code>squares_of_evens(nums)</code> that returns a list containing the squares of only the even numbers in <code>nums</code>.</p>",
      "def squares_of_evens(nums):\n    # your code here (use a comprehension)\n    pass\n",
      "def squares_of_evens(nums):\n    return [x * x for x in nums if x % 2 == 0]\n",
      "<code>[x * x for x in nums if x % 2 == 0]</code>.",
      [
        { call: "squares_of_evens([1, 2, 3, 4, 5])", expected: [4, 16] },
        { call: "squares_of_evens([1, 3, 5])", expected: [] },
        { call: "squares_of_evens([])", expected: [] },
        { call: "squares_of_evens([2, 4, 6])", expected: [4, 16, 36] },
      ],
      { fnName: "squares_of_evens" },
    ),
    teach(
      "d3-alias",
      "<p><strong>Aliasing trap.</strong> Assigning a list to another variable doesn&apos;t copy it — both names point to the same list:</p><pre><code>a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)   # [1, 2, 3, 4] — a changed too!</code></pre><p>To copy, use <code>b = a.copy()</code> or <code>b = a[:]</code> (slice trick) or <code>b = list(a)</code>.</p><p>This bites people at interviews constantly. Remember it.</p>",
    ),
    demo(
      "d3-alias-demo",
      "<p>See the trap yourself:</p>",
      'a = [1, 2, 3]\nb = a            # alias — same list\nc = a.copy()     # independent copy\nb.append(99)\nc.append(-1)\nprint("a:", a)\nprint("b:", b)\nprint("c:", c)',
    ),
    recall(
      "d3-recall",
      "When you write <code>b = a</code> and <code>a</code> is a list, what exactly happens? Why does appending to <code>b</code> affect <code>a</code>?",
      "The variable <code>b</code> becomes a second name for the same list object — Python variables hold references, not copies. Both <code>a</code> and <code>b</code> point to one list in memory, so mutating through either name is visible through the other.",
    ),
    exercise(
      "d3-ex-running-sum",
      "<p><strong>LeetCode #1480.</strong> Write <code>running_sum(nums)</code> — return a list where <code>result[i]</code> is the sum of <code>nums[0..i]</code>.</p><p><code>[1, 2, 3, 4]</code> → <code>[1, 3, 6, 10]</code>.</p>",
      "def running_sum(nums):\n    # your code here\n    pass\n",
      "def running_sum(nums):\n    result = []\n    total = 0\n    for x in nums:\n        total += x\n        result.append(total)\n    return result\n",
      "Keep a running total. For each element, add it to the total and append the total to the result list.",
      [
        { call: "running_sum([1, 2, 3, 4])", expected: [1, 3, 6, 10] },
        { call: "running_sum([])", expected: [] },
        { call: "running_sum([5])", expected: [5] },
        { call: "running_sum([-1, 1, -1, 1])", expected: [-1, 0, -1, 0] },
      ],
      { fnName: "running_sum" },
    ),
    teach(
      "d3-wrap",
      "<p>Day 3 recap:</p><ul><li>Lists are mutable, ordered, <code>nums[i]</code>, <code>nums[-1]</code>, <code>nums[a:b]</code></li><li><code>append</code>, <code>pop</code>, <code>insert</code>, <code>sort</code>, <code>reverse</code>, <code>index</code></li><li><code>sorted(lst)</code> returns a new list; <code>lst.sort()</code> mutates</li><li>Comprehensions: <code>[expr for x in iter if cond]</code></li><li>Aliasing: <code>b = a</code> does <em>not</em> copy</li></ul>",
    ),
  ],
  finalTest: [
    quizMC(
      "d3-t-meth",
      "What does <code>[1, 2, 3].pop(0)</code> return?",
      ["<code>[2, 3]</code>", "<code>1</code>", "<code>3</code>", "<code>None</code>"],
      1,
      "<code>pop(0)</code> removes and returns the element at index 0, which is <code>1</code>. The list is then <code>[2, 3]</code>.",
    ),
    exercise(
      "d3-t-avg",
      "<p>Write <code>average(nums)</code> — return the average as a float. Assume the list is non-empty.</p>",
      "def average(nums):\n    # your code here\n    pass\n",
      "def average(nums):\n    return sum(nums) / len(nums)\n",
      "Sum divided by count — use <code>sum()</code> and <code>len()</code>.",
      [
        { call: "average([1, 2, 3, 4])", expected: 2.5 },
        { call: "average([10])", expected: 10 },
        { call: "average([5, 5, 5, 5])", expected: 5 },
      ],
      { fnName: "average" },
    ),
    exercise(
      "d3-t-filter-pos",
      "<p>Using a list comprehension, write <code>positives(nums)</code> that returns only the strictly positive numbers (greater than 0).</p>",
      "def positives(nums):\n    # your code here (comprehension)\n    pass\n",
      "def positives(nums):\n    return [x for x in nums if x > 0]\n",
      "<code>[x for x in nums if x &gt; 0]</code>.",
      [
        { call: "positives([-2, -1, 0, 1, 2])", expected: [1, 2] },
        { call: "positives([0, 0, 0])", expected: [] },
        { call: "positives([1, 2, 3])", expected: [1, 2, 3] },
      ],
      { fnName: "positives" },
    ),
    quizMC(
      "d3-t-alias",
      "After <code>a = [1, 2]; b = a; b.append(3)</code>, what is <code>a</code>?",
      ["<code>[1, 2]</code>", "<code>[1, 2, 3]</code>", "<code>[3, 1, 2]</code>", "<code>None</code>"],
      1,
      "<code>b = a</code> aliases; they share the same list. <code>b.append(3)</code> mutates that list, visible through <code>a</code> too.",
    ),
    exercise(
      "d3-t-max-diff",
      "<p>Write <code>max_diff(nums)</code> that returns the difference between the largest and smallest values. For <code>[3, 1, 9, 4]</code>, return <code>8</code> (9 − 1). Assume at least 1 element.</p>",
      "def max_diff(nums):\n    # your code here\n    pass\n",
      "def max_diff(nums):\n    return max(nums) - min(nums)\n",
      "<code>max(nums) - min(nums)</code>. Built-ins <code>max</code> and <code>min</code> work on any iterable.",
      [
        { call: "max_diff([3, 1, 9, 4])", expected: 8 },
        { call: "max_diff([5])", expected: 0 },
        { call: "max_diff([-5, 5])", expected: 10 },
      ],
      { fnName: "max_diff" },
    ),
  ],
};

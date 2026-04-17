import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day03: Day = {
  id: 3,
  title: { en: "Lists — the workhorse", zh: "列表 —— 主力军" },
  subtitle: {
    en: "Lists are Python&apos;s primary sequence type. You&apos;ll use them in every interview. Today: indexing, methods, comprehensions.",
    zh: "列表是 Python 的主力序列类型,每场面试都会用。今天讲:索引、方法、列表推导式。",
  },
  estimatedTime: { en: "60–75 min", zh: "60–75 分钟" },
  goals: [
    { en: "Create, index, and slice lists", zh: "创建、索引、切片列表" },
    {
      en: "Use the core methods: <code>append</code>, <code>pop</code>, <code>remove</code>, <code>sort</code>, <code>reverse</code>, <code>index</code>",
      zh: "熟练使用核心方法:<code>append</code>、<code>pop</code>、<code>remove</code>、<code>sort</code>、<code>reverse</code>、<code>index</code>",
    },
    {
      en: "Read and write list comprehensions confidently",
      zh: "自如地读写列表推导式",
    },
    {
      en: "Understand that lists are <strong>mutable</strong> (and what that means for aliasing)",
      zh: "理解列表是<strong>可变</strong>的(以及这对「别名」意味着什么)",
    },
  ],
  youWillBuild: {
    en: "List manipulation drills and two small algorithm problems: running sum and filtering.",
    zh: "列表操作练习,加两道小算法题:累计和、过滤。",
  },
  steps: [
    teach(
      "d3-intro",
      {
        en: "<p>Lists are Python&apos;s <em>default</em> data structure. Interviewer says &quot;array&quot;? You use a list.</p><p>They&apos;re ordered, mutable, and can hold mixed types (though in practice you&apos;ll keep them homogeneous).</p>",
        zh: "<p>列表是 Python 的<em>默认</em>数据结构。面试官说「数组」?你就用列表。</p><p>它们有序、可变,可以装不同类型的元素(虽然实际中一般只装同一种类型)。</p>",
      },
    ),
    teach(
      "d3-create",
      {
        en: "<p>A few ways to create lists:</p><pre><code>nums = [1, 2, 3]\nempty = []\nmixed = [1, \"two\", 3.0, True]\nrepeated = [0] * 5        # [0, 0, 0, 0, 0]\nfrom_range = list(range(5)) # [0, 1, 2, 3, 4]</code></pre><p>Indexing and slicing work exactly like strings: <code>nums[0]</code>, <code>nums[-1]</code>, <code>nums[1:3]</code>.</p>",
        zh: "<p>创建列表的几种方式:</p><pre><code>nums = [1, 2, 3]\nempty = []\nmixed = [1, \"two\", 3.0, True]\nrepeated = [0] * 5        # [0, 0, 0, 0, 0]\nfrom_range = list(range(5)) # [0, 1, 2, 3, 4]</code></pre><p>索引和切片跟字符串完全一样:<code>nums[0]</code>、<code>nums[-1]</code>、<code>nums[1:3]</code>。</p>",
      },
    ),
    demo(
      "d3-create-demo",
      { en: "<p>Try it:</p>", zh: "<p>试试:</p>" },
      "nums = [10, 20, 30, 40, 50]\nprint(nums[0])\nprint(nums[-1])\nprint(nums[1:4])\nprint(len(nums))\nprint([0] * 5)",
    ),
    teach(
      "d3-mutate",
      {
        en: "<p>Unlike strings, lists are <strong>mutable</strong> — you can change them in place:</p><pre><code>nums = [1, 2, 3]\nnums[0] = 99           # [99, 2, 3]\nnums.append(4)         # [99, 2, 3, 4]\nnums.pop()             # removes and returns 4\nnums.pop(0)            # removes and returns 99\nnums.insert(0, 1)      # insert at index 0\nnums.sort()            # in-place sort\nnums.reverse()         # in-place reverse</code></pre><p>Note: <code>sort()</code> and <code>reverse()</code> return <code>None</code>. They mutate the list and return nothing. A common bug: <code>nums = nums.sort()</code> sets <code>nums</code> to <code>None</code>. Just call <code>nums.sort()</code>.</p>",
        zh: "<p>不像字符串,列表是<strong>可变</strong>的 —— 你可以原地修改:</p><pre><code>nums = [1, 2, 3]\nnums[0] = 99           # [99, 2, 3]\nnums.append(4)         # [99, 2, 3, 4]\nnums.pop()             # 弹出并返回 4\nnums.pop(0)            # 弹出并返回 99\nnums.insert(0, 1)      # 在索引 0 处插入\nnums.sort()            # 原地排序\nnums.reverse()         # 原地反转</code></pre><p>注意:<code>sort()</code> 和 <code>reverse()</code> 返回 <code>None</code>。它们修改列表但不返回任何东西。常见 bug:<code>nums = nums.sort()</code> 会把 <code>nums</code> 设成 <code>None</code>。直接写 <code>nums.sort()</code> 就行。</p>",
      },
    ),
    demo(
      "d3-mutate-demo",
      {
        en: "<p>Watch the list evolve — run it:</p>",
        zh: "<p>跑一下,看列表怎么变化:</p>",
      },
      'nums = [3, 1, 4, 1, 5, 9, 2, 6]\nprint("start:", nums)\nnums.append(10)\nprint("append:", nums)\npopped = nums.pop()\nprint(f"pop: {popped}, list: {nums}")\nnums.sort()\nprint("sort:", nums)\nnums.reverse()\nprint("reverse:", nums)',
    ),
    quizMC(
      "d3-q-sort",
      {
        en: "What does <code>x = [3, 1, 2].sort()</code> set <code>x</code> to?",
        zh: "<code>x = [3, 1, 2].sort()</code> 之后 <code>x</code> 是什么?",
      },
      [
        { en: "<code>[1, 2, 3]</code>", zh: "<code>[1, 2, 3]</code>" },
        { en: "<code>[3, 1, 2]</code>", zh: "<code>[3, 1, 2]</code>" },
        { en: "<code>None</code>", zh: "<code>None</code>" },
        { en: "<code>[3, 2, 1]</code>", zh: "<code>[3, 2, 1]</code>" },
      ],
      2,
      {
        en: "<code>.sort()</code> mutates the list in place and returns <code>None</code>. To get a <em>new</em> sorted list without mutating, use <code>sorted(lst)</code>.",
        zh: "<code>.sort()</code> 原地修改列表,返回 <code>None</code>。想得到一个<em>新的</em>排序后列表而不修改原列表,用 <code>sorted(lst)</code>。",
      },
    ),
    teach(
      "d3-sorted",
      {
        en: "<p>When you need a new sorted list (not in-place), use the built-in <code>sorted()</code>:</p><pre><code>nums = [3, 1, 2]\nsorted_nums = sorted(nums)     # [1, 2, 3], new list\nprint(nums)                    # [3, 1, 2], unchanged\nreversed_sorted = sorted(nums, reverse=True)  # descending</code></pre><p>Remember the distinction: <code>list.sort()</code> is a method (in-place); <code>sorted(list)</code> is a function (returns new).</p>",
        zh: "<p>需要得到排序后的新列表(不改原列表),用内置 <code>sorted()</code>:</p><pre><code>nums = [3, 1, 2]\nsorted_nums = sorted(nums)     # [1, 2, 3],新列表\nprint(nums)                    # [3, 1, 2],没变\nreversed_sorted = sorted(nums, reverse=True)  # 降序</code></pre><p>记住区别:<code>list.sort()</code> 是方法(原地修改);<code>sorted(list)</code> 是函数(返回新列表)。</p>",
      },
    ),
    exercise(
      "d3-ex-secondlargest",
      {
        en: "<p>Write <code>second_largest(nums)</code> that returns the second-largest <em>distinct</em> value in the list. <code>[5, 3, 5, 1]</code> → <code>3</code> (not 5).</p><p>Assume the list has at least 2 distinct values.</p>",
        zh: "<p>写一个 <code>second_largest(nums)</code>,返回列表里<em>不同值</em>中第二大的。<code>[5, 3, 5, 1]</code> → <code>3</code>(不是 5)。</p><p>假设列表至少有 2 个不同的值。</p>",
      },
      "def second_largest(nums):\n    # your code here\n    pass\n",
      "def second_largest(nums):\n    unique = sorted(set(nums), reverse=True)\n    return unique[1]\n",
      {
        en: "Convert to a <code>set</code> to drop duplicates, then sort descending, then take index 1.",
        zh: "先转成 <code>set</code> 去重,再降序排序,取索引 1。",
      },
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
      {
        en: "<p>Three iteration patterns you&apos;ll use constantly:</p><pre><code># 1. just the values\nfor x in nums:\n    print(x)\n\n# 2. index + value (use this often!)\nfor i, x in enumerate(nums):\n    print(i, x)\n\n# 3. parallel iteration\nfor a, b in zip(list1, list2):\n    print(a, b)</code></pre><p><code>enumerate</code> is a workhorse — whenever you need &quot;index and value,&quot; reach for it instead of <code>range(len(...))</code>.</p>",
        zh: "<p>三个你会反复用到的遍历模式:</p><pre><code># 1. 只取值\nfor x in nums:\n    print(x)\n\n# 2. 索引 + 值(经常用!)\nfor i, x in enumerate(nums):\n    print(i, x)\n\n# 3. 并行遍历\nfor a, b in zip(list1, list2):\n    print(a, b)</code></pre><p><code>enumerate</code> 是主力 —— 需要「索引和值」时,直接用它,不要写 <code>range(len(...))</code>。</p>",
      },
    ),
    demo(
      "d3-iterate-demo",
      { en: "<p>Run this:</p>", zh: "<p>跑一下:</p>" },
      'names = ["alice", "bob", "carol"]\nscores = [90, 85, 95]\nfor i, name in enumerate(names):\n    print(f"{i}: {name}")\nprint("---")\nfor n, s in zip(names, scores):\n    print(f"{n} -> {s}")',
    ),
    exercise(
      "d3-ex-sum",
      {
        en: "<p>Write <code>my_sum(nums)</code> that returns the sum of the list. Don&apos;t use the built-in <code>sum()</code>.</p>",
        zh: "<p>写一个 <code>my_sum(nums)</code>,返回列表元素之和。不能用内置 <code>sum()</code>。</p>",
      },
      "def my_sum(nums):\n    # your code here\n    pass\n",
      "def my_sum(nums):\n    total = 0\n    for x in nums:\n        total += x\n    return total\n",
      {
        en: "Initialize <code>total = 0</code>. Loop and add each element. Return <code>total</code>. The pattern: accumulator variable + loop is fundamental.",
        zh: "初始化 <code>total = 0</code>,循环加上每个元素,返回 <code>total</code>。这个「累加变量 + 循环」的模式是根本。",
      },
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
      { en: "Now the interview superpower", zh: "下面是面试大杀器" },
      {
        en: "Up next: list comprehensions. These are Python&apos;s most iconic feature, and fluent comprehensions instantly make code more Pythonic. Take a breath — this is where many people stall, so we&apos;ll go slow.",
        zh: "接下来是列表推导式 —— Python 最具标志性的特性,写得顺会让代码立刻更 Pythonic。深呼吸 —— 很多人在这里卡住,我们慢慢来。",
      },
    ),
    teach(
      "d3-comp-intro",
      {
        en: "<p>A <strong>list comprehension</strong> builds a new list from an existing iterable. The structure:</p><pre><code>[expression for item in iterable]</code></pre><p>Example — squares of 0..4:</p><pre><code>squares = [x * x for x in range(5)]\n# [0, 1, 4, 9, 16]</code></pre><p>The same loop-based version would be:</p><pre><code>squares = []\nfor x in range(5):\n    squares.append(x * x)</code></pre><p>Same result. The comprehension is just more compact and idiomatic.</p>",
        zh: "<p><strong>列表推导式(list comprehension)</strong>从一个已有的可迭代对象构造一个新列表。结构:</p><pre><code>[expression for item in iterable]</code></pre><p>例 —— 0..4 的平方:</p><pre><code>squares = [x * x for x in range(5)]\n# [0, 1, 4, 9, 16]</code></pre><p>用普通循环写是这样:</p><pre><code>squares = []\nfor x in range(5):\n    squares.append(x * x)</code></pre><p>结果一样。推导式只是更紧凑、更地道。</p>",
      },
    ),
    teach(
      "d3-comp-filter",
      {
        en: "<p>You can add a filter — <code>if</code> at the end:</p><pre><code>[expression for item in iterable if condition]</code></pre><p>Example — even numbers only:</p><pre><code>evens = [x for x in range(10) if x % 2 == 0]\n# [0, 2, 4, 6, 8]</code></pre><p>Example — uppercase only short names:</p><pre><code>short = [n.upper() for n in names if len(n) &lt; 5]</code></pre>",
        zh: "<p>可以加过滤条件 —— 末尾跟一个 <code>if</code>:</p><pre><code>[expression for item in iterable if condition]</code></pre><p>例 —— 只保留偶数:</p><pre><code>evens = [x for x in range(10) if x % 2 == 0]\n# [0, 2, 4, 6, 8]</code></pre><p>例 —— 只把短名字转大写:</p><pre><code>short = [n.upper() for n in names if len(n) &lt; 5]</code></pre>",
      },
    ),
    demo(
      "d3-comp-demo",
      {
        en: "<p>Predict each output, then run:</p>",
        zh: "<p>先猜每个输出,然后再跑:</p>",
      },
      "nums = [1, 2, 3, 4, 5]\nprint([x * 2 for x in nums])\nprint([x for x in nums if x > 2])\nprint([x * x for x in nums if x % 2 == 1])\n\nwords = [\"python\", \"go\", \"rust\", \"c\"]\nprint([w.upper() for w in words if len(w) > 2])",
    ),
    quizMC(
      "d3-q-comp",
      {
        en: "What does <code>[x * 2 for x in range(4) if x != 2]</code> produce?",
        zh: "<code>[x * 2 for x in range(4) if x != 2]</code> 得到什么?",
      },
      [
        { en: "<code>[0, 2, 4, 6]</code>", zh: "<code>[0, 2, 4, 6]</code>" },
        { en: "<code>[0, 2, 6]</code>", zh: "<code>[0, 2, 6]</code>" },
        { en: "<code>[0, 2, 4]</code>", zh: "<code>[0, 2, 4]</code>" },
        { en: "<code>[2, 4, 6]</code>", zh: "<code>[2, 4, 6]</code>" },
      ],
      1,
      {
        en: "<code>range(4)</code> gives 0, 1, 2, 3. We skip 2 (the filter), and double the rest: 0, 2, 6.",
        zh: "<code>range(4)</code> 是 0、1、2、3。过滤掉 2,其它翻倍:0、2、6。",
      },
    ),
    exercise(
      "d3-ex-squares",
      {
        en: "<p>Use a list comprehension. Write <code>squares_of_evens(nums)</code> that returns a list containing the squares of only the even numbers in <code>nums</code>.</p>",
        zh: "<p>用列表推导式。写一个 <code>squares_of_evens(nums)</code>,返回 <code>nums</code> 里所有偶数的平方。</p>",
      },
      "def squares_of_evens(nums):\n    # your code here (use a comprehension)\n    pass\n",
      "def squares_of_evens(nums):\n    return [x * x for x in nums if x % 2 == 0]\n",
      {
        en: "<code>[x * x for x in nums if x % 2 == 0]</code>.",
        zh: "<code>[x * x for x in nums if x % 2 == 0]</code>。",
      },
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
      {
        en: "<p><strong>Aliasing trap.</strong> Assigning a list to another variable doesn&apos;t copy it — both names point to the same list:</p><pre><code>a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)   # [1, 2, 3, 4] — a changed too!</code></pre><p>To copy, use <code>b = a.copy()</code> or <code>b = a[:]</code> (slice trick) or <code>b = list(a)</code>.</p><p>This bites people at interviews constantly. Remember it.</p>",
        zh: "<p><strong>别名陷阱。</strong>把列表赋给另一个变量并<em>不是</em>复制 —— 两个名字指向同一个列表:</p><pre><code>a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)   # [1, 2, 3, 4] —— a 也变了!</code></pre><p>要复制,用 <code>b = a.copy()</code>、<code>b = a[:]</code>(切片技巧)或 <code>b = list(a)</code>。</p><p>这事儿在面试里经常坑人,要牢记。</p>",
      },
    ),
    demo(
      "d3-alias-demo",
      { en: "<p>See the trap yourself:</p>", zh: "<p>亲眼看看这个陷阱:</p>" },
      'a = [1, 2, 3]\nb = a            # 别名 —— 同一个列表\nc = a.copy()     # 独立副本\nb.append(99)\nc.append(-1)\nprint("a:", a)\nprint("b:", b)\nprint("c:", c)',
    ),
    recall(
      "d3-recall",
      {
        en: "When you write <code>b = a</code> and <code>a</code> is a list, what exactly happens? Why does appending to <code>b</code> affect <code>a</code>?",
        zh: "当你写 <code>b = a</code> 且 <code>a</code> 是列表时,到底发生了什么?为什么 append 到 <code>b</code> 会影响 <code>a</code>?",
      },
      {
        en: "The variable <code>b</code> becomes a second name for the same list object — Python variables hold references, not copies. Both <code>a</code> and <code>b</code> point to one list in memory, so mutating through either name is visible through the other.",
        zh: "<code>b</code> 变成了同一个列表对象的另一个名字 —— Python 变量存的是引用,不是副本。<code>a</code> 和 <code>b</code> 指向内存里同一个列表,通过任何一个名字修改,另一个都能看到。",
      },
    ),
    exercise(
      "d3-ex-running-sum",
      {
        en: "<p><strong>LeetCode #1480.</strong> Write <code>running_sum(nums)</code> — return a list where <code>result[i]</code> is the sum of <code>nums[0..i]</code>.</p><p><code>[1, 2, 3, 4]</code> → <code>[1, 3, 6, 10]</code>.</p>",
        zh: "<p><strong>LeetCode #1480。</strong>写一个 <code>running_sum(nums)</code> —— 返回一个列表,使 <code>result[i]</code> 等于 <code>nums[0..i]</code> 的和。</p><p><code>[1, 2, 3, 4]</code> → <code>[1, 3, 6, 10]</code>。</p>",
      },
      "def running_sum(nums):\n    # your code here\n    pass\n",
      "def running_sum(nums):\n    result = []\n    total = 0\n    for x in nums:\n        total += x\n        result.append(total)\n    return result\n",
      {
        en: "Keep a running total. For each element, add it to the total and append the total to the result list.",
        zh: "维护一个累计总和。对每个元素,加到总和里,再把总和 append 到结果列表。",
      },
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
      {
        en: "<p>Day 3 recap:</p><ul><li>Lists are mutable, ordered, <code>nums[i]</code>, <code>nums[-1]</code>, <code>nums[a:b]</code></li><li><code>append</code>, <code>pop</code>, <code>insert</code>, <code>sort</code>, <code>reverse</code>, <code>index</code></li><li><code>sorted(lst)</code> returns a new list; <code>lst.sort()</code> mutates</li><li>Comprehensions: <code>[expr for x in iter if cond]</code></li><li>Aliasing: <code>b = a</code> does <em>not</em> copy</li></ul>",
        zh: "<p>第 3 天小结:</p><ul><li>列表可变、有序,<code>nums[i]</code>、<code>nums[-1]</code>、<code>nums[a:b]</code></li><li><code>append</code>、<code>pop</code>、<code>insert</code>、<code>sort</code>、<code>reverse</code>、<code>index</code></li><li><code>sorted(lst)</code> 返回新列表;<code>lst.sort()</code> 原地修改</li><li>推导式:<code>[expr for x in iter if cond]</code></li><li>别名:<code>b = a</code> <em>不会</em>复制</li></ul>",
      },
    ),
  ],
  finalTest: [
    quizMC(
      "d3-t-meth",
      {
        en: "What does <code>[1, 2, 3].pop(0)</code> return?",
        zh: "<code>[1, 2, 3].pop(0)</code> 返回什么?",
      },
      [
        { en: "<code>[2, 3]</code>", zh: "<code>[2, 3]</code>" },
        { en: "<code>1</code>", zh: "<code>1</code>" },
        { en: "<code>3</code>", zh: "<code>3</code>" },
        { en: "<code>None</code>", zh: "<code>None</code>" },
      ],
      1,
      {
        en: "<code>pop(0)</code> removes and returns the element at index 0, which is <code>1</code>. The list is then <code>[2, 3]</code>.",
        zh: "<code>pop(0)</code> 弹出并返回索引 0 的元素,也就是 <code>1</code>。列表变成 <code>[2, 3]</code>。",
      },
    ),
    exercise(
      "d3-t-avg",
      {
        en: "<p>Write <code>average(nums)</code> — return the average as a float. Assume the list is non-empty.</p>",
        zh: "<p>写一个 <code>average(nums)</code> —— 返回平均值(浮点数)。假设列表非空。</p>",
      },
      "def average(nums):\n    # your code here\n    pass\n",
      "def average(nums):\n    return sum(nums) / len(nums)\n",
      {
        en: "Sum divided by count — use <code>sum()</code> and <code>len()</code>.",
        zh: "总和除以数量 —— 用 <code>sum()</code> 和 <code>len()</code>。",
      },
      [
        { call: "average([1, 2, 3, 4])", expected: 2.5 },
        { call: "average([10])", expected: 10 },
        { call: "average([5, 5, 5, 5])", expected: 5 },
      ],
      { fnName: "average" },
    ),
    exercise(
      "d3-t-filter-pos",
      {
        en: "<p>Using a list comprehension, write <code>positives(nums)</code> that returns only the strictly positive numbers (greater than 0).</p>",
        zh: "<p>用列表推导式,写一个 <code>positives(nums)</code>,只返回严格正数(大于 0 的数)。</p>",
      },
      "def positives(nums):\n    # your code here (comprehension)\n    pass\n",
      "def positives(nums):\n    return [x for x in nums if x > 0]\n",
      {
        en: "<code>[x for x in nums if x &gt; 0]</code>.",
        zh: "<code>[x for x in nums if x &gt; 0]</code>。",
      },
      [
        { call: "positives([-2, -1, 0, 1, 2])", expected: [1, 2] },
        { call: "positives([0, 0, 0])", expected: [] },
        { call: "positives([1, 2, 3])", expected: [1, 2, 3] },
      ],
      { fnName: "positives" },
    ),
    quizMC(
      "d3-t-alias",
      {
        en: "After <code>a = [1, 2]; b = a; b.append(3)</code>, what is <code>a</code>?",
        zh: "执行 <code>a = [1, 2]; b = a; b.append(3)</code> 后,<code>a</code> 是什么?",
      },
      [
        { en: "<code>[1, 2]</code>", zh: "<code>[1, 2]</code>" },
        { en: "<code>[1, 2, 3]</code>", zh: "<code>[1, 2, 3]</code>" },
        { en: "<code>[3, 1, 2]</code>", zh: "<code>[3, 1, 2]</code>" },
        { en: "<code>None</code>", zh: "<code>None</code>" },
      ],
      1,
      {
        en: "<code>b = a</code> aliases; they share the same list. <code>b.append(3)</code> mutates that list, visible through <code>a</code> too.",
        zh: "<code>b = a</code> 是别名,两者共享同一个列表。<code>b.append(3)</code> 修改了这个列表,<code>a</code> 也能看到。",
      },
    ),
    exercise(
      "d3-t-max-diff",
      {
        en: "<p>Write <code>max_diff(nums)</code> that returns the difference between the largest and smallest values. For <code>[3, 1, 9, 4]</code>, return <code>8</code> (9 − 1). Assume at least 1 element.</p>",
        zh: "<p>写一个 <code>max_diff(nums)</code>,返回最大值与最小值之差。对 <code>[3, 1, 9, 4]</code>,返回 <code>8</code>(9 − 1)。假设至少有 1 个元素。</p>",
      },
      "def max_diff(nums):\n    # your code here\n    pass\n",
      "def max_diff(nums):\n    return max(nums) - min(nums)\n",
      {
        en: "<code>max(nums) - min(nums)</code>. Built-ins <code>max</code> and <code>min</code> work on any iterable.",
        zh: "<code>max(nums) - min(nums)</code>。内置 <code>max</code> 和 <code>min</code> 对任何可迭代对象都能用。",
      },
      [
        { call: "max_diff([3, 1, 9, 4])", expected: 8 },
        { call: "max_diff([5])", expected: 0 },
        { call: "max_diff([-5, 5])", expected: 10 },
      ],
      { fnName: "max_diff" },
    ),
  ],
};

import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day09: Day = {
  id: 9,
  title: {
    en: "Stacks and queues",
    zh: "栈和队列",
  },
  subtitle: {
    en: "Two fundamental structures that show up anywhere there&apos;s nesting, matching, or order-sensitive processing.",
    zh: "两种最基础的结构,凡是有嵌套、匹配或顺序敏感的处理,就离不开它们。",
  },
  estimatedTime: {
    en: "55–65 min",
    zh: "55–65 分钟",
  },
  goals: [
    {
      en: "Use a list as a stack (LIFO)",
      zh: "把 list 当作栈用(LIFO)",
    },
    {
      en: "Use <code>collections.deque</code> as a queue (FIFO)",
      zh: "用 <code>collections.deque</code> 当队列(FIFO)",
    },
    {
      en: "Recognize stack-friendly problems (balanced parens, next-greater)",
      zh: "认出该用栈的题(括号匹配、下一个更大元素)",
    },
    {
      en: "Recognize queue-friendly problems (BFS, windowing)",
      zh: "认出该用队列的题(BFS、滑窗)",
    },
  ],
  youWillBuild: {
    en: "Valid parentheses checker, daily temperatures (monotonic stack), and a reversal using a stack.",
    zh: "括号是否合法判断、每日温度(单调栈)、用栈翻转。",
  },
  steps: [
    teach(
      "d9-intro",
      {
        en: "<p>A stack is LIFO — last in, first out. Think: pile of plates.</p><p>A queue is FIFO — first in, first out. Think: line at the coffee shop.</p><p>In Python you can use a <code>list</code> as a stack with <code>append</code> and <code>pop</code>. For a queue, use <code>collections.deque</code> — <code>list.pop(0)</code> is O(n), <code>deque.popleft()</code> is O(1).</p>",
        zh: "<p>栈是 LIFO —— 后进先出,想象一摞盘子。</p><p>队列是 FIFO —— 先进先出,想象咖啡店排队。</p><p>Python 里直接拿 <code>list</code> 当栈就行,<code>append</code> 入栈、<code>pop</code> 出栈。队列用 <code>collections.deque</code>,因为 <code>list.pop(0)</code> 是 O(n),而 <code>deque.popleft()</code> 是 O(1)。</p>",
      },
    ),
    teach(
      "d9-stack",
      {
        en: "<p>Stack in Python = list:</p><pre><code>stack = []\nstack.append(1)    # push\nstack.append(2)\nstack.append(3)\ntop = stack[-1]    # peek\nx = stack.pop()    # pop (returns 3)\nlen(stack)         # 2</code></pre>",
        zh: "<p>Python 里的栈 = list:</p><pre><code>stack = []\nstack.append(1)    # 入栈\nstack.append(2)\nstack.append(3)\ntop = stack[-1]    # 看栈顶\nx = stack.pop()    # 出栈(拿到 3)\nlen(stack)         # 2</code></pre>",
      },
    ),
    demo(
      "d9-stack-demo",
      {
        en: "<p>Try it:</p>",
        zh: "<p>跑一下试试:</p>",
      },
      'stack = []\nfor ch in "abc":\n    stack.append(ch)\nprint("stack:", stack)\nwhile stack:\n    print("pop:", stack.pop())',
    ),
    exercise(
      "d9-ex-valid-parens",
      {
        en: "<p><strong>LeetCode #20 — Valid Parentheses.</strong> Given a string containing only <code>()</code> <code>[]</code> <code>{}</code>, return <code>True</code> if brackets are balanced and correctly nested.</p>",
        zh: "<p><strong>LeetCode #20 —— 有效的括号。</strong>字符串只含 <code>()</code> <code>[]</code> <code>{}</code>,括号匹配且嵌套正确就返回 <code>True</code>。</p>",
      },
      "def valid_parens(s):\n    # your code here\n    pass\n",
      'def valid_parens(s):\n    pairs = {")": "(", "]": "[", "}": "{"}\n    stack = []\n    for ch in s:\n        if ch in "([{":\n            stack.append(ch)\n        else:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack\n',
      {
        en: "Push opening brackets. On closing, pop and check it matches. At the end the stack must be empty.",
        zh: "左括号入栈。遇到右括号就出栈并检查是否配对。最后栈必须是空的。",
      },
      [
        { call: 'valid_parens("()")', expected: true },
        { call: 'valid_parens("()[]{}")', expected: true },
        { call: 'valid_parens("(]")', expected: false },
        { call: 'valid_parens("([)]")', expected: false },
        { call: 'valid_parens("{[]}")', expected: true },
        { call: 'valid_parens("")', expected: true },
      ],
      { fnName: "valid_parens" },
    ),
    teach(
      "d9-queue",
      {
        en: "<p>Queue — use <code>deque</code>:</p><pre><code>from collections import deque\nq = deque()\nq.append(1)         # enqueue\nq.append(2)\nq.append(3)\nfirst = q.popleft() # dequeue (O(1))\n\nq.appendleft(0)     # also supports front-push</code></pre><p><code>deque</code> supports O(1) on both ends — useful for sliding window or deque-specific problems too.</p>",
        zh: "<p>队列 —— 用 <code>deque</code>:</p><pre><code>from collections import deque\nq = deque()\nq.append(1)         # 入队\nq.append(2)\nq.append(3)\nfirst = q.popleft() # 出队(O(1))\n\nq.appendleft(0)     # 也能从左边插</code></pre><p><code>deque</code> 两端都是 O(1),对滑动窗口这类题也很好用。</p>",
      },
    ),
    demo(
      "d9-queue-demo",
      {
        en: "<p>FIFO in action:</p>",
        zh: "<p>FIFO 实操:</p>",
      },
      "from collections import deque\nq = deque([\"a\", \"b\", \"c\"])\nwhile q:\n    print(q.popleft())",
    ),
    checkpoint(
      "d9-cp",
      {
        en: "Monotonic stack — the interview favorite",
        zh: "单调栈 —— 面试常客",
      },
      {
        en: "A monotonic stack keeps elements in increasing or decreasing order. It solves &quot;next greater&quot; / &quot;daily temperatures&quot; style problems in O(n).",
        zh: "单调栈保持元素单调递增或递减。「下一个更大元素」、「每日温度」这类题它能 O(n) 搞定。",
      },
    ),
    teach(
      "d9-mono",
      {
        en: "<p><strong>Monotonic stack.</strong> Template for &quot;next greater element to the right&quot;:</p><pre><code>stack = []   # holds indices\nresult = [0] * len(nums)\nfor i, x in enumerate(nums):\n    while stack and nums[stack[-1]] &lt; x:\n        idx = stack.pop()\n        result[idx] = i - idx     # or whatever answer\n    stack.append(i)\nreturn result</code></pre><p>Each index is pushed and popped once → O(n).</p>",
        zh: "<p><strong>单调栈。</strong>「右边下一个更大元素」的模板:</p><pre><code>stack = []   # 存下标\nresult = [0] * len(nums)\nfor i, x in enumerate(nums):\n    while stack and nums[stack[-1]] &lt; x:\n        idx = stack.pop()\n        result[idx] = i - idx     # 或其他你要的答案\n    stack.append(i)\nreturn result</code></pre><p>每个下标最多进栈出栈各一次 → O(n)。</p>",
      },
    ),
    exercise(
      "d9-ex-daily-temps",
      {
        en: "<p><strong>LeetCode #739 — Daily Temperatures.</strong> Given a list of daily temperatures, return a list where <code>result[i]</code> is the number of days until a warmer temperature, or <code>0</code> if there is none.</p>",
        zh: "<p><strong>LeetCode #739 —— 每日温度。</strong>给一组每日温度,返回一个列表,<code>result[i]</code> 是再过几天会变暖,没有就 <code>0</code>。</p>",
      },
      "def daily_temperatures(temps):\n    # your code here\n    pass\n",
      "def daily_temperatures(temps):\n    result = [0] * len(temps)\n    stack = []  # indices with no warmer day yet\n    for i, t in enumerate(temps):\n        while stack and temps[stack[-1]] < t:\n            idx = stack.pop()\n            result[idx] = i - idx\n        stack.append(i)\n    return result\n",
      {
        en: "Monotonic-decreasing stack of indices. When today beats an old index, that index&apos;s answer is <code>i - idx</code>; pop it.",
        zh: "用单调递减的下标栈。今天的温度比栈顶那一天高,那一天的答案就是 <code>i - idx</code>,把它弹出去。",
      },
      [
        {
          call: "daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])",
          expected: [1, 1, 4, 2, 1, 1, 0, 0],
        },
        { call: "daily_temperatures([30, 40, 50, 60])", expected: [1, 1, 1, 0] },
        { call: "daily_temperatures([30, 60, 90])", expected: [1, 1, 0] },
        { call: "daily_temperatures([90, 80, 70])", expected: [0, 0, 0] },
      ],
      { fnName: "daily_temperatures" },
    ),
    quizMC(
      "d9-q-list-popleft",
      {
        en: "Why is <code>list.pop(0)</code> bad for a queue?",
        zh: "为什么 <code>list.pop(0)</code> 不适合当队列用?",
      },
      [
        {
          en: "It raises an error on an empty list",
          zh: "空列表会抛异常",
        },
        {
          en: "It removes from the wrong end",
          zh: "弹错了一端",
        },
        {
          en: "It&apos;s O(n) because it shifts all remaining elements",
          zh: "它是 O(n),因为要把后面的元素都往前挪",
        },
        {
          en: "It&apos;s the right tool for a queue",
          zh: "它其实就是队列的正确用法",
        },
      ],
      2,
      {
        en: "<code>list.pop(0)</code> has to shift every element left — O(n). Use <code>deque.popleft()</code> for O(1).",
        zh: "<code>list.pop(0)</code> 得把所有元素左移 —— O(n)。用 <code>deque.popleft()</code> 才是 O(1)。",
      },
    ),
    recall(
      "d9-recall",
      {
        en: "&quot;Valid parentheses&quot; is a classic stack problem. What&apos;s the general property of a problem that says &quot;use a stack&quot;?",
        zh: "「有效括号」是经典栈题。一道题有什么特征就该想到用栈?",
      },
      {
        en: "Stacks fit problems with <em>nesting</em> or <em>matching</em> — where the most recent thing needs to be handled first. Balanced brackets, function call chains, undo stacks, expression evaluation.",
        zh: "凡是带<em>嵌套</em>或<em>匹配</em>的题,用栈最合适 —— 最近进来的先处理。括号匹配、函数调用链、撤销栈、表达式求值都是。",
      },
    ),
    teach(
      "d9-wrap",
      {
        en: "<p>Today:</p><ul><li>Stack via list: <code>append</code>/<code>pop</code></li><li>Queue via <code>deque</code>: <code>append</code>/<code>popleft</code></li><li>Monotonic stack for &quot;next greater&quot; style problems</li></ul>",
        zh: "<p>今天的收获:</p><ul><li>用 list 做栈:<code>append</code>/<code>pop</code></li><li>用 <code>deque</code> 做队列:<code>append</code>/<code>popleft</code></li><li>单调栈搞定「下一个更大」类题目</li></ul>",
      },
    ),
  ],
  finalTest: [
    exercise(
      "d9-t-reverse-stack",
      {
        en: "<p>Write <code>reverse_with_stack(lst)</code> that returns the list reversed, using a stack. (Don&apos;t use <code>[::-1]</code>.)</p>",
        zh: "<p>写一个 <code>reverse_with_stack(lst)</code>,用栈把列表反转。(别用 <code>[::-1]</code>。)</p>",
      },
      "def reverse_with_stack(lst):\n    # your code here\n    pass\n",
      "def reverse_with_stack(lst):\n    stack = []\n    for x in lst:\n        stack.append(x)\n    result = []\n    while stack:\n        result.append(stack.pop())\n    return result\n",
      {
        en: "Push everything. Pop everything into a new list. LIFO → reversed.",
        zh: "全部压栈,再一个个弹出到新列表。LIFO 自然就反过来了。",
      },
      [
        { call: "reverse_with_stack([1, 2, 3])", expected: [3, 2, 1] },
        { call: "reverse_with_stack([])", expected: [] },
        { call: "reverse_with_stack([1])", expected: [1] },
      ],
      { fnName: "reverse_with_stack" },
    ),
    quizMC(
      "d9-t-deque",
      {
        en: "Which operation is O(1) on a <code>deque</code> but O(n) on a <code>list</code>?",
        zh: "哪个操作在 <code>deque</code> 上是 O(1),在 <code>list</code> 上却是 O(n)?",
      },
      [
        {
          en: "<code>append(x)</code>",
          zh: "<code>append(x)</code>",
        },
        {
          en: "<code>pop()</code>",
          zh: "<code>pop()</code>",
        },
        {
          en: "<code>popleft()</code> / <code>pop(0)</code>",
          zh: "<code>popleft()</code> / <code>pop(0)</code>",
        },
        {
          en: "Indexing",
          zh: "按下标访问",
        },
      ],
      2,
      {
        en: "Both support append/pop at the right in O(1). Only deque has O(1) popleft.",
        zh: "右端的 append/pop 两者都是 O(1)。但只有 deque 的 popleft 是 O(1)。",
      },
    ),
    exercise(
      "d9-t-eval-rpn",
      {
        en: "<p><strong>LeetCode #150 — Evaluate RPN.</strong> Given a list of tokens in Reverse Polish Notation (numbers and the operators <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>), return the result. Integer division truncates toward zero.</p><p>Example: <code>[&quot;2&quot;, &quot;1&quot;, &quot;+&quot;, &quot;3&quot;, &quot;*&quot;]</code> → <code>(2 + 1) * 3 = 9</code>.</p>",
        zh: "<p><strong>LeetCode #150 —— 逆波兰表达式求值。</strong>给一串逆波兰表示法的 token(数字和运算符 <code>+</code>、<code>-</code>、<code>*</code>、<code>/</code>),返回结果。整数除法向零截断。</p><p>例子:<code>[&quot;2&quot;, &quot;1&quot;, &quot;+&quot;, &quot;3&quot;, &quot;*&quot;]</code> → <code>(2 + 1) * 3 = 9</code>。</p>",
      },
      "def eval_rpn(tokens):\n    # your code here\n    pass\n",
      'def eval_rpn(tokens):\n    stack = []\n    for t in tokens:\n        if t in ("+", "-", "*", "/"):\n            b = stack.pop()\n            a = stack.pop()\n            if t == "+":\n                stack.append(a + b)\n            elif t == "-":\n                stack.append(a - b)\n            elif t == "*":\n                stack.append(a * b)\n            else:\n                stack.append(int(a / b))  # truncate toward zero\n        else:\n            stack.append(int(t))\n    return stack[0]\n',
      {
        en: "Push numbers. On an operator, pop two (right one first), compute, push result. Use <code>int(a / b)</code> for truncation toward zero.",
        zh: "数字入栈。遇到运算符弹出两个(先弹出来的是右操作数),算完把结果压回去。向零截断用 <code>int(a / b)</code>。",
      },
      [
        { call: 'eval_rpn(["2", "1", "+", "3", "*"])', expected: 9 },
        { call: 'eval_rpn(["4", "13", "5", "/", "+"])', expected: 6 },
        { call: 'eval_rpn(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])', expected: 22 },
      ],
      { fnName: "eval_rpn" },
    ),
    quizMC(
      "d9-t-mono",
      {
        en: "A monotonic stack is useful for which problem type?",
        zh: "单调栈擅长解决哪类问题?",
      },
      [
        {
          en: "Reversing a list",
          zh: "反转列表",
        },
        {
          en: "Finding the next greater element for each position",
          zh: "找每个位置的下一个更大元素",
        },
        {
          en: "Checking if a string is a palindrome",
          zh: "判断回文字符串",
        },
        {
          en: "Counting unique values",
          zh: "统计不重复的值",
        },
      ],
      1,
      {
        en: "Monotonic stacks shine on &quot;next greater / smaller&quot;, &quot;stock span&quot;, &quot;largest rectangle in histogram&quot;, etc.",
        zh: "「下一个更大/更小」、「股票跨度」、「柱状图最大矩形」这类题,单调栈最闪光。",
      },
    ),
  ],
};

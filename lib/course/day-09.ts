import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day09: Day = {
  id: 9,
  title: "Stacks and queues",
  subtitle: "Two fundamental structures that show up anywhere there&apos;s nesting, matching, or order-sensitive processing.",
  estimatedTime: "55–65 min",
  goals: [
    "Use a list as a stack (LIFO)",
    "Use <code>collections.deque</code> as a queue (FIFO)",
    "Recognize stack-friendly problems (balanced parens, next-greater)",
    "Recognize queue-friendly problems (BFS, windowing)",
  ],
  youWillBuild: "Valid parentheses checker, daily temperatures (monotonic stack), and a reversal using a stack.",
  steps: [
    teach(
      "d9-intro",
      "<p>A stack is LIFO — last in, first out. Think: pile of plates.</p><p>A queue is FIFO — first in, first out. Think: line at the coffee shop.</p><p>In Python you can use a <code>list</code> as a stack with <code>append</code> and <code>pop</code>. For a queue, use <code>collections.deque</code> — <code>list.pop(0)</code> is O(n), <code>deque.popleft()</code> is O(1).</p>",
    ),
    teach(
      "d9-stack",
      "<p>Stack in Python = list:</p><pre><code>stack = []\nstack.append(1)    # push\nstack.append(2)\nstack.append(3)\ntop = stack[-1]    # peek\nx = stack.pop()    # pop (returns 3)\nlen(stack)         # 2</code></pre>",
    ),
    demo(
      "d9-stack-demo",
      "<p>Try it:</p>",
      'stack = []\nfor ch in "abc":\n    stack.append(ch)\nprint("stack:", stack)\nwhile stack:\n    print("pop:", stack.pop())',
    ),
    exercise(
      "d9-ex-valid-parens",
      "<p><strong>LeetCode #20 — Valid Parentheses.</strong> Given a string containing only <code>()</code> <code>[]</code> <code>{}</code>, return <code>True</code> if brackets are balanced and correctly nested.</p>",
      "def valid_parens(s):\n    # your code here\n    pass\n",
      'def valid_parens(s):\n    pairs = {")": "(", "]": "[", "}": "{"}\n    stack = []\n    for ch in s:\n        if ch in "([{":\n            stack.append(ch)\n        else:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack\n',
      "Push opening brackets. On closing, pop and check it matches. At the end the stack must be empty.",
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
      "<p>Queue — use <code>deque</code>:</p><pre><code>from collections import deque\nq = deque()\nq.append(1)         # enqueue\nq.append(2)\nq.append(3)\nfirst = q.popleft() # dequeue (O(1))\n\nq.appendleft(0)     # also supports front-push</code></pre><p><code>deque</code> supports O(1) on both ends — useful for sliding window or deque-specific problems too.</p>",
    ),
    demo(
      "d9-queue-demo",
      "<p>FIFO in action:</p>",
      "from collections import deque\nq = deque([\"a\", \"b\", \"c\"])\nwhile q:\n    print(q.popleft())",
    ),
    checkpoint(
      "d9-cp",
      "Monotonic stack — the interview favorite",
      "A monotonic stack keeps elements in increasing or decreasing order. It solves &quot;next greater&quot; / &quot;daily temperatures&quot; style problems in O(n).",
    ),
    teach(
      "d9-mono",
      "<p><strong>Monotonic stack.</strong> Template for &quot;next greater element to the right&quot;:</p><pre><code>stack = []   # holds indices\nresult = [0] * len(nums)\nfor i, x in enumerate(nums):\n    while stack and nums[stack[-1]] &lt; x:\n        idx = stack.pop()\n        result[idx] = i - idx     # or whatever answer\n    stack.append(i)\nreturn result</code></pre><p>Each index is pushed and popped once → O(n).</p>",
    ),
    exercise(
      "d9-ex-daily-temps",
      "<p><strong>LeetCode #739 — Daily Temperatures.</strong> Given a list of daily temperatures, return a list where <code>result[i]</code> is the number of days until a warmer temperature, or <code>0</code> if there is none.</p>",
      "def daily_temperatures(temps):\n    # your code here\n    pass\n",
      "def daily_temperatures(temps):\n    result = [0] * len(temps)\n    stack = []  # indices with no warmer day yet\n    for i, t in enumerate(temps):\n        while stack and temps[stack[-1]] < t:\n            idx = stack.pop()\n            result[idx] = i - idx\n        stack.append(i)\n    return result\n",
      "Monotonic-decreasing stack of indices. When today beats an old index, that index&apos;s answer is <code>i - idx</code>; pop it.",
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
      "Why is <code>list.pop(0)</code> bad for a queue?",
      [
        "It raises an error on an empty list",
        "It removes from the wrong end",
        "It&apos;s O(n) because it shifts all remaining elements",
        "It&apos;s the right tool for a queue",
      ],
      2,
      "<code>list.pop(0)</code> has to shift every element left — O(n). Use <code>deque.popleft()</code> for O(1).",
    ),
    recall(
      "d9-recall",
      "&quot;Valid parentheses&quot; is a classic stack problem. What&apos;s the general property of a problem that says &quot;use a stack&quot;?",
      "Stacks fit problems with <em>nesting</em> or <em>matching</em> — where the most recent thing needs to be handled first. Balanced brackets, function call chains, undo stacks, expression evaluation.",
    ),
    teach(
      "d9-wrap",
      "<p>Today:</p><ul><li>Stack via list: <code>append</code>/<code>pop</code></li><li>Queue via <code>deque</code>: <code>append</code>/<code>popleft</code></li><li>Monotonic stack for &quot;next greater&quot; style problems</li></ul>",
    ),
  ],
  finalTest: [
    exercise(
      "d9-t-reverse-stack",
      "<p>Write <code>reverse_with_stack(lst)</code> that returns the list reversed, using a stack. (Don&apos;t use <code>[::-1]</code>.)</p>",
      "def reverse_with_stack(lst):\n    # your code here\n    pass\n",
      "def reverse_with_stack(lst):\n    stack = []\n    for x in lst:\n        stack.append(x)\n    result = []\n    while stack:\n        result.append(stack.pop())\n    return result\n",
      "Push everything. Pop everything into a new list. LIFO → reversed.",
      [
        { call: "reverse_with_stack([1, 2, 3])", expected: [3, 2, 1] },
        { call: "reverse_with_stack([])", expected: [] },
        { call: "reverse_with_stack([1])", expected: [1] },
      ],
      { fnName: "reverse_with_stack" },
    ),
    quizMC(
      "d9-t-deque",
      "Which operation is O(1) on a <code>deque</code> but O(n) on a <code>list</code>?",
      [
        "<code>append(x)</code>",
        "<code>pop()</code>",
        "<code>popleft()</code> / <code>pop(0)</code>",
        "Indexing",
      ],
      2,
      "Both support append/pop at the right in O(1). Only deque has O(1) popleft.",
    ),
    exercise(
      "d9-t-eval-rpn",
      "<p><strong>LeetCode #150 — Evaluate RPN.</strong> Given a list of tokens in Reverse Polish Notation (numbers and the operators <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>), return the result. Integer division truncates toward zero.</p><p>Example: <code>[&quot;2&quot;, &quot;1&quot;, &quot;+&quot;, &quot;3&quot;, &quot;*&quot;]</code> → <code>(2 + 1) * 3 = 9</code>.</p>",
      "def eval_rpn(tokens):\n    # your code here\n    pass\n",
      'def eval_rpn(tokens):\n    stack = []\n    for t in tokens:\n        if t in ("+", "-", "*", "/"):\n            b = stack.pop()\n            a = stack.pop()\n            if t == "+":\n                stack.append(a + b)\n            elif t == "-":\n                stack.append(a - b)\n            elif t == "*":\n                stack.append(a * b)\n            else:\n                stack.append(int(a / b))  # truncate toward zero\n        else:\n            stack.append(int(t))\n    return stack[0]\n',
      "Push numbers. On an operator, pop two (right one first), compute, push result. Use <code>int(a / b)</code> for truncation toward zero.",
      [
        { call: 'eval_rpn(["2", "1", "+", "3", "*"])', expected: 9 },
        { call: 'eval_rpn(["4", "13", "5", "/", "+"])', expected: 6 },
        { call: 'eval_rpn(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])', expected: 22 },
      ],
      { fnName: "eval_rpn" },
    ),
    quizMC(
      "d9-t-mono",
      "A monotonic stack is useful for which problem type?",
      [
        "Reversing a list",
        "Finding the next greater element for each position",
        "Checking if a string is a palindrome",
        "Counting unique values",
      ],
      1,
      "Monotonic stacks shine on &quot;next greater / smaller&quot;, &quot;stock span&quot;, &quot;largest rectangle in histogram&quot;, etc.",
    ),
  ],
};

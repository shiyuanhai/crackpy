import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day06: Day = {
  id: 6,
  title: "Functions and scope",
  subtitle: "Define clean functions, use default and keyword arguments, understand <code>return</code> vs <code>print</code>, and the scope rules that trip people up.",
  estimatedTime: "45–55 min",
  goals: [
    "Define functions with positional, default, and keyword arguments",
    "Distinguish <code>return</code> from <code>print</code>",
    "Understand local vs. global scope",
    "Use <code>*args</code> and <code>**kwargs</code> at a basic level",
  ],
  youWillBuild: "A few reusable helpers and a mini puzzle about default argument gotchas.",
  steps: [
    teach(
      "d6-intro",
      "<p>You&apos;ve written functions on every previous day. Today we go under the hood: how arguments work, scope rules, and one notorious Python trap.</p>",
    ),
    teach(
      "d6-args",
      "<p>Functions support positional and keyword arguments, and you can give defaults:</p><pre><code>def greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"\n\ngreet(\"Ada\")                          # \"Hello, Ada!\"\ngreet(\"Ada\", \"Hi\")                    # \"Hi, Ada!\"\ngreet(\"Ada\", greeting=\"Welcome\")      # keyword arg\ngreet(greeting=\"Hi\", name=\"Ada\")      # order doesn&apos;t matter with keywords</code></pre>",
    ),
    demo(
      "d6-args-demo",
      "<p>Try varying the calls:</p>",
      'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Ada"))\nprint(greet("Ada", "Hi"))\nprint(greet(greeting="Welcome", name="Ada"))',
    ),
    teach(
      "d6-return-vs-print",
      "<p><strong>Return vs print.</strong> Beginners often confuse these, especially on tests.</p><ul><li><code>print</code> writes to the screen. Returns <code>None</code>.</li><li><code>return</code> sends a value back to the caller.</li></ul><p>If a function uses <code>print(answer)</code> instead of <code>return answer</code>, the caller can&apos;t do anything with it — and the grader sees <code>None</code>.</p>",
    ),
    quizMC(
      "d6-q-return",
      "What does <code>foo</code> contain after <code>foo = bar()</code>, if <code>bar</code> uses <code>print</code> but not <code>return</code>?",
      ["The printed value", "An empty string", "<code>None</code>", "<code>0</code>"],
      2,
      "A function with no <code>return</code> implicitly returns <code>None</code>. Printing doesn&apos;t count.",
    ),
    exercise(
      "d6-ex-clamp",
      "<p>Write <code>clamp(x, lo=0, hi=100)</code> that returns <code>x</code> restricted to the range <code>[lo, hi]</code>. Default to 0 and 100.</p>",
      "def clamp(x, lo=0, hi=100):\n    # your code here\n    pass\n",
      "def clamp(x, lo=0, hi=100):\n    if x < lo:\n        return lo\n    if x > hi:\n        return hi\n    return x\n",
      "If below lo, return lo. If above hi, return hi. Else x.",
      [
        { call: "clamp(50)", expected: 50 },
        { call: "clamp(-10)", expected: 0 },
        { call: "clamp(200)", expected: 100 },
        { call: "clamp(5, lo=10, hi=20)", expected: 10 },
        { call: "clamp(25, lo=10, hi=20)", expected: 20 },
      ],
      { fnName: "clamp" },
    ),
    teach(
      "d6-scope",
      "<p><strong>Scope.</strong> A variable defined inside a function is <em>local</em> — invisible outside it.</p><pre><code>def f():\n    x = 10\nf()\nprint(x)   # NameError — x is not defined here</code></pre><p>Inside a function, you can <em>read</em> outer variables, but assigning creates a new local. If you truly need to modify a module-level variable, use <code>global</code> — but that&apos;s usually a code smell; prefer returning a value.</p>",
    ),
    demo(
      "d6-scope-demo",
      "<p>See the boundaries:</p>",
      'message = "outer"\n\ndef show():\n    print("inside:", message)   # reading outer is fine\n\ndef change():\n    message = "inner"            # creates a local, outer unchanged\n    print("during:", message)\n\nshow()\nchange()\nprint("after:", message)',
    ),
    checkpoint(
      "d6-cp",
      "Mutable default trap incoming",
      "This next lesson is one of the most-asked Python interview questions. Pay attention — it catches even experienced engineers.",
    ),
    teach(
      "d6-default-trap",
      "<p><strong>Never use a mutable object as a default argument:</strong></p><pre><code>def add_item(item, bag=[]):   # DANGEROUS\n    bag.append(item)\n    return bag\n\nadd_item(\"a\")   # [\"a\"]\nadd_item(\"b\")   # [\"a\", \"b\"] — wait, what?!</code></pre><p>The default list is created <em>once</em> when the function is defined — not on each call. All callers share it.</p><p>The fix:</p><pre><code>def add_item(item, bag=None):\n    if bag is None:\n        bag = []\n    bag.append(item)\n    return bag</code></pre>",
    ),
    demo(
      "d6-default-demo",
      "<p>Watch the bug happen:</p>",
      'def add_item(item, bag=[]):\n    bag.append(item)\n    return bag\n\nprint(add_item("a"))\nprint(add_item("b"))   # should be ["b"] but isn&apos;t!\nprint(add_item("c"))',
    ),
    quizMC(
      "d6-q-default",
      "Why is <code>def f(x=[])</code> considered a trap?",
      [
        "Python doesn&apos;t allow lists as defaults",
        "The default list is shared across calls — mutating it persists",
        "It makes the function slower",
        "It shadows built-in names",
      ],
      1,
      "Defaults are evaluated once at function definition time, not per call. For mutable defaults this creates cross-call state.",
    ),
    teach(
      "d6-varargs",
      "<p><code>*args</code> and <code>**kwargs</code> capture extra arguments:</p><pre><code>def total(*nums):\n    return sum(nums)\n\ntotal(1, 2, 3)   # 6\n\ndef info(**fields):\n    for k, v in fields.items():\n        print(k, v)\n\ninfo(name=\"Ada\", age=37)</code></pre><p><code>*args</code> collects positional args into a tuple; <code>**kwargs</code> collects keyword args into a dict.</p>",
    ),
    exercise(
      "d6-ex-count-if",
      "<p>Write <code>count_if(nums, pred)</code> where <code>pred</code> is a function taking one argument and returning a bool. Return how many elements of <code>nums</code> satisfy <code>pred</code>. (Functions as arguments — a Python essential.)</p>",
      "def count_if(nums, pred):\n    # your code here\n    pass\n",
      "def count_if(nums, pred):\n    count = 0\n    for x in nums:\n        if pred(x):\n            count += 1\n    return count\n",
      "Accumulator, guarded by <code>pred(x)</code>. Functions are just values in Python — you can pass them around.",
      [
        { call: "count_if([1, 2, 3, 4], lambda x: x > 2)", expected: 2 },
        { call: "count_if([1, 2, 3, 4], lambda x: x % 2 == 0)", expected: 2 },
        { call: "count_if([], lambda x: True)", expected: 0 },
      ],
      { fnName: "count_if" },
    ),
    recall(
      "d6-recall",
      "What&apos;s the difference between <code>return</code> and <code>print</code>, and why does it matter in tests like this app?",
      "<code>print</code> displays output on screen but the function implicitly returns <code>None</code>. <code>return</code> hands a value back to the caller. Tests check the returned value — printing instead of returning fails the test even if the output &quot;looks right&quot;.",
    ),
    teach(
      "d6-wrap",
      "<p>Recap:</p><ul><li>Positional, default, keyword arguments</li><li><code>return</code> ≠ <code>print</code></li><li>Mutable defaults are a trap — use <code>None</code> sentinel</li><li>Local scope; functions shadow outer names on assignment</li><li><code>*args</code>, <code>**kwargs</code>, and passing functions as values</li></ul>",
    ),
  ],
  finalTest: [
    exercise(
      "d6-t-power",
      "<p>Write <code>power(base, exp=2)</code> that returns <code>base ** exp</code>, defaulting to a square.</p>",
      "def power(base, exp=2):\n    # your code here\n    pass\n",
      "def power(base, exp=2):\n    return base ** exp\n",
      "Just <code>base ** exp</code>.",
      [
        { call: "power(3)", expected: 9 },
        { call: "power(3, 3)", expected: 27 },
        { call: "power(2, exp=10)", expected: 1024 },
        { call: "power(5, 0)", expected: 1 },
      ],
      { fnName: "power" },
    ),
    quizMC(
      "d6-t-scope",
      "After <code>x = 5; def f(): x = 10; f(); print(x)</code>, what prints?",
      ["<code>5</code>", "<code>10</code>", "Error", "<code>None</code>"],
      0,
      "<code>x = 10</code> inside <code>f</code> creates a <em>local</em> <code>x</code>, leaving the outer <code>x = 5</code> unchanged.",
    ),
    exercise(
      "d6-t-apply",
      "<p>Write <code>apply_all(fn, items)</code> that returns a list where <code>fn</code> has been applied to each item.</p>",
      "def apply_all(fn, items):\n    # your code here\n    pass\n",
      "def apply_all(fn, items):\n    return [fn(x) for x in items]\n",
      "List comprehension: <code>[fn(x) for x in items]</code>. Equivalent to <code>list(map(fn, items))</code>.",
      [
        { call: "apply_all(lambda x: x * 2, [1, 2, 3])", expected: [2, 4, 6] },
        { call: "apply_all(str, [1, 2])", expected: ["1", "2"] },
        { call: "apply_all(lambda x: x, [])", expected: [] },
      ],
      { fnName: "apply_all" },
    ),
    quizMC(
      "d6-t-default",
      "Which default is <em>safe</em>?",
      ["<code>def f(x=[])</code>", "<code>def f(x={})</code>", "<code>def f(x=None)</code>", "<code>def f(x=set())</code>"],
      2,
      "Only the immutable/None options are safe. <code>None</code> is the standard sentinel.",
    ),
    exercise(
      "d6-t-max-by",
      "<p>Write <code>max_by(items, key)</code> that returns the item in <code>items</code> with the highest <code>key(item)</code>. Assume non-empty.</p>",
      "def max_by(items, key):\n    # your code here\n    pass\n",
      "def max_by(items, key):\n    best = items[0]\n    best_k = key(best)\n    for x in items[1:]:\n        k = key(x)\n        if k > best_k:\n            best = x\n            best_k = k\n    return best\n",
      "Track best-so-far and its key. Note Python&apos;s built-in <code>max</code> accepts a <code>key=</code> argument — same idea.",
      [
        { call: 'max_by(["a", "bbb", "cc"], len)', expected: "bbb" },
        { call: "max_by([-1, -5, -3], lambda x: -x)", expected: -5 },
      ],
      { fnName: "max_by" },
    ),
  ],
};

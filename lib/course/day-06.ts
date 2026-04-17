import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day06: Day = {
  id: 6,
  title: { en: "Functions and scope", zh: "函数与作用域" },
  subtitle: {
    en: "Define clean functions, use default and keyword arguments, understand <code>return</code> vs <code>print</code>, and the scope rules that trip people up.",
    zh: "定义清爽的函数,用默认参数和关键字参数,搞清 <code>return</code> 和 <code>print</code> 的区别,看懂最容易踩坑的作用域规则。",
  },
  estimatedTime: { en: "45–55 min", zh: "45–55 分钟" },
  goals: [
    {
      en: "Define functions with positional, default, and keyword arguments",
      zh: "用位置参数、默认参数、关键字参数定义函数",
    },
    {
      en: "Distinguish <code>return</code> from <code>print</code>",
      zh: "区分 <code>return</code> 和 <code>print</code>",
    },
    {
      en: "Understand local vs. global scope",
      zh: "理解局部作用域和全局作用域",
    },
    {
      en: "Use <code>*args</code> and <code>**kwargs</code> at a basic level",
      zh: "会基本使用 <code>*args</code> 和 <code>**kwargs</code>",
    },
  ],
  youWillBuild: {
    en: "A few reusable helpers and a mini puzzle about default argument gotchas.",
    zh: "几个能重用的小工具函数,还有一个关于默认参数陷阱的小谜题。",
  },
  steps: [
    teach(
      "d6-intro",
      {
        en: "<p>You&apos;ve written functions on every previous day. Today we go under the hood: how arguments work, scope rules, and one notorious Python trap.</p>",
        zh: "<p>之前每一天你都写过函数。今天要掀开盖子看看:参数是怎么工作的、作用域规则、以及 Python 里那个臭名昭著的陷阱。</p>",
      },
    ),
    teach(
      "d6-args",
      {
        en: "<p>Functions support positional and keyword arguments, and you can give defaults:</p><pre><code>def greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"\n\ngreet(\"Ada\")                          # \"Hello, Ada!\"\ngreet(\"Ada\", \"Hi\")                    # \"Hi, Ada!\"\ngreet(\"Ada\", greeting=\"Welcome\")      # keyword arg\ngreet(greeting=\"Hi\", name=\"Ada\")      # order doesn&apos;t matter with keywords</code></pre>",
        zh: "<p>函数支持位置参数和关键字参数,还可以设默认值:</p><pre><code>def greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"\n\ngreet(\"Ada\")                          # \"Hello, Ada!\"\ngreet(\"Ada\", \"Hi\")                    # \"Hi, Ada!\"\ngreet(\"Ada\", greeting=\"Welcome\")      # 关键字参数\ngreet(greeting=\"Hi\", name=\"Ada\")      # 用关键字时顺序无所谓</code></pre>",
      },
    ),
    demo(
      "d6-args-demo",
      { en: "<p>Try varying the calls:</p>", zh: "<p>换不同的调用方式试试:</p>" },
      'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Ada"))\nprint(greet("Ada", "Hi"))\nprint(greet(greeting="Welcome", name="Ada"))',
    ),
    teach(
      "d6-return-vs-print",
      {
        en: "<p><strong>Return vs print.</strong> Beginners often confuse these, especially on tests.</p><ul><li><code>print</code> writes to the screen. Returns <code>None</code>.</li><li><code>return</code> sends a value back to the caller.</li></ul><p>If a function uses <code>print(answer)</code> instead of <code>return answer</code>, the caller can&apos;t do anything with it — and the grader sees <code>None</code>.</p>",
        zh: "<p><strong>Return 与 print。</strong>新手经常搞混这两个,尤其是在做题时。</p><ul><li><code>print</code> 把东西打印到屏幕,函数本身返回 <code>None</code>。</li><li><code>return</code> 把值交给调用方。</li></ul><p>如果函数写的是 <code>print(answer)</code> 而不是 <code>return answer</code>,调用方拿不到值 —— 判分时看到的就是 <code>None</code>。</p>",
      },
    ),
    quizMC(
      "d6-q-return",
      {
        en: "What does <code>foo</code> contain after <code>foo = bar()</code>, if <code>bar</code> uses <code>print</code> but not <code>return</code>?",
        zh: "如果 <code>bar</code> 里只 <code>print</code> 没有 <code>return</code>,那 <code>foo = bar()</code> 后 <code>foo</code> 是什么?",
      },
      [
        { en: "The printed value", zh: "被打印出来的那个值" },
        { en: "An empty string", zh: "空字符串" },
        { en: "<code>None</code>", zh: "<code>None</code>" },
        { en: "<code>0</code>", zh: "<code>0</code>" },
      ],
      2,
      {
        en: "A function with no <code>return</code> implicitly returns <code>None</code>. Printing doesn&apos;t count.",
        zh: "没有 <code>return</code> 的函数,隐式返回 <code>None</code>。打印不算返回。",
      },
    ),
    exercise(
      "d6-ex-clamp",
      {
        en: "<p>Write <code>clamp(x, lo=0, hi=100)</code> that returns <code>x</code> restricted to the range <code>[lo, hi]</code>. Default to 0 and 100.</p>",
        zh: "<p>写一个 <code>clamp(x, lo=0, hi=100)</code>,把 <code>x</code> 限制在 <code>[lo, hi]</code> 范围内。默认 0 和 100。</p>",
      },
      "def clamp(x, lo=0, hi=100):\n    # your code here\n    pass\n",
      "def clamp(x, lo=0, hi=100):\n    if x < lo:\n        return lo\n    if x > hi:\n        return hi\n    return x\n",
      {
        en: "If below lo, return lo. If above hi, return hi. Else x.",
        zh: "低于 lo 就返回 lo,高于 hi 就返回 hi,其它情况返回 x。",
      },
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
      {
        en: "<p><strong>Scope.</strong> A variable defined inside a function is <em>local</em> — invisible outside it.</p><pre><code>def f():\n    x = 10\nf()\nprint(x)   # NameError — x is not defined here</code></pre><p>Inside a function, you can <em>read</em> outer variables, but assigning creates a new local. If you truly need to modify a module-level variable, use <code>global</code> — but that&apos;s usually a code smell; prefer returning a value.</p>",
        zh: "<p><strong>作用域。</strong>函数里定义的变量是<em>局部的</em> —— 外面看不见。</p><pre><code>def f():\n    x = 10\nf()\nprint(x)   # NameError —— 这里没有 x</code></pre><p>函数里可以<em>读</em>外部变量,但赋值会创建一个新的局部变量。如果真的要修改模块级变量,用 <code>global</code> —— 但这通常是个坏味道,优先通过返回值解决。</p>",
      },
    ),
    demo(
      "d6-scope-demo",
      { en: "<p>See the boundaries:</p>", zh: "<p>看看作用域的边界:</p>" },
      'message = "outer"\n\ndef show():\n    print("inside:", message)   # 读外层变量没问题\n\ndef change():\n    message = "inner"            # 创建了一个局部变量,外层不变\n    print("during:", message)\n\nshow()\nchange()\nprint("after:", message)',
    ),
    checkpoint(
      "d6-cp",
      { en: "Mutable default trap incoming", zh: "可变默认参数的大坑要来了" },
      {
        en: "This next lesson is one of the most-asked Python interview questions. Pay attention — it catches even experienced engineers.",
        zh: "接下来这节是 Python 面试里最常被问的之一。认真看 —— 连老工程师都经常中招。",
      },
    ),
    teach(
      "d6-default-trap",
      {
        en: "<p><strong>Never use a mutable object as a default argument:</strong></p><pre><code>def add_item(item, bag=[]):   # DANGEROUS\n    bag.append(item)\n    return bag\n\nadd_item(\"a\")   # [\"a\"]\nadd_item(\"b\")   # [\"a\", \"b\"] — wait, what?!</code></pre><p>The default list is created <em>once</em> when the function is defined — not on each call. All callers share it.</p><p>The fix:</p><pre><code>def add_item(item, bag=None):\n    if bag is None:\n        bag = []\n    bag.append(item)\n    return bag</code></pre>",
        zh: "<p><strong>永远不要用可变对象做默认参数:</strong></p><pre><code>def add_item(item, bag=[]):   # 危险\n    bag.append(item)\n    return bag\n\nadd_item(\"a\")   # [\"a\"]\nadd_item(\"b\")   # [\"a\", \"b\"] —— 等等,怎么回事?!</code></pre><p>默认列表在函数定义时<em>只创建一次</em> —— 不是每次调用都新建。所有调用共享同一个。</p><p>修法:</p><pre><code>def add_item(item, bag=None):\n    if bag is None:\n        bag = []\n    bag.append(item)\n    return bag</code></pre>",
      },
    ),
    demo(
      "d6-default-demo",
      { en: "<p>Watch the bug happen:</p>", zh: "<p>亲眼看这个 bug:</p>" },
      'def add_item(item, bag=[]):\n    bag.append(item)\n    return bag\n\nprint(add_item("a"))\nprint(add_item("b"))   # 应该是 ["b"],但并不是!\nprint(add_item("c"))',
    ),
    quizMC(
      "d6-q-default",
      {
        en: "Why is <code>def f(x=[])</code> considered a trap?",
        zh: "为什么 <code>def f(x=[])</code> 算个陷阱?",
      },
      [
        { en: "Python doesn&apos;t allow lists as defaults", zh: "Python 不允许用列表作默认值" },
        { en: "The default list is shared across calls — mutating it persists", zh: "默认列表在多次调用之间共享 —— 修改会一直累积" },
        { en: "It makes the function slower", zh: "会让函数变慢" },
        { en: "It shadows built-in names", zh: "会遮蔽内置名字" },
      ],
      1,
      {
        en: "Defaults are evaluated once at function definition time, not per call. For mutable defaults this creates cross-call state.",
        zh: "默认值在函数定义时求值一次,不是每次调用时。可变默认值会导致跨调用的共享状态。",
      },
    ),
    teach(
      "d6-varargs",
      {
        en: "<p><code>*args</code> and <code>**kwargs</code> capture extra arguments:</p><pre><code>def total(*nums):\n    return sum(nums)\n\ntotal(1, 2, 3)   # 6\n\ndef info(**fields):\n    for k, v in fields.items():\n        print(k, v)\n\ninfo(name=\"Ada\", age=37)</code></pre><p><code>*args</code> collects positional args into a tuple; <code>**kwargs</code> collects keyword args into a dict.</p>",
        zh: "<p><code>*args</code> 和 <code>**kwargs</code> 用来捕获多余的参数:</p><pre><code>def total(*nums):\n    return sum(nums)\n\ntotal(1, 2, 3)   # 6\n\ndef info(**fields):\n    for k, v in fields.items():\n        print(k, v)\n\ninfo(name=\"Ada\", age=37)</code></pre><p><code>*args</code> 把位置参数打包成 tuple;<code>**kwargs</code> 把关键字参数打包成 dict。</p>",
      },
    ),
    exercise(
      "d6-ex-count-if",
      {
        en: "<p>Write <code>count_if(nums, pred)</code> where <code>pred</code> is a function taking one argument and returning a bool. Return how many elements of <code>nums</code> satisfy <code>pred</code>. (Functions as arguments — a Python essential.)</p>",
        zh: "<p>写一个 <code>count_if(nums, pred)</code>,其中 <code>pred</code> 是接受一个参数、返回 bool 的函数。返回 <code>nums</code> 里满足 <code>pred</code> 的元素个数。(把函数当参数传 —— Python 的基本功。)</p>",
      },
      "def count_if(nums, pred):\n    # your code here\n    pass\n",
      "def count_if(nums, pred):\n    count = 0\n    for x in nums:\n        if pred(x):\n            count += 1\n    return count\n",
      {
        en: "Accumulator, guarded by <code>pred(x)</code>. Functions are just values in Python — you can pass them around.",
        zh: "累加器,用 <code>pred(x)</code> 过滤。在 Python 里函数就是一种值,可以随便传。",
      },
      [
        { call: "count_if([1, 2, 3, 4], lambda x: x > 2)", expected: 2 },
        { call: "count_if([1, 2, 3, 4], lambda x: x % 2 == 0)", expected: 2 },
        { call: "count_if([], lambda x: True)", expected: 0 },
      ],
      { fnName: "count_if" },
    ),
    recall(
      "d6-recall",
      {
        en: "What&apos;s the difference between <code>return</code> and <code>print</code>, and why does it matter in tests like this app?",
        zh: "<code>return</code> 和 <code>print</code> 的区别是什么?为什么在这种测评场景下很重要?",
      },
      {
        en: "<code>print</code> displays output on screen but the function implicitly returns <code>None</code>. <code>return</code> hands a value back to the caller. Tests check the returned value — printing instead of returning fails the test even if the output &quot;looks right&quot;.",
        zh: "<code>print</code> 把东西显示到屏幕上,但函数隐式返回 <code>None</code>。<code>return</code> 把值交还给调用方。测试检查的是返回值 —— 只打印不返回,就算输出「看起来对」,测试也会挂。",
      },
    ),
    teach(
      "d6-wrap",
      {
        en: "<p>Recap:</p><ul><li>Positional, default, keyword arguments</li><li><code>return</code> ≠ <code>print</code></li><li>Mutable defaults are a trap — use <code>None</code> sentinel</li><li>Local scope; functions shadow outer names on assignment</li><li><code>*args</code>, <code>**kwargs</code>, and passing functions as values</li></ul>",
        zh: "<p>小结:</p><ul><li>位置参数、默认参数、关键字参数</li><li><code>return</code> ≠ <code>print</code></li><li>可变默认值是陷阱 —— 用 <code>None</code> 作哨兵</li><li>局部作用域;赋值会遮蔽外层同名变量</li><li><code>*args</code>、<code>**kwargs</code>,以及把函数当值来传</li></ul>",
      },
    ),
  ],
  finalTest: [
    exercise(
      "d6-t-power",
      {
        en: "<p>Write <code>power(base, exp=2)</code> that returns <code>base ** exp</code>, defaulting to a square.</p>",
        zh: "<p>写一个 <code>power(base, exp=2)</code>,返回 <code>base ** exp</code>,默认做平方。</p>",
      },
      "def power(base, exp=2):\n    # your code here\n    pass\n",
      "def power(base, exp=2):\n    return base ** exp\n",
      { en: "Just <code>base ** exp</code>.", zh: "就是 <code>base ** exp</code>。" },
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
      {
        en: "After <code>x = 5; def f(): x = 10; f(); print(x)</code>, what prints?",
        zh: "执行 <code>x = 5; def f(): x = 10; f(); print(x)</code> 后,打印什么?",
      },
      [
        { en: "<code>5</code>", zh: "<code>5</code>" },
        { en: "<code>10</code>", zh: "<code>10</code>" },
        { en: "Error", zh: "报错" },
        { en: "<code>None</code>", zh: "<code>None</code>" },
      ],
      0,
      {
        en: "<code>x = 10</code> inside <code>f</code> creates a <em>local</em> <code>x</code>, leaving the outer <code>x = 5</code> unchanged.",
        zh: "<code>f</code> 里的 <code>x = 10</code> 创建的是<em>局部</em> <code>x</code>,外层的 <code>x = 5</code> 不受影响。",
      },
    ),
    exercise(
      "d6-t-apply",
      {
        en: "<p>Write <code>apply_all(fn, items)</code> that returns a list where <code>fn</code> has been applied to each item.</p>",
        zh: "<p>写一个 <code>apply_all(fn, items)</code>,返回每个元素被 <code>fn</code> 处理后的列表。</p>",
      },
      "def apply_all(fn, items):\n    # your code here\n    pass\n",
      "def apply_all(fn, items):\n    return [fn(x) for x in items]\n",
      {
        en: "List comprehension: <code>[fn(x) for x in items]</code>. Equivalent to <code>list(map(fn, items))</code>.",
        zh: "列表推导式:<code>[fn(x) for x in items]</code>。等价于 <code>list(map(fn, items))</code>。",
      },
      [
        { call: "apply_all(lambda x: x * 2, [1, 2, 3])", expected: [2, 4, 6] },
        { call: "apply_all(str, [1, 2])", expected: ["1", "2"] },
        { call: "apply_all(lambda x: x, [])", expected: [] },
      ],
      { fnName: "apply_all" },
    ),
    quizMC(
      "d6-t-default",
      { en: "Which default is <em>safe</em>?", zh: "哪个默认值是<em>安全</em>的?" },
      [
        { en: "<code>def f(x=[])</code>", zh: "<code>def f(x=[])</code>" },
        { en: "<code>def f(x={})</code>", zh: "<code>def f(x={})</code>" },
        { en: "<code>def f(x=None)</code>", zh: "<code>def f(x=None)</code>" },
        { en: "<code>def f(x=set())</code>", zh: "<code>def f(x=set())</code>" },
      ],
      2,
      {
        en: "Only the immutable/None options are safe. <code>None</code> is the standard sentinel.",
        zh: "只有不可变或 None 的选项是安全的。<code>None</code> 是常用的哨兵值。",
      },
    ),
    exercise(
      "d6-t-max-by",
      {
        en: "<p>Write <code>max_by(items, key)</code> that returns the item in <code>items</code> with the highest <code>key(item)</code>. Assume non-empty.</p>",
        zh: "<p>写一个 <code>max_by(items, key)</code>,返回 <code>items</code> 里让 <code>key(item)</code> 最大的那个元素。假设非空。</p>",
      },
      "def max_by(items, key):\n    # your code here\n    pass\n",
      "def max_by(items, key):\n    best = items[0]\n    best_k = key(best)\n    for x in items[1:]:\n        k = key(x)\n        if k > best_k:\n            best = x\n            best_k = k\n    return best\n",
      {
        en: "Track best-so-far and its key. Note Python&apos;s built-in <code>max</code> accepts a <code>key=</code> argument — same idea.",
        zh: "维护「当前最优」和它的 key。顺便一提,Python 内置 <code>max</code> 也接受 <code>key=</code> 参数 —— 同样的思路。",
      },
      [
        { call: 'max_by(["a", "bbb", "cc"], len)', expected: "bbb" },
        { call: "max_by([-1, -5, -3], lambda x: -x)", expected: -5 },
      ],
      { fnName: "max_by" },
    ),
  ],
};

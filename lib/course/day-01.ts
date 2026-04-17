import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day01: Day = {
  id: 1,
  title: {
    en: "Python fundamentals",
    zh: "Python 基础",
  },
  subtitle: {
    en: "Variables, types, arithmetic, and your first if/else. The building blocks for everything.",
    zh: "变量、类型、算术运算,还有你的第一个 if/else。后面一切的基石。",
  },
  estimatedTime: { en: "60–75 min", zh: "60–75 分钟" },
  goals: [
    {
      en: "Create variables and understand Python&apos;s core types — <code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>",
      zh: "创建变量,理解 Python 的核心类型 —— <code>int</code>、<code>float</code>、<code>str</code>、<code>bool</code>",
    },
    {
      en: "Use arithmetic, comparison, and boolean operators confidently",
      zh: "自如地使用算术、比较和布尔运算符",
    },
    {
      en: "Write <code>if</code>/<code>elif</code>/<code>else</code> branches and read logical expressions",
      zh: "写出 <code>if</code>/<code>elif</code>/<code>else</code> 分支,读懂逻辑表达式",
    },
    {
      en: "Convert between types (<code>int()</code>, <code>str()</code>, <code>float()</code>) without surprises",
      zh: "在不同类型之间转换(<code>int()</code>、<code>str()</code>、<code>float()</code>)而不会出岔子",
    },
    {
      en: "Read error messages and fix simple bugs",
      zh: "读懂错误信息,修掉简单的 bug",
    },
  ],
  youWillBuild: {
    en: "A handful of tiny programs and two LeetCode-style problems that use only what you learn today.",
    zh: "几个小程序,加上两道只用今天所学就能搞定的 LeetCode 风格题。",
  },
  steps: [
    teach(
      "d1-intro",
      {
        en: "<p>Welcome — I&apos;m your teacher for the next 14 days.</p><p>Today is all about Python&apos;s absolute basics: variables, types, math, comparisons, and decisions. These aren&apos;t glamorous but every harder thing you&apos;ll do later is built on them.</p><p>You won&apos;t just read — I&apos;ll ask you to type, try, and explain. That&apos;s the only way it sticks.</p>",
        zh: "<p>欢迎 —— 接下来 14 天我来带你。</p><p>今天全是 Python 最基础的东西:变量、类型、算术、比较、分支判断。听起来不够酷炫,但后面所有更难的内容都建立在这些之上。</p><p>你不会只是看 —— 我会让你亲手敲、亲手试、亲自讲出来。只有这样才记得住。</p>",
      },
    ),
    teach(
      "d1-var-intro",
      {
        en: "<p><strong>A variable is a name for a value.</strong> In Python you create one by assigning with <code>=</code>:</p><pre><code>age = 25\nname = \"Alice\"</code></pre><p>No type declaration, no <code>let</code> or <code>var</code>, no semicolons. Python figures out the type from the value.</p>",
        zh: "<p><strong>变量就是给一个值起的名字。</strong>在 Python 里用 <code>=</code> 赋值就算创建了一个变量:</p><pre><code>age = 25\nname = \"Alice\"</code></pre><p>不需要声明类型,没有 <code>let</code> 或 <code>var</code>,也没有分号。Python 会根据值自动推断类型。</p>",
      },
    ),
    demo(
      "d1-var-demo",
      {
        en: "<p>Try it — click Run. Then change <code>name</code> to your own name and run again:</p>",
        zh: "<p>试一下 —— 点「Run」。然后把 <code>name</code> 改成你自己的名字,再跑一次:</p>",
      },
      'name = "Alice"\nage = 25\nprint("Hello,", name)\nprint("You are", age, "years old")',
    ),
    teach(
      "d1-types",
      {
        en: "<p>Python has four basic types you&apos;ll see constantly:</p><ul><li><code>int</code> — whole numbers: <code>42</code>, <code>-7</code></li><li><code>float</code> — decimals: <code>3.14</code>, <code>-0.5</code></li><li><code>str</code> — text in quotes: <code>\"hello\"</code> or <code>&apos;hello&apos;</code></li><li><code>bool</code> — <code>True</code> or <code>False</code> (capital T, capital F!)</li></ul><p>Use <code>type(x)</code> to ask Python what type a value is.</p>",
        zh: "<p>Python 里你会反复见到的四种基本类型:</p><ul><li><code>int</code> —— 整数:<code>42</code>、<code>-7</code></li><li><code>float</code> —— 小数:<code>3.14</code>、<code>-0.5</code></li><li><code>str</code> —— 放在引号里的文本:<code>\"hello\"</code> 或 <code>&apos;hello&apos;</code></li><li><code>bool</code> —— <code>True</code> 或 <code>False</code>(T 和 F 必须大写!)</li></ul><p>用 <code>type(x)</code> 可以问 Python 某个值是什么类型。</p>",
      },
    ),
    demo(
      "d1-types-demo",
      {
        en: "<p>Run this and notice what <code>type()</code> returns for each value:</p>",
        zh: "<p>跑一下,看看 <code>type()</code> 对每个值返回了什么:</p>",
      },
      'print(type(42))\nprint(type(3.14))\nprint(type("hello"))\nprint(type(True))',
      {
        en: "Those <class 'int'> lines are Python telling you which type each value is.",
        zh: "那些 <class 'int'> 之类的输出,就是 Python 在告诉你每个值的类型。",
      },
    ),
    quizMC(
      "d1-q-type",
      {
        en: "What is the type of the value <code>3.0</code> in Python?",
        zh: "在 Python 里,值 <code>3.0</code> 的类型是什么?",
      },
      [
        { en: "<code>int</code>", zh: "<code>int</code>" },
        { en: "<code>float</code>", zh: "<code>float</code>" },
        { en: "<code>str</code>", zh: "<code>str</code>" },
        { en: "<code>double</code>", zh: "<code>double</code>" },
      ],
      1,
      {
        en: "Any number with a decimal point is a <code>float</code>, even if the decimal part is zero. Python doesn&apos;t have <code>double</code> — <code>float</code> is 64-bit already.",
        zh: "只要带小数点,就是 <code>float</code>,哪怕小数部分是 0 也一样。Python 没有 <code>double</code> —— <code>float</code> 本身就是 64 位的。",
      },
    ),
    exercise(
      "d1-ex-hello",
      {
        en: "<p>Make <code>greet(name)</code> return the string <code>\"Hello, &lt;name&gt;!\"</code>.</p><p>For example, <code>greet(\"Alice\")</code> should return <code>\"Hello, Alice!\"</code>.</p>",
        zh: "<p>写一个 <code>greet(name)</code>,返回字符串 <code>\"Hello, &lt;name&gt;!\"</code>。</p><p>比如 <code>greet(\"Alice\")</code> 应返回 <code>\"Hello, Alice!\"</code>。</p>",
      },
      "def greet(name):\n    # your code here\n    pass\n",
      'def greet(name):\n    return f"Hello, {name}!"\n',
      {
        en: "Use an f-string: <code>f\"Hello, {name}!\"</code> plugs the variable directly into the string.",
        zh: "用 f-string:<code>f\"Hello, {name}!\"</code> 可以直接把变量嵌进字符串里。",
      },
      [
        { call: 'greet("Alice")', expected: "Hello, Alice!" },
        { call: 'greet("Bob")', expected: "Hello, Bob!" },
        { call: 'greet("")', expected: "Hello, !" },
      ],
      { fnName: "greet" },
    ),
    teach(
      "d1-arith",
      {
        en: "<p>The arithmetic operators are mostly what you expect, with two that surprise people:</p><ul><li><code>+  -  *  /</code> — standard</li><li><code>//</code> — integer division (drops the remainder): <code>7 // 2 == 3</code></li><li><code>%</code> — modulo (remainder): <code>7 % 2 == 1</code></li><li><code>**</code> — exponent: <code>2 ** 10 == 1024</code></li></ul><p><code>%</code> shows up constantly in interviews for &quot;is this divisible by n?&quot;, &quot;is this even?&quot;, wrapping around arrays, etc.</p>",
        zh: "<p>算术运算符大多都在意料之中,但有两个会让人意外:</p><ul><li><code>+  -  *  /</code> —— 这些都是标准操作</li><li><code>//</code> —— 整数除法(丢掉余数):<code>7 // 2 == 3</code></li><li><code>%</code> —— 取模(余数):<code>7 % 2 == 1</code></li><li><code>**</code> —— 幂运算:<code>2 ** 10 == 1024</code></li></ul><p><code>%</code> 在面试里会反复出现:判断「能否被 n 整除?」「是不是偶数?」「数组绕回头」等等。</p>",
      },
    ),
    demo(
      "d1-arith-demo",
      {
        en: "<p>Predict each line&apos;s output <em>before</em> running. Then run it:</p>",
        zh: "<p>在运行<em>之前</em>,先在脑子里猜一下每行的输出。然后再跑:</p>",
      },
      "print(7 / 2)      # 浮点除法\nprint(7 // 2)     # 整数除法\nprint(7 % 2)      # 取余数\nprint(2 ** 10)    # 2 的 10 次方\nprint(-7 // 2)    # 向负无穷取整,不是向 0!",
    ),
    quizMC(
      "d1-q-mod",
      {
        en: "What does <code>15 % 4</code> evaluate to?",
        zh: "<code>15 % 4</code> 的结果是多少?",
      },
      [
        { en: "<code>3</code>", zh: "<code>3</code>" },
        { en: "<code>3.75</code>", zh: "<code>3.75</code>" },
        { en: "<code>4</code>", zh: "<code>4</code>" },
        { en: "<code>11</code>", zh: "<code>11</code>" },
      ],
      0,
      {
        en: "<code>15 / 4 = 3</code> with remainder <code>3</code>. <code>%</code> gives the remainder: <code>15 - (3 × 4) = 3</code>.",
        zh: "<code>15 / 4 = 3</code>,余数是 <code>3</code>。<code>%</code> 返回余数:<code>15 - (3 × 4) = 3</code>。",
      },
    ),
    exercise(
      "d1-ex-even",
      {
        en: "<p>Write <code>is_even(n)</code> that returns <code>True</code> if <code>n</code> is even, <code>False</code> otherwise.</p><p>Use <code>%</code>. A number is even when dividing by 2 leaves remainder 0.</p>",
        zh: "<p>写一个 <code>is_even(n)</code>,如果 <code>n</code> 是偶数返回 <code>True</code>,否则返回 <code>False</code>。</p><p>用 <code>%</code>。一个数除以 2 余数为 0,就是偶数。</p>",
      },
      "def is_even(n):\n    # your code here\n    pass\n",
      "def is_even(n):\n    return n % 2 == 0\n",
      {
        en: "<code>n % 2</code> is 0 for even, 1 for odd. Compare with <code>==</code> to get a bool.",
        zh: "偶数时 <code>n % 2</code> 为 0,奇数为 1。用 <code>==</code> 比较就能得到一个 bool。",
      },
      [
        { call: "is_even(4)", expected: true },
        { call: "is_even(7)", expected: false },
        { call: "is_even(0)", expected: true },
        { call: "is_even(-3)", expected: false },
      ],
      { fnName: "is_even" },
    ),
    teach(
      "d1-compare",
      {
        en: "<p>Comparison operators produce <code>bool</code> values:</p><ul><li><code>==</code> equal &nbsp;&nbsp; <code>!=</code> not equal</li><li><code>&lt;</code>  <code>&gt;</code>  <code>&lt;=</code>  <code>&gt;=</code></li></ul><p><strong>Careful:</strong> <code>=</code> is assignment; <code>==</code> is comparison. Mixing these up is the single most common beginner bug.</p>",
        zh: "<p>比较运算符的结果是 <code>bool</code>:</p><ul><li><code>==</code> 等于 &nbsp;&nbsp; <code>!=</code> 不等于</li><li><code>&lt;</code>  <code>&gt;</code>  <code>&lt;=</code>  <code>&gt;=</code></li></ul><p><strong>注意:</strong><code>=</code> 是赋值,<code>==</code> 才是比较。这俩搞混,是新手最常犯的 bug。</p>",
      },
    ),
    teach(
      "d1-bool",
      {
        en: "<p>Combine booleans with <code>and</code>, <code>or</code>, <code>not</code> — written as English words, not <code>&amp;&amp;</code> / <code>||</code> / <code>!</code>.</p><p>Python also lets you <em>chain</em> comparisons: <code>0 &lt;= x &lt; 10</code> reads like math and means &quot;x is in [0, 10)&quot;. This is unusual among languages and shows up on interview code.</p>",
        zh: "<p>布尔值用 <code>and</code>、<code>or</code>、<code>not</code> 组合 —— 写成英文单词,不是 <code>&amp;&amp;</code> / <code>||</code> / <code>!</code>。</p><p>Python 还允许<em>链式</em>比较:<code>0 &lt;= x &lt; 10</code> 读起来就像数学表达式,意思是「x 在 [0, 10) 范围内」。这个写法在其它语言里很少见,面试题里经常出现。</p>",
      },
    ),
    demo(
      "d1-bool-demo",
      { en: "<p>Try it:</p>", zh: "<p>试一下:</p>" },
      'x = 5\nprint(x > 0 and x < 10)       # and\nprint(0 <= x < 10)            # 链式写法 —— 效果一样\nprint(not (x == 5))           # not\nprint(x == 5 or x == 10)      # or',
    ),
    exercise(
      "d1-ex-grade",
      {
        en: "<p>Write <code>grade(score)</code> that returns:</p><ul><li><code>\"A\"</code> if score is 90 or above</li><li><code>\"B\"</code> if 80–89</li><li><code>\"C\"</code> if 70–79</li><li><code>\"F\"</code> otherwise</li></ul>",
        zh: "<p>写一个 <code>grade(score)</code>,返回:</p><ul><li><code>\"A\"</code>,如果分数在 90 及以上</li><li><code>\"B\"</code>,80–89</li><li><code>\"C\"</code>,70–79</li><li><code>\"F\"</code>,其它情况</li></ul>",
      },
      "def grade(score):\n    # your code here\n    pass\n",
      'def grade(score):\n    if score >= 90:\n        return "A"\n    elif score >= 80:\n        return "B"\n    elif score >= 70:\n        return "C"\n    else:\n        return "F"\n',
      {
        en: "Use <code>if</code> / <code>elif</code> / <code>else</code>. Check the highest threshold first and use <code>return</code> — once you return, the function exits, so you don&apos;t need to worry about overlapping ranges.",
        zh: "用 <code>if</code> / <code>elif</code> / <code>else</code>。先判断最高的门槛,然后直接 <code>return</code> —— 一旦返回,函数就结束了,不用担心区间重叠。",
      },
      [
        { call: "grade(95)", expected: "A" },
        { call: "grade(90)", expected: "A" },
        { call: "grade(85)", expected: "B" },
        { call: "grade(72)", expected: "C" },
        { call: "grade(40)", expected: "F" },
        { call: "grade(0)", expected: "F" },
      ],
      { fnName: "grade" },
    ),
    teach(
      "d1-truthy",
      {
        en: "<p>Python has a concept called <strong>truthiness</strong> — any value can be used where a boolean is expected.</p><p>These are <em>falsy</em> (treated as False): <code>0</code>, <code>0.0</code>, <code>\"\"</code> (empty string), <code>[]</code> (empty list), <code>{}</code> (empty dict), <code>None</code>, <code>False</code>.</p><p>Everything else is truthy.</p><p>So <code>if name:</code> is the idiomatic way to say &quot;if name is not empty&quot;.</p>",
        zh: "<p>Python 有一个概念叫<strong>真值性(truthiness)</strong>—— 任何值都可以放在期望布尔值的位置。</p><p>这些值是<em>假值(falsy)</em>,会被当作 False:<code>0</code>、<code>0.0</code>、<code>\"\"</code>(空字符串)、<code>[]</code>(空列表)、<code>{}</code>(空字典)、<code>None</code>、<code>False</code>。</p><p>其它所有值都是真值(truthy)。</p><p>所以 <code>if name:</code> 就是 Pythonic 的写法,表示「如果 name 不为空」。</p>",
      },
    ),
    quizMC(
      "d1-q-truthy",
      {
        en: "Which expression evaluates to <code>False</code>?",
        zh: "以下哪个表达式的结果是 <code>False</code>?",
      },
      [
        { en: "<code>bool(\"0\")</code>", zh: "<code>bool(\"0\")</code>" },
        { en: "<code>bool(0)</code>", zh: "<code>bool(0)</code>" },
        { en: "<code>bool([0])</code>", zh: "<code>bool([0])</code>" },
        { en: "<code>bool(\"False\")</code>", zh: "<code>bool(\"False\")</code>" },
      ],
      1,
      {
        en: "The number <code>0</code> is falsy. The string <code>\"0\"</code> is a non-empty string (truthy!), and the list <code>[0]</code> is non-empty (also truthy). Always ask &quot;is this empty/zero/None?&quot; — not &quot;does it look false?&quot;",
        zh: "数字 <code>0</code> 是假值。字符串 <code>\"0\"</code> 是非空字符串(真值!),列表 <code>[0]</code> 也是非空(也是真值)。要问的是「它是空/零/None 吗?」—— 而不是「看起来像 false 吗?」",
      },
    ),
    teach(
      "d1-cast",
      {
        en: "<p>Python doesn&apos;t auto-convert between <code>int</code> and <code>str</code>, so <code>&quot;5&quot; + 3</code> is a <code>TypeError</code>.</p><p>You convert explicitly:</p><ul><li><code>int(&quot;42&quot;)</code> → <code>42</code></li><li><code>str(42)</code> → <code>&quot;42&quot;</code></li><li><code>float(&quot;3.14&quot;)</code> → <code>3.14</code></li></ul><p>User input from <code>input()</code> is always a string — even if they type a number. You&apos;ll need to <code>int(...)</code> it.</p>",
        zh: "<p>Python 不会在 <code>int</code> 和 <code>str</code> 之间自动转换,所以 <code>&quot;5&quot; + 3</code> 会抛 <code>TypeError</code>。</p><p>要显式转换:</p><ul><li><code>int(&quot;42&quot;)</code> → <code>42</code></li><li><code>str(42)</code> → <code>&quot;42&quot;</code></li><li><code>float(&quot;3.14&quot;)</code> → <code>3.14</code></li></ul><p><code>input()</code> 拿到的用户输入永远是字符串,即使用户输入的是数字。需要自己 <code>int(...)</code> 一下。</p>",
      },
    ),
    recall(
      "d1-recall-types",
      {
        en: "<p>In your own words: when would Python give you a <code>TypeError</code>, and how do you fix it?</p>",
        zh: "<p>用你自己的话说:Python 什么时候会抛 <code>TypeError</code>?怎么修?</p>",
      },
      {
        en: "A TypeError typically happens when you use an operator on incompatible types — like <code>&quot;5&quot; + 3</code>, or <code>len(42)</code>. You fix it by explicitly converting the value with <code>int()</code>, <code>str()</code>, etc., so both sides are the same type.",
        zh: "TypeError 通常是因为在不兼容的类型上用了某个操作 —— 比如 <code>&quot;5&quot; + 3</code>,或 <code>len(42)</code>。修复方法是用 <code>int()</code>、<code>str()</code> 等显式转换,让两边类型一致。",
      },
    ),
    checkpoint(
      "d1-cp-halfway",
      { en: "You&apos;re halfway!", zh: "你已经完成一半了!" },
      {
        en: "Nice — variables, types, arithmetic, comparisons, booleans, and if/else are in your head now. The rest of the lesson is one more problem and then a short final test. Keep going — the second half of the lesson is where it starts clicking.",
        zh: "很棒 —— 变量、类型、算术、比较、布尔、if/else 都进你脑子里了。剩下还有一道题,加一个小终测。继续 —— 后半部分才是开始真正「通窍」的时候。",
      },
    ),
    exercise(
      "d1-ex-fizz",
      {
        en: "<p><strong>Mini LeetCode — FizzBuzz (classic).</strong></p><p>Write <code>fizzbuzz(n)</code> that returns a string based on <code>n</code>:</p><ul><li><code>\"FizzBuzz\"</code> if <code>n</code> is divisible by both 3 and 5</li><li><code>\"Fizz\"</code> if only by 3</li><li><code>\"Buzz\"</code> if only by 5</li><li>otherwise the number as a string</li></ul><p>This problem has been an interview filter for decades. The trick: check &quot;divisible by 15&quot; (both) <em>first</em>.</p>",
        zh: "<p><strong>迷你 LeetCode —— FizzBuzz(经典)。</strong></p><p>写 <code>fizzbuzz(n)</code>,根据 <code>n</code> 返回字符串:</p><ul><li><code>\"FizzBuzz\"</code>,如果 <code>n</code> 能被 3 和 5 同时整除</li><li><code>\"Fizz\"</code>,如果只能被 3 整除</li><li><code>\"Buzz\"</code>,如果只能被 5 整除</li><li>否则把数字转成字符串返回</li></ul><p>这题做面试筛选题几十年了。诀窍:<em>先</em>判断「能否被 15 整除」(两者都是)。</p>",
      },
      "def fizzbuzz(n):\n    # your code here\n    pass\n",
      'def fizzbuzz(n):\n    if n % 15 == 0:\n        return "FizzBuzz"\n    if n % 3 == 0:\n        return "Fizz"\n    if n % 5 == 0:\n        return "Buzz"\n    return str(n)\n',
      {
        en: "Check the most specific case (divisible by 15) first. Then 3, then 5, then the default. <code>return</code> exits the function, so no <code>elif</code> needed.",
        zh: "最先检查最具体的情况(能被 15 整除),然后是 3,再是 5,最后走默认。<code>return</code> 会退出函数,所以不需要 <code>elif</code>。",
      },
      [
        { call: "fizzbuzz(15)", expected: "FizzBuzz" },
        { call: "fizzbuzz(9)", expected: "Fizz" },
        { call: "fizzbuzz(10)", expected: "Buzz" },
        { call: "fizzbuzz(7)", expected: "7" },
        { call: "fizzbuzz(30)", expected: "FizzBuzz" },
      ],
      { fnName: "fizzbuzz" },
    ),
    teach(
      "d1-wrap",
      {
        en: "<p>That&apos;s all the ingredients for today. A quick recap in your head:</p><ul><li>Variables hold values. Python infers the type.</li><li><code>//</code> divides and drops remainder, <code>%</code> keeps it.</li><li><code>==</code> compares, <code>=</code> assigns.</li><li><code>and</code> / <code>or</code> / <code>not</code>, not <code>&amp;&amp;</code>.</li><li>Empty things are falsy.</li></ul><p>Ready for the final test? 5 quick questions — passing unlocks Day 2.</p>",
        zh: "<p>今天的料就这些。在脑子里快速过一遍:</p><ul><li>变量存值,Python 自己推断类型。</li><li><code>//</code> 除法丢掉余数,<code>%</code> 留下余数。</li><li><code>==</code> 是比较,<code>=</code> 是赋值。</li><li>是 <code>and</code> / <code>or</code> / <code>not</code>,不是 <code>&amp;&amp;</code>。</li><li>空的东西是假值。</li></ul><p>准备好做终测了吗?5 道小题 —— 通过就解锁第 2 天。</p>",
      },
    ),
  ],
  finalTest: [
    quizMC(
      "d1-t-divmod",
      {
        en: "What does <code>17 // 5</code> evaluate to?",
        zh: "<code>17 // 5</code> 的结果是?",
      },
      [
        { en: "<code>3.4</code>", zh: "<code>3.4</code>" },
        { en: "<code>3</code>", zh: "<code>3</code>" },
        { en: "<code>2</code>", zh: "<code>2</code>" },
        { en: "<code>3.0</code>", zh: "<code>3.0</code>" },
      ],
      1,
      {
        en: "<code>//</code> is integer division and returns an <code>int</code> (no decimal).",
        zh: "<code>//</code> 是整数除法,返回 <code>int</code>(没有小数)。",
      },
    ),
    quizMC(
      "d1-t-compare",
      { en: "Which line has a bug?", zh: "哪一行有 bug?" },
      [
        { en: "<code>if x &gt;= 0 and x &lt;= 10:</code>", zh: "<code>if x &gt;= 0 and x &lt;= 10:</code>" },
        { en: "<code>if 0 &lt;= x &lt;= 10:</code>", zh: "<code>if 0 &lt;= x &lt;= 10:</code>" },
        { en: "<code>if x = 5:</code>", zh: "<code>if x = 5:</code>" },
        { en: "<code>if x == 5 or x == 10:</code>", zh: "<code>if x == 5 or x == 10:</code>" },
      ],
      2,
      {
        en: "<code>=</code> is assignment, not comparison. Inside <code>if</code> you need <code>==</code>.",
        zh: "<code>=</code> 是赋值,不是比较。<code>if</code> 里要用 <code>==</code>。",
      },
    ),
    exercise(
      "d1-t-abs",
      {
        en: "<p>Write <code>my_abs(n)</code> that returns the absolute value of <code>n</code> without using the built-in <code>abs()</code>.</p>",
        zh: "<p>写一个 <code>my_abs(n)</code>,返回 <code>n</code> 的绝对值。不能用内置的 <code>abs()</code>。</p>",
      },
      "def my_abs(n):\n    # your code here\n    pass\n",
      "def my_abs(n):\n    if n < 0:\n        return -n\n    return n\n",
      {
        en: "If <code>n</code> is negative, return <code>-n</code>; else return <code>n</code>.",
        zh: "如果 <code>n</code> 是负数,返回 <code>-n</code>;否则返回 <code>n</code>。",
      },
      [
        { call: "my_abs(5)", expected: 5 },
        { call: "my_abs(-5)", expected: 5 },
        { call: "my_abs(0)", expected: 0 },
      ],
      { fnName: "my_abs" },
    ),
    quizMC(
      "d1-t-truthy",
      {
        en: "Which value is <em>truthy</em>?",
        zh: "哪个值是<em>真值</em>?",
      },
      [
        { en: "<code>0</code>", zh: "<code>0</code>" },
        { en: "<code>&quot;&quot;</code>", zh: "<code>&quot;&quot;</code>" },
        { en: "<code>&quot;False&quot;</code>", zh: "<code>&quot;False&quot;</code>" },
        { en: "<code>None</code>", zh: "<code>None</code>" },
      ],
      2,
      {
        en: "<code>&quot;False&quot;</code> is a non-empty string, so it&apos;s truthy. Only <em>empty</em> strings are falsy.",
        zh: "<code>&quot;False&quot;</code> 是非空字符串,所以是真值。只有<em>空</em>字符串才是假值。",
      },
    ),
    exercise(
      "d1-t-max3",
      {
        en: "<p>Write <code>max_of_three(a, b, c)</code> that returns the largest of three numbers. No <code>max()</code>.</p>",
        zh: "<p>写一个 <code>max_of_three(a, b, c)</code>,返回三个数里最大的那个。不能用 <code>max()</code>。</p>",
      },
      "def max_of_three(a, b, c):\n    # your code here\n    pass\n",
      "def max_of_three(a, b, c):\n    if a >= b and a >= c:\n        return a\n    if b >= c:\n        return b\n    return c\n",
      {
        en: "Check if <code>a</code> beats both others; if not, compare <code>b</code> and <code>c</code>.",
        zh: "先看 <code>a</code> 是不是比另外两个都大;如果不是,再比较 <code>b</code> 和 <code>c</code>。",
      },
      [
        { call: "max_of_three(1, 2, 3)", expected: 3 },
        { call: "max_of_three(10, 5, 7)", expected: 10 },
        { call: "max_of_three(-1, -5, -3)", expected: -1 },
        { call: "max_of_three(4, 4, 4)", expected: 4 },
      ],
      { fnName: "max_of_three" },
    ),
  ],
};

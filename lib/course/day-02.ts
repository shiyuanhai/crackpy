import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day02: Day = {
  id: 2,
  title: { en: "Strings and indexing", zh: "字符串与索引" },
  subtitle: {
    en: "Strings are sequences of characters. Master indexing, slicing, and the string methods that show up in every interview.",
    zh: "字符串就是一串字符。掌握索引、切片,还有那些每次面试都会用到的字符串方法。",
  },
  estimatedTime: { en: "50–65 min", zh: "50–65 分钟" },
  goals: [
    {
      en: "Index strings with <code>s[i]</code> and negative indexes",
      zh: "用 <code>s[i]</code> 和负索引访问字符串",
    },
    {
      en: "Slice with <code>s[a:b]</code> and know the endpoint is exclusive",
      zh: "用 <code>s[a:b]</code> 切片,知道终点是不包含的",
    },
    {
      en: "Use key methods: <code>lower</code>, <code>upper</code>, <code>strip</code>, <code>split</code>, <code>join</code>, <code>replace</code>",
      zh: "熟练使用核心方法:<code>lower</code>、<code>upper</code>、<code>strip</code>、<code>split</code>、<code>join</code>、<code>replace</code>",
    },
    {
      en: "Format strings with f-strings",
      zh: "用 f-string 格式化字符串",
    },
    {
      en: "Understand that strings are <strong>immutable</strong>",
      zh: "理解字符串是<strong>不可变</strong>的",
    },
  ],
  youWillBuild: {
    en: "Palindrome check, vowel counter, reverse-words — the bread and butter of string interviews.",
    zh: "回文判断、元音计数、单词反转 —— 字符串面试的家常便饭。",
  },
  steps: [
    teach(
      "d2-intro",
      {
        en: "<p>Strings feel simple until an interviewer asks &quot;reverse the words in this sentence in-place.&quot; Today we build the muscle memory for indexing, slicing, and the handful of methods you&apos;ll reach for constantly.</p>",
        zh: "<p>字符串看似简单,直到面试官说「把这句话里每个单词原地反转」。今天我们把索引、切片,和那几个会反复用到的方法,练成肌肉记忆。</p>",
      },
    ),
    teach(
      "d2-index",
      {
        en: "<p>Python strings are zero-indexed:</p><pre><code>s = \"python\"\ns[0]   # 'p'\ns[1]   # 'y'\ns[-1]  # 'n'  (last character)\ns[-2]  # 'o'  (second to last)\nlen(s) # 6</code></pre><p>Negative indexes count from the end. <code>s[-1]</code> is a Python idiom you&apos;ll use every day.</p>",
        zh: "<p>Python 字符串从 0 开始索引:</p><pre><code>s = \"python\"\ns[0]   # 'p'\ns[1]   # 'y'\ns[-1]  # 'n'  (最后一个字符)\ns[-2]  # 'o'  (倒数第二个)\nlen(s) # 6</code></pre><p>负索引是从尾部数。<code>s[-1]</code> 是一个你每天都会用的 Python 惯用写法。</p>",
      },
    ),
    demo(
      "d2-index-demo",
      {
        en: "<p>Run this, then change the string to your name and predict each output:</p>",
        zh: "<p>跑一下,然后把字符串换成你自己的名字,猜猜每一行的输出:</p>",
      },
      's = "python"\nprint(s[0])\nprint(s[-1])\nprint(s[len(s) - 1])\nprint(s[2])',
    ),
    teach(
      "d2-slice",
      {
        en: "<p><strong>Slicing</strong> — <code>s[start:end]</code> returns characters from <code>start</code> up to but <em>not including</em> <code>end</code>.</p><pre><code>s = \"python\"\ns[0:3]   # 'pyt'\ns[2:5]   # 'tho'\ns[:3]    # 'pyt'  (from start)\ns[3:]    # 'hon'  (to end)\ns[::-1]  # 'nohtyp'  (reversed!)</code></pre><p>The <code>s[::-1]</code> trick — step of -1 walks backwards — is how you reverse a string in one line.</p>",
        zh: "<p><strong>切片</strong> —— <code>s[start:end]</code> 返回从 <code>start</code> 开始、<em>不包含</em> <code>end</code> 的字符。</p><pre><code>s = \"python\"\ns[0:3]   # 'pyt'\ns[2:5]   # 'tho'\ns[:3]    # 'pyt'  (从开头)\ns[3:]    # 'hon'  (到结尾)\ns[::-1]  # 'nohtyp'  (反转!)</code></pre><p><code>s[::-1]</code> 这个技巧 —— 步长 -1 表示倒着走 —— 就是一行反转字符串的办法。</p>",
      },
    ),
    demo(
      "d2-slice-demo",
      {
        en: "<p>Play with it. Try different slice ranges:</p>",
        zh: "<p>玩一下,换不同的切片范围试试:</p>",
      },
      's = "interview"\nprint(s[:5])\nprint(s[5:])\nprint(s[-4:])\nprint(s[::-1])\nprint(s[::2])   # 每隔一个字符',
    ),
    quizMC(
      "d2-q-slice",
      {
        en: "What does <code>\"hello\"[1:4]</code> return?",
        zh: "<code>\"hello\"[1:4]</code> 返回什么?",
      },
      [
        { en: "<code>&quot;hell&quot;</code>", zh: "<code>&quot;hell&quot;</code>" },
        { en: "<code>&quot;ell&quot;</code>", zh: "<code>&quot;ell&quot;</code>" },
        { en: "<code>&quot;ello&quot;</code>", zh: "<code>&quot;ello&quot;</code>" },
        { en: "<code>&quot;el&quot;</code>", zh: "<code>&quot;el&quot;</code>" },
      ],
      1,
      {
        en: "Indexes 1, 2, 3 — and index 4 is excluded (the endpoint is always exclusive). So you get <code>e</code>, <code>l</code>, <code>l</code>.",
        zh: "取索引 1、2、3 —— 索引 4 不包含(终点永远是不含的)。所以结果是 <code>e</code>、<code>l</code>、<code>l</code>。",
      },
    ),
    exercise(
      "d2-ex-reverse",
      {
        en: "<p>Write <code>reverse(s)</code> that returns the string reversed.</p>",
        zh: "<p>写一个 <code>reverse(s)</code>,返回反转后的字符串。</p>",
      },
      "def reverse(s):\n    # your code here\n    pass\n",
      "def reverse(s):\n    return s[::-1]\n",
      {
        en: "<code>s[::-1]</code> is the one-liner. The three-part slice is <code>[start:end:step]</code>, and a step of <code>-1</code> walks the string backwards.",
        zh: "<code>s[::-1]</code> 就是一行搞定。三段式切片是 <code>[start:end:step]</code>,步长 <code>-1</code> 就是倒着走。",
      },
      [
        { call: 'reverse("hello")', expected: "olleh" },
        { call: 'reverse("")', expected: "" },
        { call: 'reverse("a")', expected: "a" },
        { call: 'reverse("ab")', expected: "ba" },
      ],
      { fnName: "reverse" },
    ),
    teach(
      "d2-methods",
      {
        en: "<p>The string methods you&apos;ll use in 90% of problems:</p><ul><li><code>s.lower()</code> / <code>s.upper()</code> — case conversion</li><li><code>s.strip()</code> — removes whitespace from both ends</li><li><code>s.split(&quot; &quot;)</code> — splits into a list: <code>&quot;a b c&quot;.split(&quot; &quot;) == [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</code></li><li><code>&quot;,&quot;.join(lst)</code> — joins a list into a string with the separator</li><li><code>s.replace(&quot;a&quot;, &quot;b&quot;)</code> — replaces occurrences</li><li><code>s.count(&quot;x&quot;)</code> — counts occurrences</li><li><code>&quot;x&quot; in s</code> — boolean substring check</li></ul><p>Strings are <strong>immutable</strong> — these methods return <em>new</em> strings. <code>s.lower()</code> doesn&apos;t change <code>s</code>.</p>",
        zh: "<p>90% 的题里你都会用到的字符串方法:</p><ul><li><code>s.lower()</code> / <code>s.upper()</code> —— 大小写转换</li><li><code>s.strip()</code> —— 去掉两端空白</li><li><code>s.split(&quot; &quot;)</code> —— 按分隔符切成列表:<code>&quot;a b c&quot;.split(&quot; &quot;) == [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</code></li><li><code>&quot;,&quot;.join(lst)</code> —— 用分隔符把列表拼成字符串</li><li><code>s.replace(&quot;a&quot;, &quot;b&quot;)</code> —— 替换所有出现的位置</li><li><code>s.count(&quot;x&quot;)</code> —— 统计出现次数</li><li><code>&quot;x&quot; in s</code> —— 判断是否包含子串</li></ul><p>字符串是<strong>不可变</strong>的 —— 这些方法都返回<em>新</em>字符串。<code>s.lower()</code> 不会改 <code>s</code> 本身。</p>",
      },
    ),
    demo(
      "d2-methods-demo",
      {
        en: "<p>Watch the immutability — <code>s</code> doesn&apos;t change:</p>",
        zh: "<p>看看不可变性 —— <code>s</code> 没变:</p>",
      },
      's = "  Hello World  "\nprint(s.strip())\nprint(s.strip().lower())\nprint("Original:", repr(s))   # 空格还在\nprint("-".join(["a", "b", "c"]))\nprint("hello".count("l"))\nprint("py" in "python")',
    ),
    quizMC(
      "d2-q-immutable",
      {
        en: "What happens when you write <code>s[0] = &quot;H&quot;</code>?",
        zh: "<code>s[0] = &quot;H&quot;</code> 会发生什么?",
      },
      [
        { en: "The first character of <code>s</code> changes to <code>&quot;H&quot;</code>", zh: "<code>s</code> 的第一个字符变成 <code>&quot;H&quot;</code>" },
        { en: "Python raises a <code>TypeError</code>", zh: "Python 抛出 <code>TypeError</code>" },
        { en: "It silently does nothing", zh: "静默无事发生" },
        { en: "It creates a new string", zh: "创建一个新字符串" },
      ],
      1,
      {
        en: "Strings are immutable — you <em>can&apos;t</em> modify characters in place. To change a character, build a new string (e.g., with slicing and concatenation).",
        zh: "字符串是不可变的 —— <em>不能</em>原地修改字符。要想改某个字符,只能构造新字符串(比如用切片加拼接)。",
      },
    ),
    exercise(
      "d2-ex-palindrome",
      {
        en: "<p><strong>Palindrome check.</strong> Write <code>is_palindrome(s)</code> that returns <code>True</code> if the string reads the same forwards and backwards.</p><p>For this version, case doesn&apos;t matter — treat <code>&quot;Aa&quot;</code> as a palindrome.</p>",
        zh: "<p><strong>回文判断。</strong>写一个 <code>is_palindrome(s)</code>,如果字符串正读反读都一样就返回 <code>True</code>。</p><p>这版不区分大小写 —— 把 <code>&quot;Aa&quot;</code> 也算作回文。</p>",
      },
      "def is_palindrome(s):\n    # your code here\n    pass\n",
      "def is_palindrome(s):\n    s = s.lower()\n    return s == s[::-1]\n",
      {
        en: "Lowercase it first, then compare to its reverse.",
        zh: "先转小写,再跟反转后的比较。",
      },
      [
        { call: 'is_palindrome("racecar")', expected: true },
        { call: 'is_palindrome("hello")', expected: false },
        { call: 'is_palindrome("Aa")', expected: true },
        { call: 'is_palindrome("")', expected: true },
        { call: 'is_palindrome("a")', expected: true },
      ],
      { fnName: "is_palindrome" },
    ),
    teach(
      "d2-fstr",
      {
        en: "<p><strong>f-strings</strong> — the modern way to format:</p><pre><code>name = \"Ada\"\nage = 37\nprint(f\"{name} is {age}\")\nprint(f\"{age * 2} is twice her age\")\nprint(f\"{name.upper()}\")\nprint(f\"pi ≈ {3.14159:.2f}\")  # 2 decimal places</code></pre><p>Anything inside <code>{}</code> is a Python expression. Use these instead of <code>%</code> formatting or <code>+</code> concatenation.</p>",
        zh: "<p><strong>f-string</strong> —— 现代的字符串格式化方式:</p><pre><code>name = \"Ada\"\nage = 37\nprint(f\"{name} is {age}\")\nprint(f\"{age * 2} is twice her age\")\nprint(f\"{name.upper()}\")\nprint(f\"pi ≈ {3.14159:.2f}\")  # 保留 2 位小数</code></pre><p><code>{}</code> 里可以放任何 Python 表达式。优先用这个,不要再用 <code>%</code> 格式化或 <code>+</code> 拼接了。</p>",
      },
    ),
    exercise(
      "d2-ex-vowels",
      {
        en: "<p>Write <code>count_vowels(s)</code> that returns how many vowels (<code>aeiou</code>, case-insensitive) are in the string.</p>",
        zh: "<p>写一个 <code>count_vowels(s)</code>,返回字符串里有多少个元音(<code>aeiou</code>,不分大小写)。</p>",
      },
      "def count_vowels(s):\n    # your code here\n    pass\n",
      'def count_vowels(s):\n    s = s.lower()\n    count = 0\n    for ch in s:\n        if ch in "aeiou":\n            count += 1\n    return count\n',
      {
        en: "Lowercase the string. Loop over characters. Use <code>ch in &quot;aeiou&quot;</code> to check membership.",
        zh: "字符串转小写。逐字符遍历。用 <code>ch in &quot;aeiou&quot;</code> 判断是否在元音集合里。",
      },
      [
        { call: 'count_vowels("hello")', expected: 2 },
        { call: 'count_vowels("HELLO")', expected: 2 },
        { call: 'count_vowels("xyz")', expected: 0 },
        { call: 'count_vowels("")', expected: 0 },
        { call: 'count_vowels("aeiou")', expected: 5 },
      ],
      { fnName: "count_vowels" },
    ),
    checkpoint(
      "d2-cp",
      { en: "Halfway there", zh: "一半了" },
      {
        en: "Indexing, slicing, and core methods — you have the tools. One more pattern to learn (<code>split</code> / <code>join</code>) and then you&apos;re at the test.",
        zh: "索引、切片、核心方法 —— 你已经有工具了。再学一个模式(<code>split</code> / <code>join</code>),然后就进终测。",
      },
    ),
    teach(
      "d2-split",
      {
        en: "<p><code>split</code> and <code>join</code> are inverses:</p><pre><code>\"a b c\".split(\" \")     # [\"a\", \"b\", \"c\"]\n\" \".join([\"a\", \"b\", \"c\"])  # \"a b c\"</code></pre><p>This pattern — split, transform, join — reverses words, cleans whitespace, swaps delimiters, etc.</p>",
        zh: "<p><code>split</code> 和 <code>join</code> 是互为逆操作:</p><pre><code>\"a b c\".split(\" \")     # [\"a\", \"b\", \"c\"]\n\" \".join([\"a\", \"b\", \"c\"])  # \"a b c\"</code></pre><p>「切开 → 变换 → 拼回」这个套路可以反转单词、清理空格、替换分隔符,等等。</p>",
      },
    ),
    exercise(
      "d2-ex-reverse-words",
      {
        en: "<p><strong>LeetCode #557 classic.</strong> Write <code>reverse_words(s)</code> that reverses <em>each word</em> in a sentence, keeping word order.</p><p><code>reverse_words(&quot;hello world&quot;)</code> → <code>&quot;olleh dlrow&quot;</code>.</p><p>Assume words are separated by single spaces.</p>",
        zh: "<p><strong>LeetCode #557 经典题。</strong>写一个 <code>reverse_words(s)</code>,反转句子里<em>每个单词</em>,但保持单词顺序不变。</p><p><code>reverse_words(&quot;hello world&quot;)</code> → <code>&quot;olleh dlrow&quot;</code>。</p><p>假设单词之间是单个空格。</p>",
      },
      "def reverse_words(s):\n    # your code here\n    pass\n",
      'def reverse_words(s):\n    words = s.split(" ")\n    reversed_words = [w[::-1] for w in words]\n    return " ".join(reversed_words)\n',
      {
        en: "Split on space. Reverse each word with <code>[::-1]</code>. Join back with a space.",
        zh: "按空格切开,用 <code>[::-1]</code> 反转每个单词,再用空格拼回去。",
      },
      [
        { call: 'reverse_words("hello world")', expected: "olleh dlrow" },
        { call: 'reverse_words("a b c")', expected: "a b c" },
        { call: 'reverse_words("abc")', expected: "cba" },
        { call: 'reverse_words("")', expected: "" },
      ],
      { fnName: "reverse_words" },
    ),
    recall(
      "d2-recall",
      {
        en: "Why does <code>s.lower()</code> not change the original string? What does it do instead?",
        zh: "为什么 <code>s.lower()</code> 不会改变原字符串?它做了什么?",
      },
      {
        en: "Strings are immutable — they can&apos;t be modified. <code>s.lower()</code> returns a <em>new</em> string with the lowercase version. To keep it, you reassign: <code>s = s.lower()</code>.",
        zh: "字符串是不可变的 —— 没法修改。<code>s.lower()</code> 返回一个小写版本的<em>新</em>字符串。想保留,就重新赋值:<code>s = s.lower()</code>。",
      },
    ),
    teach(
      "d2-wrap",
      {
        en: "<p>Today&apos;s toolkit:</p><ul><li><code>s[i]</code>, <code>s[-1]</code>, <code>s[a:b]</code>, <code>s[::-1]</code></li><li><code>lower</code>, <code>upper</code>, <code>strip</code>, <code>split</code>, <code>join</code>, <code>replace</code>, <code>in</code></li><li>f-strings</li><li>Immutability — always reassign</li></ul><p>Final test time.</p>",
        zh: "<p>今天的工具箱:</p><ul><li><code>s[i]</code>、<code>s[-1]</code>、<code>s[a:b]</code>、<code>s[::-1]</code></li><li><code>lower</code>、<code>upper</code>、<code>strip</code>、<code>split</code>、<code>join</code>、<code>replace</code>、<code>in</code></li><li>f-string</li><li>不可变性 —— 记得重新赋值</li></ul><p>该做终测了。</p>",
      },
    ),
  ],
  finalTest: [
    quizMC(
      "d2-t-slice",
      {
        en: "What does <code>&quot;python&quot;[-3:]</code> return?",
        zh: "<code>&quot;python&quot;[-3:]</code> 返回什么?",
      },
      [
        { en: "<code>&quot;pyt&quot;</code>", zh: "<code>&quot;pyt&quot;</code>" },
        { en: "<code>&quot;hon&quot;</code>", zh: "<code>&quot;hon&quot;</code>" },
        { en: "<code>&quot;tho&quot;</code>", zh: "<code>&quot;tho&quot;</code>" },
        { en: "<code>&quot;python&quot;</code>", zh: "<code>&quot;python&quot;</code>" },
      ],
      1,
      {
        en: "<code>-3</code> starts 3 from the end, to the end of the string. That&apos;s <code>&quot;hon&quot;</code>.",
        zh: "<code>-3</code> 是从末尾往前数第 3 个开始,一直到结尾,就是 <code>&quot;hon&quot;</code>。",
      },
    ),
    exercise(
      "d2-t-first-word",
      {
        en: "<p>Write <code>first_word(s)</code> that returns the first word of a sentence (characters before the first space). If there&apos;s no space, return the whole string.</p>",
        zh: "<p>写一个 <code>first_word(s)</code>,返回句子的第一个单词(即第一个空格之前的字符)。如果没有空格,就返回整个字符串。</p>",
      },
      "def first_word(s):\n    # your code here\n    pass\n",
      'def first_word(s):\n    return s.split(" ")[0]\n',
      {
        en: "<code>s.split(&quot; &quot;)</code> returns a list; take <code>[0]</code>.",
        zh: "<code>s.split(&quot; &quot;)</code> 返回列表,取 <code>[0]</code>。",
      },
      [
        { call: 'first_word("hello world")', expected: "hello" },
        { call: 'first_word("python")', expected: "python" },
        { call: 'first_word("")', expected: "" },
        { call: 'first_word("one two three")', expected: "one" },
      ],
      { fnName: "first_word" },
    ),
    quizMC(
      "d2-t-mut",
      {
        en: "Which statement is <strong>false</strong>?",
        zh: "下面哪句话是<strong>错的</strong>?",
      },
      [
        { en: "<code>s.upper()</code> returns a new string", zh: "<code>s.upper()</code> 返回新字符串" },
        { en: "<code>&quot;x&quot; in &quot;fox&quot;</code> is <code>True</code>", zh: "<code>&quot;x&quot; in &quot;fox&quot;</code> 是 <code>True</code>" },
        { en: "<code>s[0] = &quot;A&quot;</code> modifies <code>s</code>", zh: "<code>s[0] = &quot;A&quot;</code> 会修改 <code>s</code>" },
        { en: "<code>len(&quot;&quot;)</code> is <code>0</code>", zh: "<code>len(&quot;&quot;)</code> 是 <code>0</code>" },
      ],
      2,
      {
        en: "Strings are immutable — you can&apos;t assign into them.",
        zh: "字符串不可变 —— 不能往里赋值。",
      },
    ),
    exercise(
      "d2-t-initials",
      {
        en: "<p>Write <code>initials(name)</code> that returns a string of uppercase initials. <code>&quot;john fitzgerald kennedy&quot;</code> → <code>&quot;JFK&quot;</code>.</p><p>Assume words are separated by single spaces and non-empty.</p>",
        zh: "<p>写一个 <code>initials(name)</code>,返回姓名的大写首字母缩写。<code>&quot;john fitzgerald kennedy&quot;</code> → <code>&quot;JFK&quot;</code>。</p><p>假设单词之间是单个空格,单词都不为空。</p>",
      },
      "def initials(name):\n    # your code here\n    pass\n",
      'def initials(name):\n    return "".join(w[0].upper() for w in name.split(" "))\n',
      {
        en: "Split on space. Take the first character of each word. Uppercase. Join.",
        zh: "按空格切开,取每个单词的首字母,转大写,再拼起来。",
      },
      [
        { call: 'initials("john fitzgerald kennedy")', expected: "JFK" },
        { call: 'initials("ada lovelace")', expected: "AL" },
        { call: 'initials("guido")', expected: "G" },
      ],
      { fnName: "initials" },
    ),
    exercise(
      "d2-t-palindrome-strict",
      {
        en: "<p>Write <code>is_palindrome_clean(s)</code> — case-insensitive, but also ignore any character that is not a letter or digit. <code>&quot;A man, a plan, a canal: Panama&quot;</code> should return <code>True</code>.</p>",
        zh: "<p>写一个 <code>is_palindrome_clean(s)</code> —— 不区分大小写,并且忽略所有非字母非数字的字符。<code>&quot;A man, a plan, a canal: Panama&quot;</code> 应返回 <code>True</code>。</p>",
      },
      "def is_palindrome_clean(s):\n    # your code here\n    pass\n",
      "def is_palindrome_clean(s):\n    cleaned = ''.join(ch for ch in s.lower() if ch.isalnum())\n    return cleaned == cleaned[::-1]\n",
      {
        en: "Lowercase. Keep only alphanumeric characters (<code>ch.isalnum()</code>). Compare to reverse.",
        zh: "转小写。只保留字母和数字(<code>ch.isalnum()</code>)。和反转后的比较。",
      },
      [
        { call: 'is_palindrome_clean("A man, a plan, a canal: Panama")', expected: true },
        { call: 'is_palindrome_clean("race a car")', expected: false },
        { call: 'is_palindrome_clean(" ")', expected: true },
        { call: 'is_palindrome_clean("")', expected: true },
      ],
      { fnName: "is_palindrome_clean" },
    ),
  ],
};

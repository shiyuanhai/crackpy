// 14-Day Python Interview Prep Curriculum
// Each day: concepts (explanation + code) + problems (starter, solution, tests)

import type { Day } from "./types";

export const COURSE: Day[] = [
  // ============= DAY 1 =============
  {
    id: 1,
    title: "Python Basics & I/O",
    subtitle: "Variables, types, and your first programs",
    estimatedTime: "45 min",
    objectives: [
      "Declare variables and understand Python's dynamic typing",
      "Use int, float, str, bool and convert between them",
      "Print output and read input",
    ],
    concepts: [
      {
        title: "Variables & Dynamic Typing",
        content: `<p>Python is <strong>dynamically typed</strong> — you don't declare a variable's type. The interpreter figures it out at runtime. Assignment uses a single <code>=</code>.</p>
        <p>Common built-in types you'll use constantly in interviews:</p>
        <ul>
          <li><code>int</code> — integers: <code>42</code></li>
          <li><code>float</code> — decimals: <code>3.14</code></li>
          <li><code>str</code> — text: <code>"hello"</code> or <code>'hello'</code></li>
          <li><code>bool</code> — <code>True</code> or <code>False</code> (capitalized!)</li>
          <li><code>None</code> — null / absence of value</li>
        </ul>
        <p>Use <code>type(x)</code> to check the type of a variable.</p>`,
        code: `name = "Alice"
age = 25
height = 5.6
is_student = True
nothing = None

print(name, age, height, is_student, nothing)
print(type(age))        # <class 'int'>
print(type(height))     # <class 'float'>`,
      },
      {
        title: "Arithmetic & Operators",
        content: `<p>Python's math operators behave mostly as expected, with two key ones worth memorizing:</p>
        <ul>
          <li><code>/</code> — true division (always returns float): <code>7 / 2 == 3.5</code></li>
          <li><code>//</code> — floor division (integer division): <code>7 // 2 == 3</code></li>
          <li><code>%</code> — modulo (remainder): <code>7 % 2 == 1</code></li>
          <li><code>**</code> — exponent: <code>2 ** 10 == 1024</code></li>
        </ul>
        <p>The modulo operator <code>%</code> is <strong>extremely common</strong> in LeetCode — used for FizzBuzz, digit extraction, cyclic problems.</p>`,
        code: `a, b = 17, 5
print(a + b)    # 22
print(a - b)    # 12
print(a * b)    # 85
print(a / b)    # 3.4
print(a // b)   # 3   (floor division)
print(a % b)    # 2   (remainder)
print(a ** b)   # 1419857 (17^5)`,
      },
      {
        title: "Type Conversion",
        content: `<p>Convert between types with constructor functions: <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>.</p>
        <p>Interview gotcha: <code>input()</code> <strong>always</strong> returns a string — you must cast it to int for math.</p>`,
        code: `# String to int
num_str = "42"
num = int(num_str)
print(num + 8)  # 50

# Int to string (for concatenation)
score = 95
print("Score: " + str(score))

# Float to int (truncates, doesn't round!)
print(int(3.9))   # 3
print(int(-3.9))  # -3`,
      },
      {
        title: "Printing & Input",
        content: `<p><code>print()</code> can take multiple arguments separated by commas. It adds a space between them by default. Use <code>sep=</code> and <code>end=</code> to customize.</p>
        <p><code>input()</code> prompts the user and returns a string.</p>`,
        code: `# Multiple args with custom separator
print("a", "b", "c", sep="-")       # a-b-c
print("loading", end="...")          # no newline
print("done")                        # loading...done

# f-strings (Python 3.6+) — the best way to format
name = "Alice"
age = 25
print(f"{name} is {age} years old")
print(f"In 5 years: {age + 5}")`,
      },
    ],
    problems: [
      {
        id: "d1p1",
        title: "Sum of Two Numbers",
        difficulty: "Easy",
        description: "Write a function <code>sum_two(a, b)</code> that returns the sum of two numbers.",
        starter: `def sum_two(a, b):
    # Your code here
    pass

# Tests
print(sum_two(3, 5))    # Expected: 8
print(sum_two(-1, 1))   # Expected: 0
print(sum_two(0, 0))    # Expected: 0`,
        solution: `def sum_two(a, b):
    return a + b

print(sum_two(3, 5))
print(sum_two(-1, 1))
print(sum_two(0, 0))`,
        hint: "Use the + operator and return the result.",
        tests: [
          { call: "sum_two(3, 5)", expected: 8 },
          { call: "sum_two(-1, 1)", expected: 0 },
          { call: "sum_two(100, 200)", expected: 300 },
        ],
        fnName: "sum_two",
      },
      {
        id: "d1p2",
        title: "Celsius to Fahrenheit",
        difficulty: "Easy",
        description: "Convert Celsius to Fahrenheit. Formula: <code>F = C * 9/5 + 32</code>",
        starter: `def c_to_f(celsius):
    # Your code here
    pass

print(c_to_f(0))     # Expected: 32.0
print(c_to_f(100))   # Expected: 212.0
print(c_to_f(37))    # Expected: 98.6`,
        solution: `def c_to_f(celsius):
    return celsius * 9/5 + 32

print(c_to_f(0))
print(c_to_f(100))
print(c_to_f(37))`,
        hint: "Apply the formula directly. Remember operator precedence: * and / happen before +.",
        tests: [
          { call: "c_to_f(0)", expected: 32.0 },
          { call: "c_to_f(100)", expected: 212.0 },
          { call: "c_to_f(-40)", expected: -40.0 },
        ],
        fnName: "c_to_f",
      },
      {
        id: "d1p3",
        title: "Last Digit",
        difficulty: "Easy",
        description: "Return the last digit of a positive integer. Hint: <code>%</code> is your friend.",
        starter: `def last_digit(n):
    # Your code here
    pass

print(last_digit(123))    # Expected: 3
print(last_digit(7))      # Expected: 7
print(last_digit(1000))   # Expected: 0`,
        solution: `def last_digit(n):
    return n % 10

print(last_digit(123))
print(last_digit(7))
print(last_digit(1000))`,
        hint: "n % 10 gives the last digit because it's the remainder when divided by 10.",
        tests: [
          { call: "last_digit(123)", expected: 3 },
          { call: "last_digit(7)", expected: 7 },
          { call: "last_digit(1000)", expected: 0 },
        ],
        fnName: "last_digit",
      },
    ],
  },

  // ============= DAY 2 =============
  {
    id: 2,
    title: "Control Flow",
    subtitle: "Conditionals, loops, and the art of branching",
    estimatedTime: "60 min",
    objectives: [
      "Write conditionals with if/elif/else",
      "Iterate with for loops and range()",
      "Use while loops and break/continue",
    ],
    concepts: [
      {
        title: "if / elif / else",
        content: `<p>Python uses <strong>indentation</strong> (4 spaces) to define code blocks — no curly braces. A colon ends the condition line.</p>
        <p>Comparison operators: <code>==</code> <code>!=</code> <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>.</p>
        <p>Logical operators: <code>and</code>, <code>or</code>, <code>not</code> — use these words, not <code>&&</code> or <code>||</code>.</p>`,
        code: `score = 87

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(grade)  # B

# Combining conditions
age = 25
has_license = True
if age >= 18 and has_license:
    print("Can drive")`,
      },
      {
        title: "for loops with range()",
        content: `<p><code>range(stop)</code> produces numbers 0 to stop-1. <code>range(start, stop)</code> gives start to stop-1. <code>range(start, stop, step)</code> allows a custom step.</p>
        <p>Always remember: <strong>range's stop is exclusive</strong>.</p>`,
        code: `# 0 to 4
for i in range(5):
    print(i)

# 2 to 9
for i in range(2, 10):
    print(i)

# 0, 2, 4, 6, 8
for i in range(0, 10, 2):
    print(i)

# Countdown: 10 to 1
for i in range(10, 0, -1):
    print(i)`,
      },
      {
        title: "while loops, break, continue",
        content: `<p><code>while</code> runs as long as the condition is true. <code>break</code> exits the loop immediately. <code>continue</code> skips to the next iteration.</p>
        <p>Use <code>while</code> when you don't know in advance how many iterations you need (e.g., searching until a condition is met).</p>`,
        code: `# While loop
n = 10
while n > 0:
    print(n)
    n -= 1

# break: exit on first match
for i in range(100):
    if i * i > 50:
        print(f"Found: {i}")  # 8
        break

# continue: skip even numbers
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 1, 3, 5, 7, 9`,
      },
    ],
    problems: [
      {
        id: "d2p1",
        title: "FizzBuzz",
        difficulty: "Easy",
        description: "Return a list of strings from 1 to n. For multiples of 3 use 'Fizz', multiples of 5 use 'Buzz', multiples of both use 'FizzBuzz'. Otherwise the number as a string.",
        starter: `def fizzbuzz(n):
    result = []
    # Your code here
    return result

print(fizzbuzz(15))
# Expected: ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz']`,
        solution: `def fizzbuzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

print(fizzbuzz(15))`,
        hint: "Check for multiples of 15 (3 AND 5) FIRST, then 3, then 5, then default to the number.",
        tests: [
          { call: "fizzbuzz(5)", expected: ["1","2","Fizz","4","Buzz"] },
          { call: "fizzbuzz(3)", expected: ["1","2","Fizz"] },
          { call: "fizzbuzz(15)", expected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"] },
        ],
        fnName: "fizzbuzz",
      },
      {
        id: "d2p2",
        title: "Sum of Even Numbers",
        difficulty: "Easy",
        description: "Return the sum of all even numbers from 1 to n (inclusive).",
        starter: `def sum_evens(n):
    # Your code here
    pass

print(sum_evens(10))  # Expected: 30 (2+4+6+8+10)
print(sum_evens(5))   # Expected: 6  (2+4)`,
        solution: `def sum_evens(n):
    total = 0
    for i in range(2, n + 1, 2):
        total += i
    return total

print(sum_evens(10))
print(sum_evens(5))`,
        hint: "Use range(2, n+1, 2) to iterate over evens directly.",
        tests: [
          { call: "sum_evens(10)", expected: 30 },
          { call: "sum_evens(5)", expected: 6 },
          { call: "sum_evens(1)", expected: 0 },
        ],
        fnName: "sum_evens",
      },
      {
        id: "d2p3",
        title: "Count Digits",
        difficulty: "Easy",
        description: "Count the number of digits in a positive integer WITHOUT converting to a string.",
        starter: `def count_digits(n):
    # Your code here
    pass

print(count_digits(12345))  # Expected: 5
print(count_digits(7))      # Expected: 1
print(count_digits(100))    # Expected: 3`,
        solution: `def count_digits(n):
    count = 0
    while n > 0:
        n //= 10
        count += 1
    return count if count > 0 else 1

print(count_digits(12345))
print(count_digits(7))
print(count_digits(100))`,
        hint: "Use a while loop and keep dividing n by 10 until it's 0, counting each step.",
        tests: [
          { call: "count_digits(12345)", expected: 5 },
          { call: "count_digits(7)", expected: 1 },
          { call: "count_digits(100)", expected: 3 },
        ],
        fnName: "count_digits",
      },
    ],
  },

  // ============= DAY 3 =============
  {
    id: 3,
    title: "Functions & Recursion",
    subtitle: "Reusable code blocks and calling yourself",
    estimatedTime: "60 min",
    objectives: [
      "Define and call functions with parameters and return values",
      "Use default arguments and keyword arguments",
      "Understand recursion and base cases",
    ],
    concepts: [
      {
        title: "Defining Functions",
        content: `<p>Functions are defined with <code>def</code>. Parameters go in parentheses, body is indented, and <code>return</code> sends back a value. A function without <code>return</code> returns <code>None</code>.</p>
        <p>Type hints (optional, but you'll see them in modern code):</p>
        <pre><code>def add(a: int, b: int) -> int:
    return a + b</code></pre>`,
        code: `def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

# Multiple return values (actually a tuple)
def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([4, 1, 9, 2])
print(lo, hi)  # 1 9`,
      },
      {
        title: "Default & Keyword Arguments",
        content: `<p>Give parameters default values. Callers can pass arguments <strong>positionally</strong> or by <strong>keyword</strong>.</p>
        <p>Gotcha: <strong>never use mutable defaults</strong> (like <code>[]</code> or <code>{}</code>) — they're shared across calls. Use <code>None</code> and create inside.</p>`,
        code: `def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))                    # Hello, Alice!
print(greet("Bob", "Hi"))                # Hi, Bob!
print(greet(name="Carol", greeting="Hey"))  # Hey, Carol!

# DANGER: mutable default
def bad_append(x, lst=[]):
    lst.append(x)
    return lst

print(bad_append(1))  # [1]
print(bad_append(2))  # [1, 2] — surprising!

# Correct pattern:
def good_append(x, lst=None):
    if lst is None:
        lst = []
    lst.append(x)
    return lst`,
      },
      {
        title: "Recursion",
        content: `<p>A recursive function calls itself with a smaller problem. Every recursion needs:</p>
        <ol>
          <li><strong>Base case</strong> — when to stop</li>
          <li><strong>Recursive case</strong> — reduce the problem</li>
        </ol>
        <p>Recursion appears constantly in trees, graphs, and DP. Master it.</p>`,
        code: `def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))  # 120

# Fibonacci — classic but slow without memoization
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

print(fib(10))  # 55`,
      },
      {
        title: "Lambda Functions",
        content: `<p>Small anonymous functions written inline. Syntax: <code>lambda args: expression</code>. Body must be a single expression.</p>
        <p>Most common use: as <code>key</code> for <code>sort()</code>, <code>max()</code>, <code>min()</code>.</p>`,
        code: `square = lambda x: x * x
print(square(5))  # 25

# Sorting by custom key
words = ["banana", "pie", "apple", "cherry"]
words.sort(key=lambda w: len(w))
print(words)  # ['pie', 'apple', 'banana', 'cherry']

# Sort tuples by second element
pairs = [(1, 'b'), (2, 'a'), (3, 'c')]
pairs.sort(key=lambda p: p[1])
print(pairs)  # [(2, 'a'), (1, 'b'), (3, 'c')]`,
      },
    ],
    problems: [
      {
        id: "d3p1",
        title: "Factorial (Recursive)",
        difficulty: "Easy",
        description: "Compute n! recursively. <code>0! = 1</code>, <code>n! = n * (n-1)!</code>.",
        starter: `def factorial(n):
    # Base case?
    # Recursive case?
    pass

print(factorial(0))  # 1
print(factorial(5))  # 120
print(factorial(7))  # 5040`,
        solution: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(0))
print(factorial(5))
print(factorial(7))`,
        hint: "Base case: n <= 1 returns 1. Recursive case: n * factorial(n-1).",
        tests: [
          { call: "factorial(0)", expected: 1 },
          { call: "factorial(5)", expected: 120 },
          { call: "factorial(7)", expected: 5040 },
        ],
        fnName: "factorial",
      },
      {
        id: "d3p2",
        title: "Power of Two",
        difficulty: "Easy",
        description: "Return True if n is a power of 2 (1, 2, 4, 8, 16, ...), else False. Any approach is fine.",
        starter: `def is_power_of_two(n):
    # Your code here
    pass

print(is_power_of_two(1))    # True  (2^0)
print(is_power_of_two(16))   # True  (2^4)
print(is_power_of_two(18))   # False
print(is_power_of_two(0))    # False`,
        solution: `def is_power_of_two(n):
    if n <= 0:
        return False
    while n % 2 == 0:
        n //= 2
    return n == 1

print(is_power_of_two(1))
print(is_power_of_two(16))
print(is_power_of_two(18))
print(is_power_of_two(0))`,
        hint: "Keep dividing by 2 while even. If you end at 1, it's a power of 2. Handle n <= 0 first.",
        tests: [
          { call: "is_power_of_two(1)", expected: true },
          { call: "is_power_of_two(16)", expected: true },
          { call: "is_power_of_two(18)", expected: false },
          { call: "is_power_of_two(0)", expected: false },
        ],
        fnName: "is_power_of_two",
      },
      {
        id: "d3p3",
        title: "Sum to N (Recursive)",
        difficulty: "Easy",
        description: "Return the sum of integers from 1 to n using recursion (no loops).",
        starter: `def sum_to_n(n):
    # Your code here
    pass

print(sum_to_n(1))   # 1
print(sum_to_n(5))   # 15
print(sum_to_n(10))  # 55`,
        solution: `def sum_to_n(n):
    if n <= 0:
        return 0
    return n + sum_to_n(n - 1)

print(sum_to_n(1))
print(sum_to_n(5))
print(sum_to_n(10))`,
        hint: "Base case: n <= 0 returns 0. Recursive: n + sum_to_n(n-1).",
        tests: [
          { call: "sum_to_n(1)", expected: 1 },
          { call: "sum_to_n(5)", expected: 15 },
          { call: "sum_to_n(10)", expected: 55 },
        ],
        fnName: "sum_to_n",
      },
    ],
  },

  // ============= DAY 4 =============
  {
    id: 4,
    title: "Strings",
    subtitle: "Manipulation, slicing, and every string method you'll need",
    estimatedTime: "60 min",
    objectives: [
      "Index and slice strings",
      "Use built-in string methods",
      "Understand string immutability",
    ],
    concepts: [
      {
        title: "Indexing & Slicing",
        content: `<p>Strings (and lists) support <strong>negative indexing</strong> from the end: <code>s[-1]</code> is the last char.</p>
        <p>Slicing: <code>s[start:stop:step]</code>. All are optional. <code>stop</code> is exclusive.</p>
        <p>The famous reverse trick: <code>s[::-1]</code>.</p>`,
        code: `s = "interview"
print(s[0])      # 'i'
print(s[-1])     # 'w'
print(s[0:5])    # 'inter'
print(s[5:])     # 'view'
print(s[:5])     # 'inter'
print(s[::2])    # 'itrie'   (every 2nd)
print(s[::-1])   # 'weivretni' (reversed)
print(len(s))    # 9`,
      },
      {
        title: "Essential String Methods",
        content: `<p>Strings are <strong>immutable</strong> — every "modification" returns a new string.</p>
        <p>The methods you'll use 90% of the time:</p>
        <ul>
          <li><code>.lower()</code> / <code>.upper()</code></li>
          <li><code>.strip()</code> — remove leading/trailing whitespace</li>
          <li><code>.split(sep)</code> — split into list</li>
          <li><code>sep.join(list)</code> — join list into string</li>
          <li><code>.replace(old, new)</code></li>
          <li><code>.find(sub)</code> — index or -1</li>
          <li><code>.startswith(p)</code> / <code>.endswith(s)</code></li>
          <li><code>.isdigit()</code> / <code>.isalpha()</code> / <code>.isalnum()</code></li>
        </ul>`,
        code: `s = "  Hello, World!  "
print(s.strip())                 # "Hello, World!"
print(s.lower())                 # "  hello, world!  "
print(s.strip().replace("World", "Python"))  # "Hello, Python!"

# split and join
csv = "apple,banana,cherry"
fruits = csv.split(",")
print(fruits)                    # ['apple', 'banana', 'cherry']
print(" | ".join(fruits))        # "apple | banana | cherry"

# Character checks
print("abc123".isalnum())        # True
print("abc".isalpha())           # True
print("123".isdigit())           # True`,
      },
      {
        title: "String Formatting (f-strings)",
        content: `<p>f-strings (Python 3.6+) are the modern, readable way to format strings. Put <code>f</code> before the quote, then <code>{expression}</code> inline.</p>
        <p>Format spec after a colon: <code>{x:.2f}</code> for 2 decimal places, <code>{x:>10}</code> right-align in 10 chars.</p>`,
        code: `name = "Alice"
score = 87.5

print(f"{name} scored {score}")
print(f"{name} scored {score:.1f}")      # one decimal
print(f"Percentage: {score/100:.0%}")    # as percent
print(f"{name:>10}")                     # right-aligned
print(f"{name:*<10}")                    # left-pad with *`,
      },
    ],
    problems: [
      {
        id: "d4p1",
        title: "Reverse String",
        difficulty: "Easy",
        description: "Reverse a string. Try to do it two ways: with slicing, and with a loop.",
        starter: `def reverse_string(s):
    # Your code here
    pass

print(reverse_string("hello"))     # 'olleh'
print(reverse_string("a"))         # 'a'
print(reverse_string(""))          # ''`,
        solution: `def reverse_string(s):
    return s[::-1]

# Or with a loop:
# def reverse_string(s):
#     result = ""
#     for ch in s:
#         result = ch + result
#     return result

print(reverse_string("hello"))
print(reverse_string("a"))
print(reverse_string(""))`,
        hint: "Slicing: s[::-1]. Or build a new string by prepending each char.",
        tests: [
          { call: "reverse_string('hello')", expected: "olleh" },
          { call: "reverse_string('a')", expected: "a" },
          { call: "reverse_string('')", expected: "" },
        ],
        fnName: "reverse_string",
      },
      {
        id: "d4p2",
        title: "Valid Palindrome (Easy)",
        difficulty: "Easy",
        description: "Return True if string is a palindrome, ignoring case and non-alphanumeric characters. 'A man, a plan, a canal: Panama' → True.",
        starter: `def is_palindrome(s):
    # Your code here
    pass

print(is_palindrome("A man, a plan, a canal: Panama"))  # True
print(is_palindrome("race a car"))                       # False
print(is_palindrome(""))                                 # True`,
        solution: `def is_palindrome(s):
    cleaned = "".join(ch.lower() for ch in s if ch.isalnum())
    return cleaned == cleaned[::-1]

print(is_palindrome("A man, a plan, a canal: Panama"))
print(is_palindrome("race a car"))
print(is_palindrome(""))`,
        hint: "Filter to only alphanumeric chars, lowercase them, then compare to reverse.",
        tests: [
          { call: "is_palindrome('A man, a plan, a canal: Panama')", expected: true },
          { call: "is_palindrome('race a car')", expected: false },
          { call: "is_palindrome('')", expected: true },
        ],
        fnName: "is_palindrome",
      },
      {
        id: "d4p3",
        title: "Count Vowels",
        difficulty: "Easy",
        description: "Count vowels (a, e, i, o, u) in a string, case-insensitive.",
        starter: `def count_vowels(s):
    # Your code here
    pass

print(count_vowels("hello"))       # 2
print(count_vowels("AEIOU"))       # 5
print(count_vowels("xyz"))         # 0`,
        solution: `def count_vowels(s):
    vowels = set("aeiou")
    return sum(1 for ch in s.lower() if ch in vowels)

print(count_vowels("hello"))
print(count_vowels("AEIOU"))
print(count_vowels("xyz"))`,
        hint: "Use a set of vowels for O(1) lookup. Lowercase the string first.",
        tests: [
          { call: "count_vowels('hello')", expected: 2 },
          { call: "count_vowels('AEIOU')", expected: 5 },
          { call: "count_vowels('xyz')", expected: 0 },
        ],
        fnName: "count_vowels",
      },
    ],
  },

  // ============= DAY 5 =============
  {
    id: 5,
    title: "Lists & List Comprehensions",
    subtitle: "The workhorse data structure of Python",
    estimatedTime: "75 min",
    objectives: [
      "Create, modify, and slice lists",
      "Use list methods: append, pop, sort, reverse, index",
      "Write list comprehensions",
    ],
    concepts: [
      {
        title: "List Basics & Methods",
        content: `<p>Lists are <strong>mutable</strong>, ordered, and can hold mixed types. They're Python's most-used container.</p>
        <p>Key operations (know the time complexity!):</p>
        <ul>
          <li><code>append(x)</code> — add to end. O(1)</li>
          <li><code>pop()</code> — remove last. O(1)</li>
          <li><code>pop(0)</code> — remove first. <strong>O(n) — avoid!</strong> Use <code>deque</code> instead.</li>
          <li><code>insert(i, x)</code> — insert at index. O(n)</li>
          <li><code>in</code> — membership. O(n) for list (vs O(1) for set).</li>
          <li><code>sort()</code> — in place. O(n log n)</li>
          <li><code>sorted(lst)</code> — returns new list.</li>
        </ul>`,
        code: `nums = [3, 1, 4, 1, 5, 9, 2, 6]
nums.append(5)         # [3,1,4,1,5,9,2,6,5]
last = nums.pop()      # 5; nums changes
nums.sort()            # in place
print(nums)            # [1,1,2,3,4,5,6,9]

nums.reverse()
print(nums)            # [9,6,5,4,3,2,1,1]

print(3 in nums)       # True
print(nums.index(5))   # 2 (first occurrence)
print(nums.count(1))   # 2`,
      },
      {
        title: "Slicing & Copying",
        content: `<p>Same slicing as strings: <code>lst[start:stop:step]</code>. Slicing returns a <strong>new list</strong>.</p>
        <p>Gotcha: <code>b = a</code> does <strong>not</strong> copy — both names point to the same list. Use <code>a.copy()</code> or <code>a[:]</code> for a shallow copy.</p>`,
        code: `a = [1, 2, 3, 4, 5]
print(a[1:4])     # [2, 3, 4]
print(a[:3])      # [1, 2, 3]
print(a[::-1])    # [5, 4, 3, 2, 1]

# Reference vs copy
b = a              # same list!
b.append(99)
print(a)           # [1,2,3,4,5,99] — changed!

c = a[:]           # copy
c.append(100)
print(a)           # unchanged`,
      },
      {
        title: "List Comprehensions",
        content: `<p>A concise way to build lists. Pattern:</p>
        <pre><code>[expression for item in iterable if condition]</code></pre>
        <p>Equivalent to a for loop with append, but faster and more Pythonic. Learn to recognize and write these — interviewers expect fluency here.</p>`,
        code: `# Squares of 0-9
squares = [x*x for x in range(10)]
print(squares)

# Even numbers from a list
nums = [1, 2, 3, 4, 5, 6]
evens = [n for n in nums if n % 2 == 0]
print(evens)  # [2, 4, 6]

# Transform strings
words = ["hello", "world"]
upper = [w.upper() for w in words]
print(upper)  # ['HELLO', 'WORLD']

# Nested
matrix = [[1,2,3], [4,5,6]]
flat = [x for row in matrix for x in row]
print(flat)   # [1,2,3,4,5,6]`,
      },
      {
        title: "enumerate & zip",
        content: `<p><code>enumerate(lst)</code> — iterate with index AND value. Don't use <code>range(len(lst))</code>!</p>
        <p><code>zip(a, b)</code> — iterate two lists in parallel.</p>`,
        code: `fruits = ["apple", "banana", "cherry"]

for i, fruit in enumerate(fruits):
    print(i, fruit)

# Parallel iteration
names = ["Alice", "Bob", "Carol"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age}")`,
      },
    ],
    problems: [
      {
        id: "d5p1",
        title: "Two Sum (Brute Force)",
        difficulty: "Easy",
        description: "Given a list of integers and a target, return the INDICES of two numbers that add up to target. Assume exactly one solution exists. Use nested loops (O(n²)).",
        starter: `def two_sum(nums, target):
    # Your code here
    pass

print(two_sum([2, 7, 11, 15], 9))   # [0, 1]
print(two_sum([3, 2, 4], 6))        # [1, 2]
print(two_sum([3, 3], 6))           # [0, 1]`,
        solution: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

print(two_sum([2, 7, 11, 15], 9))
print(two_sum([3, 2, 4], 6))
print(two_sum([3, 3], 6))`,
        hint: "Outer loop i from 0, inner loop j from i+1. Check if nums[i] + nums[j] == target.",
        tests: [
          { call: "two_sum([2, 7, 11, 15], 9)", expected: [0, 1] },
          { call: "two_sum([3, 2, 4], 6)", expected: [1, 2] },
          { call: "two_sum([3, 3], 6)", expected: [0, 1] },
        ],
        fnName: "two_sum",
      },
      {
        id: "d5p2",
        title: "Find Max Element",
        difficulty: "Easy",
        description: "Return the maximum element of a list. Don't use built-in max() — write the loop yourself.",
        starter: `def find_max(nums):
    # Your code here
    pass

print(find_max([3, 1, 4, 1, 5, 9, 2, 6]))  # 9
print(find_max([-5, -1, -10]))              # -1
print(find_max([42]))                        # 42`,
        solution: `def find_max(nums):
    best = nums[0]
    for n in nums[1:]:
        if n > best:
            best = n
    return best

print(find_max([3, 1, 4, 1, 5, 9, 2, 6]))
print(find_max([-5, -1, -10]))
print(find_max([42]))`,
        hint: "Initialize with first element. Loop through the rest and update when you see a larger value.",
        tests: [
          { call: "find_max([3, 1, 4, 1, 5, 9, 2, 6])", expected: 9 },
          { call: "find_max([-5, -1, -10])", expected: -1 },
          { call: "find_max([42])", expected: 42 },
        ],
        fnName: "find_max",
      },
      {
        id: "d5p3",
        title: "Move Zeros to End",
        difficulty: "Easy",
        description: "Given a list, move all zeros to the end while keeping the order of non-zero elements. Return a new list.",
        starter: `def move_zeros(nums):
    # Your code here
    pass

print(move_zeros([0, 1, 0, 3, 12]))   # [1, 3, 12, 0, 0]
print(move_zeros([0, 0, 1]))          # [1, 0, 0]
print(move_zeros([1, 2, 3]))          # [1, 2, 3]`,
        solution: `def move_zeros(nums):
    non_zeros = [n for n in nums if n != 0]
    zeros = [0] * (len(nums) - len(non_zeros))
    return non_zeros + zeros

print(move_zeros([0, 1, 0, 3, 12]))
print(move_zeros([0, 0, 1]))
print(move_zeros([1, 2, 3]))`,
        hint: "Build a list of non-zeros, then append the right number of zeros.",
        tests: [
          { call: "move_zeros([0, 1, 0, 3, 12])", expected: [1, 3, 12, 0, 0] },
          { call: "move_zeros([0, 0, 1])", expected: [1, 0, 0] },
          { call: "move_zeros([1, 2, 3])", expected: [1, 2, 3] },
        ],
        fnName: "move_zeros",
      },
    ],
  },

  // ============= DAY 6 =============
  {
    id: 6,
    title: "Dicts, Sets, & Tuples",
    subtitle: "Hash maps are your best friend in interviews",
    estimatedTime: "75 min",
    objectives: [
      "Use dictionaries (hash maps) — the most important interview data structure",
      "Use sets for O(1) membership and deduplication",
      "Know when to use tuples (immutable ordered pairs)",
    ],
    concepts: [
      {
        title: "Dictionaries (Hash Maps)",
        content: `<p>Dictionaries store <strong>key-value pairs</strong>. Lookup, insert, delete are all <strong>O(1) average</strong>.</p>
        <p>Keys must be <strong>hashable</strong> (immutable): strings, numbers, tuples — NOT lists.</p>
        <p>This is THE interview data structure. Half of LeetCode easy problems are solved by "count with a dict" or "check with a dict".</p>`,
        code: `d = {"alice": 25, "bob": 30}
d["carol"] = 35               # add
d["alice"] = 26               # update
print(d["bob"])               # 30
print(d.get("dave", 0))       # 0 (default if missing)
print("alice" in d)           # True

# Iterate
for key in d:
    print(key, d[key])

for key, value in d.items():
    print(key, value)

print(list(d.keys()))
print(list(d.values()))

# Delete
del d["bob"]
removed = d.pop("carol")`,
      },
      {
        title: "The Count Pattern",
        content: `<p>Counting frequencies is the <strong>single most common</strong> hash map pattern in interviews. Master this.</p>
        <p>Even better: <code>collections.Counter</code> does it for you.</p>`,
        code: `# Manual counting
s = "banana"
count = {}
for ch in s:
    count[ch] = count.get(ch, 0) + 1
print(count)  # {'b': 1, 'a': 3, 'n': 2}

# Using Counter
from collections import Counter
print(Counter("banana"))         # Counter({'a': 3, 'n': 2, 'b': 1})
print(Counter("banana").most_common(1))  # [('a', 3)]`,
      },
      {
        title: "Sets",
        content: `<p>A <strong>set</strong> is an unordered collection of unique elements. Membership is <strong>O(1)</strong>.</p>
        <p>Uses: deduplication, fast "does this contain x?" checks, set algebra.</p>`,
        code: `s = {1, 2, 3, 2, 1}
print(s)              # {1, 2, 3}

s.add(4)
s.discard(2)          # no error if missing
print(2 in s)         # False

# Set operations
a = {1, 2, 3}
b = {2, 3, 4}
print(a | b)          # union {1,2,3,4}
print(a & b)          # intersection {2,3}
print(a - b)          # difference {1}
print(a ^ b)          # symmetric diff {1,4}

# Dedupe a list
nums = [1, 2, 2, 3, 3, 3]
print(list(set(nums)))   # [1, 2, 3] (order not guaranteed)`,
      },
      {
        title: "Tuples",
        content: `<p>Immutable, ordered, hashable (if all elements are hashable). Often used for returning multiple values, or as dictionary keys.</p>`,
        code: `point = (3, 4)
x, y = point           # unpack
print(x, y)            # 3 4

# As dict keys (lists can't be keys!)
locations = {(0, 0): "origin", (1, 2): "point A"}
print(locations[(0, 0)])

# Single-element tuple needs trailing comma
single = (5,)
print(type(single))    # <class 'tuple'>`,
      },
    ],
    problems: [
      {
        id: "d6p1",
        title: "Two Sum (Optimal with Hash Map)",
        difficulty: "Easy",
        description: "Same as before — return indices of two numbers that sum to target — but now in <strong>O(n)</strong> using a hash map.",
        starter: `def two_sum(nums, target):
    # Your code here — use a dictionary for O(n) solution
    pass

print(two_sum([2, 7, 11, 15], 9))   # [0, 1]
print(two_sum([3, 2, 4], 6))        # [1, 2]
print(two_sum([3, 3], 6))           # [0, 1]`,
        solution: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []

print(two_sum([2, 7, 11, 15], 9))
print(two_sum([3, 2, 4], 6))
print(two_sum([3, 3], 6))`,
        hint: "For each number n, check if target-n is already in the dict. If yes, return indices. Else, store n's index.",
        tests: [
          { call: "two_sum([2, 7, 11, 15], 9)", expected: [0, 1] },
          { call: "two_sum([3, 2, 4], 6)", expected: [1, 2] },
          { call: "two_sum([3, 3], 6)", expected: [0, 1] },
        ],
        fnName: "two_sum",
      },
      {
        id: "d6p2",
        title: "Contains Duplicate",
        difficulty: "Easy",
        description: "Return True if the list contains any duplicate values. O(n) with a set.",
        starter: `def contains_duplicate(nums):
    # Your code here
    pass

print(contains_duplicate([1, 2, 3, 1]))  # True
print(contains_duplicate([1, 2, 3, 4]))  # False
print(contains_duplicate([]))            # False`,
        solution: `def contains_duplicate(nums):
    return len(nums) != len(set(nums))

print(contains_duplicate([1, 2, 3, 1]))
print(contains_duplicate([1, 2, 3, 4]))
print(contains_duplicate([]))`,
        hint: "If turning into a set changes the length, there were duplicates. One-liner!",
        tests: [
          { call: "contains_duplicate([1, 2, 3, 1])", expected: true },
          { call: "contains_duplicate([1, 2, 3, 4])", expected: false },
          { call: "contains_duplicate([])", expected: false },
        ],
        fnName: "contains_duplicate",
      },
      {
        id: "d6p3",
        title: "Valid Anagram",
        difficulty: "Easy",
        description: "Return True if two strings are anagrams (same letters, different order).",
        starter: `def is_anagram(s, t):
    # Your code here
    pass

print(is_anagram("anagram", "nagaram"))  # True
print(is_anagram("rat", "car"))          # False
print(is_anagram("a", "ab"))             # False`,
        solution: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    from collections import Counter
    return Counter(s) == Counter(t)

print(is_anagram("anagram", "nagaram"))
print(is_anagram("rat", "car"))
print(is_anagram("a", "ab"))`,
        hint: "Count letters in each string and compare. Or just sort both and compare.",
        tests: [
          { call: "is_anagram('anagram', 'nagaram')", expected: true },
          { call: "is_anagram('rat', 'car')", expected: false },
          { call: "is_anagram('a', 'ab')", expected: false },
        ],
        fnName: "is_anagram",
      },
    ],
  },

  // ============= DAY 7 =============
  {
    id: 7,
    title: "Stacks & Queues",
    subtitle: "LIFO, FIFO, and the classic matching problems",
    estimatedTime: "60 min",
    objectives: [
      "Use a list as a stack",
      "Use collections.deque as an efficient queue",
      "Solve matching problems with stacks",
    ],
    concepts: [
      {
        title: "Stacks (LIFO)",
        content: `<p><strong>Last In, First Out</strong>. Think of a pile of plates — add/remove from the top.</p>
        <p>Python's <code>list</code> is already a stack: <code>append()</code> to push, <code>pop()</code> to pop.</p>
        <p>Use stacks when you need to <strong>remember something and come back to it later</strong> — matching brackets, undo operations, expression parsing, DFS.</p>`,
        code: `stack = []
stack.append(1)      # push
stack.append(2)
stack.append(3)
print(stack)         # [1, 2, 3]

top = stack.pop()    # 3
print(top, stack)    # 3 [1, 2]

# Peek without popping
if stack:
    print(stack[-1]) # 2`,
      },
      {
        title: "Queues (FIFO)",
        content: `<p><strong>First In, First Out</strong>. Think of a line at a store.</p>
        <p>Don't use <code>list.pop(0)</code> — it's O(n)! Use <code>collections.deque</code> for O(1) on both ends.</p>
        <p>Queues are used in BFS, scheduling, buffering.</p>`,
        code: `from collections import deque

q = deque()
q.append(1)          # enqueue
q.append(2)
q.append(3)

first = q.popleft()  # dequeue — O(1)
print(first, q)      # 1 deque([2, 3])

# Deque can also act as stack
q.appendleft(0)
print(q)             # deque([0, 2, 3])`,
      },
      {
        title: "The Matching Pattern",
        content: `<p>When you see brackets, tags, or anything "opening/closing", think <strong>stack</strong>. Push openers, and when you see a closer, pop and check it matches.</p>`,
        code: `# Simple example: check balanced parens only
def balanced(s):
    count = 0
    for ch in s:
        if ch == '(':
            count += 1
        elif ch == ')':
            count -= 1
            if count < 0:
                return False
    return count == 0

print(balanced("(())"))    # True
print(balanced("(()"))     # False
print(balanced(")("))      # False`,
      },
    ],
    problems: [
      {
        id: "d7p1",
        title: "Valid Parentheses",
        difficulty: "Easy",
        description: "Given a string containing only '(' ')' '{' '}' '[' ']', return True if brackets are properly matched and nested.",
        starter: `def is_valid(s):
    # Your code here
    pass

print(is_valid("()"))       # True
print(is_valid("()[]{}"))   # True
print(is_valid("(]"))       # False
print(is_valid("([)]"))     # False
print(is_valid("{[]}"))     # True`,
        solution: `def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        else:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack

print(is_valid("()"))
print(is_valid("()[]{}"))
print(is_valid("(]"))
print(is_valid("([)]"))
print(is_valid("{[]}"))`,
        hint: "Map each closing bracket to its opener. Push openers; for closers, check stack top matches.",
        tests: [
          { call: "is_valid('()')", expected: true },
          { call: "is_valid('()[]{}')", expected: true },
          { call: "is_valid('(]')", expected: false },
          { call: "is_valid('([)]')", expected: false },
          { call: "is_valid('{[]}')", expected: true },
        ],
        fnName: "is_valid",
      },
      {
        id: "d7p2",
        title: "Reverse a String with a Stack",
        difficulty: "Easy",
        description: "Use a stack to reverse a string (as practice, not because it's the best way).",
        starter: `def reverse_with_stack(s):
    # Your code here
    pass

print(reverse_with_stack("hello"))   # 'olleh'
print(reverse_with_stack("abc"))     # 'cba'`,
        solution: `def reverse_with_stack(s):
    stack = list(s)
    result = ""
    while stack:
        result += stack.pop()
    return result

print(reverse_with_stack("hello"))
print(reverse_with_stack("abc"))`,
        hint: "Push each char, then pop them all into a new string.",
        tests: [
          { call: "reverse_with_stack('hello')", expected: "olleh" },
          { call: "reverse_with_stack('abc')", expected: "cba" },
          { call: "reverse_with_stack('')", expected: "" },
        ],
        fnName: "reverse_with_stack",
      },
      {
        id: "d7p3",
        title: "Baseball Game",
        difficulty: "Easy",
        description: `Each element is one of:<br>
- An integer — record this score<br>
- "+" — new score = sum of previous two<br>
- "D" — new score = 2 × previous<br>
- "C" — remove the previous score<br>
Return the final total.`,
        starter: `def cal_points(ops):
    # Your code here
    pass

print(cal_points(["5","2","C","D","+"]))    # 30
# 5, 2, remove 2 -> [5], double -> [5,10], sum of last two -> [5,10,15]. total = 30

print(cal_points(["5","-2","4","C","D","9","+","+"]))  # 27`,
        solution: `def cal_points(ops):
    stack = []
    for op in ops:
        if op == "+":
            stack.append(stack[-1] + stack[-2])
        elif op == "D":
            stack.append(stack[-1] * 2)
        elif op == "C":
            stack.pop()
        else:
            stack.append(int(op))
    return sum(stack)

print(cal_points(["5","2","C","D","+"]))
print(cal_points(["5","-2","4","C","D","9","+","+"]))`,
        hint: "A stack tracks recent scores. Each op either pushes, pops, or computes from last 1–2 values.",
        tests: [
          { call: "cal_points(['5','2','C','D','+'])", expected: 30 },
          { call: "cal_points(['5','-2','4','C','D','9','+','+'])", expected: 27 },
        ],
        fnName: "cal_points",
      },
    ],
  },

  // ============= DAY 8 =============
  {
    id: 8,
    title: "Linked Lists",
    subtitle: "Pointer gymnastics — the interview classic",
    estimatedTime: "75 min",
    objectives: [
      "Understand the Node class and how linked lists are built",
      "Traverse, insert, and delete nodes",
      "Reverse a linked list (the quintessential question)",
    ],
    concepts: [
      {
        title: "The Node class",
        content: `<p>A linked list is a chain of nodes, each holding a <code>value</code> and a reference (<code>next</code>) to the next node. The last node's <code>next</code> is <code>None</code>.</p>
        <p>Unlike arrays, random access is O(n) — you can only walk from the head. But insertion/deletion at known nodes is O(1).</p>`,
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Build 1 -> 2 -> 3
head = ListNode(1, ListNode(2, ListNode(3)))

# Traverse and print
def print_list(node):
    while node:
        print(node.val, end=" -> ")
        node = node.next
    print("None")

print_list(head)   # 1 -> 2 -> 3 -> None`,
      },
      {
        title: "Traversal & Length",
        content: `<p>Walking a linked list: set a <code>current</code> pointer to the head, advance until <code>None</code>.</p>`,
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

head = ListNode(1, ListNode(2, ListNode(3, ListNode(4))))

def length(head):
    n = 0
    current = head
    while current:
        n += 1
        current = current.next
    return n

print(length(head))  # 4`,
      },
      {
        title: "The Reverse Pattern (must-memorize)",
        content: `<p>Reversing is done with <strong>three pointers</strong>: <code>prev</code>, <code>curr</code>, <code>next_node</code>.</p>
        <p>At each step: save next, flip curr's pointer backward, advance prev and curr. Draw it on paper until you can do it in your sleep.</p>`,
        code: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next   # save
        curr.next = prev         # flip
        prev = curr              # advance prev
        curr = next_node         # advance curr
    return prev   # new head`,
      },
    ],
    problems: [
      {
        id: "d8p1",
        title: "Reverse Linked List",
        difficulty: "Easy",
        description: "Reverse a singly linked list. Helper <code>list_to_linked</code> and <code>linked_to_list</code> are provided for easy testing.",
        starter: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def list_to_linked(arr):
    dummy = ListNode()
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def linked_to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

def reverse_list(head):
    # Your code here
    pass

print(linked_to_list(reverse_list(list_to_linked([1,2,3,4,5]))))  # [5,4,3,2,1]
print(linked_to_list(reverse_list(list_to_linked([1,2]))))        # [2,1]
print(linked_to_list(reverse_list(list_to_linked([]))))           # []`,
        solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def list_to_linked(arr):
    dummy = ListNode()
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def linked_to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

def reverse_list(head):
    prev, curr = None, head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev

print(linked_to_list(reverse_list(list_to_linked([1,2,3,4,5]))))
print(linked_to_list(reverse_list(list_to_linked([1,2]))))
print(linked_to_list(reverse_list(list_to_linked([]))))`,
        hint: "Three pointers: prev=None, curr=head. In loop: save curr.next, flip curr.next to prev, move prev and curr forward.",
        skipAutoTest: true,
      },
      {
        id: "d8p2",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        description: "Merge two sorted linked lists into one sorted list. Use a dummy node to simplify.",
        starter: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def list_to_linked(arr):
    dummy = ListNode()
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def linked_to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

def merge_two(l1, l2):
    # Your code here — use a dummy node!
    pass

print(linked_to_list(merge_two(list_to_linked([1,2,4]), list_to_linked([1,3,4]))))
# Expected: [1,1,2,3,4,4]`,
        solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def list_to_linked(arr):
    dummy = ListNode()
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def linked_to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

def merge_two(l1, l2):
    dummy = ListNode()
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next

print(linked_to_list(merge_two(list_to_linked([1,2,4]), list_to_linked([1,3,4]))))`,
        hint: "Create a dummy node. Walk both lists, append the smaller node. When one runs out, attach the rest of the other.",
        skipAutoTest: true,
      },
    ],
  },

  // ============= DAY 9 =============
  {
    id: 9,
    title: "Binary Trees",
    subtitle: "Recursion's happiest playground",
    estimatedTime: "75 min",
    objectives: [
      "Understand the TreeNode structure",
      "Traverse: preorder, inorder, postorder (DFS), and level-order (BFS)",
      "Solve tree problems with recursion",
    ],
    concepts: [
      {
        title: "TreeNode",
        content: `<p>A binary tree node has a value and up to two children: <code>left</code> and <code>right</code>.</p>
        <p>Recursion is the natural way to process trees — solve left subtree, solve right subtree, combine.</p>`,
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

#       3
#      / \\
#     9   20
#        /  \\
#       15   7
root = TreeNode(3,
    TreeNode(9),
    TreeNode(20, TreeNode(15), TreeNode(7)))`,
      },
      {
        title: "DFS Traversals",
        content: `<p>Three orders — memorize by <em>where you visit the node</em>:</p>
        <ul>
          <li><strong>Preorder</strong>: node, left, right</li>
          <li><strong>Inorder</strong>: left, node, right — on a BST, this gives sorted order</li>
          <li><strong>Postorder</strong>: left, right, node</li>
        </ul>`,
        code: `def preorder(node):
    if not node: return
    print(node.val)
    preorder(node.left)
    preorder(node.right)

def inorder(node):
    if not node: return
    inorder(node.left)
    print(node.val)
    inorder(node.right)

def postorder(node):
    if not node: return
    postorder(node.left)
    postorder(node.right)
    print(node.val)`,
      },
      {
        title: "BFS (Level Order)",
        content: `<p>Visit all nodes level by level using a <strong>queue</strong>. Classic BFS pattern.</p>`,
        code: `from collections import deque

def level_order(root):
    if not root: return []
    result = []
    q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result`,
      },
    ],
    problems: [
      {
        id: "d9p1",
        title: "Max Depth of Binary Tree",
        difficulty: "Easy",
        description: "Return the maximum depth (number of nodes on the longest path root → leaf).",
        starter: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    # Your code here
    pass

# Build:     3
#           / \\
#          9   20
#             /  \\
#            15   7
root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(max_depth(root))   # 3
print(max_depth(None))   # 0`,
        solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(max_depth(root))
print(max_depth(None))`,
        hint: "Base: None → 0. Recursive: 1 + max(depth(left), depth(right)).",
        skipAutoTest: true,
      },
      {
        id: "d9p2",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        description: "Swap left and right children everywhere (mirror the tree).",
        starter: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    # Your code here
    pass

def to_list(node):
    if not node: return None
    return [node.val, to_list(node.left), to_list(node.right)]

#     4                 4
#    / \\               / \\
#   2   7    =>       7   2
#  /\\  /\\           /\\  /\\
# 1  3 6  9          9 6 3  1
root = TreeNode(4,
    TreeNode(2, TreeNode(1), TreeNode(3)),
    TreeNode(7, TreeNode(6), TreeNode(9)))
print(to_list(invert_tree(root)))`,
        solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root

def to_list(node):
    if not node: return None
    return [node.val, to_list(node.left), to_list(node.right)]

root = TreeNode(4,
    TreeNode(2, TreeNode(1), TreeNode(3)),
    TreeNode(7, TreeNode(6), TreeNode(9)))
print(to_list(invert_tree(root)))`,
        hint: "Swap left and right children, then recurse into both sides.",
        skipAutoTest: true,
      },
    ],
  },

  // ============= DAY 10 =============
  {
    id: 10,
    title: "Graphs & BFS/DFS",
    subtitle: "Islands, connections, and exploring everywhere",
    estimatedTime: "75 min",
    objectives: [
      "Represent graphs as adjacency lists",
      "Traverse with BFS (queue) and DFS (recursion or stack)",
      "Track visited nodes to avoid infinite loops",
    ],
    concepts: [
      {
        title: "Adjacency List",
        content: `<p>A graph is a set of nodes (vertices) and edges. Represent it as a <strong>dict of lists</strong>: each key is a node, value is its neighbors.</p>`,
        code: `# Undirected graph:
#   A - B
#   |   |
#   C - D
graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C"],
}`,
      },
      {
        title: "BFS — shortest path in unweighted graphs",
        content: `<p>Queue-based. Explore level by level. Use a <code>visited</code> set to avoid re-visits.</p>`,
        code: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    q = deque([start])
    while q:
        node = q.popleft()
        print(node)
        for nei in graph[node]:
            if nei not in visited:
                visited.add(nei)
                q.append(nei)`,
      },
      {
        title: "DFS — explore deep first",
        content: `<p>Recursive or stack-based. Go as deep as possible, then backtrack.</p>`,
        code: `def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    if node in visited:
        return
    visited.add(node)
    print(node)
    for nei in graph[node]:
        dfs(graph, nei, visited)`,
      },
    ],
    problems: [
      {
        id: "d10p1",
        title: "Number of Islands",
        difficulty: "Medium",
        description: "Given a 2D grid of '1' (land) and '0' (water), count the number of islands. Islands are horizontally/vertically connected.",
        starter: `def num_islands(grid):
    # Your code here — DFS or BFS each unvisited land cell
    pass

g1 = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]
print(num_islands(g1))  # 3

g2 = [["1","1","1"],["0","1","0"],["1","1","1"]]
print(num_islands(g2))  # 1`,
        solution: `def num_islands(grid):
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"  # mark visited
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                dfs(r, c)
    return count

g1 = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
print(num_islands(g1))

g2 = [["1","1","1"],["0","1","0"],["1","1","1"]]
print(num_islands(g2))`,
        hint: "Iterate each cell. When you find '1', increment count and DFS to sink the whole island (mark all connected '1's as '0').",
        skipAutoTest: true,
      },
      {
        id: "d10p2",
        title: "Has Path (Graph)",
        difficulty: "Easy",
        description: "Given an adjacency list, return True if there's a path from src to dst.",
        starter: `def has_path(graph, src, dst):
    # Your code here — DFS or BFS
    pass

g = {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}
print(has_path(g, "A", "D"))  # True
print(has_path(g, "D", "A"))  # False
print(has_path(g, "A", "A"))  # True`,
        solution: `def has_path(graph, src, dst):
    if src == dst:
        return True
    visited = set()
    def dfs(n):
        if n == dst:
            return True
        visited.add(n)
        for nei in graph.get(n, []):
            if nei not in visited and dfs(nei):
                return True
        return False
    return dfs(src)

g = {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}
print(has_path(g, "A", "D"))
print(has_path(g, "D", "A"))
print(has_path(g, "A", "A"))`,
        hint: "DFS from src, return True if you hit dst. Use visited set to avoid cycles.",
        tests: [
          { call: "has_path({'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}, 'A', 'D')", expected: true },
          { call: "has_path({'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}, 'D', 'A')", expected: false },
          { call: "has_path({'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}, 'A', 'A')", expected: true },
        ],
        fnName: "has_path",
      },
    ],
  },

  // ============= DAY 11 =============
  {
    id: 11,
    title: "Sorting & Binary Search",
    subtitle: "The log(n) superpower",
    estimatedTime: "75 min",
    objectives: [
      "Use Python's built-in sort with custom keys",
      "Implement binary search correctly (off-by-one is everyone's nemesis)",
      "Recognize when a problem needs binary search",
    ],
    concepts: [
      {
        title: "Sorting in Python",
        content: `<p><code>sorted(lst)</code> returns a new sorted list. <code>lst.sort()</code> sorts in place. Both are O(n log n) TimSort.</p>
        <p>Customize with <code>key=</code>, reverse with <code>reverse=True</code>.</p>`,
        code: `nums = [3, 1, 4, 1, 5, 9, 2, 6]
print(sorted(nums))              # ascending
print(sorted(nums, reverse=True))

words = ["banana", "pie", "apple"]
print(sorted(words, key=len))    # by length
print(sorted(words, key=lambda w: w[-1]))  # by last letter

# Sort tuples by 2nd then 1st
pairs = [(1, 3), (2, 1), (1, 2)]
print(sorted(pairs, key=lambda p: (p[1], p[0])))`,
      },
      {
        title: "Binary Search Template",
        content: `<p>Works on <strong>sorted</strong> data. Compare middle to target, discard half each step → O(log n).</p>
        <p>Template to memorize:</p>`,
        code: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

print(binary_search([-1,0,3,5,9,12], 9))   # 4
print(binary_search([-1,0,3,5,9,12], 2))   # -1`,
      },
      {
        title: "When to Binary Search",
        content: `<p>Signs a problem wants binary search:</p>
        <ul>
          <li>Array is sorted (or can be)</li>
          <li>You're looking for a specific value, boundary, or "first/last X"</li>
          <li>Expected complexity is O(log n) or O(n log n)</li>
          <li>Answer is within a numeric range you can "guess and check" monotonically</li>
        </ul>`,
        code: `# Built-in: bisect module
import bisect
nums = [1, 3, 5, 7, 9]
print(bisect.bisect_left(nums, 5))   # 2 (first index where 5 could go)
print(bisect.bisect_right(nums, 5))  # 3 (after existing 5s)`,
      },
    ],
    problems: [
      {
        id: "d11p1",
        title: "Binary Search",
        difficulty: "Easy",
        description: "Classic: return index of target in sorted array, or -1 if not found.",
        starter: `def search(nums, target):
    # Your code here
    pass

print(search([-1,0,3,5,9,12], 9))   # 4
print(search([-1,0,3,5,9,12], 2))   # -1
print(search([5], 5))               # 0
print(search([], 1))                # -1`,
        solution: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

print(search([-1,0,3,5,9,12], 9))
print(search([-1,0,3,5,9,12], 2))
print(search([5], 5))
print(search([], 1))`,
        hint: "Standard template: lo=0, hi=len-1, while lo<=hi, compute mid, compare.",
        tests: [
          { call: "search([-1,0,3,5,9,12], 9)", expected: 4 },
          { call: "search([-1,0,3,5,9,12], 2)", expected: -1 },
          { call: "search([5], 5)", expected: 0 },
          { call: "search([], 1)", expected: -1 },
        ],
        fnName: "search",
      },
      {
        id: "d11p2",
        title: "Search Insert Position",
        difficulty: "Easy",
        description: "Given a sorted array and target, return its index if found; otherwise, return the index where it would be inserted in order. Must be O(log n).",
        starter: `def search_insert(nums, target):
    # Your code here
    pass

print(search_insert([1,3,5,6], 5))  # 2
print(search_insert([1,3,5,6], 2))  # 1
print(search_insert([1,3,5,6], 7))  # 4
print(search_insert([1,3,5,6], 0))  # 0`,
        solution: `def search_insert(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo

print(search_insert([1,3,5,6], 5))
print(search_insert([1,3,5,6], 2))
print(search_insert([1,3,5,6], 7))
print(search_insert([1,3,5,6], 0))`,
        hint: "Use a 'lower bound' variant: lo=0, hi=len, while lo<hi, return lo at end.",
        tests: [
          { call: "search_insert([1,3,5,6], 5)", expected: 2 },
          { call: "search_insert([1,3,5,6], 2)", expected: 1 },
          { call: "search_insert([1,3,5,6], 7)", expected: 4 },
          { call: "search_insert([1,3,5,6], 0)", expected: 0 },
        ],
        fnName: "search_insert",
      },
      {
        id: "d11p3",
        title: "Sort by Absolute Value",
        difficulty: "Easy",
        description: "Sort numbers by their absolute value (ties broken by original sign doesn't matter).",
        starter: `def sort_by_abs(nums):
    # Your code here — use sorted() with a key
    pass

print(sort_by_abs([-5, 2, -3, 1, -1]))   # [1, -1, 2, -3, -5] or similar by |x|
print(sort_by_abs([-7, 4, 3, -2]))       # [-2, 3, 4, -7]`,
        solution: `def sort_by_abs(nums):
    return sorted(nums, key=abs)

print(sort_by_abs([-5, 2, -3, 1, -1]))
print(sort_by_abs([-7, 4, 3, -2]))`,
        hint: "sorted(nums, key=abs) — one line.",
        tests: [
          { call: "sort_by_abs([-7, 4, 3, -2])", expected: [-2, 3, 4, -7] },
          { call: "sort_by_abs([1, -1, 2, -2])", expected: [1, -1, 2, -2] },
        ],
        fnName: "sort_by_abs",
      },
    ],
  },

  // ============= DAY 12 =============
  {
    id: 12,
    title: "Dynamic Programming",
    subtitle: "Remember, don't recompute",
    estimatedTime: "90 min",
    objectives: [
      "Understand memoization vs tabulation",
      "Identify overlapping subproblems",
      "Solve classic DP problems",
    ],
    concepts: [
      {
        title: "Why DP?",
        content: `<p>Naive recursive Fibonacci computes <code>fib(3)</code> many times — exponential waste. DP stores results of subproblems to avoid recomputation, bringing exponential down to polynomial.</p>
        <p>Two flavors:</p>
        <ul>
          <li><strong>Memoization</strong> (top-down): recurse + cache results</li>
          <li><strong>Tabulation</strong> (bottom-up): fill an array iteratively</li>
        </ul>`,
        code: `# Naive — O(2^n), unusable for n=40+
def fib_slow(n):
    if n < 2: return n
    return fib_slow(n-1) + fib_slow(n-2)

# Memoized — O(n)
def fib_memo(n, cache={}):
    if n < 2: return n
    if n in cache: return cache[n]
    cache[n] = fib_memo(n-1, cache) + fib_memo(n-2, cache)
    return cache[n]

print(fib_memo(50))  # 12586269025`,
      },
      {
        title: "Tabulation (bottom-up)",
        content: `<p>Build up from the smallest cases. Often cleaner and avoids recursion stack overhead.</p>`,
        code: `def fib(n):
    if n < 2: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

print(fib(10))  # 55

# Space-optimized: only need last two values
def fib_opt(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
print(fib_opt(10))  # 55`,
      },
      {
        title: "Identifying DP",
        content: `<p>Signs a problem is DP:</p>
        <ul>
          <li>"Count the number of ways..."</li>
          <li>"Maximum / minimum value such that..."</li>
          <li>"Is it possible to..."</li>
          <li>Problem has overlapping subproblems + optimal substructure</li>
        </ul>
        <p>Approach: define state clearly, write recurrence, handle base cases, then optionally optimize space.</p>`,
      },
    ],
    problems: [
      {
        id: "d12p1",
        title: "Climbing Stairs",
        difficulty: "Easy",
        description: "You're climbing n stairs. You can take 1 or 2 steps at a time. How many distinct ways to reach the top?",
        starter: `def climb_stairs(n):
    # Your code here
    pass

print(climb_stairs(2))   # 2: (1+1), (2)
print(climb_stairs(3))   # 3: (1+1+1), (1+2), (2+1)
print(climb_stairs(5))   # 8
print(climb_stairs(10))  # 89`,
        solution: `def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(n - 2):
        a, b = b, a + b
    return b

print(climb_stairs(2))
print(climb_stairs(3))
print(climb_stairs(5))
print(climb_stairs(10))`,
        hint: "ways(n) = ways(n-1) + ways(n-2). It's Fibonacci!",
        tests: [
          { call: "climb_stairs(2)", expected: 2 },
          { call: "climb_stairs(3)", expected: 3 },
          { call: "climb_stairs(5)", expected: 8 },
          { call: "climb_stairs(10)", expected: 89 },
        ],
        fnName: "climb_stairs",
      },
      {
        id: "d12p2",
        title: "House Robber",
        difficulty: "Medium",
        description: "You're a thief. You can't rob two adjacent houses. Given an array of house values, return the max you can rob.",
        starter: `def rob(nums):
    # Your code here
    pass

print(rob([1,2,3,1]))      # 4   (rob 1 and 3: 1+3)
print(rob([2,7,9,3,1]))    # 12  (rob 2,9,1)
print(rob([]))             # 0
print(rob([5]))            # 5`,
        solution: `def rob(nums):
    prev, curr = 0, 0
    for n in nums:
        prev, curr = curr, max(curr, prev + n)
    return curr

print(rob([1,2,3,1]))
print(rob([2,7,9,3,1]))
print(rob([]))
print(rob([5]))`,
        hint: "dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Either skip this house or rob it (plus 2-ago).",
        tests: [
          { call: "rob([1,2,3,1])", expected: 4 },
          { call: "rob([2,7,9,3,1])", expected: 12 },
          { call: "rob([])", expected: 0 },
          { call: "rob([5])", expected: 5 },
        ],
        fnName: "rob",
      },
    ],
  },

  // ============= DAY 13 =============
  {
    id: 13,
    title: "Two Pointers & Sliding Window",
    subtitle: "Turn O(n²) into O(n)",
    estimatedTime: "75 min",
    objectives: [
      "Apply two pointers on sorted arrays",
      "Use sliding window for substring/subarray problems",
      "Recognize the pattern signals",
    ],
    concepts: [
      {
        title: "Two Pointers",
        content: `<p>Two indices traverse the array, often from opposite ends or at different speeds. Most common on <strong>sorted</strong> arrays.</p>
        <p>Good for: pair sums, palindrome checks, reversing in place.</p>`,
        code: `# Two sum II on sorted array
def two_sum_sorted(nums, target):
    l, r = 0, len(nums) - 1
    while l < r:
        s = nums[l] + nums[r]
        if s == target:
            return [l, r]
        elif s < target:
            l += 1
        else:
            r -= 1
    return []

print(two_sum_sorted([1, 2, 3, 4, 6], 6))   # [1, 3]`,
      },
      {
        title: "Sliding Window",
        content: `<p>A window [left, right] that grows and shrinks. Great for:</p>
        <ul>
          <li>Subarray of length k</li>
          <li>Longest/shortest substring with property</li>
          <li>Sum/count in a window</li>
        </ul>
        <p>Pattern: expand right; when invalid, shrink left.</p>`,
        code: `# Max sum of subarray of length k
def max_sum_window(nums, k):
    window_sum = sum(nums[:k])
    best = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        best = max(best, window_sum)
    return best

print(max_sum_window([2,1,5,1,3,2], 3))  # 9`,
      },
    ],
    problems: [
      {
        id: "d13p1",
        title: "Valid Palindrome (Two Pointers)",
        difficulty: "Easy",
        description: "Same as Day 4 but use two pointers — O(1) extra space. Ignore non-alphanumeric, case-insensitive.",
        starter: `def is_palindrome(s):
    # Use two pointers
    pass

print(is_palindrome("A man, a plan, a canal: Panama"))  # True
print(is_palindrome("race a car"))                       # False`,
        solution: `def is_palindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True

print(is_palindrome("A man, a plan, a canal: Panama"))
print(is_palindrome("race a car"))`,
        hint: "Two pointers from ends. Skip non-alphanumeric. Compare lowercased.",
        tests: [
          { call: "is_palindrome('A man, a plan, a canal: Panama')", expected: true },
          { call: "is_palindrome('race a car')", expected: false },
          { call: "is_palindrome(' ')", expected: true },
        ],
        fnName: "is_palindrome",
      },
      {
        id: "d13p2",
        title: "Longest Substring Without Repeating Chars",
        difficulty: "Medium",
        description: "Return the length of the longest substring with all unique characters.",
        starter: `def longest_unique(s):
    # Sliding window with a set
    pass

print(longest_unique("abcabcbb"))  # 3 ("abc")
print(longest_unique("bbbbb"))     # 1
print(longest_unique("pwwkew"))    # 3 ("wke")
print(longest_unique(""))          # 0`,
        solution: `def longest_unique(s):
    seen = set()
    l = 0
    best = 0
    for r in range(len(s)):
        while s[r] in seen:
            seen.remove(s[l])
            l += 1
        seen.add(s[r])
        best = max(best, r - l + 1)
    return best

print(longest_unique("abcabcbb"))
print(longest_unique("bbbbb"))
print(longest_unique("pwwkew"))
print(longest_unique(""))`,
        hint: "Expand right with a set. When the new char is already in the set, shrink left until it's gone.",
        tests: [
          { call: "longest_unique('abcabcbb')", expected: 3 },
          { call: "longest_unique('bbbbb')", expected: 1 },
          { call: "longest_unique('pwwkew')", expected: 3 },
          { call: "longest_unique('')", expected: 0 },
        ],
        fnName: "longest_unique",
      },
      {
        id: "d13p3",
        title: "Container With Most Water",
        difficulty: "Medium",
        description: "Given heights of vertical lines, find two lines that form a container holding the most water. Return the max area.",
        starter: `def max_area(heights):
    # Two pointers from the ends
    pass

print(max_area([1,8,6,2,5,4,8,3,7]))   # 49
print(max_area([1,1]))                  # 1
print(max_area([4,3,2,1,4]))            # 16`,
        solution: `def max_area(heights):
    l, r = 0, len(heights) - 1
    best = 0
    while l < r:
        h = min(heights[l], heights[r])
        best = max(best, h * (r - l))
        if heights[l] < heights[r]:
            l += 1
        else:
            r -= 1
    return best

print(max_area([1,8,6,2,5,4,8,3,7]))
print(max_area([1,1]))
print(max_area([4,3,2,1,4]))`,
        hint: "Start wide. Area = width * min(height). Move the shorter pointer inward — moving the taller one never helps.",
        tests: [
          { call: "max_area([1,8,6,2,5,4,8,3,7])", expected: 49 },
          { call: "max_area([1,1])", expected: 1 },
          { call: "max_area([4,3,2,1,4])", expected: 16 },
        ],
        fnName: "max_area",
      },
    ],
  },

  // ============= DAY 14 =============
  {
    id: 14,
    title: "Mock Interview & Review",
    subtitle: "Put it all together — interview-ready problems",
    estimatedTime: "90 min",
    objectives: [
      "Practice pattern recognition across problems",
      "Review time & space complexity",
      "Simulate interview conditions — solve from scratch",
    ],
    concepts: [
      {
        title: "Time Complexity Cheatsheet",
        content: `<p>Memorize these common ones — interviewers ask every single time.</p>
        <ul>
          <li><strong>O(1)</strong> — dict/set lookup, list index, append, pop from end</li>
          <li><strong>O(log n)</strong> — binary search, balanced BST operations</li>
          <li><strong>O(n)</strong> — single loop, list membership, list reversal</li>
          <li><strong>O(n log n)</strong> — sorting</li>
          <li><strong>O(n²)</strong> — nested loops (e.g., brute force two sum)</li>
          <li><strong>O(2ⁿ)</strong> — naive recursion without memo (fib, subsets)</li>
        </ul>`,
      },
      {
        title: "Interview Approach (UMPIRE)",
        content: `<p>A framework for every problem:</p>
        <ol>
          <li><strong>U</strong>nderstand — restate the problem, ask about edge cases</li>
          <li><strong>M</strong>atch — does this fit a known pattern (two pointers, DP, BFS)?</li>
          <li><strong>P</strong>lan — pseudocode, state variables, walk an example</li>
          <li><strong>I</strong>mplement — write clean code</li>
          <li><strong>R</strong>eview — trace with examples, handle edges</li>
          <li><strong>E</strong>valuate — time/space complexity, alternatives</li>
        </ol>`,
      },
      {
        title: "Pattern Recognition",
        content: `<p>Map problem signals → pattern:</p>
        <ul>
          <li>"Sorted array, find value" → <strong>Binary Search</strong></li>
          <li>"Pair sums / palindrome on array" → <strong>Two Pointers</strong></li>
          <li>"Longest/shortest substring with property" → <strong>Sliding Window</strong></li>
          <li>"Count/find with counting" → <strong>Hash Map</strong></li>
          <li>"Matching / undo / parse" → <strong>Stack</strong></li>
          <li>"Shortest path unweighted" → <strong>BFS</strong></li>
          <li>"All paths / connected components" → <strong>DFS</strong></li>
          <li>"Count ways / min cost" → <strong>DP</strong></li>
        </ul>`,
      },
    ],
    problems: [
      {
        id: "d14p1",
        title: "Best Time to Buy & Sell Stock",
        difficulty: "Easy",
        description: "Given an array of prices (price[i] is price on day i), return max profit from buying once and selling once (must buy before sell).",
        starter: `def max_profit(prices):
    # Your code here
    pass

print(max_profit([7,1,5,3,6,4]))   # 5 (buy at 1, sell at 6)
print(max_profit([7,6,4,3,1]))     # 0 (no profit)
print(max_profit([2,4,1]))         # 2`,
        solution: `def max_profit(prices):
    if not prices: return 0
    min_price = prices[0]
    best = 0
    for p in prices[1:]:
        best = max(best, p - min_price)
        min_price = min(min_price, p)
    return best

print(max_profit([7,1,5,3,6,4]))
print(max_profit([7,6,4,3,1]))
print(max_profit([2,4,1]))`,
        hint: "One pass: track minimum price seen so far; at each day, compute profit if you sold today.",
        tests: [
          { call: "max_profit([7,1,5,3,6,4])", expected: 5 },
          { call: "max_profit([7,6,4,3,1])", expected: 0 },
          { call: "max_profit([2,4,1])", expected: 2 },
        ],
        fnName: "max_profit",
      },
      {
        id: "d14p2",
        title: "Group Anagrams",
        difficulty: "Medium",
        description: "Given a list of strings, group anagrams together. Return a list of groups (order inside groups doesn't matter).",
        starter: `def group_anagrams(strs):
    # Your code here
    pass

# Each anagram group should be together; example:
print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))
# Expected (some order): [['eat','tea','ate'], ['tan','nat'], ['bat']]`,
        solution: `def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = "".join(sorted(s))
        groups.setdefault(key, []).append(s)
    return list(groups.values())

print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))`,
        hint: "Use sorted string as a hash key — anagrams produce the same key.",
        skipAutoTest: true,
      },
      {
        id: "d14p3",
        title: "Maximum Subarray (Kadane's)",
        difficulty: "Medium",
        description: "Find the contiguous subarray with the largest sum.",
        starter: `def max_subarray(nums):
    # Kadane's algorithm — O(n)
    pass

print(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))   # 6  ([4,-1,2,1])
print(max_subarray([1]))                        # 1
print(max_subarray([5,4,-1,7,8]))               # 23`,
        solution: `def max_subarray(nums):
    best = current = nums[0]
    for n in nums[1:]:
        current = max(n, current + n)
        best = max(best, current)
    return best

print(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))
print(max_subarray([1]))
print(max_subarray([5,4,-1,7,8]))`,
        hint: "At each element, either extend the current subarray or start fresh. current = max(n, current+n).",
        tests: [
          { call: "max_subarray([-2,1,-3,4,-1,2,1,-5,4])", expected: 6 },
          { call: "max_subarray([1])", expected: 1 },
          { call: "max_subarray([5,4,-1,7,8])", expected: 23 },
        ],
        fnName: "max_subarray",
      },
    ],
  },
];

export default COURSE;

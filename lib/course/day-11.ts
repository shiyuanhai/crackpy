import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day11: Day = {
  id: 11,
  title: {
    en: "Trees — BFS and DFS",
    zh: "树 —— BFS 和 DFS",
  },
  subtitle: {
    en: "Binary trees are in half the interviews you&apos;ll take. Today: tree shape, and the two traversal strategies.",
    zh: "一半的面试都会考二叉树。今天搞定树的结构和两种遍历策略。",
  },
  estimatedTime: {
    en: "65–80 min",
    zh: "65–80 分钟",
  },
  goals: [
    {
      en: "Build a simple <code>TreeNode</code> class",
      zh: "写一个简单的 <code>TreeNode</code> 类",
    },
    {
      en: "Write DFS (recursive and iterative with a stack)",
      zh: "写 DFS(递归版 + 用栈的迭代版)",
    },
    {
      en: "Write BFS with a queue",
      zh: "用队列写 BFS",
    },
    {
      en: "Solve: max depth, same tree, level order",
      zh: "搞定:最大深度、相同树、层序遍历",
    },
  ],
  youWillBuild: {
    en: "Max depth, same tree, level-order traversal — three classics that use every tree pattern.",
    zh: "最大深度、相同树、层序遍历 —— 三道经典题,覆盖所有树的套路。",
  },
  steps: [
    teach(
      "d11-intro",
      {
        en: "<p>A binary tree is a node with up to two children. The standard node:</p><pre><code>class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right</code></pre><p>We&apos;ll use this class for all of today&apos;s problems. In LeetCode they provide it; here we define it ourselves.</p>",
        zh: "<p>二叉树就是每个节点最多两个子节点。标准节点长这样:</p><pre><code>class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right</code></pre><p>今天所有题都用这个类。LeetCode 会帮你定义好;这里我们自己写。</p>",
      },
    ),
    demo(
      "d11-build-demo",
      {
        en: "<p>Build a tree and read its values:</p>",
        zh: "<p>建一棵树,读几个值看看:</p>",
      },
      'class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n#       1\n#      / \\\n#     2   3\n#    /\n#   4\nroot = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3))\nprint(root.val)\nprint(root.left.val)\nprint(root.left.left.val)\nprint(root.right.val)',
    ),
    teach(
      "d11-dfs",
      {
        en: "<p><strong>DFS (Depth-first search).</strong> Go deep, then backtrack. Recursion is natural here:</p><pre><code>def dfs(node):\n    if node is None:\n        return\n    # pre-order: visit before children\n    dfs(node.left)\n    # in-order: visit between children\n    dfs(node.right)\n    # post-order: visit after children</code></pre><p>Three orders — pre / in / post — differ only in <em>when</em> you touch the node relative to children. For BSTs, in-order gives sorted values. For most computation, post-order (compute from leaves up) is the workhorse.</p>",
        zh: "<p><strong>DFS(深度优先搜索)。</strong>一路走到底再回溯。递归写起来最顺:</p><pre><code>def dfs(node):\n    if node is None:\n        return\n    # 前序:先访问节点再访问子节点\n    dfs(node.left)\n    # 中序:左右子节点之间访问\n    dfs(node.right)\n    # 后序:子节点都访问完再访问节点</code></pre><p>前/中/后三种顺序,只差在<em>什么时候</em>处理节点。BST 的中序遍历出来就是有序的。多数计算用后序(从叶子往上算)更自然。</p>",
      },
    ),
    exercise(
      "d11-ex-max-depth",
      {
        en: "<p><strong>LeetCode #104 — Max Depth of Binary Tree.</strong> Return the number of nodes along the longest path from root to any leaf. (Empty tree → 0.)</p><p>The <code>TreeNode</code> class has already been defined in this environment.</p>",
        zh: "<p><strong>LeetCode #104 —— 二叉树的最大深度。</strong>返回从根到叶最长路径上的节点数。(空树 → 0。)</p><p>环境里已经定义好了 <code>TreeNode</code>。</p>",
      },
      "# TreeNode available: has .val, .left, .right\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef max_depth(root):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef max_depth(root):\n    if root is None:\n        return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))\n",
      {
        en: "Base case: <code>None</code> → 0. Otherwise 1 + max of children&apos;s depths. Post-order recursion.",
        zh: "基准情形:<code>None</code> → 0。否则 1 + 两个子树深度的最大值。典型后序递归。",
      },
      [
        { call: "max_depth(None)", expected: 0 },
        { call: "max_depth(TreeNode(1))", expected: 1 },
        { call: "max_depth(TreeNode(1, TreeNode(2), TreeNode(3)))", expected: 2 },
        {
          call: "max_depth(TreeNode(1, TreeNode(2, TreeNode(4, TreeNode(5)))))",
          expected: 4,
        },
      ],
      { fnName: "max_depth" },
    ),
    exercise(
      "d11-ex-same-tree",
      {
        en: "<p><strong>LeetCode #100 — Same Tree.</strong> Return <code>True</code> if two binary trees are structurally identical with the same values.</p>",
        zh: "<p><strong>LeetCode #100 —— 相同的树。</strong>两棵二叉树结构相同且值相同就返回 <code>True</code>。</p>",
      },
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_same_tree(p, q):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_same_tree(p, q):\n    if p is None and q is None:\n        return True\n    if p is None or q is None:\n        return False\n    return p.val == q.val and is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)\n",
      {
        en: "Both None → True. One None → False. Else values must match and both subtrees must match recursively.",
        zh: "都是 None → True。只有一个是 None → False。否则值要相同,左右子树都要递归相同。",
      },
      [
        { call: "is_same_tree(None, None)", expected: true },
        { call: "is_same_tree(TreeNode(1), None)", expected: false },
        { call: "is_same_tree(TreeNode(1), TreeNode(1))", expected: true },
        {
          call: "is_same_tree(TreeNode(1, TreeNode(2)), TreeNode(1, None, TreeNode(2)))",
          expected: false,
        },
      ],
      { fnName: "is_same_tree" },
    ),
    checkpoint(
      "d11-cp",
      {
        en: "BFS — level-by-level",
        zh: "BFS —— 一层一层",
      },
      {
        en: "DFS goes deep. BFS goes wide. Use a queue.",
        zh: "DFS 往深走,BFS 往宽走。用队列。",
      },
    ),
    teach(
      "d11-bfs",
      {
        en: "<p><strong>BFS (Breadth-first search)</strong> — visit level by level. Use a <code>deque</code>:</p><pre><code>from collections import deque\n\ndef bfs(root):\n    if not root:\n        return\n    q = deque([root])\n    while q:\n        level_size = len(q)\n        for _ in range(level_size):\n            node = q.popleft()\n            # process node\n            if node.left:\n                q.append(node.left)\n            if node.right:\n                q.append(node.right)</code></pre><p>The <code>level_size</code> snapshot lets you process one level at a time. Useful for: level-order, right-side view, zigzag order, shortest path in unweighted graphs.</p>",
        zh: "<p><strong>BFS(广度优先搜索)</strong> —— 一层一层地访问。用 <code>deque</code>:</p><pre><code>from collections import deque\n\ndef bfs(root):\n    if not root:\n        return\n    q = deque([root])\n    while q:\n        level_size = len(q)\n        for _ in range(level_size):\n            node = q.popleft()\n            # 处理节点\n            if node.left:\n                q.append(node.left)\n            if node.right:\n                q.append(node.right)</code></pre><p>先记下当前 <code>level_size</code>,就能一层一层处理。适用于:层序、右视图、Z 字形、无权图最短路。</p>",
      },
    ),
    exercise(
      "d11-ex-level-order",
      {
        en: "<p><strong>LeetCode #102 — Level Order Traversal.</strong> Return a list of lists, one per level, containing node values from left to right.</p>",
        zh: "<p><strong>LeetCode #102 —— 层序遍历。</strong>返回一个二维列表,每层一行,按从左到右的节点值排列。</p>",
      },
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef level_order(root):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef level_order(root):\n    if not root:\n        return []\n    from collections import deque\n    q = deque([root])\n    result = []\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            level.append(node.val)\n            if node.left:\n                q.append(node.left)\n            if node.right:\n                q.append(node.right)\n        result.append(level)\n    return result\n",
      {
        en: "BFS with the <code>level_size</code> trick. Append <code>node.val</code> to the current level list.",
        zh: "BFS 加上 <code>level_size</code> 小技巧。把 <code>node.val</code> 塞进当前层的列表。",
      },
      [
        { call: "level_order(None)", expected: [] },
        { call: "level_order(TreeNode(1))", expected: [[1]] },
        {
          call:
            "level_order(TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7))))",
          expected: [[3], [9, 20], [15, 7]],
        },
      ],
      { fnName: "level_order" },
    ),
    quizMC(
      "d11-q-when",
      {
        en: "You want to find the <em>shortest</em> path from root to a node matching some predicate. Which traversal?",
        zh: "你要找从根到某个满足条件节点的<em>最短</em>路径。用哪种遍历?",
      },
      [
        { en: "Pre-order DFS", zh: "前序 DFS" },
        { en: "Post-order DFS", zh: "后序 DFS" },
        { en: "BFS", zh: "BFS" },
        { en: "In-order DFS", zh: "中序 DFS" },
      ],
      2,
      {
        en: "BFS visits closer nodes first, so the first match is the closest one. DFS may find a deep match before exploring closer ones.",
        zh: "BFS 先访问近的节点,第一个命中就是最近的。DFS 可能先摸到远处的才找到近处的。",
      },
    ),
    recall(
      "d11-recall",
      {
        en: "Why is the recursive DFS for <code>max_depth</code> so short? What does <em>post-order</em> have to do with it?",
        zh: "为什么 <code>max_depth</code> 的递归 DFS 这么短?跟<em>后序</em>有什么关系?",
      },
      {
        en: "The function only decides its own answer after getting the children&apos;s depths. That&apos;s post-order: process after recursing into children. Because each node relies on children first, the computation bubbles up from leaves to root.",
        zh: "函数要先拿到子节点的深度,才能决定自己的答案。这就是后序:处理节点之前先递归处理子节点。每个节点依赖子节点,所以计算就从叶子往根冒泡。",
      },
    ),
    teach(
      "d11-wrap",
      {
        en: "<p>Today:</p><ul><li>Tree node structure</li><li>DFS via recursion (pre / in / post)</li><li>BFS via <code>deque</code> with level size</li><li>Typical problems: depth, equality, level traversal</li></ul>",
        zh: "<p>今天收获:</p><ul><li>树节点结构</li><li>递归 DFS(前/中/后)</li><li>用 <code>deque</code> + level size 写 BFS</li><li>典型题:深度、判同、层序遍历</li></ul>",
      },
    ),
  ],
  finalTest: [
    exercise(
      "d11-t-invert",
      {
        en: "<p><strong>LeetCode #226 — Invert Binary Tree.</strong> Mirror the tree (swap every node&apos;s children recursively). Return the root.</p>",
        zh: "<p><strong>LeetCode #226 —— 翻转二叉树。</strong>把树镜像翻转(递归交换每个节点的左右子)。返回根节点。</p>",
      },
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef invert(root):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef invert(root):\n    if root is None:\n        return None\n    root.left, root.right = invert(root.right), invert(root.left)\n    return root\n",
      {
        en: "Base case. Swap children (recursively inverted). Return root.",
        zh: "基准情形。交换(递归翻转过的)左右子。返回根。",
      },
      [
        { call: "invert(None)", expected: null },
      ],
      { fnName: "invert", skipAutoTest: true },
    ),
    quizMC(
      "d11-t-traversal",
      {
        en: "Which traversal visits the <em>root</em> of each subtree <strong>before</strong> its children?",
        zh: "哪种遍历在访问子节点<strong>之前</strong>先访问每棵子树的<em>根</em>?",
      },
      [
        { en: "Pre-order", zh: "前序" },
        { en: "In-order", zh: "中序" },
        { en: "Post-order", zh: "后序" },
        { en: "BFS", zh: "BFS" },
      ],
      0,
      {
        en: "Pre-order: node, left, right.",
        zh: "前序:节点、左、右。",
      },
    ),
    exercise(
      "d11-t-count",
      {
        en: "<p>Write <code>count_nodes(root)</code> that returns the total number of nodes in a binary tree.</p>",
        zh: "<p>写 <code>count_nodes(root)</code>,返回二叉树的节点总数。</p>",
      },
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef count_nodes(root):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef count_nodes(root):\n    if root is None:\n        return 0\n    return 1 + count_nodes(root.left) + count_nodes(root.right)\n",
      {
        en: "Post-order: 0 if None, else 1 + left count + right count.",
        zh: "后序:None 返回 0,否则 1 + 左子数量 + 右子数量。",
      },
      [
        { call: "count_nodes(None)", expected: 0 },
        { call: "count_nodes(TreeNode(1))", expected: 1 },
        { call: "count_nodes(TreeNode(1, TreeNode(2), TreeNode(3)))", expected: 3 },
        {
          call:
            "count_nodes(TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3, None, TreeNode(5))))",
          expected: 5,
        },
      ],
      { fnName: "count_nodes" },
    ),
    exercise(
      "d11-t-right-view",
      {
        en: "<p><strong>LeetCode #199 — Right-Side View.</strong> Return the list of values you&apos;d see if you stood on the right side of the tree (one value per level).</p>",
        zh: "<p><strong>LeetCode #199 —— 右视图。</strong>站在树的右边看过去,每层能看到一个值,按从上到下返回这些值。</p>",
      },
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef right_side_view(root):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef right_side_view(root):\n    if not root:\n        return []\n    from collections import deque\n    q = deque([root])\n    result = []\n    while q:\n        size = len(q)\n        for i in range(size):\n            node = q.popleft()\n            if i == size - 1:\n                result.append(node.val)\n            if node.left:\n                q.append(node.left)\n            if node.right:\n                q.append(node.right)\n    return result\n",
      {
        en: "BFS level-by-level. At each level, append the <em>last</em> node.",
        zh: "BFS 一层一层走。每层取<em>最后</em>一个节点。",
      },
      [
        { call: "right_side_view(None)", expected: [] },
        { call: "right_side_view(TreeNode(1))", expected: [1] },
        {
          call:
            "right_side_view(TreeNode(1, TreeNode(2, None, TreeNode(5)), TreeNode(3, None, TreeNode(4))))",
          expected: [1, 3, 4],
        },
      ],
      { fnName: "right_side_view" },
    ),
  ],
};

import type { Day } from "../types";
import { teach, demo, exercise, quizMC, recall, checkpoint } from "./helpers";

export const day11: Day = {
  id: 11,
  title: "Trees — BFS and DFS",
  subtitle: "Binary trees are in half the interviews you&apos;ll take. Today: tree shape, and the two traversal strategies.",
  estimatedTime: "65–80 min",
  goals: [
    "Build a simple <code>TreeNode</code> class",
    "Write DFS (recursive and iterative with a stack)",
    "Write BFS with a queue",
    "Solve: max depth, same tree, level order",
  ],
  youWillBuild: "Max depth, same tree, level-order traversal — three classics that use every tree pattern.",
  steps: [
    teach(
      "d11-intro",
      "<p>A binary tree is a node with up to two children. The standard node:</p><pre><code>class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right</code></pre><p>We&apos;ll use this class for all of today&apos;s problems. In LeetCode they provide it; here we define it ourselves.</p>",
    ),
    demo(
      "d11-build-demo",
      "<p>Build a tree and read its values:</p>",
      'class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n#       1\n#      / \\\n#     2   3\n#    /\n#   4\nroot = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3))\nprint(root.val)\nprint(root.left.val)\nprint(root.left.left.val)\nprint(root.right.val)',
    ),
    teach(
      "d11-dfs",
      "<p><strong>DFS (Depth-first search).</strong> Go deep, then backtrack. Recursion is natural here:</p><pre><code>def dfs(node):\n    if node is None:\n        return\n    # pre-order: visit before children\n    dfs(node.left)\n    # in-order: visit between children\n    dfs(node.right)\n    # post-order: visit after children</code></pre><p>Three orders — pre / in / post — differ only in <em>when</em> you touch the node relative to children. For BSTs, in-order gives sorted values. For most computation, post-order (compute from leaves up) is the workhorse.</p>",
    ),
    exercise(
      "d11-ex-max-depth",
      "<p><strong>LeetCode #104 — Max Depth of Binary Tree.</strong> Return the number of nodes along the longest path from root to any leaf. (Empty tree → 0.)</p><p>The <code>TreeNode</code> class has already been defined in this environment.</p>",
      "# TreeNode available: has .val, .left, .right\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef max_depth(root):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef max_depth(root):\n    if root is None:\n        return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))\n",
      "Base case: <code>None</code> → 0. Otherwise 1 + max of children&apos;s depths. Post-order recursion.",
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
      "<p><strong>LeetCode #100 — Same Tree.</strong> Return <code>True</code> if two binary trees are structurally identical with the same values.</p>",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_same_tree(p, q):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_same_tree(p, q):\n    if p is None and q is None:\n        return True\n    if p is None or q is None:\n        return False\n    return p.val == q.val and is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)\n",
      "Both None → True. One None → False. Else values must match and both subtrees must match recursively.",
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
      "BFS — level-by-level",
      "DFS goes deep. BFS goes wide. Use a queue.",
    ),
    teach(
      "d11-bfs",
      "<p><strong>BFS (Breadth-first search)</strong> — visit level by level. Use a <code>deque</code>:</p><pre><code>from collections import deque\n\ndef bfs(root):\n    if not root:\n        return\n    q = deque([root])\n    while q:\n        level_size = len(q)\n        for _ in range(level_size):\n            node = q.popleft()\n            # process node\n            if node.left:\n                q.append(node.left)\n            if node.right:\n                q.append(node.right)</code></pre><p>The <code>level_size</code> snapshot lets you process one level at a time. Useful for: level-order, right-side view, zigzag order, shortest path in unweighted graphs.</p>",
    ),
    exercise(
      "d11-ex-level-order",
      "<p><strong>LeetCode #102 — Level Order Traversal.</strong> Return a list of lists, one per level, containing node values from left to right.</p>",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef level_order(root):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef level_order(root):\n    if not root:\n        return []\n    from collections import deque\n    q = deque([root])\n    result = []\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            level.append(node.val)\n            if node.left:\n                q.append(node.left)\n            if node.right:\n                q.append(node.right)\n        result.append(level)\n    return result\n",
      "BFS with the <code>level_size</code> trick. Append <code>node.val</code> to the current level list.",
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
      "You want to find the <em>shortest</em> path from root to a node matching some predicate. Which traversal?",
      ["Pre-order DFS", "Post-order DFS", "BFS", "In-order DFS"],
      2,
      "BFS visits closer nodes first, so the first match is the closest one. DFS may find a deep match before exploring closer ones.",
    ),
    recall(
      "d11-recall",
      "Why is the recursive DFS for <code>max_depth</code> so short? What does <em>post-order</em> have to do with it?",
      "The function only decides its own answer after getting the children&apos;s depths. That&apos;s post-order: process after recursing into children. Because each node relies on children first, the computation bubbles up from leaves to root.",
    ),
    teach(
      "d11-wrap",
      "<p>Today:</p><ul><li>Tree node structure</li><li>DFS via recursion (pre / in / post)</li><li>BFS via <code>deque</code> with level size</li><li>Typical problems: depth, equality, level traversal</li></ul>",
    ),
  ],
  finalTest: [
    exercise(
      "d11-t-invert",
      "<p><strong>LeetCode #226 — Invert Binary Tree.</strong> Mirror the tree (swap every node&apos;s children recursively). Return the root.</p>",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef invert(root):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef invert(root):\n    if root is None:\n        return None\n    root.left, root.right = invert(root.right), invert(root.left)\n    return root\n",
      "Base case. Swap children (recursively inverted). Return root.",
      [
        { call: "invert(None)", expected: null },
      ],
      { fnName: "invert", skipAutoTest: true },
    ),
    quizMC(
      "d11-t-traversal",
      "Which traversal visits the <em>root</em> of each subtree <strong>before</strong> its children?",
      ["Pre-order", "In-order", "Post-order", "BFS"],
      0,
      "Pre-order: node, left, right.",
    ),
    exercise(
      "d11-t-count",
      "<p>Write <code>count_nodes(root)</code> that returns the total number of nodes in a binary tree.</p>",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef count_nodes(root):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef count_nodes(root):\n    if root is None:\n        return 0\n    return 1 + count_nodes(root.left) + count_nodes(root.right)\n",
      "Post-order: 0 if None, else 1 + left count + right count.",
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
      "<p><strong>LeetCode #199 — Right-Side View.</strong> Return the list of values you&apos;d see if you stood on the right side of the tree (one value per level).</p>",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef right_side_view(root):\n    # your code here\n    pass\n",
      "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef right_side_view(root):\n    if not root:\n        return []\n    from collections import deque\n    q = deque([root])\n    result = []\n    while q:\n        size = len(q)\n        for i in range(size):\n            node = q.popleft()\n            if i == size - 1:\n                result.append(node.val)\n            if node.left:\n                q.append(node.left)\n            if node.right:\n                q.append(node.right)\n    return result\n",
      "BFS level-by-level. At each level, append the <em>last</em> node.",
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

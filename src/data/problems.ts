export interface ProblemSummary {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium";
}

export interface ProblemDetail extends ProblemSummary {
  topic: string;
  statement: string;
  constraints: string[];
  examples: { in: string; out: string }[];
  hints: string[];
  outline: string[];
}

export const topics = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Trees",
  "Graphs",
] as const;

export const problemsByTopic: Record<string, ProblemSummary[]> = {
  Arrays: [
    { id: "two-sum", title: "Two Sum", difficulty: "Easy" },
    { id: "maximum-subarray", title: "Maximum Subarray (Kadane)", difficulty: "Medium" },
  ],
  Strings: [
    { id: "valid-anagram", title: "Valid Anagram", difficulty: "Easy" },
    { id: "longest-substring", title: "Longest Substring Without Repeating", difficulty: "Medium" },
  ],
  "Linked Lists": [
    { id: "reverse-linked-list", title: "Reverse Linked List", difficulty: "Easy" },
    { id: "linked-list-cycle", title: "Linked List Cycle", difficulty: "Easy" },
  ],
  Trees: [
    { id: "level-order", title: "Binary Tree Level Order Traversal", difficulty: "Medium" },
    { id: "lca-bst", title: "Lowest Common Ancestor in BST", difficulty: "Medium" },
  ],
  Graphs: [
    { id: "number-of-islands", title: "Number of Islands", difficulty: "Medium" },
    { id: "course-schedule", title: "Course Schedule", difficulty: "Medium" },
  ],
};

export const problemDetails: Record<string, ProblemDetail> = {
  "two-sum": {
    id: "two-sum",
    topic: "Arrays",
    title: "Two Sum",
    difficulty: "Easy",
    statement:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    constraints: ["2 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i], target ≤ 10⁹"],
    examples: [
      { in: "nums = [2,7,11,15], target = 9", out: "[0,1]" },
      { in: "nums = [3,2,4], target = 6", out: "[1,2]" },
    ],
    hints: [
      "Use a data structure to remember values you have seen.",
      "What maps a value to its index in O(1) average time?",
    ],
    outline: [
      "Initialize empty hashmap m.",
      "For each index i and value x, compute y = target − x.",
      "If y in m, return [m[y], i]; else set m[x] = i.",
      "Time O(n), space O(n).",
    ],
  },
  "maximum-subarray": {
    id: "maximum-subarray",
    topic: "Arrays",
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    statement:
      "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    examples: [
      { in: "nums = [-2,1,-3,4,-1,2,1,-5,4]", out: "6 (subarray [4,-1,2,1])" },
      { in: "nums = [1]", out: "1" },
    ],
    hints: [
      "Keep track of the best sum seen so far and the current subarray sum.",
      "If the current sum becomes negative, reset it to 0.",
    ],
    outline: [
      "Initialize maxSum to first element, currentSum to 0.",
      "For each element x, add x to currentSum.",
      "Update maxSum if currentSum is greater.",
      "If currentSum < 0, reset to 0.",
      "Time O(n), space O(1).",
    ],
  },
  "valid-anagram": {
    id: "valid-anagram",
    topic: "Strings",
    title: "Valid Anagram",
    difficulty: "Easy",
    statement:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    constraints: ["1 ≤ s.length, t.length ≤ 5×10⁴", "s and t consist of lowercase English letters"],
    examples: [
      { in: 's = "anagram", t = "nagaram"', out: "true" },
      { in: 's = "rat", t = "car"', out: "false" },
    ],
    hints: [
      "Count the frequency of each character in both strings.",
      "Compare the frequency maps.",
    ],
    outline: [
      "If lengths differ, return false.",
      "Count character frequencies in s.",
      "Decrement counts based on t.",
      "Check all counts are 0.",
      "Time O(n), space O(1) (26 letters max).",
    ],
  },
  "longest-substring": {
    id: "longest-substring",
    topic: "Strings",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    statement:
      "Given a string s, find the length of the longest substring without repeating characters.",
    constraints: ["0 ≤ s.length ≤ 5×10⁴", "s consists of English letters, digits, symbols and spaces"],
    examples: [
      { in: 's = "abcabcbb"', out: "3 (substring 'abc')" },
      { in: 's = "bbbbb"', out: "1" },
    ],
    hints: [
      "Use the sliding window technique with two pointers.",
      "Use a set or hashmap to track characters in the current window.",
    ],
    outline: [
      "Initialize left = 0, maxLen = 0, and a set seen.",
      "For each right pointer, if s[right] in seen, remove s[left] and increment left.",
      "Add s[right] to seen, update maxLen.",
      "Time O(n), space O(min(n, charset)).",
    ],
  },
  "reverse-linked-list": {
    id: "reverse-linked-list",
    topic: "Linked Lists",
    title: "Reverse Linked List",
    difficulty: "Easy",
    statement:
      "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    constraints: ["The number of nodes is in range [0, 5000]", "-5000 ≤ Node.val ≤ 5000"],
    examples: [
      { in: "head = [1,2,3,4,5]", out: "[5,4,3,2,1]" },
      { in: "head = []", out: "[]" },
    ],
    hints: [
      "You can reverse it iteratively with three pointers: prev, current, next.",
      "Or recursively by reversing the rest of the list then fixing pointers.",
    ],
    outline: [
      "Initialize prev = null, curr = head.",
      "While curr is not null, save next = curr.next.",
      "Set curr.next = prev, then advance prev and curr.",
      "Time O(n), space O(1) for iterative.",
    ],
  },
  "linked-list-cycle": {
    id: "linked-list-cycle",
    topic: "Linked Lists",
    title: "Linked List Cycle",
    difficulty: "Easy",
    statement:
      "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    constraints: ["The number of nodes is in range [0, 10⁴]", "-10⁵ ≤ Node.val ≤ 10⁵"],
    examples: [
      { in: "head = [3,2,0,-4], pos = 1 (cycle)", out: "true" },
      { in: "head = [1], pos = -1 (no cycle)", out: "false" },
    ],
    hints: [
      "Use two pointers: slow and fast.",
      "If they meet, there's a cycle.",
    ],
    outline: [
      "Initialize slow = head, fast = head.",
      "While fast and fast.next exist, move slow by 1 and fast by 2.",
      "If slow == fast, return true.",
      "Time O(n), space O(1).",
    ],
  },
  "level-order": {
    id: "level-order",
    topic: "Trees",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    statement:
      "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    constraints: ["The number of nodes is in range [0, 2000]", "-1000 ≤ Node.val ≤ 1000"],
    examples: [
      { in: "root = [3,9,20,null,null,15,7]", out: "[[3],[9,20],[15,7]]" },
      { in: "root = []", out: "[]" },
    ],
    hints: [
      "Use a queue (BFS) to process nodes level by level.",
      "Track the number of nodes at each level.",
    ],
    outline: [
      "Initialize a queue with root, result = [].",
      "While queue is not empty, process all nodes at current level.",
      "Add their children to queue for next level.",
      "Time O(n), space O(n).",
    ],
  },
  "lca-bst": {
    id: "lca-bst",
    topic: "Trees",
    title: "Lowest Common Ancestor in BST",
    difficulty: "Medium",
    statement:
      "Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.",
    constraints: ["The number of nodes is in range [2, 10⁵]", "-10⁹ ≤ Node.val ≤ 10⁹", "All Node.val are unique"],
    examples: [
      { in: "root = [6,2,8,0,4,7,9], p = 2, q = 8", out: "6" },
      { in: "root = [6,2,8,0,4,7,9], p = 2, q = 4", out: "2" },
    ],
    hints: [
      "Use BST property: left < root < right.",
      "If both p and q are smaller than root, LCA is in left subtree.",
    ],
    outline: [
      "If both p and q < root.val, recurse left.",
      "If both p and q > root.val, recurse right.",
      "Otherwise, root is the LCA.",
      "Time O(h), space O(h) for recursion.",
    ],
  },
  "number-of-islands": {
    id: "number-of-islands",
    topic: "Graphs",
    title: "Number of Islands",
    difficulty: "Medium",
    statement:
      "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    constraints: ["m == grid.length", "n == grid[i].length", "1 ≤ m, n ≤ 300"],
    examples: [
      { in: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', out: "2" },
      { in: 'grid = [["1","1","1"],["0","1","0"],["1","1","1"]]', out: "1" },
    ],
    hints: [
      "Use DFS or BFS to mark all connected land cells.",
      "Count how many times you start a new DFS/BFS.",
    ],
    outline: [
      "For each cell, if it's '1' and unvisited, start DFS and increment count.",
      "Mark all connected '1's as visited.",
      "Time O(m×n), space O(m×n) for recursion.",
    ],
  },
  "course-schedule": {
    id: "course-schedule",
    topic: "Graphs",
    title: "Course Schedule",
    difficulty: "Medium",
    statement:
      "There are numCourses courses labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [aᵢ, bᵢ] indicates you must take course bᵢ first if you want to take course aᵢ. Return true if you can finish all courses, otherwise return false.",
    constraints: ["1 ≤ numCourses ≤ 2000", "0 ≤ prerequisites.length ≤ 5000"],
    examples: [
      { in: "numCourses = 2, prerequisites = [[1,0]]", out: "true" },
      { in: "numCourses = 2, prerequisites = [[1,0],[0,1]]", out: "false (cycle)" },
    ],
    hints: [
      "Model as a directed graph and detect cycles.",
      "Use DFS with a visited state (unvisited, visiting, visited).",
    ],
    outline: [
      "Build adjacency list from prerequisites.",
      "Use DFS with state tracking to detect cycles.",
      "If cycle found, return false; else true.",
      "Time O(V+E), space O(V+E).",
    ],
  },
};

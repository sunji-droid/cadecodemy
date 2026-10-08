export interface AlgorithmLab {
  id: string;
  title: string;
  category: 'Algorithms' | 'Data Structures' | 'Cryptography' | 'Optimization';
  difficulty: 'Undergraduate' | 'Honors' | 'Advanced';
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  theory: string;
  starterCode: string;
  solutionKeywords: string[];
  testRunner: string; // Python verification code
}

export const ALGORITHM_LABS: AlgorithmLab[] = [
  {
    id: 'binary_search_rotated',
    title: 'Rotated Sorted Array Search',
    category: 'Algorithms',
    difficulty: 'Undergraduate',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Given a sorted array of integers that has been rotated at an unknown pivot, find the index of a target element in logarithmic time.',
    theory: 'In a rotated sorted array, dividing the array in half will always yield at least one strictly sorted subarray. By comparing the target with the boundaries of the sorted half, binary search can eliminate the other half.',
    starterCode: `def search_rotated(nums, target):\n    # Implement logarithmic binary search\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        \n        # Left side is sorted\n        if nums[left] <= nums[mid]:\n            if nums[left] <= target < nums[mid]:\n                right = mid - 1\n            else:\n                left = mid + 1\n        # Right side is sorted\n        else:\n            if nums[mid] < target <= nums[right]:\n                left = mid + 1\n            else:\n                right = mid - 1\n    return -1\n\narr = [4, 5, 6, 7, 0, 1, 2]\nidx = search_rotated(arr, 0)\nprint("Index found:", idx)`,
    solutionKeywords: ['def search_rotated', 'while', 'mid', 'return'],
    testRunner: 'assert search_rotated([4, 5, 6, 7, 0, 1, 2], 0) == 4'
  },
  {
    id: 'tideman_plurality',
    title: 'Ranked Choice & Instant-Runoff Voting',
    category: 'Algorithms',
    difficulty: 'Honors',
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(c)',
    description: 'Implement an Instant-Runoff election tabulator. Given voter preference ballots, compute the candidate with a strict majority, or eliminate the lowest-ranked candidate and re-distribute votes.',
    theory: 'Harvard CS50 Tideman and Runoff problem sets explore preferential voting where voters rank candidates in order of preference. In each round, if no candidate secures > 50% of top votes, the candidate with the fewest votes is eliminated.',
    starterCode: `def instant_runoff(ballots, candidates):\n    active = set(candidates)\n    majority = len(ballots) // 2 + 1\n    \n    while True:\n        tally = {c: 0 for c in active}\n        for b in ballots:\n            for choice in b:\n                if choice in active:\n                    tally[choice] += 1\n                    break\n        \n        # Check majority\n        for c, votes in tally.items():\n            if votes >= majority:\n                return c\n                \n        # Eliminate minimum\n        min_votes = min(tally.values())\n        elim = [c for c, v in tally.items() if v == min_votes]\n        if len(elim) == len(active):\n            return "Tie"\n        for c in elim:\n            active.remove(c)\n\nballots = [\n    ["Alice", "Bob", "Charlie"],\n    ["Bob", "Alice", "Charlie"],\n    ["Alice", "Charlie", "Bob"],\n    ["Charlie", "Alice", "Bob"]\n]\nwinner = instant_runoff(ballots, ["Alice", "Bob", "Charlie"])\nprint("Elected Winner:", winner)`,
    solutionKeywords: ['def instant_runoff', 'tally', 'majority', 'return'],
    testRunner: 'assert instant_runoff([["Alice", "Bob"]], ["Alice", "Bob"]) == "Alice"'
  },
  {
    id: 'trie_prefix_tree',
    title: 'Trie (Prefix Tree) Autocompletion & Speller',
    category: 'Data Structures',
    difficulty: 'Honors',
    timeComplexity: 'O(L) per search',
    spaceComplexity: 'O(N * L * Σ)',
    description: 'Build a memory-efficient prefix tree (Trie) for dictionary word lookup and rapid prefix autocompletion.',
    theory: 'Inspired by CS50 Week 5 "Speller", where millions of dictionary words must be loaded into memory and searched in constant or length-bounded time O(L) without hash collisions.',
    starterCode: `class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_word = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.is_word = True\n\n    def search(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return node.is_word\n\nt = Trie()\nfor w in ["apple", "app", "application", "aptitude"]:\n    t.insert(w)\n\nprint("Search 'app':", t.search("app"))\nprint("Search 'appl':", t.search("appl"))`,
    solutionKeywords: ['class Trie', 'insert', 'search', 'is_word'],
    testRunner: 't = Trie(); t.insert("test"); assert t.search("test")'
  },
  {
    id: 'caesar_substitution_cipher',
    title: 'Classical Cryptography & Substitution Ciphers',
    category: 'Cryptography',
    difficulty: 'Undergraduate',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Implement a polyalphabetic key-substitution cipher that preserves capitalization while encrypting alphabetical characters.',
    theory: 'CS50 Week 2 cryptography lab introduces algorithmic modular arithmetic (ci = (pi + k) % 26) and key mapping to protect plaintext messages against eavesdroppers.',
    starterCode: `def substitute_cipher(plaintext, key):\n    key = key.upper()\n    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"\n    mapping = {alphabet[i]: key[i] for i in range(26)}\n    \n    result = []\n    for ch in plaintext:\n        if ch.isupper():\n            result.append(mapping[ch])\n        elif ch.islower():\n            result.append(mapping[ch.upper()].lower())\n        else:\n            result.append(ch)\n    return "".join(result)\n\nkey = "JTREKYAVOGDXPSNCUIZLFBMWHQ"\nencrypted = substitute_cipher("Hello, CadeCodemy!", key)\nprint("Ciphertext:", encrypted)`,
    solutionKeywords: ['def substitute_cipher', 'mapping', 'append', 'return'],
    testRunner: 'assert len(substitute_cipher("A", "JTREKYAVOGDXPSNCUIZLFBMWHQ")) == 1'
  }
];

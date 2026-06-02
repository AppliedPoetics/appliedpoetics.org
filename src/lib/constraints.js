/* ============================================================================
   Applied Poetics · Constraint catalog + API mapping
   Maps each UI constraint to its production API endpoint and parameters.
   ========================================================================== */

export const CATEGORIES = [
  "Oulipean",
  "Grammar",
  "Algorithmic",
  "Formic",
  "Numerology",
  "Pop Culture",
  "Operations",
];

export const CONSTRAINTS = [
  // Oulipean
  {
    id: "lipogram",
    name: "Lipogram",
    cat: "Oulipean",
    icon: "eraser",
    desc: "Erase every word containing a chosen letter.",
    api: { category: "oulipean", method: "lipogram" },
    params: [
      { key: "letters", label: "Letter to remove", placeholder: "e", default: "e" },
    ],
  },
  {
    id: "univocalism",
    name: "Univocalism",
    cat: "Oulipean",
    icon: "circle-dot",
    desc: "Keep only words built on a single vowel.",
    api: { category: "oulipean", method: "univocalism" },
    params: [
      { key: "letters", label: "Vowel to keep", placeholder: "i", default: "i" },
    ],
  },
  {
    id: "tautogram",
    name: "Tautogram",
    cat: "Oulipean",
    icon: "type",
    desc: "Keep only words that begin with one letter.",
    api: { category: "oulipean", method: "tautogram" },
    params: [
      { key: "letters", label: "Starting letter", placeholder: "s", default: "s" },
    ],
  },
  {
    id: "snowball",
    name: "Snowball",
    cat: "Oulipean",
    icon: "triangle",
    desc: "Order words so each is one letter longer than the last.",
    api: { category: "oulipean", method: "snowball" },
    params: [
      { key: "order", label: "Sort order", placeholder: "asc or desc", default: "asc" },
    ],
  },
  {
    id: "homoconsonantism",
    name: "Homoconsonantism",
    cat: "Oulipean",
    icon: "git-compare",
    desc: "Preserve the consonant skeleton; respell the vowels.",
    api: { category: "oulipean", method: "homoconsonantism" },
    params: [],
  },

  // Grammar / Syntax
  {
    id: "anagram",
    name: "Anagram",
    cat: "Grammar",
    icon: "shuffle",
    desc: "Rearrange the letters of each word.",
    api: { category: "grammar", method: "anagram" },
    params: [],
  },
  {
    id: "concordance",
    name: "Concordance",
    cat: "Grammar",
    icon: "list-ordered",
    desc: "Index every word and where it appears.",
    api: { category: "grammar", method: "concordance" },
    params: [
      { key: "word", label: "Target word", placeholder: "word", default: "" },
      { key: "context", label: "Context words", placeholder: "1", default: "1", type: "number" },
    ],
  },
  {
    id: "abcquence",
    name: "ABC-quence",
    cat: "Grammar",
    icon: "arrow-down-a-z",
    desc: "Sort the words into alphabetical order.",
    api: { category: "grammar", method: "abcquence" },
    params: [],
  },

  // Algorithmic
  {
    id: "edit-distance",
    name: "Edit Distance",
    cat: "Algorithmic",
    icon: "spell-check",
    desc: "Measure how many edits separate two texts.",
    api: { category: "algorithmic", method: "levenshtein" },
    params: [
      { key: "distance", label: "Max distance", placeholder: "2", default: "2", type: "number" },
    ],
  },

  // Formic
  {
    id: "sestina",
    name: "Sestina",
    cat: "Formic",
    icon: "rotate-3d",
    desc: "Spin six end-words through the canonical permutation.",
    api: { category: "formic", method: "sestina" },
    params: [],
  },

  // Numerology
  {
    id: "nth-word",
    name: "Nth Word",
    cat: "Numerology",
    icon: "hash",
    desc: "Keep only every Nth word.",
    api: { category: "numerology", method: "nth" },
    params: [
      { key: "n", label: "Interval (N)", placeholder: "3", default: "3", type: "number" },
    ],
  },
  {
    id: "pithon",
    name: "Pi-thon",
    cat: "Numerology",
    icon: "infinity",
    desc: "Let the digits of π choose the word lengths.",
    api: { category: "numerology", method: "pithon" },
    params: [],
  },
  {
    id: "at-length",
    name: "At Length",
    cat: "Numerology",
    icon: "ruler",
    desc: "Keep words of an exact length.",
    api: { category: "numerology", method: "length" },
    params: [
      { key: "n", label: "Length", placeholder: "5", default: "5", type: "number" },
    ],
  },
  {
    id: "phonewords",
    name: "Phonewords",
    cat: "Numerology",
    icon: "phone",
    desc: "Translate words into their telephone-keypad numbers.",
    api: { category: "numerology", method: "phonewords" },
    params: [
      { key: "phone", label: "7-digit phone number", placeholder: "1234567", default: "1234567" },
    ],
  },

  // Pop Culture
  {
    id: "powerball",
    name: "Powerball",
    cat: "Pop Culture",
    icon: "circle",
    desc: "Draw words by the night's lottery numbers.",
    api: { category: "pop", method: "powerball" },
    params: [],
  },

  // Operations
  {
    id: "gutenberg",
    name: "Gutenberg",
    cat: "Operations",
    icon: "book-open",
    desc: "Fetch text from a Project Gutenberg URL.",
    api: { category: "operation", method: "gutenberg" },
    params: [
      { key: "url", label: "Gutenberg URL", placeholder: "https://www.gutenberg.org/files/1342/1342-0.txt", default: "" },
    ],
  },
  {
    id: "wikipedia",
    name: "Wikipedia",
    cat: "Operations",
    icon: "globe",
    desc: "Fetch text from a Wikipedia article.",
    api: { category: "operation", method: "wikipedia" },
    params: [
      { key: "title", label: "Article title", placeholder: "Oulipo", default: "" },
    ],
  },
];

export const QUICK_OPS = ["lipogram", "anagram", "nth-word", "powerball"];

export const SEED_DOCS = [
  { id: "d1", title: "The Vowel Thief", words: 248, edited: "2m", cat: "draft" },
  { id: "d2", title: "Field Notes №14 — Lipograms", words: 612, edited: "1h", cat: "draft" },
  { id: "d3", title: "Sestina for a Server", words: 391, edited: "yesterday", cat: "draft" },
  { id: "d4", title: "Markov & the Coin Toss", words: 94, edited: "3d", cat: "draft" },
];

export const SEED_PROSE =
`The text is never fixed.

A word turns on the line like a tossed coin, and the sentence — relieved of one small sound, sorted by an unseen rule — settles into a shape the writer did not intend but immediately recognizes. This is the wager of constrained writing: that the rule does not cage the poem but casts it, the way three coins cast a hexagram.

Select any passage and put it to chance. Remove a letter. Sort the words by length. Let the digits of pi decide what survives. Between the aleatory and the constrained there is a narrow room where meaning keeps changing, and the residue of each change is yours to keep, revise, or cast again.

What would this paragraph look like without the letter e? You are about to find out.`;

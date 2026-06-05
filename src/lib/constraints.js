/* ============================================================================
   Applied Poetics · Constraint catalog + API mapping
   Maps each UI constraint to its production API endpoint and parameters.
   ========================================================================== */

export const CATEGORIES = [
  "Oulipean",
  "Syntax",
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
  {
    id: "beau-presente",
    name: "Beau Presente",
    cat: "Oulipean",
    icon: "heart",
    desc: "Include only words containing specified letters.",
    api: { category: "oulipean", method: "beau_presente" },
    params: [
      { key: "letters", label: "Letters to include", placeholder: "aeiou", default: "aeiou" },
    ],
  },
  {
    id: "belle-absente",
    name: "Belle Absente",
    cat: "Oulipean",
    icon: "ban",
    desc: "Exclude words containing specified letters.",
    api: { category: "oulipean", method: "belle_absente" },
    params: [
      { key: "letters", label: "Letters to exclude", placeholder: "e", default: "e" },
    ],
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    cat: "Oulipean",
    icon: "trending-up",
    desc: "Select words at Fibonacci positions.",
    api: { category: "oulipean", method: "fibonacci" },
    params: [],
  },
  {
    id: "prisoner",
    name: "Prisoner",
    cat: "Oulipean",
    icon: "lock",
    desc: "Exclude words with letters that descend below the baseline.",
    api: { category: "oulipean", method: "prisoner" },
    params: [],
  },

  // Syntax
  {
    id: "anagram",
    name: "Anagram",
    cat: "Syntax",
    icon: "shuffle",
    desc: "Rearrange the letters of each word.",
    api: { category: "syntax", method: "anagram" },
    params: [],
  },
  {
    id: "concordance",
    name: "Concordance",
    cat: "Syntax",
    icon: "list-ordered",
    desc: "Index every word and where it appears.",
    api: { category: "syntax", method: "concordance" },
    params: [
      { key: "word", label: "Target word", placeholder: "word", default: "" },
      { key: "context", label: "Context words", placeholder: "1", default: "1", type: "number" },
    ],
  },
  {
    id: "abcquence",
    name: "ABC-quence",
    cat: "Syntax",
    icon: "arrow-down-a-z",
    desc: "Select words whose letters are in alphabetical order.",
    api: { category: "syntax", method: "abcquence" },
    params: [],
  },
  {
    id: "hexwords",
    name: "Hexwords",
    cat: "Syntax",
    icon: "hexagon",
    desc: "Translate words into hex-style leetspeak spellings.",
    api: { category: "syntax", method: "hexwords" },
    params: [],
  },
  {
    id: "alternator",
    name: "Alternator",
    cat: "Syntax",
    icon: "arrow-left-right",
    desc: "Select words that alternate between vowels and consonants.",
    api: { category: "syntax", method: "alternator" },
    params: [],
  },
  {
    id: "chain-reaction",
    name: "Chain Reaction",
    cat: "Syntax",
    icon: "link",
    desc: "Links words where the last letter of one matches the first of the next.",
    api: { category: "syntax", method: "chain_reaction" },
    params: [],
  },
  {
    id: "abecedarian",
    name: "Abecedarian",
    cat: "Syntax",
    icon: "text",
    desc: "Select words in alphabetical order by first letter.",
    api: { category: "syntax", method: "abecedarian" },
    params: [],
  },

  // Grammar
  {
    id: "parts-of-speech",
    name: "Parts of Speech",
    cat: "Grammar",
    icon: "tags",
    desc: "Extract words by grammatical category.",
    api: { category: "grammar", method: "parts_of_speech" },
    params: [
      { key: "tag", label: "Part of speech", placeholder: "nouns, verbs, adjectives, adverbs", default: "nouns" },
    ],
  },
  {
    id: "quotations",
    name: "Quotations",
    cat: "Grammar",
    icon: "quote",
    desc: "Extract text inside double quotes.",
    api: { category: "grammar", method: "quotations" },
    params: [],
  },
  {
    id: "isolator",
    name: "Isolator",
    cat: "Grammar",
    icon: "filter",
    desc: "Filter text fragments by ending punctuation.",
    api: { category: "grammar", method: "isolator" },
    params: [
      { key: "punctuation", label: "Punctuation delimiter", placeholder: ".", default: "." },
    ],
  },
  {
    id: "punctuator",
    name: "Punctuator",
    cat: "Grammar",
    icon: "type",
    desc: "Extract only punctuation marks from text.",
    api: { category: "grammar", method: "punctuator" },
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
  {
    id: "color-field",
    name: "Color Field",
    cat: "Algorithmic",
    icon: "palette",
    desc: "Analyze image colors and filter text accordingly.",
    api: { category: "algorithmic", method: "color_field" },
    params: [
      { key: "image", label: "Image data or file path", placeholder: "path/to/image.jpg", default: "" },
      { key: "mode", label: "Processing mode", placeholder: "sentences, letters, anagrams, list", default: "list" },
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
  {
    id: "pantoum",
    name: "Pantoum",
    cat: "Formic",
    icon: "layers",
    desc: "Arrange lines into a pantoum form.",
    api: { category: "formic", method: "pantoum" },
    params: [],
  },
  {
    id: "triolet",
    name: "Triolet",
    cat: "Formic",
    icon: "repeat",
    desc: "Arrange lines into a triolet form.",
    api: { category: "formic", method: "triolet" },
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
  {
    id: "birthday",
    name: "Birthday",
    cat: "Numerology",
    icon: "calendar",
    desc: "Select words using birthdate digits as step values.",
    api: { category: "numerology", method: "birthday" },
    params: [
      { key: "birthdate", label: "Birthdate", placeholder: "DD-MM-YYYY", default: "01-01-2000" },
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
  {
    id: "sartorializer",
    name: "Sartorializer",
    cat: "Pop Culture",
    icon: "shirt",
    desc: "Select sentences containing fashion and clothing terms.",
    api: { category: "pop", method: "sartorializer" },
    params: [],
  },
  {
    id: "colorizer",
    name: "Colorizer",
    cat: "Pop Culture",
    icon: "paintbrush",
    desc: "Select sentences containing color names.",
    api: { category: "pop", method: "colorizer" },
    params: [],
  },
  {
    id: "weatherizer",
    name: "Weatherizer",
    cat: "Pop Culture",
    icon: "cloud",
    desc: "Select sentences containing weather terminology.",
    api: { category: "pop", method: "weatherizer" },
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

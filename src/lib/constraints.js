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
    id: "belle-absente",
    name: "Belle Absente",
    cat: "Oulipean",
    icon: "minus-circle",
    desc: "The beautiful outlaw — every letter appears except one.",
    api: { category: "oulipean", method: "belle_absente" },
    params: [
      { key: "letters", label: "Letter to omit", placeholder: "e", default: "e" },
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
    id: "prisoner",
    name: "Prisoner's Constraint",
    cat: "Oulipean",
    icon: "lock",
    desc: "Forbid all letters with ascenders or descenders.",
    api: { category: "oulipean", method: "prisoners_constraint" },
    params: [],
  },

  // Grammar / Syntax
  {
    id: "pos",
    name: "Parts of Speech",
    cat: "Grammar",
    icon: "tags",
    desc: "Reveal the grammatical part of each word.",
    api: { category: "grammar", method: "parts_of_speech" },
    params: [
      { key: "tag", label: "Part of speech", placeholder: "nouns, verbs, adjectives, adverbs", default: "nouns" },
    ],
  },
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
    id: "synonymize",
    name: "Synonymizer",
    cat: "Grammar",
    icon: "repeat",
    desc: "Swap each word for one of its kin.",
    api: { category: "grammar", method: "synonymizer" },
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
    id: "homophonic",
    name: "Homophonic Translation",
    cat: "Grammar",
    icon: "ear",
    desc: "Re-spell the text by how it sounds, not what it means.",
    api: { category: "grammar", method: "homophonic_translation" },
    params: [],
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
    id: "markov",
    name: "Markov",
    cat: "Algorithmic",
    icon: "waves",
    desc: "Scramble by word frequency — higher orders read more fluently.",
    api: { category: "algorithmic", method: "markov" },
    params: [
      { key: "n", label: "Order", placeholder: "2", default: "2", type: "number" },
    ],
  },
  {
    id: "travesty",
    name: "Travesty",
    cat: "Algorithmic",
    icon: "sparkles",
    desc: "Generate plausible nonsense from letter statistics.",
    api: { category: "algorithmic", method: "travesty" },
    params: [],
  },
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
    desc: "Map words to a field of color by value.",
    api: { category: "algorithmic", method: "color_field" },
    params: [
      { key: "mode", label: "Mode", placeholder: "sentences, letters, anagrams, list", default: "sentences" },
    ],
  },
  {
    id: "proof-of-work",
    name: "Proof of Work",
    cat: "Algorithmic",
    icon: "cpu",
    desc: "Hash the text until it earns its keep.",
    api: { category: "algorithmic", method: "proof_of_work" },
    params: [],
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
  {
    id: "lost",
    name: "The LOST Numbers",
    cat: "Pop Culture",
    icon: "radio",
    desc: "4 8 15 16 23 42 — select words by the hatch sequence.",
    api: { category: "pop", method: "lost_numbers" },
    params: [],
  },
  {
    id: "weather",
    name: "Weather Forecast",
    cat: "Pop Culture",
    icon: "cloud-sun",
    desc: "Reshape the text by today's forecast.",
    api: { category: "pop", method: "weather_forecast" },
    params: [],
  },
];

export const QUICK_OPS = ["lipogram", "anagram", "synonymize", "markov"];

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

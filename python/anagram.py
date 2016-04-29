import itertools, random
from nltk.corpus import brown

wordlist = brown.words()
 
def anagrams(word):
	words = [w.rstrip() for w in wordlist]
        # Reduce the number of words to compare to
        # just the ones with the same lengths Also make a set to avoid duplicates
        words = set([ w for w in words if len(w) == len(word)])
 
        #Find all possible anagrams
        comb = set([ ''.join(w) for w in itertools.permutations(word, len(word))])
 
        #Now find the ones that are words intersecting two sets
        return comb.intersection(words)

terms = anagrams("craneseamless")
print random.sample(terms,1)

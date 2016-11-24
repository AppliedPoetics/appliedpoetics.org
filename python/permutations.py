import anagram, re

def remove_letters(s1,s2):
	for l in s1:
		s2 = re.sub(l,'',s2,1)
	return s2

def get_anagrams(s):
	return [word for word in anagram.anagram(s)]

def set_inventory(s):
	inventory = dict([(l,0) for l in s])
	for l in s: inventory[l] += 1
	return inventory

def test_phrase(phrase,anagrams,color):
	phrases = []
	for anagram in anagrams:
		inventory = set_inventory(color)
		test = phrase + ' ' + anagram
		for l in test.replace(' ',''): inventory[l] -= 1
		total = sum(inventory.itervalues())
		if total == 0: phrases.append(test)
	return phrases

def all_anagrams(color):
	phrases = []
	nospace = color.replace(' ','')
	anagrams = get_anagrams(nospace)
		
	for gram in anagrams:
		is_anagram = True
		remainder = remove_letters(gram,nospace)
		nagarams = get_anagrams(remainder)
		results = test_phrase(gram,nagarams,nospace)
		for result in results: phrases.append(result)
	if len(phrases) == 0: phrases.append(color)
	return ', '.join(phrases)

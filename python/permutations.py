import anagram, re

def remove_letters(s1,s2):
	for l in s1:
		s2 = re.sub(l,'',s2,1)
	return s2

def get_anagrams(s):
	return [word for word in anagram.anagram(s)]

def all_anagrams(color):
	phrases = []
	anagrams = get_anagrams(color)

	for gram in anagrams:
		is_anagram = True
		remainder = remove_letters(gram,color)
		phrase = gram
		while is_anagram:
			nagaram = get_anagrams(remainder)
			if len(nagaram) > 0:
				for word in nagaram:
					if len(phrase) >= len(color): pass
					else: phrase = phrase + " " + word
					remainder = remove_letters(word,remainder)
			else:
				is_anagram = False
		if len(phrase.replace(' ','')) >= len(color.replace(' ','')): phrases.append(phrase)

	return '\n'.join(phrases)

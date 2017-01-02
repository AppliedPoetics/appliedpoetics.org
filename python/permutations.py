import getopt, random, re, sys, ap_encoding
from anagram import anagram

def remove_letters(s1,s2):
	for l in s1: s2 = s2.replace(l,'',1)
	return s2

def get_bag(s):
	return [word for word in anagram(s)]

def set_inventory(s):
	inventory = {}
	for l in s:
		try: inventory[l] += 1
		except KeyError: inventory[l] = 1
	return inventory

def is_anagram(test,letters):
	inventory = set_inventory(letters)
	for l in test.replace(' ',''):
		inventory[l] -= 1
	passed = all(x==0 for x in inventory.itervalues())
	return passed

def new_cycle(built, letters, bag):
	remains = remove_letters(built.replace(' ',''),letters)
	length,letters = len(remains),set(remains)
        return [word for word in bag if len(word) <= length and all([chr in letters for chr in set(word)])]

def get_anagrams(word,letters,bag,nagarams):
	def anagramming(word,letters,bag,nagarams):
		for choice in bag:
			is_dupe = False
			built = word
			is_dupe = choice in built
			if not is_dupe: built = "%s %s" % (built,choice)
			if not built in nagarams: nagarams.append(built)
		return built
	built = anagramming(word,letters,bag,nagarams)
	new_bag = new_cycle(built,letters,bag)
	if len(new_bag) > 0: anagramming(built,letters,new_bag,nagarams)
	return [gram for gram in nagarams if is_anagram(gram,letters)]

def all_anagrams(word):
	word = word.lower()
	nagarams, results = [],[]
	bag = get_bag(word)
	letters = word.replace(' ','')
	for word in bag:
		if is_anagram(word,letters): 
			nagarams.append(word)
			continue
		new_bag = new_cycle(word,letters,bag)
		if len(new_bag) > 0: results = get_anagrams(word,letters,new_bag,list())
		else: pass
		[nagarams.append(result) for result in results if result not in nagarams]
	return ', '.join(nagarams)

def file(text):
	anagrams = []
	text = text.replace('\n','')
	text = text.split(" ")
	for word in text:
		nagarams = all_anagrams(word)
		nagarams = nagarams.split(',')
		anagrams.append(random.choice(nagarams).lstrip())
	return anagrams

def main(argv):
       	#get arguments passed, where "text" is file path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "permutations.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "permutations.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	#read file from path
 	text = ap_encoding.read_file(text)
        print ' '.join(file(text))

if __name__ == "__main__":
        main(sys.argv[1:])

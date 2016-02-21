import cgitb, getopt, itertools, random, re, string, sys, textwrap, ap_encoding
from nltk.corpus import words
from collections import defaultdict

cgitb.enable()

def load_dictionary():
	dictionary = words.words()
	hashmap = {}
	for word in dictionary:
		key = ''.join(sorted(word.lower()))
		if key in hashmap:
			hashmap.update({key:word.lower()})
		else:
			hashmap[key] = word.lower()
	return hashmap

def nagaram(text, dictionary):
	anagrams = []
	text = text.split()
	length = len(text)
	for letters in range(1,length):
		for i in itertools.product(text,repeat = letters):
			word = sorted(''.join(i).lower())
			print word
			term = word
			for key,value in dictionary.iteritems():
				if key == word:
					if not value == term:
						anagrams.append(value)
						text = text[letters:]
						length = len(text)
						letters = 1
					break
				else:
					pass
			if length == 0:
				break
	return anagrams

def main(argv):
        input_text = ''
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "anagram.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "anagram.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	dictionary = load_dictionary()
        text = ap_encoding.read_file(text)
        anagram = nagaram(text,dictionary) 
	if len(anagram) > 0:
		print '\n'.join(anagram)

if __name__ == "__main__":
        main(sys.argv[1:])
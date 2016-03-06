#! /usr/bin/python

import cgitb, getopt, random, re, string, sys, ap_encoding
from nltk.corpus import wordnet
from itertools import chain

cgitb.enable()

def flatten(l):
	return list(chain(*l))

def get_variants(word):
	synonyms = []
	exclude = set(string.punctuation)
	word = ''.join(ch for ch in word if ch not in exclude)
	for synset in wordnet.synsets(word):
		for lemma in synset.lemmas():
			synonyms.append(lemma.name())
	return synonyms
	
def get_synonyms(word):
	return get_variants(word)
	#return ([w.name for w in get_variants(word)])

def get_antonyms(word):
	#antonyms = flatten([w.antonyms() for w in get_variants(word)])
	#return ([a.name for a in antonyms])
	pass

def parse_text(test_terms):
	test_words = test_terms.split()
	for word in test_words:	
		init_term = re.escape(word)
		if len(word) > 2:
			possible_terms = get_synonyms(word)
			try:
				possible_terms.remove(word)
			except:
				pass
			if possible_terms:
				insert_term = random.choice(possible_terms)
				insert_term = re.sub("_"," ",insert_term)
				insert_term = insert_term.lower()
				test_terms = re.sub(r"\b%s\b" % init_term,insert_term,test_terms)
	return test_terms.strip()

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "synant.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "synant.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        print parse_text(text) 

if __name__ == "__main__":
        main(sys.argv[1:])

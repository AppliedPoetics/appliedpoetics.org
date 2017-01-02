import cgitb, fuzzyset, getopt, multiprocessing, os, pronouncing, random, re, string, sys, time, ap_encoding
sys.path.insert(0,'/home/poetics/src/listener/')
import listener
from collections import OrderedDict
from nltk.corpus import cmudict
from pocketsphinx import get_model_path
from unidecode import unidecode
from fuzzywuzzy import process

cgitb.enable()

d = cmudict.dict()
DICT_PATH = '/usr/local/lib/python2.7/dist-packages/pocketsphinx/model/cmudict-en-us.dict'
pronunciations = None
words, phones = None, None

def nsyl(word):
	# Python implementation of: http://stackoverflow.com/questions/405161/detecting-syllables-in-a-word
	vowels = "aeiouy"
	num_vowels = 0
	was_vowel = False
	for char in word:
		is_vowel = False
		for v in vowels:
			if v == char:
				if not was_vowel: num_vowels += 1
				is_vowel = was_vowel = True
				break
		if not is_vowel:
			was_vowel = False
	if len(word) > 2 and word[-2:] == "es":
		num_vowels -= 1
	elif len(word) > 1 and word[-1:] == "e":
		num_vowels -= 1
	if "'" in word:
		num_vowels += 1
	return num_vowels

def lsyl(word,sylls):
	#Modified verison of code from https://gist.github.com/bradmerlin/5693904
	syllables = list()
	regexp = r'([^aeiouy]*[aeiouy]*)|[aeiouy]*[^aeiouy]*[aeiouy]*'
	while word != '':
		if sylls > 1:
			end = re.match(regexp,word,re.I).end()
		else:
			end = len(word)
		syllables.append(word[0:end])
		if len(syllables) == sylls - 1:
			if len(syllables) == sylls: break
			word = word[end:len(word)].lstrip().rstrip()
			syllables.append(word)
			break
		else:
			word = word[end:]
	return syllables

def get_phonics(text):
	sentence = ""
	inventory = {}
	results = list()
	exclude = set(string.punctuation)
	lines = text.split("\n")
	for line in lines:
		line = ''.join(ch for ch in line if ch not in exclude)
		values = line.split("\t")
		length = len(values)
		if values[0] != '':
			try: inventory[values[0].lower()] = [values[i] for i in range(1,length)]
			except KeyError: inventory[values[0].lower()] = values[1]
			sentence += ' %s' % (values[0])
	terms = sentence.split()
	for term in terms:
		term = term.lower()
		results.append('['+random.choice(inventory[term])+']')
	return results

def get_translation(text):
	sentence = ""
	results = list()
	phonics = list()
	inventory = {}
	lines = text.split("\n")
	exclude = set(string.punctuation)
	for line in lines:
		line = ''.join(ch for ch in line if ch not in exclude)
		values = line.split("\t")
		length = len(values)
		if values[0] != '':
			try: inventory[values[0].lower()] = [values[i] for i in range(1,length)]
			except KeyError: inventory[values[0].lower()] = values[1]
			sentence += ' %s' % (values[0])
	sentence = sentence.lstrip().rstrip()
	terms = sentence.split()
	pool = multiprocessing.Pool(2)
	for term in terms:
		phonic = random.choice(inventory[term.lower()])
		num_sylls = nsyl(term)
		lst_sylls = lsyl(phonic,num_sylls)
		for syll in lst_sylls: phonics.append(syll)
	matches = pool.imap(search_sphinx,phonics)
	results.append(' '.join(matches))
	return results

#FUNCTIONS init_sphinx, parse_sphinx, search_sphinx ADAPTED FROM ALLISON PARRISH'S PRONOUNCING LIBRARY

def init_sphinx(filehandle=None):
	global pronunciations
	if pronunciations is None:
		if filehandle is None:
			with open(DICT_PATH,'rb') as fh:
				contents = fh.read()
		pronunciations = parse_sphinx(contents)

def parse_sphinx(cmufh):
	pronunciations = list()
	regexp = re.compile(r'\(\d\)$')
	cmufh = filter(None,re.split("\r|\n",cmufh))
	for line in cmufh:
		line = line.strip().decode('latin1')
		if line.startswith(';'):
			continue
		data = line.split(" ")
		word = data[0]
		phones = ' '.join(data[1:])
		word = regexp.sub('', word.lower())
		pronunciations.append((word.lower(), phones))
	return pronunciations

def search_sphinx(pattern):
	_start = time.time()
	result = random.choice(phones.get(unicode(pattern)))
	match = words[unicode(result[1])]
	_end = time.time()
	#print _end - _start
	return match

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","method="])
        except getopt.GetoptError:
                print "homophonic.py -t <text> -l <method>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "homophonic.py -t <text> -l <method>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--method"):
			method = arg
                else:
                        sys.exit(2)
	text = ap_encoding.read_file(text)
	if method == "translate":
		_start = time.time()
		results = get_translation(text)
	elif method == "phonics":
		results = get_phonics(text)
	_end = time.time()
	print _end - _start
	print ' '.join([val for val in results])

init_sphinx()
words = {}
phones = fuzzyset.FuzzySet()
for word, phone in pronunciations: 
	try: words[phone] = word
	except KeyError: words[phone] += word	
[phones.add(phone) for word, phone in pronunciations]

if __name__ == "__main__":
        main(sys.argv[1:])

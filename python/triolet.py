#! /usr/bin/python

import cgitb, collections, getopt, itertools, random, re, sentencesim, string, sys, time, ap_encoding

cgitb.enable()

def generate_freq_table(text):
	index = 0
	endwords = list()
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text if ch not in exclude)
	words = re.findall('\w+',text)
	inventory = collections.Counter(words)
	#print sum(inventory.values())
	while len(endwords) < 4 and index < len(words):
		seed = random.randrange(sum(inventory.values()))
		choice = next(itertools.islice(inventory.elements(),seed,None))
		if inventory[choice] >= 4 and len(choice) >=4 and choice not in endwords: endwords.append(choice)
		index += 1
	random.shuffle(endwords)
	return endwords

def generate_text(text,words):
	results = {}
	for word in words:
		sentences = re.findall(r'(\n[^.]*'+word+')',text,re.I)
		results[word] = sentences
	return results

def strip_string(line):
	return re.sub(r'\r|\n|\r\n|','',line).rstrip().lstrip()

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "sestina.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "sestina.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
	text = text.lower().rstrip().lstrip()
        #handle results
	similar = 0.0
        endwords = generate_freq_table(text)
	inventory = generate_text(text,endwords)
	stanza = list()
	form = [1,2,'x',1,'x','x',1,2]
	print "End words selected: %s" % (', '.join(endwords[0:6]))
	print "\n"
	#print inventory
	for stanza in form:
		for word in stanza:
			if len(endwords) == 4:
				print strip_string(random.choice(inventory[endwords[int(word)-1]]))
			else: 
				print 'Text not long enough! Please enter more text to sample.'
				break
		print "\n"

if __name__ == "__main__":
	main(sys.argv[1:])

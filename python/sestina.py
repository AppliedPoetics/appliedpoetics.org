#! /usr/bin/python

import cgitb, collections, dedupe, getopt, random, re, sentencesim, string, sys, ap_encoding

cgitb.enable()

def count_occurences(text,word):
	return text.lower().split().count(word)

def generate_freq_table(text):
	words = []
	endwords = []
	exclude = set(string.punctuation)
	texts = ''.join(ch for ch in text if ch not in exclude)
	texts = dedupe.remove_duplicates(texts)
	array = texts
	for word in array:
		if len(strip_string(word)) >= 4:
			freq = count_occurences(text,strip_string(word))
			if freq > 6:
				words.append(strip_string(word))
	for i in xrange(0,6):
		try: endword = random.choice(words)
		except: endword = random.choice(words)
		finally: pass
		if endword not in endwords:
			endwords.append(endword)
	return endwords

def generate_text(text,words):
	results = []
	for term in words:
		sentences = re.findall(r'([^.]*'+term+')',text)
		results.append(sentences)
		#print sentences
	return results

def strip_string(line):
	return re.sub(r'\r|\n|\r\n',' ',line).rstrip().lstrip()

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
	text = text.lower()
        #handle results
	similar = 0.0
        endwords = generate_freq_table(text)
	result = generate_text(text.lower(),endwords)
	stanza = list()
	form = [[1,2,3,4,5,6],[6,1,5,2,4,3],[3,6,4,1,2,5],[5,3,2,6,1,4],[4,5,1,3,6,2],[2,4,6,5,3,1],[1,3,5]]
	print "End words selected: %s" % (','.join(endwords))
	print "\n"
	for i in xrange(len(form)):
		index = len(form[i])
		for j in xrange(0,index):
			ending = int(form[i][j])-1
			if j > 0:
				#try:
				try: possibility = strip_string(random.choice(result[ending]))
				except: print result[ending]
				similar = sentencesim.similarity(stanza[len(stanza)-1],possibility,False)
				if similar > .20: stanza.append(possibility)
				else: 
					try: stanza.append(strip_string(random.choice(result[ending])))
					except: print result[ending]
			elif j == 0:
				try: stanza.append(strip_string(random.choice(result[ending])))
				except: print result[ending]
		print '\n'.join(stanza) + "\n"
		stanza = list()

if __name__ == "__main__":
	main(sys.argv[1:])

#! /usr/bin/python

import cgitb, collections, dedupe, getopt, random, re, string, sys, ap_encoding

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
		if len(word.rstrip()) >= 4:
			freq = count_occurences(text,word.rstrip())
			if freq >= 6:
				words.append(word.rstrip())
	for i in xrange(0,6):
		endword = random.choice(words)
		if endword not in endwords:
			endwords.append(endword)
	return endwords

def generate_text(text,words):
	results = []
	for term in words:
		sentences = re.findall(r'([^.]*'+term+')',text)
		results.append(sentences)
	return results

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
        #handle results
        endwords = generate_freq_table(text)
	result = generate_text(text,endwords)
	form = [[1,2,3,4,5,6],[6,1,5,2,4,3],[3,6,4,1,2,5],[5,3,2,6,1,4],[4,5,1,3,6,2],[2,4,6,5,3,1],[1,3,5]]
	for i in range(0,len(form)):
		index = len(form[i])
		if i < 6:
			for j in xrange(0,index):
				examples = len(form[i-1])
				print random.choice(result[form[i-1][j]])
		if i == 6:
			pass

if __name__ == "__main__":
	main(sys.argv[1:])

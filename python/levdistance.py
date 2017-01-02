import anagram, getopt, Levenshtein, string, sys, ap_encoding

THRESHHOLD = 3

def distance(w1, w2):
	return Levenshtein.distance(w1,w2)

def get_distance(text):
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text if not ch in exclude)
	words = text.split()
	return [words[i] for i in xrange(len(words)) if i < len(words) - 1 and distance(words[i], words[i+1]) <= THRESHHOLD]

def main(argv):
	global THRESHHOLD
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "levdistance.py -t <text> -l <distance>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "levdistance.py -t <text> -l <distance>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--dist"):
			if arg: THRESHHOLD = int(arg)
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
	result = get_distance(text)
	print ' '.join(result)

if __name__ == "__main__":
	main(sys.argv[1:])

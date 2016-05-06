import cgitb, getopt, hashlib, re, random, string, sys, ap_encoding

cgitb.enable()

def generation(challenge, size=25):
	answer = ''.join(random.choice(string.ascii_lowercase) for x in range(size))
	attempt = challenge+answer
	return attempt, answer

shaHash = hashlib.sha256()

def test(line):
	found = False
	while found == False:
		attempt,answer = generation(line)
		shaHash.update(attempt)
		solution = shaHash.hexdigest()
		if solution.startswith('00000'):			
			found = True
	print answer

def stdize(text):
	#punct = set(string.punctuation)
	#text = ''.join(ch for ch in text if ch not in punct)
	lines = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\!|\.|\?)\s',text)
	for i in range(len(lines)):
		test(lines[i])

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "proofofwork.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "proofofwork.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        stdize(text) 

if __name__ == "__main__":
        main(sys.argv[1:])

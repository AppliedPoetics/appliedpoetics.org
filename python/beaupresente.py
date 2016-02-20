#! /usr/bin/python

import getopt, re, string, sys, ap_encoding

def bpres(text,name):
	#initialize results, remove punctuation/compress into continuous string (no spaces)
	results = ""
	punct = set(string.punctuation)
	text = ''.join(ch for ch in text if ch not in punct)
	try:
		#set regular expression and match results
		regexp = "\\b["+name+"]+\\b(?![,])"
		result = re.findall(regexp,text,flags=re.I)
		for x in range (0,len(result)):
			results = results + result[x] + " "
		print results
        except:
                print ""

def main(argv):
        #get arguments passed, where "text" is path to scratch/, "lttr" holds constutient letters passed
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","name="])
        except getopt.GetoptError:
                print "beaupresente.py -t <text> -l <name>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "beaupresente.py -t <text> -l <name>"
                elif opt in ("-t","--text"):
                        text = arg
                elif opt in ("-l","--name"):
                        name = arg
                else:
                        sys.exit(2)
	#read file from path
        text = ap_encoding.read_file(text)
	bpres(text,name)

if __name__ == "__main__":
        main(sys.argv[1:])


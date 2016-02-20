#! /usr/bin/python

import getopt, re, sys, ap_encoding 

def isolate(text,punct):
	#create continuous string from text, & initialize containers
	text = ' '.join(text.split())
	results = ""
	collection = []
	#create regular expression
        statements = re.findall(r'[^.!\?]+[\.!\?]',text)
	#loop through text running test on punctuation
	for x in range (0,len(statements)):
		pnct = statements[x][-1:]
		if pnct == punct:
			collection.append(statements[x])
 	return "\n".join(collection)

def main(argv):
        #get arguments passed, where "text" is path to scratch/ and "pnct" is the desired punctuation to isolate
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","pnct="])
        except getopt.GetoptError:
                print "isolate.py -t <text> -l <punctuation>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "isolate.py -t <text> -l <punctuation>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--pnct"):
			punct = arg
                else:
                        sys.exit(2)
	#read text from path
	text = ap_encoding.read_file(text)
        print isolate(text,punct)

if __name__ == "__main__":
        main(sys.argv[1:])

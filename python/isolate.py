#! /usr/bin/python

import getopt, re, sys, ap_encoding 

def isolate(text,punct):
	text = ' '.join(text.split())
	results = ""
        statements = re.findall(r'[^.!\?]+[\.!\?]',text)
	collection = []
	for x in range (0,len(statements)):
		pnct = statements[x][-1:]
		if pnct == punct:
			collection.append(statements[x])
	for i in range (0,len(collection)):
		results = results + collection[i] + "\n"
 	return results

def main(argv):
        input_text = ''
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
	text = ap_encoding.read_file(text)
        print isolate(text,punct)

if __name__ == "__main__":
        main(sys.argv[1:])

#! /usr/bin/python

import getopt, re, string, sys, ap_encoding

def abc(text):
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text if not ch in exclude)
	alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
	matches = []
	indx = 0
	words = (text.lower()).split()
	for x in range(0,len(alpha)):
		for i in range(indx,len(words)):
			if words[i].startswith(alpha[x]):
				matches.append(words[i])
				indx = i
				break
			else: continue
				
	return matches
	
def main(argv):
        input_text = ''
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "quotes.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "quotes.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
 	text = ap_encoding.read_file(text)
        print '\n'.join(abc(text))
	
if __name__ == "__main__":
        main(sys.argv[1:])

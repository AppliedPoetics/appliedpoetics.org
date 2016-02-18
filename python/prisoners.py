#! /usr/bin/python

import getopt, re, string, sys, ap_encoding 

def prisoners(text):
	result = ""
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text  if ch not in exclude)
	prisoner = ["b","d","f","g","h","j","k","l","p","q","t","y","0","1","2","3","4","5","6","7","8","9"]
	for x in range (0, len(prisoner)):
		result = re.sub(r'\w*'+prisoner[x]+'\w*'," ",text,flags=re.I)
		text = result
	return result.lower() 

def main(argv):
        input_text = ''
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "prisoners.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "prisoners.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
 	text = ap_encoding.read_file(text)
        print prisoners(text) 

if __name__ == "__main__":
        main(sys.argv[1:])

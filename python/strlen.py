#! /usr/bin/python

import getopt, re, string, sys, ap_encoding

def bylen(text,length):
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text if ch not in exclude)
	words = text.split()
	rightSize = []
	for x in range(0,len(words)):
		if len(words[x]) == int(length):
			rightSize.append(words[x])
	return rightSize

def main(argv):
        input_text = ''
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","length="])
        except getopt.GetoptError:
                print "strlen.py -t <text> -l <word length>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "strlen.py -t <text> -l <word length>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--len"):
			length = arg
                else:
                        sys.exit(2)
	text = ap_encoding.read_file(text)
        print ', '.join(bylen(text,length)) 

if __name__ == "__main__":
        main(sys.argv[1:])

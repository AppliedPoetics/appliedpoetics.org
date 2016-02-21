#! /usr/bin/python

import getopt, re, string, sys, ap_encoding

def bylen(text,length):
	#sanitize punctuation
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text if ch not in exclude)
	#explode text into word array
	words = text.split()
	#initialize container
	rightSize = []
	#loop through text to select words matching length
	for x in range(0,len(words)):
		if len(words[x]) == int(length):
			rightSize.append(words[x])
	return rightSize

def main(argv):
        #get passed arguments, where "text" is the path to scratch/, "length" is the length of word being searched
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
	#read text from file
	text = ap_encoding.read_file(text)
        print ', '.join(bylen(text,length)) 

if __name__ == "__main__":
        main(sys.argv[1:])

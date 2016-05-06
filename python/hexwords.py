#! /usr/bin/python
# This script is partially taken from Ned Batchelder: http://nedbatchelder.com/text/hexwords.html

import cgitb, getopt, re, random, string, sys, ap_encoding

cgitb.enable()

substitutions = [('fore','4'),('for','4'),('four','4'),('to','2'),('ate','8'),('ten','10'),('g','9'),('l','1'),('o','0'),('s','5'),('t','7'),('el','1'),('r','12')]
regex = re.compile("[a-f0-9]*")

def getHex(text):
	translated = []
	words = text.split()
	for word in words:
		word = word.strip()
		for repl, subs in substitutions:
			word = string.replace(word, repl, subs)
		match = regex.search(word)
		if match and match.group() == word:
			translated.append(word)
	return translated

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "hexwords.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "hexwords.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        print ' '.join(getHex(text))

if __name__ == "__main__":
        main(sys.argv[1:])

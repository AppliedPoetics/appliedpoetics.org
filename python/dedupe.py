#!/usr/bin/python

import cgitb, getopt, re, string,sys, ap_encoding

cgitb.enable()

def remove_duplicates(text):
	text = text.lower()
	punct = set(string.punctuation)
	text = ''.join(ch for ch in text if ch not in punct)
	text = text.split()
	nodupes = set()
	nodupes_add = nodupes.add
	return [word for word in text if not (word in nodupes or nodupes_add(word))]	

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "dedupe.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "dedupe.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        print '\n'.join(remove_duplicates(text))

if __name__ == "__main__":
        main(sys.argv[1:])

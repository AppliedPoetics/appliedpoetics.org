#!/usr/bin/python

import cgitb, getopt, re, string,sys, ap_encoding

cgitb.enable()

def list_unique_chars(text):
	text = text.lower()
	punct = set(string.punctuation)
	text = ''.join(ch for ch in text if ch not in punct)
	nodupes = set()
	nodupes_add = nodupes.add
	return [x for x in text if not (x in nodupes or nodupes_add(x))]	

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "listchars.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "listchars.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        print ''.join(list_unique_chars(text))

if __name__ == "__main__":
        main(sys.argv[1:])

#! /usr/bin/python

import cgitb, getopt, re, string, sys, ap_encoding

cgitb.enable()

def sort_list(text,method):
	punct = set(string.punctuation)
	text = ''.join(ch for ch in text if not ch in punct)
	text = text.split()
	if method == "asc":
		text = sorted(text,reverse=False)
	elif method == "desc":
		text = sorted(text,reverse=True)
	return text

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","mtd="])
        except getopt.GetoptError:
                print "listsort.py -t <text> -l <asc/desc>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "listsort.py -t <text> -l <asc/desc>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--mtd"):
			method = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        print '\n'.join(sort_list(text,method))

if __name__ == "__main__":
        main(sys.argv[1:])

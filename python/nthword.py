#! /usr/bin/python

import getopt, sys, re, ap_encoding

def nthword(text,nth):	
	words = text.split(" ")
	modnum = int(nth)	
	results = ""
	for x in range(0,len(words)):
		if x%modnum == 0:
			if x != 0:
				results = results + " " + words[x-1]
	return results

def main(argv):
        input_text = ''
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "nthword.py -t <text> -l <nth term>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "nthword.py -t <text> -l <nth term>"
                elif opt in ("-t","--text"):
                        text = arg
                elif opt in ("-l","--lttr"):
                        lttr = arg
                else:
                        sys.exit(2)
	text = ap_encoding.read_file(text)
        print nthword(text,lttr) 

if __name__ == "__main__":
        main(sys.argv[1:])

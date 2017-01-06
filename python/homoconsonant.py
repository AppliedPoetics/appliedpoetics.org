#! /usr/bin/python

import getopt, re, sys, ap_encoding

def consonant(text):
	#set up and execute regular expression for vowels
	result = re.sub("[aeiou]","",text,flags=re.I)
	return result

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "homoconsonant.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "homoconsonant.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	#read file from path
	text = ap_encoding.read_file(text)
	print consonant(text)

if __name__ == "__main__":
        main(sys.argv[1:])

#! /usr/bin/python

import cgitb, getopt, os, sys, ap_encoding

cgitb.enable()

def reverse(text):
	#REVERSE! REVERSE!
	return text[::-1]

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "reverser.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "reverser.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	#read text from file
        text = ap_encoding.read_file(text)
        print reverse(text)

if __name__ == "__main__":
        main(sys.argv[1:])

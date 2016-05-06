#! /usr/bin/python

import cgitb, getopt, hashlib, re, random, string, sys, ap_encoding

cgitb.enable()
shaHash = hashlib.sha256()

def hashme(text):
	lines = text.split('\n')
	for line in lines:
		shaHash.update(line)
		print shaHash.hexdigest()	

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "blockchain.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "blockchain.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        hashme(text)

if __name__ == "__main__":
        main(sys.argv[1:])

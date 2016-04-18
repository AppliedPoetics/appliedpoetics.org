#! /usr/bin/python

import cgitb, getopt, re, string, sys, ap_encoding

cgitb.enable()

def snowball(text,method):
	#remove punctuation as it throws off character count
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text if ch not in exclude)
	#split into words
	words = text.split()
	if method == "melt":
		#sort list in reverse
		snow = sorted(words, key=len, reverse=True)
	if method == "freeze":
		snow = sorted(words, key=len)
	return snow

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "snowball.py -t <text> -l <method>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "snowball.py -t <text> -l <method>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--lttr"):
			method = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
	#handle results
	results = snowball(text,method)
        for result in results:
		print result.lower() + "["+str(len(result))+"]"

if __name__ == "__main__":
        main(sys.argv[1:])

#! /usr/bin/python

import getopt, re, sys, ap_encoding

def concordance(text,leadtrail,word):
	#create continuous string from text
	text = ' '.join(text.split())
	#parse the number of words to lead/trail
	leadtrail = int(leadtrail)
	len_word = len(word)
	#init container
	results = []
	#run regular expression for context
	regexp = "(?:[a-zA-Z'-]+[^a-zA-Z'-]+){0,"+str(leadtrail)+"}"+word+"(?:[^a-zA-Z'-]+[a-zA-Z'-]+){0,"+str(leadtrail)+"}\W"
	return '\n'.join(re.findall(regexp,text,flags=re.I))

def main(argv):
       	#get arguments passed, where "text" is path to scratch/, "word" is the word for which context is sought, "leadtrail" is the amount of words to capture before/after
        try:
                opts,args = getopt.getopt(argv,"t:w:l:",["text=","word=","leadtrail="])
        except getopt.GetoptError:
                print "concordance.py -t <text> -w <word to focus> -l <leading/trailing words>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "concordance.py -t <text> -w word to focus -l <leading/trailing words>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-w","--word"):
			word = arg
                elif opt in ("-l","--leadtrail"):
                        leadtrail = arg
                else:
                        sys.exit(2)
	#read file from path
	text = ap_encoding.read_file(text)
        results = concordance(text,leadtrail,word) 	
	print results

if __name__ == "__main__":
        main(sys.argv[1:])

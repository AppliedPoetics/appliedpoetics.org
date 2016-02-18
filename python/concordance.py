#! /usr/bin/python

import getopt, re, sys, ap_encoding

def concordance(text,leadtrail,word):
	text = ap_encoding.read_file(text)
	text = ' '.join(text.split())
	#print text
	leadtrail = int(leadtrail)
	len_word = len(word)
	results = []
	regexp = "(?:[a-zA-Z'-]+[^a-zA-Z'-]+){0,"+str(leadtrail)+"}"+word+"(?:[^a-zA-Z'-]+[a-zA-Z'-]+){0,"+str(leadtrail)+"}\W"
	return '\n'.join(re.findall(regexp,text,flags=re.I))

def main(argv):
        input_text = ''
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
        results = concordance(text,leadtrail,word) 
	#for x in range(0,len(results)):
	#	print results[x]	
	print results

if __name__ == "__main__":
        main(sys.argv[1:])

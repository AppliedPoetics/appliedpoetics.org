#! /usr/bin/python

import cgitb, getopt, re, string, sys, ap_encoding 

cgitb.enable()

def new_punct(text):
	#this routine was rewritten to reflect a new method, hence "new_punct"
	#set punctuation from string library and break out of set into string
	punctuation = set(string.punctuation)
	punct = ''.join(punctuation)
	#escape characters that might conflict with the set
	punct = re.escape(punct+"\r\n")
	#substitute blanks for everything that is not in our array
	text = re.sub(r'[^'+punct+']'," ",text,flags=re.I)
	return text
	
def main(argv):
       	#get arguments passed, where "text" is path to scratch
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "prisoners.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "prisoners.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	#read text from path
	text = ap_encoding.read_file(text)
        print new_punct(text) 

if __name__ == "__main__":
        main(sys.argv[1:])

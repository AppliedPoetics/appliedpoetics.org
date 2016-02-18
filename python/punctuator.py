#! /usr/bin/python

import cgitb, getopt, re, string, sys, ap_encoding 

cgitb.enable()

def new_punct(text):
	punctuation = set(string.punctuation)
	#return re.sub(r"\w*[^!,'?.-/\;:\]\[\{\}]\w*"," ",text,flags=re.I)
	punct = ''.join(punctuation)
	punct = re.escape(punct+"\r\n")
	text = re.sub(r'[^'+punct+']'," ",text,flags=re.I)
	return text
	
def main(argv):
        input_text = ''
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
	text = ap_encoding.read_file(text)
        print new_punct(text) 

if __name__ == "__main__":
        main(sys.argv[1:])

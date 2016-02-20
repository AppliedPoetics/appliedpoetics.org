#! /usr/bin/python

import getopt, re, string, sys, ap_encoding

def absente(text,lttrs):
	#remove spaces and punctuation
	lttrs = re.sub(" ","",lttrs)
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text if ch not in exclude)
	#regex to sub blanks for all words which do not contain letters in name passed
	results = re.sub(r"\w*["+lttrs+"']\w*","",text,flags=re.I)
	#regulate spacing
	results = results.replace('  ', " ")
	return results.strip()	

def main(argv):
        #get arguments passed, where "text is path to scratch/, "lttr" is constiuent letters in name passed
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "belleabsente.py -t <text> -l <lttrs>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "belleabsente.py -t <text> -l <lttrs>"
                elif opt in ("-t","--text"):
                        text = arg
                elif opt in ("-l","--lttr"):
                        lttr = arg
                else:
                        sys.exit(2)
	#read file from path
        text = ap_encoding.read_file(text)
	print absente(text,lttr) 

if __name__ == "__main__":
        main(sys.argv[1:])

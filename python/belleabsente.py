#! /usr/bin/python

import getopt, re, string, sys, ap_encoding

def absente(text,lttrs):
	lttrs = re.sub(" ","",lttrs)
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text if ch not in exclude)
	results = re.sub(r"\w*["+lttrs+"']\w*","",text,flags=re.I)
	results = results.replace('  ', " ")
	return results.strip()	

def main(argv):
        input_text = ''
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
        text = ap_encoding.read_file(text)
	print absente(text,lttr) 

if __name__ == "__main__":
        main(sys.argv[1:])

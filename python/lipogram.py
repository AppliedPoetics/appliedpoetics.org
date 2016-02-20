#! /usr/bin/python

import getopt, re, sys, ap_encoding

def lipogram(text,lttr):
	#set and test lipogram constraint in regular expressions (all words containing "lttr" erased)
	try:
                results = re.sub(r'\w*'+lttr+'\w*', "", text,flags=re.I)
		results = re.sub(r'  '," ", results)
		results = results.strip()
              	print results
        except:
                print ""

def main(argv):
        #get arguments passed, where "text" is path to scratch/, "lttr" is the letter to avoid
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "lipogram.py -t <text> -l <letter>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "lipogram.py -t <text> -l <letter>"
                elif opt in ("-t","--text"):
                        text = arg
                elif opt in ("-l","--lttr"):
                        lttr = arg
                else:
                        sys.exit(2)
	#read text from path
        text = ap_encoding.read_file(text)
	lipogram(text,lttr)

if __name__ == "__main__":
        main(sys.argv[1:])

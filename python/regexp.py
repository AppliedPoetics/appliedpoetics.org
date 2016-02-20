#! /usr/bin/python

import getopt, re, sys, ap_encoding

def regexp(text,regex):
	#run the specified regex
	result = re.findall(regex,text,flags=re.I)
	return "\n".join(result)

def main(argv):
        #get passed arguments, where "text"  is path to scratch/, "lttr" is the defined regex
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "regexp.py -t <text> -l <regexp>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "regexp.py -t <text> -l <regexp>"
                elif opt in ("-t","--text"):
                        text = arg
                elif opt in ("-l","--lttr"):
                        regex = arg
                else:
                        sys.exit(2)
	#read text from file
	text = ap_encoding.read_file(text)
        print regexp(text,regex) 

if __name__ == "__main__":
        main(sys.argv[1:])

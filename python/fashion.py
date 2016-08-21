#! /usr/bin/python

import cgitb, getopt, re, string, sys, ap_encoding

cgitb.enable()

def fashion():
	#read given list of fashion-related terms
	text = open('/var/www/html/python/resources/fashion-list.csv','r')
        contents = text.read()
        text.close()
        return contents

def tailor(text,terms):
	#intialize container, explode text into word array
	report = []
	text = ' '.join(text.split())
	#search the text for sentences containing the terms
	for i in range(0,len(terms)):
		sentences = (sentence for sentence in re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\!|\.|\?)\s',text) if " "+terms[i]+" " in sentence)
		for match in sentences:
			if match not in report:
				report.append(match)
	return report

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "fashion.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "fashion.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	#read text from file
        text = ap_encoding.read_file(text)
	#get fashion terms
        terms = fashion().split("\n")
	print '\n\n'.join(tailor(text,terms))	

if __name__ == "__main__":
        main(sys.argv[1:])

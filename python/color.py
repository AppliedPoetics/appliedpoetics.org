#! /usr/bin/python

import cgitb, getopt, re, string, sys, ap_encoding

cgitb.enable()

def colors():
	#load colors from master list
	text = open('/var/www/html/python/resources/color-list.csv','r')
        contents = text.read()
        text.close()
        return contents

def color_in(text,terms):
	#initialize containers and create continuous string from text
	report = []
	text = ' '.join(text.split())
	#loop through text, breaking on sentences and comparing to terms list
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
                print "color.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "color.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	#read file from path
        text = ap_encoding.read_file(text)
	#read color terms into array
        terms = colors().split("\r\n")
	#run routine
	print '\n\n'.join(color_in(text,terms))	

if __name__ == "__main__":
        main(sys.argv[1:])

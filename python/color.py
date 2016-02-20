#! /usr/bin/python

import cgitb, getopt, re, string, sys, ap_encoding

cgitb.enable()

def colors():
	text = open('/var/www/html/python/resources/color-list.csv','r')
        contents = text.read()
        text.close()
        return contents

def color_in(text,terms):
	report = []
	text = ' '.join(text.split())
	for i in range(0,len(terms)):
		sentences = (sentence for sentence in re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s',text) if " "+terms[i]+" " in sentence)
		for match in sentences:
			if match not in report:
				report.append(match)
	return report

def main(argv):
        input_text = ''
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
        text = ap_encoding.read_file(text)
        terms = colors().split("\r\n")
	print '\n\n'.join(color_in(text,terms))	

if __name__ == "__main__":
        main(sys.argv[1:])

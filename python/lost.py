#! /usr/bin/python

import getopt, sys, re, ap_encoding

def getlost(text):
	thenumbers = [4,8,15,16,23,42]
	full_text = text.split()
	result = ""
	pos = 0
	index = 0
	for x in range(0,len(full_text)):
		for i in range (0,len(thenumbers)):
			pos = (index + thenumbers[i]) - 1
			if index > len(full_text):
				break
			else:
				try:
					result = result + full_text[pos] + " "
				except:
					break
		index = index + 108
	return result

def main(argv):
        input_text = ''
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "lost.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "lost.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	text = ap_encoding.read_file(text)
        print getlost(text) 

if __name__ == "__main__":
        main(sys.argv[1:])

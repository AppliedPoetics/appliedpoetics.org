#! /usr/bin/python

import getopt, re, sys, ap_encoding

def powerball(text,balls):
	#initialize containers, explode word array, parse out the last number as the "powerball"
	index = 0
	result = ""
	ball = []
	full_text = text.split()
	ball = balls.split()
	powerball = ball[5]
	#remove the last number of sequence from searchable array
	del ball[-1]
	#search text, pulling out appropriate numbers based on current sequence
	for x in range(0,len(full_text)):
		for i in range (0,len(ball)):
			index = index + int(ball[i])-1
			if index < len(full_text):
				result = result + full_text[index] + " ";
		if x < len(full_text):
			result = result + "\n"
	#return text in addition to the "powerball" word as title
	return full_text[int(powerball)] + "\n" + " " + "\n" + result.rstrip()		

def main(argv):
        #get argumetns passed, where "text" is path to scratch/, "lttr" is numerical powerball sequence
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "powerball.py -t <text> -l <Powerball numbers (in sequence)>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "powerball.py -t <text> -l <Powerball numbers (in sequence)>"
                elif opt in ("-t","--text"):
                        text = arg
                elif opt in ("-l","--balls"):
                      	balls = arg
                else:
                        sys.exit(2)
	#read text from file
	text = ap_encoding.read_file(text)
        print powerball(text,balls)

if __name__ == "__main__":
        main(sys.argv[1:])

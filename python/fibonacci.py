#! /usr/bin/python

import getopt,re,sys,ap_encoding

def fibonacci(full_text):
	text = []
	sequence = []
	
	product = ""

	a=0
	b= 1
	result = b	

	text = full_text.split(' ')
	
	for x in range(0,len(text)):
		sequence.append(b)
		result = a+b
		a=b
		b = result
	
	for y in range(0,len(sequence)):
		if sequence[y] > len(text):
			pass
		else:
			product = product + text[sequence[y]] + " "
	return product 	
	
def main(argv):
        text = ''
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "fibonacci.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "fibonacci.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	text = ap_encoding.read_file(text)
        print fibonacci(text) 

if __name__ == "__main__":
        main(sys.argv[1:])

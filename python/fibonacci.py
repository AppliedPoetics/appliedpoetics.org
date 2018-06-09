#! /usr/bin/python

import cgitb, getopt,re,sys,ap_encoding

cgitb.enable()

def fibonacci(full_text):
	#initialize containers
	text = []
	sequence = []
	product = ""
	#initialize seeds to calculate sequence
	a=0
	b= 1
	result = b	
	#create word array
	regexp = re.compile(r"[\r\n]+")
	text = re.sub(regexp,' ',full_text)
	text = full_text.split(' ')
	#create sequence equal to the length of text
	for x in range(0,len(text)):
		sequence.append(b)
		result = a+b
		a=b
		b = result
	#search text for words appearing in order of sequence
	for y in range(0,len(sequence)):
		if sequence[y] > len(text):
			pass
		else:
			product = product + text[sequence[y]-1] + " "
	return product 	
	
def main(argv):
        #get arguments passed, where "text" is path to scratch/
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
	#read file path
	text = ap_encoding.read_file(text)
        print fibonacci(text) 

if __name__ == "__main__":
        main(sys.argv[1:])

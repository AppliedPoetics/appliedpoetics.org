#! /usr/bin/python

import cgitb, getopt, re, string, sys, ap_encoding

cgitb.enable()

def dial(text,number):
	# init counters/pointers/containers
	index = 0
	total = 0
	numbers = list(number)
	full_text = text.split()
	dialed_text = []
	# get total to move pointer
	for num in numbers:
		total = total + int(num)
	# "dial" the text
	for j in range(index,len(full_text)):
		for i in range(0,len(numbers)):
			try:
				dialed_text.append(full_text[index+int(numbers[i])])
			except:
				pass
		dialed_text.append("\n")
		index = index + total
		#print index
	return ' '.join(dialed_text)

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr"])
        except getopt.GetoptError:
                print "dialer.py -t <text> -l <phone number>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "dialer.py -t <text> -l <phone number>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--lttr"):
			lttr = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        print dial(text,lttr).strip()

if __name__ == "__main__":
        main(sys.argv[1:])

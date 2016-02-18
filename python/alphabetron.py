#! /usr/bin/python

import getopt, itertools, re, string, sys, ap_encoding

def thetron(text):
	full_text = text.split()
	num_ids = dict()
	successes = []
	for index, letter in enumerate(string.ascii_lowercase):
		num_ids[letter] = index + 1
	for i in range(0,len(full_text)):
		cycles = 0
		prev_id = 0
		lttr_vals = []
		try:
			word = list(full_text[i])
			for index, lttr in enumerate(word):
				lttr_vals.append(num_ids[lttr.lower()])
			iterator = iter(lttr_vals)
			for j in iterator:
				if j >= prev_id:
					cycles += 1
					if cycles == len(full_text[i]):
						successes.append(full_text[i])
				else:
					break 
				#print cycles
				prev_id = j				
		except:
			pass
	return successes

def main(argv):
        input_text = ''
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "alphabetron.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "alphabetron.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
        text = ap_encoding.read_file(text)
        print ', '.join(thetron(text))

if __name__ == "__main__":
        main(sys.argv[1:])

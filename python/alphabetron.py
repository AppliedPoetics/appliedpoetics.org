#! /usr/bin/python

import getopt, itertools, re, string, sys, ap_encoding

def thetron(text):
	#initialize text & containers
	full_text = text.split()
	num_ids = dict()
	successes = []
	#create correspondence between number & letter (1=a,2=b...)
	for index, letter in enumerate(string.ascii_lowercase):
		num_ids[letter] = index + 1
	#cycle through text
	for i in range(0,len(full_text)):
		#create counts & containers
		cycles = 0
		prev_id = 0
		lttr_vals = []
		try:
			#explode word
			word = list(full_text[i])
			#create numerical representation of word
			for index, lttr in enumerate(word):
				lttr_vals.append(num_ids[lttr.lower()])
			iterator = iter(lttr_vals)
			#iterate, comparing subsequent letters.
			for j in iterator:
				#test at intervals to ensure that each letter comes after previous in word
				if j >= prev_id:
					cycles += 1
					if cycles == len(full_text[i]):
						successes.append(full_text[i])
				else:
					break
				#set the numerical value of the last letter tested
				prev_id = j				
		except:
			pass
	return successes

def main(argv):
        #get arguments passed, where "text" is file path to scratch/
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
	#read file from path
        text = ap_encoding.read_file(text)
        print ', '.join(thetron(text))

if __name__ == "__main__":
        main(sys.argv[1:])

#!/usr/bin/python

import getopt, re, sys, ap_encoding

def tautogram(text,lttr):
	#initialize container
	results = ""
	try:
		#do the regex to only select words starting with the given letter
		results = re.findall(r'\b'+lttr+'[\w]*',text,re.I)
	except:
		pass
	return results	

def main(argv):
	#get arguments passed, where "text" is path to scratch/, "lttr" is the letter to use in the tautogram
	try:
		opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
	except getopt.GetoptError:
		print "tautogram.py -t <text> -l <letter>"
		sys.exit(2)
	for opt,arg in opts:
		if opt == "-h":
			print "tautogram.py -t <text> -l <letter>" 
		elif opt in ("-t","--text"):
			text = arg
		elif opt in ("-l","--lttr"):
			lttr = arg
		else:
			sys.exit(2)
	#read tet from file
	text = ap_encoding.read_file(text)
	result = ""
	results = tautogram(text,lttr)
	for x in range (0,len(results)):
		result = result + results[x] + " " 
	print result
	
if __name__ == "__main__":
	main(sys.argv[1:])

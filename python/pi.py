#!/usr/bin/python

import cgitb, getopt, re, sys, ap_encoding
from decimal import Decimal, getcontext
from math import factorial

cgitb.enable()

def bakepi(text_len):
	#read text_len digits of Pi
	pi_file = open("/var/www/html/python/resources/pi-million.txt","r")
	pi = pi_file.read(text_len)
	pi_file.close()
	pi_array = list(pi)
	return pi_array

def eatpi(text,bakedpi):
	#regulate spacing, initialize containers & counts, explode text into word array
	text = ' '.join(text.split())
	full_text = text.split()
	pi_text = []
	index = 0
	#loop through text applying pi to select "nth" word according to pi/position in text
	for x in range(0,len(bakedpi)):
		try:
			if x < len(full_text):
				pi_text.append(full_text[index + int(bakedpi[x]) - 1])
				index = index + int(bakedpi[x])
			else:
				break
		except:
			index = index + int(bakedpi[x])
	return ' '.join(pi_text)

def main(argv):
        #get arguments passed, where "text" is path to scratch/, the index and container below are used to pass the correct amount and value of pi
	num_pis = 0
	bakedpi = []
	try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "pi.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "pi.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	#read text from file
	input_text = ap_encoding.read_file(text)
	#get length of decimal places to take from pi
	num_pis = len(input_text.split())
	#get appropriate avalues from pi & run the routine
	bakedpi = bakepi(num_pis)
	print eatpi(input_text,bakedpi)

if __name__ == "__main__":
        main(sys.argv[1:])

#! /usr/bin/python
# Code in this routine is adapted from: https://realpython.com/blog/python/lyricize-a-flask-app-to-create-lyrics-using-markov-chains/

import cgitb, getopt, sys, ap_encoding
from random import choice

cgitb.enable()

def generate_model(text,order):
	model = {}
	for i in range(0,len(text)-order):
		frag = text[i:i+order]
		nltr = text[i+order]
		if frag not in model:
			model[frag]= {}
		if nltr not in model[frag]:
			model[frag][nltr] = 1
		else:
			model[frag][nltr] += 1
	return model

def generate_nchar(model,frag):
	letters = []
	for letter in model[frag].keys():
		for times in range(0,model[frag][letter]):
			letters.append(letter)
	return(choice(letters))

def generate_text(text,order,length):
	model = generate_model(text,order)
	curr_frag = text[0:order]
	output = ""
	for i in range(0,length-order):
		newchar = generate_nchar(model,curr_frag)
		output += newchar
		curr_frag = curr_frag[1:] + newchar
	return output

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:l:w:",["text=","lttr=","word="])
        except getopt.GetoptError:
                print "markov.py -t <text> -l <granularity> -w <chars>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "markov.py -t <text> -l <granularity> -w <chars>"
                elif opt in ("-t","--text"):
                        text = arg
                elif opt in ("-l","--lttr"):
                        order = int(arg)
		elif opt in ("-w","--word"):
			length = int(arg)
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        #handle results
        print generate_text(text,order,length)

if __name__ == "__main__":
        main(sys.argv[1:])

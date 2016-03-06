#! /usr/bin/python

import cgitb, getopt, re, sys, ap_encoding

cgitb.enable()

def alternate(text,type):
	#create alternating patterns for vowels, consonants
	regex_v = r"\b(?:[aeiou][bcdfghjklmnpqrstvwxyz][aeiou]{,1})*\b"
	regex_c = r"\b(?:[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]{,1})*\b"
	#sort flag: v for vowel, c for consonant, b for both
	if type == "v":
		regex = regex_v
	elif type == "c":
		regex = regex_c
	elif type == "b":
		regex = regex_v + "|" + regex_c
	return re.findall(regex,text,flags=re.I)

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "alternator.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "alternator.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--lttr"):
			lttr = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
       	alternates = alternate(text,lttr)
	print ' '.join(match for match in alternates if not len(match)<2) 

if __name__ == "__main__":
        main(sys.argv[1:])

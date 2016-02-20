#! /usr/bin/python

import cgitb, getopt, re, sys, ap_encoding 

cgitb.enable()

def univocal(text,lttr):
	#create list of vowels
	vowels = "aeiou"
	#remove specific vowel to avoid from the string
	vowels = vowels.replace(lttr,"")
	#two regular expressions here: first, to remove all vowels remaining, the second to pick out only those which contain the given letter
     	text = re.sub(r'\w*['+vowels+']+\w*'," ",text,flags=re.I)
	result = re.findall(r'\w*['+lttr+']\w*',text,flags=re.I)
        return '  '.join(result)

def main(argv):
        #get arguments passed, where "text" the path to scratch/, "lttr" is the vowel to focus results
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "univocalism.py -t <text> -l <vowel>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "univocalism.py -t <text> -l <vowel>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--lttr"):
			lttr = arg
                else:
                        sys.exit(2)
	#read text from file
	text = ap_encoding.read_file(text)
        print univocal(text,lttr)

if __name__ == "__main__":
        main(sys.argv[1:])

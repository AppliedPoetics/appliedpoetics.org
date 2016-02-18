#! /usr/bin/python

import cgitb, getopt, re, sys, ap_encoding 

cgitb.enable()

def univocal(text,lttr):
	vowels = "aeiou"
	vowels = vowels.replace(lttr,"")
     	text = re.sub(r'\w*['+vowels+']+\w*'," ",text,flags=re.I)
	result = re.findall(r'\w*['+lttr+']\w*',text,flags=re.I)
        return '  '.join(result)

def main(argv):
        input_text = ''
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
	text = ap_encoding.read_file(text)
        print univocal(text,lttr)

if __name__ == "__main__":
        main(sys.argv[1:])

#! /usr/bin/python

import getopt,re,sys,ap_encoding

def quotes(text):
	#initialize containers
	quoted = []
	text = ' '.join(text.split())
	text = text.decode('string_escape')
	#set regular expression; because all text is sanitized to contain single quotes, only single quot. needs to be searched
	regex = r"((?<![\\])['\"])((?:.(?!(?<![\\])\1))*.?)\1"	
	matches = re.findall(regex,text,flags=re.I)
	#Now that I look at this, I am not sure why I did it this way. Note to fix.
	if matches:
		for delimiter,match in matches:
			if match is not None:
				quoted.append(match)		
	else:
		pass
	return quoted

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "quotes.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "quotes.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
	#read text from file
	text = ap_encoding.read_file(text)
        print '\n'.join(quotes(text)) 

if __name__ == "__main__":
        main(sys.argv[1:])

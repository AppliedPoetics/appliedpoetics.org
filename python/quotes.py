#! /usr/bin/python

import getopt,re,sys,ap_encoding

def quotes(text):
	quoted = []
	text = ' '.join(text.split())
	text = text.decode('string_escape')
	regex = r"((?<![\\])['\"])((?:.(?!(?<![\\])\1))*.?)\1"	
	matches = re.findall(regex,text,flags=re.I)
	if matches:
		for delimiter,match in matches:
			if match is not None:
				quoted.append(match)		
	else:
		pass
	return quoted

def main(argv):
        input_text = ''
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
	text = ap_encoding.read_file(text)
        print '\n'.join(quotes(text)) 

if __name__ == "__main__":
        main(sys.argv[1:])

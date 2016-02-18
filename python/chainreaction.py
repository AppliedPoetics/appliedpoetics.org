#! /usr/bin/python

import getopt, re, string,sys, ap_encoding

def chainreact(text):
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text if not ch in exclude)
	chain = []	
	words = text.split()
	last_letter = words[0][-1:]
	chain.append(words[0])
	for i in range(1,len(words)):
		if words[i][:1] == last_letter:
			chain.append(words[i])
			last_letter = words[i][-1:]
	return chain

def main(argv):
        input_text = ''
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "chainreaction.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "chainreaction.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
        text = ap_encoding.read_file(text)
        print '\n'.join(chainreact(text))

if __name__ == "__main__":
        main(sys.argv[1:])

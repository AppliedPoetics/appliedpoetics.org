#! /usr/bin/python

import getopt, string, sys, ap_encoding

def birthdate(text,bdate):
	#remove punctuation, split into array
	exclude = set(string.punctuation)
	text = ''.join(ch for ch in text if ch not in exclude)
	words = text.split()
	#format birthdate
	bdate = ''.join(bdate.split("/"))
	mdy = list(bdate)
	#initialize containers
	result = []
	indx = 0
	#loop through text to select correct numerical positions
	for x in range(indx,len(words)):
		for i in range(0,len(mdy)):
			try:
				indx = indx + int(mdy[i])
				result.append(words[indx-1])
			except:
				break
	return result

def main(argv):
        #get arguments passed, where "text" is path to scratch/, "lttr" is the birthdate in MM-DD-YYYY form
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "birthdate.py -t <text> -l <birth date MM-DD-YYYY>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "birthdate.py -t <text> -l <birth date MM-DD-YYYY>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--date"):
			bdate = arg
                else:
                        sys.exit(2)
	#read file from path
	text = ap_encoding.read_file(text)
        print ', '.join(birthdate(text,bdate)) 
	
if __name__ == "__main__":
        main(sys.argv[1:])

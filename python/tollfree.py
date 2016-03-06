#! /usr/bin/python

import cgitb, getopt, re, string, sys, ap_encoding

cgitb.enable()

#create number correspondence
toll_lttrs = [10]
toll_lttrs.append(" ")
toll_lttrs.append(" ")
toll_lttrs.append("abc")
toll_lttrs.append("def")
toll_lttrs.append("ghi")
toll_lttrs.append("jkl")
toll_lttrs.append("mno")
toll_lttrs.append("pqrs")
toll_lttrs.append("tuv")
toll_lttrs.append("wxyz")

def tollFreeCall(text, number):
	#create string container, number/letter list
	toll_string = ""
	numbers = list(number)
	for num in numbers:
		toll_string = toll_string + str(toll_lttrs[int(num)])
	#find all the strings
	return re.findall(r"\w+["+toll_string+"]\w+",text,flags=re.I)

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr"])
        except getopt.GetoptError:
                print "tollfree.py -t <text> -l <phone number>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "tollfree.py -t <text> -l <phone number>"
                elif opt in ("-t","--text"):
                        text = arg
                elif opt in ("-l","--lttr"):
                        lttr = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        print ' '.join(tollFreeCall(text,lttr)) 

if __name__ == "__main__":
        main(sys.argv[1:])

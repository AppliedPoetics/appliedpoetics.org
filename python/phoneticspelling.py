#! usr/bin/python

import cgitb, getopt, re, sys, ap_encoding

cgitb.enable()

substitutions = [('a','a'),('b','be/bee'),('c','sea/see'),('g','gee'),('i','i'),('o','oh'),('q','queue/cue'),('r','are'),('t','tee'),('u','you/ewe'),('y','why')]
regex = re.compile("[a-z]*")

def getHex(text):
        translated = []
        words = text.split()
        for word in words:
                word = word.strip()
                for repl, subs in substitutions:
                        word = string.replace(word, repl, subs)
                match = regex.search(word)
                if match and match.group() == word:
                        translated.append(word)
        return translate	

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:",["text="])
        except getopt.GetoptError:
                print "homoconsonant.py -t <text>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "homoconsonant.py -t <text>"
                elif opt in ("-t","--text"):
                        text = arg
                else:
                        sys.exit(2)
        #read file from path
        text = ap_encoding.read_file(text)
        print spellings(text)

if __name__ == "__main__":
        main(sys.argv[1:])

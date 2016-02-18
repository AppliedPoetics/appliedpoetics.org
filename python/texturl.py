#! /usr/bin/python

import getopt, re, requests, sys, urllib3

def scrape(url):
	http = urllib3.connection_from_url(url)
	r = http.urlopen('GET',url)

	return r.data.decode('utf-8') 

def main(argv):
        input_text = ''
        try:
                opts,args = getopt.getopt(argv,"t:l:",["text=","lttr="])
        except getopt.GetoptError:
                print "texturl.py -t <url>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "texturl.py -t <url>"
                elif opt in ("-t","--url"):
                        url = arg
                else:
                        sys.exit(2)
        print scrape(url) 

if __name__ == "__main__":
        main(sys.argv[1:])

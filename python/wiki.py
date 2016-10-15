#! usr/bin/python

import BeautifulSoup, cgitb, getopt, os, re, requests, sys, wikipedia

cgitb.enable()

def scrapetopics(topic):
	search_buffer = []
	url = "https://en.wikipedia.org/w/index.php?title=Special%3AWhatLinksHere/"+topic+"&limit=5000"
	try:
		page = requests.get(url)
		source = BeautifulSoup.BeautifulSoup(page.text)
		refs = source.find("ul",{"id":"mw-whatlinkshere-list"})
		links = re.findall(r'\/wiki\/[^\(?:/|"|\#]+',str(refs))
		for link in links:
			ref_topic = link.split("/")[2]
			ref_topic = ref_topic.replace("_"," ")
			if not ref_topic in search_buffer:
				search_buffer.append(ref_topic)
	except: pass
	return search_buffer	

def scrapesingle(topic):
	topic = topic.replace(" ","_")
	try:
		page = wikipedia.page(topic)
		return page.content
	except: pass

def scraperefs(topic):
	result = ""
	search_buffer = []
	topic = topic.replace(" ","_")
	url = "https://en.wikipedia.org/w/index.php?title=Special%3AWhatLinksHere/"+topic+"&limit=5000"
	try:
		page = requests.get(url)
		source = BeautifulSoup.BeautifulSoup(page.text)
		refs = source.find("ul",{"id":"mw-whatlinkshere-list"})
		links = re.findall(r'\/wiki\/[^\(?:/|"|\#]+',str(refs))
		for link in links:
			ref_topic = link.split("/")[2]
			if not ref_topic in search_buffer:
				try:
					ref_page = wikipedia.page(ref_topic)
					ref_text = ref_page.content
					result += ref_text+"\r\n\r\n"
				except: pass
				search_buffer.append(ref_topic)
		return result	
	except: pass

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:w:",["topic=","wikipages="])
        except getopt.GetoptError:
                print "wiki.py -t <topic> -w <method>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "wiki.py -t <topic> -w <method>"
                elif opt in ("-t","--topic"):
                        topic = arg
		elif opt in ("-w","--wikipages"):
			method = arg
                else:
                        sys.exit(2)
        #pass topic to routine
	if method == "single":
		result = scrapesingle(topic)
	elif method == "pageref":
		result = scrapesingle(topic) + "\r\n\r\n"
		result += scraperefs(topic)
	elif method == "refonly":
		result = scraperefs(topic)
	elif method == "list":
		result = '[' + topic.title() + '] links to:\r\n\r\n' + '\r\n'.join(scrapetopics(topic))
	elif method == "":
		result = scrapesingle(topic)
	print result.encode('utf-8')
        

if __name__ == "__main__":
        main(sys.argv[1:])

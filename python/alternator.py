#! /usr/bin/python

import getopt, re, sys

def alternate(text,type):
	regex_c = r"(\w[aeiou][^aeiou]\w)$"
	regex_v = r"(\w[^aeiou][aeiou]\w+)$"
	if type == "v":
		regex = regex_v
	elif type == "c":
		regex = regex_c
	elif type == "b":
		regex = regex_v + "|" + regex_c
	return re.findall(regex,text,flags=re.I)

print alternate("But bones! All along the bony road there was no place to find bones!","b")

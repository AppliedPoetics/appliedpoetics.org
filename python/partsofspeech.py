#!/usr/bin/env python 
#-*- coding: UTF-8 -*-# enable debugging

import argparse, cgi, cgitb, json, ap_encoding 
from textblob import TextBlob
from textblob_aptagger import PerceptronTagger

cgitb.enable()

def pos_sort(text,pos):
	token = TextBlob(text,pos_tagger = PerceptronTagger()) 
	pos_list = []
	for word,speech in token.tags: 
		if pos in speech: 
			pos_list.append(word) 
	return pos_list
	return token.tags

parser = argparse.ArgumentParser(description='Process parts of speech.') 
parser.add_argument('t', metavar = "t", type=str) 
parser.add_argument('l', metavar = "l", type=str) 

args = parser.parse_args()

text=ap_encoding.read_file(args.t)

print ', '.join(pos_sort(text,args.l))

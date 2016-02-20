#!/usr/bin/env python 
#-*- coding: UTF-8 -*-# enable debugging
#NOTE: Textblob is analogous to NLTK now? (2/20/2016)
import argparse, cgi, cgitb, json, ap_encoding 
from textblob import TextBlob
from textblob_aptagger import PerceptronTagger

cgitb.enable()

def pos_sort(text,pos):
	#initialize the tokenized string and container
	token = TextBlob(text,pos_tagger = PerceptronTagger()) 
	pos_list = []
	#for each word and part of speech in the tokenized array, return the matching pair
	for word,speech in token.tags: 
		if pos in speech: 
			pos_list.append(word) 
	return pos_list

#This has no "main" like other routines. Later this will be revised, but this is a legacy routine written before AP using argparse isntead of getopt; ideallye verything should use argparse in the future?
#Get arguments passed where "t" is the path to scratch/, "l" is the part of speech to be extracted

parser = argparse.ArgumentParser(description='Process parts of speech.') 
parser.add_argument('t', metavar = "t", type=str) 
parser.add_argument('l', metavar = "l", type=str) 

args = parser.parse_args()
#read file from path
text=ap_encoding.read_file(args.t)
print ', '.join(pos_sort(text,args.l))

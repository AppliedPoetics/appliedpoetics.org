#! /usr/bin/python

import os, sys

#set encoding for each routine
reload(sys)
sys.setdefaultencoding('ISO-8859-1')

def read_file(path):
	#read file from scratch/ based on path name
	text = open(path,'r')
	contents = text.read()
	text.close()
	#remove temporary file & return to main routine
	os.remove(path)
	return contents

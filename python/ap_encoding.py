#! /usr/bin/python

import os, sys

reload(sys)
sys.setdefaultencoding('ISO-8859-1')

def read_file(path):
	text = open(path,'r')
	contents = text.read()
	text.close()
	os.remove(path)
	return contents

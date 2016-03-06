#! /usr/bin/python

import os, sys

def read_file(path):
        #read file from scratch/ based on path name
        text = open(path,'r')
        contents = text.read()
        text.close()
        return contents

print read_file('/var/www/html/python/resources/0000')

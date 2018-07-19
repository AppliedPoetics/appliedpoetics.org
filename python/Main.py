#!/usr/bin/python

import argparse, codecs

class Controller:

    @staticmethod
    def read_file(file):
        with codecs.open(file,"rb",encoding="utf-8") as f:
            contents = f.read()
        return contents

    @staticmethod
    def arg_parse():
        p = argparse.ArgumentParser()
        p.add_argument("-g",metavar="g",type=int, default=0,
                       help="Granularity parameter for functions requiring granularity settings.")
        p.add_argument("-p",metavar="p",type=str,
                       help="Main parameter for functions requiring single-parameter definitions.")
        p.add_argument("-c",metavar="c",type=int, default=0,
                       help="Number of characters to return for functions returning a number of characters.")
        p.add_argument("-t",metavar="t",type=str,required=True,
                       help="Filename of the text itself; required for all functions.")
        return p.parse_args()

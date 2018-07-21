#!/usr/bin/env python

from Main import Controller
import re

def main():
    args = Controller.arg_parse()
    t = Controller.read_file(args.t)
    t = ' '.join(t.splitlines())
    regexp = "\w(?:[a-zA-Z'-]+[^a-zA-Z'-]+){0,%s}%s(?:[^a-zA-Z'-]+[a-zA-Z'-]+){0,%s}\W" % (args.g,args.p,args.g)
    print '\r\n'.join(re.findall(regexp,t,re.I))

if __name__ == "__main__":
    main()
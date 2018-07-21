#!/usr/bin/env python

from Main import Controller
from textblob import TextBlob
from textblob_aptagger import PerceptronTagger
import string

def speech(text,part):
    exclude = set(string.punctuation)
    text = ''.join([ch for ch in text if ch not in exclude])
    token = TextBlob(text,pos_tagger=PerceptronTagger())
    for word,speech in token.tags:
        if part in speech: yield word

def main():
    args = Controller.arg_parse()
    t = Controller.read_file(args.t)
    print '\r\n'.join([w for w in speech(t,args.p)])

if __name__ == "__main__":
    main()
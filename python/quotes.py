from Main import Controller
import re

def main():
    args = Controller.arg_parse()
    t = Controller.read_file(args.t)
    regex = r"((?<![\\])['\"])((?:.(?!(?<![\\])\1))*.?)\1"	
    matches = re.findall(regex,t,flags=re.I)
    for delimit,match in matches: print match

if __name__ == "__main__":
    main()
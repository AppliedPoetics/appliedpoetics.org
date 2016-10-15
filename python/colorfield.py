#! usr/bin/python

import beaupresente, cgitb, color, getopt, os, PIL, string, sys, webcolors, ap_encoding
from PIL import Image

cgitb.enable()

def read(filename):
	colors = []
	basewidth = 100
	im = Image.open(filename)
	waspect = (basewidth/float(im.size[0]))
	haspect = int((float(im.size[1])*float(waspect)))
	im = im.resize((basewidth,haspect),PIL.Image.ANTIALIAS)
	if im.mode != "RGB":
		im = im.convert("RGB")
	px = im.load()
	width,height = im.size
	for i in range(0,height):
		for j in range(0,width):
			min_colors = {}
			r,g,b = px[j,i]
			for key,name in webcolors.css3_hex_to_names.items():
				rc,gc,bc = webcolors.hex_to_rgb(key)
				rd = (rc-r) ** 2
				gd = (gc-g) ** 2
				bd = (bc-b) ** 2
				min_colors[(rd+gd+bd)] = name
			color_name = min_colors[min(min_colors.keys())]
			if color_name not in colors:
				colors.append(color_name)
	return colors

def colormatch(text,colors,method):
	if method == "sentences":
		result = color.color_in(text,colors) 	
	if method == "letters":
		colors = ' '.join(colors)
		result = beaupresente.bpres(text,colors)
	return result

def main(argv):
        #get arguments passed, where "text" is path to scratch/
        try:
                opts,args = getopt.getopt(argv,"t:l:w:",["text=","filename=","method="])
        except getopt.GetoptError:
                print "color-field.py -t <text> -l <filename> -w <method>"
                sys.exit(2)
        for opt,arg in opts:
                if opt == "-h":
                        print "color-field.py -t <text> -l <filename> -w <method>"
                elif opt in ("-t","--text"):
                        text = arg
		elif opt in ("-l","--filename"):
			filename = arg
		elif opt in ("-w","--method"):
			method = arg
                else:
                        sys.exit(2)
	#read text from file
        text = ap_encoding.read_file(text)
	#get colors
	colors = read('scratch/img/'+filename)
	if method != "list":
		result = colormatch(text,colors,method)
	if method == "sentences":
		print '\n\n'.join(result)
	if method == "list":
		print '\n'.join(colors)
	os.remove('scratch/img/'+filename)

if __name__ == "__main__":
        main(sys.argv[1:])

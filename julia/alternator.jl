#!/usr/bin/julia

include("Main.jl")
using Controller
using Common

function alternate(t,m)
    v = "aeiou"
    c = "bcdfghjklmnpqrstvwxyz"
    regex_v = r"\\b(?:[$v][$c][$v]{,1})*\\b"
    regex_c = r"(?<![a-z])(?:(?![$c]{2}|[$v]{2})[a-z])+(?![a-z])"
    if m =="v"
        regex = Regex(regex_v,"ism")
    else if m == "c"
        regex = Regex(regex_c,"ism")
    else if m == "b"
        regex = Regex(regex_v + "|" + regex_c,"ism")
    end
    
end

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    t = Common.depunctuate(t)
    println(alternate(args.p))
end
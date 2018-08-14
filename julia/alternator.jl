#!/usr/bin/julia

include("Main.jl")
using Controller
using Common

function alternate(t,m)
    v = "aeiou"
    c = "bcdfghjklmnpqrstvwxyz"
    regex_v = "\\b(?:[$v][$c][$v]{,1})*\\b"
    regex_c = "(?<![a-z])(?:(?![$c]{2}|[$v]{2})[a-z])+(?![a-z])"
    if m =="v"
        regex = Regex(regex_v,"ism")
    elseif m == "c"
        regex = Regex(regex_c,"ism")
    elseif m == "b"
        regex = Regex(string(regex_c,"|",regex_v),"ism")
    end
    r = [w for w in matchall(regex,t) if w != ""]
    return r
end

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    t = Common.depunctuate(t)
    println(alternate(t,args["p"]))
end

main()
#!/usr/bin/julia

include("Main.jl")
using Controller

function main()
    args = Controller.arg_parse()
    p = args["p"]
    t = Controller.read_file(args["t"])
    pattern = Regex("\\w*$p\\w*","ism")
    r = replace(t,pattern,"")
    println(strip(replace(r,"  "," ")))
end

main()
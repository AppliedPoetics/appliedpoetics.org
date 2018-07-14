#!/usr/bin/julia

include("Main.jl")
using Controller

function main()
    args = Controller.arg_parse()
    p = args["p"]
    t = Controller.read_file(args["t"])
    pattern = Regex("[aeiouy]","ism")
    r = replace(t,pattern," ")
    println(strip(r))
end

main()
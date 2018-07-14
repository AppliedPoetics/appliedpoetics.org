#!/usr/bin/julia

include("Main.jl")
using Controller

function main()
    args = Controller.arg_parse()
    p = args["p"]
    t = Controller.read_file(args["t"])
    c = ["a","e","i","o","u"]
    c = join(filter!(e->e∉[p],c),"")
    pattern = Regex("\\w*[$c]\\w*","ism")
    t = replace(t,pattern,"")
    println(strip(t))
end

main()
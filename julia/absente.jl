#!/usr/bin/julia

include("Main.jl")
using Controller

function main()
    args = Controller.arg_parse()
    p = args["p"]
    t = Controller.read_file(args["t"])
    c = String[]
    c = Set(split(strip(p),","))
    chars = join(c,"")
    pattern = Regex("\\w*[$chars]\\w*","ism")
    t = replace(t,pattern,"")
    println(strip(t))
end

main()
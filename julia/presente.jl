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
    pattern = Regex("\\b[$chars]+\\b(?![,].)","ism")
    r = [m for m in matchall(pattern,t)]
    println(strip(join(r," ")))
end

main()
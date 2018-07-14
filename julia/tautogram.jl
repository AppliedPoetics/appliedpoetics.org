#!/usr/bin/julia

include("Main.jl")
using Controller

function main()
    args = Controller.arg_parse()
    p = args["p"]
    t = Controller.read_file(args["t"])
    pattern = Regex("\\b$p[\\w]*","ism")
    r = [m for m in matchall(pattern,t)]
    println(strip(join(r," ")))
end

main()

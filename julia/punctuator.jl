#!/usr/bin/julia

include("Main.jl")
using Controller

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    chars = "0-9A-Za-z"
    pattern = Regex("[$chars]","ism")
    t = replace(t,pattern," ")
    println(t)
end

main()
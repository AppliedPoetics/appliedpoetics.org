#!/usr/bin/julia

include("Main.jl")
using Controller
using Common

function translate(t)
    w = Common.split_to_lower(t)
    regex = Regex("\\b[a-f0-9]+\\b","ism")
    match = [m for m in matchall(regex,t) if lowercase(m) in w]
    return [w for w in Set(match)]
end

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    t = Common.depunctuate(t)
    println(join(translate(t),"\r\n"))
end

main()
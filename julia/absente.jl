#!/usr/bin/julia

include("Main.jl")
using Controller
using Common

function main()
    args = Controller.arg_parse()
    p = Set(split(strip(args["p"]),","))
    t = Controller.read_file(args["t"])
    chars = join(p,"")
    t = Common.word_by_word(t,"[$chars]")
    println(strip(t))
end

main()
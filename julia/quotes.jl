#!/usr/bin/julia

include("Main.jl")
using Controller

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    t = """ $t """
    pattern = r"((?<![\\])['\"])((?:.(?!(?<![\\])\1))*.?)\1"
    result = [m for m in matchall(pattern,t)]
    for i = 1:len(result)
        println(result[i])
    end
end

main()
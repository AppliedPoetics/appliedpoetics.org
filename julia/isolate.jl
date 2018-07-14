#!/usr/bin/julia

include("Main.jl")
using Controller

function main()
    args = Controller.arg_parse()
    p = args["p"]
    t = Controller.read_file(args["t"])
    t = join(split(t),' ')
    pattern = Regex("[^.!\?]+[\.!\?]","ism")
    result = [m for m in matchall(pattern,t)]
    for r in result
        if p == r[end:end]
            println(r)
        end
    end
end

main()
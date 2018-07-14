#!/usr/bin/julia

include("Main.jl")
using Controller

function sort_len(p::String,t::String)
    t = collect(Set(split(t)))
    if p == "melt"
        return sort(t,by=length)
    end
    if p == "freeze"
        return sort(t,by=length,rev=true)
    end
end

function main()
    args = Controller.arg_parse()
    p = args["p"]
    t = Controller.read_file(args["t"])
    punct = Regex("[.!?(),';\\[\\]\":;-]","ism")
    t = replace(t,punct," ")
    space = Regex("(\\s)+","ism")
    t = replace(t,space," ")
    t = sort_len(p,t)
    for i=1:length(t)
        println(t[i])
    end
end

main()
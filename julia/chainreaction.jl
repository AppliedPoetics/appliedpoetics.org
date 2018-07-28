#!/usr/bin/julia

include("Main.jl")
using Controller
using Common

l(s) = s[end]

function chain(t::String)
    c = split(t)
    result = String[]
    push!(result,c[1])
    last = l(c[1])
    for w in c
        if startswith(w,last)
            push!(result,w)
            last = l(w)
        end
    end
    return result
end

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    t = Common.depunctuate(t,"")
    println(join([m for m in chain(t)]," "))
end

main()
#!/usr/bin/julia

include("Main.jl")
using DataStructures
using Controller
using Common

function counter(w)
    counter = Dict()
    for char in Set(w)
        pattern = Regex("[$char]","ism")
        counter[char] = length(matchall(pattern,w))
    end
    return counter
end

function size(t)
    result = Dict()
    for w in t
        key = length(w)
        try
            push!(result["$key"],w)
        catch e
            result["$key"] = [w]
        end
    end
    return result
end

function compare(w)
    r = []
    c = Dict()
    for m in w
        c[m] = counter(m)
    end    
    println([m for m in w if length(filter((k,v)->v == counter(m),c)) > 1])
end

function nagaram(t)
    words = size(Set(t))
    for i = 0:length(words)-1
        w = words["$i"]
        m = compare(w)
    end
end

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    t = Common.depunctuate(t)
    t = Common.split_to_lower(t)
    nagaram(t)
end

main()
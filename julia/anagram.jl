#!/usr/bin/julia

include("Main.jl")
using DataStructures
using Controller
using Common

type Word
    string::String
    index
end

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

function compare(w,m)
    is_match = false
    if m == w
        return false
    end
    _w, _m = counter(w), counter(m)
    if keys(_w) == keys(_m)
        is_match = _w == _m
    end
    return is_match
end

function nagaram(t)
    results = Dict()
    words = size(Set(t))
    #ITERATE OVER WORDS GROUPED BY LENGTH
    #IN SOME EFFICIENT WAY.
    return results
end

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    t = Common.depunctuate(t)
    t = Common.split_to_lower(t)
    println(nagaram(t))
end

main()
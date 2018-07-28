#!/usr/bin/julia

include("Main.jl")
using DataStructures
using Controller
using Common

function enum_word(s,letters::Dict{Char,Integer})
    result = OrderedDict{Char,Integer}()
    for c in s
        c = Char(lowercase(c))
        try
            result[c] = letters[c]
        catch
            continue
        end
    end
    return result
end

function calc_match(w,letters::Dict{Char,Integer})
    char_array = enum_word(w,letters)
    cycles, previous = 1,1
    match = false
    try
        for c in w
            val = char_array[Char(lowercase(c))]
            if val >= previous
                if cycles == length(w)
                    match = true
                end
                cycles += 1
            else
                break
            end
            previous = val
        end
    catch
    end
    return match
end

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    s = split(t)
    chars = collect('a':'z')
    results = []
    letters = Dict{Char,Integer}()
    for (i,a) in enumerate(chars)
        letters[a] = i
    end
    for w in s
        w = Common.depunctuate(String(w)," ")
        is_match = calc_match(w,letters)
        if is_match
            push!(results,w)
        end
    end
    [println(m) for m in Set(results)]
end

main()
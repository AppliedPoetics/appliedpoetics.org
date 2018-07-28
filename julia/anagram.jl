#!/usr/bin/julia

include("Main.jl")
using Controller
using Common

type Word
    string::String
    index
end

function sort_words(words)
    return [i for (i,a) in enumerate(words)]
end

function get_words(t)
        return [Word(w,find(t .== w)) for w in t]
end

function nagaram(t,n)
    words = get_words(t)
    for i=1:n
        words[i] = sort(words[i].string,by=sort_words)
    end
end

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    t = Common.depunctuate(t)
    t = Common.split_to_lower(t)
    print(nagaram(t,length(t)))
end

main()
#!/usr/bin/julia

include("Main.jl")
using Controller
using Common

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    matches = []
    alpha = collect('a':'z')
    t= Common.depunctuate(t,"")
    t = Common.split_to_lower(t)
    for i = 1:length(alpha)
        for j = 1:length(t)
            if startswith(t[j],string(alpha[i]))
                push!(matches,t[j])
                break
            end
        end
    end
   [println(m) for m in matches]
end

main()
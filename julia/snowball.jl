#!/usr/bin/julia

include("Main.jl")
using Controller
using Common

function sort_len(p::Bool,t::String)
    t = collect(Set(split(t)))
    return sort(t,by=length,rev=p)
end

function main()
    args = Controller.arg_parse()
    p = args["p"] == "true" ? true: false
    t = Controller.read_file(args["t"])
    t = Common.depunctuate(t)
    t = Common.tight_spaces(t)
    t = sort_len(p,t)
    println(join(t,"\r\n"))
end

main()
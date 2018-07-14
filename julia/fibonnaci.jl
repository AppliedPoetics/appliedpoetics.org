#!/usr/bin/julia

include("Main.jl")
using Controller

function fib(n::Int)
    helper(current::BigInt,next::BigInt,n::Int) = n==0 ? current : helper(next::BigInt,next+current,n-1)
    return helper(BigInt(0), BigInt(1), n)
end

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    w = [word for word in split(t," ") if word != ""]
    fibs = Int[]
    for i = 1:length(w)
        f = fib(i)
        if f > length(w)
            break
        end
        append!(fibs,f)
    end
    r = String[]
    for i = 1:length(fibs)
        push!(r,w[fibs[i]])
    end
    println(join(r," "))
end

main()
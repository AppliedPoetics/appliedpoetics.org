#!/usr/bin/julia

include("Main.jl")
using Controller

function main()
    args = Controller.arg_parse()
    t = Controller.read_file(args["t"])
    prisoners = String["b","d","f","g","h","j","k","l",
                    "p","q","t","y","0","1","2","3",
                    "4","5","6","7","8","9"]
    for i=1:length(prisoners)
        prisoner = prisoners[i]
        pattern = Regex("\\w*$prisoner\\w*","ism")
        t = replace(t,pattern,"")
    end
    println(strip(t))
end

main()
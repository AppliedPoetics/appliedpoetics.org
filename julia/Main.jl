#!/usr/bin/julia

module Controller

using ArgParse

    function read_file(file::String)
        f = open(file) do content
            read(content,String)
        end
        return replace(f,"\n"," ")
    end

    function arg_parse()
        s = ArgParseSettings()
        
        add_arg_table(s,
            ["-g"],
                Dict(
                    :help => "Granularity parameter for functions requiring granularity settings.",
                    :arg_type => Int
                ),
            ["-p"],
                Dict(
                    :help => "Main parameter for functions requiring single-parameter definitions."
                ),
            ["-c"],
                Dict(
                    :help => "Number of characters to return for functions returning a number of characters.",
                    :arg_type => Int,
                    :default => 0
                ),
            ["-t"],
                Dict(
                    :help => "Filename of the text itself; required for all functions.",
                    :arg_type => String,
                    :required => true
                )
        )
        return parse_args(s)
    end

end

module Common

    function depunctuate(t::String)
        pattern = Regex("[^0-9A-Za-z]","ism")
        return replace(t,pattern," ")
    end
    
    function tight_spaces(t::String)
        pattern = Regex("(\\s+)","ism")
        return replace(t,pattern," ")
    end
    
    function word_by_word(t::String,p::String)
        pattern = Regex("\\w*$p\\w*","ism")
        return replace(t,pattern,"")
    end

end
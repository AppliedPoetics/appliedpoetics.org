extern crate regex;
extern crate itertools;

use regex::Regex;
use std::env;
use std::fs::File;
use std::io::Read;
use std::collections::HashSet;

pub struct Task {
    pub file: String,
    pub args: Vec<String>
}

pub fn read(filename: String)
    -> String {
        let mut contents = String::new();
        let mut fh = File::open(filename)
            .expect("Unable to open");
        fh.read_to_string(&mut contents)
            .expect("Could not explicate.");
        contents
    }

pub fn regex(regexp: String)
    -> Regex {
        let re = Regex::new(&regexp).unwrap();
        re
    }
    
pub fn hash_result(res: HashSet<&str>)
    -> String {
        let result = itertools::join(&res," ");
        result
    }
    
pub fn vec_result(res: &Vec<&str>)
    -> String {
        let result = &res.join(" ");
        result.to_string()
    }

pub fn word_list(text: &String)
    -> Vec<&str> {
        let words = text
            .split(|c: char| !c.is_alphanumeric())
            .filter(|w| !w.is_empty())
            .map(|w| w)
            .collect::<Vec<_>>();
        words
    }

pub fn remove_punct(text: &String)
    -> String {
        let mut res = String::new();
        let mut punct = String::new();
            punct = "!&\"',;:.?()[]!@#$%^&*-+={}|\\/<>~`"
                .to_string();
        for c in text.chars(){
            if !punct.contains(c) {
                res.push(c);
            }
        }
        res.to_string()
    }

impl Task{

    pub fn init()
        -> Task {
            Task {
                file: String::new(),
                args: Vec::new()
            }
        }

    pub fn args(&mut self)
        -> &mut Task {
            let cmds: Vec<String> = env::args()
                 .skip(1)
                 .collect();
            self.file = cmds[0].clone();
            self.args.extend_from_slice(&cmds[1..]);
            self
        }

    }
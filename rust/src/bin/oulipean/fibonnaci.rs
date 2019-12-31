extern crate core;

use std::env;

fn choose(words: Vec<&str>, n: Vec<usize>)
    -> Vec<&str> {
        let mut res = Vec::new();
        for idx in n {
            res.push(words[idx-1]);
        }
        res
    }

fn fibonnaci(n: usize)
    -> Vec<usize>{
        let mut x = vec![1,1];
        for i in 2..n{
            let next = x[i-1] + x[i-2];
            if next > n { break; }
            x.push(next);
        }
        x
    }

pub fn main() {
    let mut args = core::Task::init();
        args.args();
    let text = core::read(args.file);
    let words = core::word_list(&text);
    let fibs = fibonnaci(words.len());
    let choices = choose(words,fibs);
    let res = core::vec_result(&choices);
    println!("{}",res);
}


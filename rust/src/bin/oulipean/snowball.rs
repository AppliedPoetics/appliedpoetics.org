extern crate core;

use std::env;

fn method(mut words: Vec<&str>, mtd: String)
    -> Vec<&str>{
        words.sort();
        words.dedup_by(
            |a,b|
            a.eq_ignore_ascii_case(b)
        );
        words.sort_by_key(
            |a| 
            a.len()
        );
        if mtd == "m" {
            words.reverse();
        }
        words
    }

pub fn main() {
    let mut args = core::Task::init();
        args.args();
    let text = core::read(args.file).to_lowercase();
    let words = core::word_list(&text);
    let mtd = if args.args.len() > 0 {&args.args[0]} else {""};
    println!("{:?}",method(words,mtd.to_string()));
}
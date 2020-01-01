extern crate core;

use std::env;

fn method(mut words: Vec<&str>, mtd: String)
    -> Vec<&str>{
        words.sort();
        words.sort_by(
            |a,b| 
            {
                a.len().cmp(&b.len())
                .then(
                    a.to_ascii_lowercase()
                    .cmp(&b.to_ascii_lowercase())
                .reverse())
            }
        );
        words.dedup_by(
            |a,b|
            a.eq_ignore_ascii_case(b)
        );
        if mtd == "m" {
            words.reverse();
        }
        words
    }

pub fn main() {
    let mut args = core::Task::init();
        args.args();
    let text = core::read(args.file);
    let words = core::word_list(&text);
    let mtd = if args.args.len() > 0 
        {
            &args.args[0]
        } 
        else
        {
            ""
        };
    let res = method(words,mtd.to_string());
    println!("{}",core::vec_result(&res));
}
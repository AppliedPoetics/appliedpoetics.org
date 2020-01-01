extern crate core;

use std::env;
use regex::Regex;

pub fn main() {
    let mut args = core::Task::init();
        args.args();
    let text = core::read(args.file);
    let re = Regex::new(
        r"[^!&',;:.?()\[\]!@#$%^&*-+=\{\}|\\/<>~`]"
    ).unwrap();
    let caps = re
        .replace_all(&text," ");
    println!("{}",caps);
}
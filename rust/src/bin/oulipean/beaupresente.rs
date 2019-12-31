extern crate core;

use std::env;

pub fn main() {
    let mut args = core::Task::init();
        args.args();
    let text = core::read(args.file);
    let clean = core::remove_punct(&text);
    let re = core::regex(
            format!(r"(?ism)\b[{}]+\b",args.args[0])
        );
    let caps = re
        .find_iter(&clean)
        .map(|cap| cap.as_str())
        .collect::<Vec<_>>();
    let res = core::vec_result(&caps);
    println!("{}",res);
}

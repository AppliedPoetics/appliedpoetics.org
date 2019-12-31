extern crate core;

use std::env;

pub fn main() {
    let mut args = core::Task::init();
        args.args();
    let text = core::read(args.file);
    let re = core::regex(
            format!(r"\w*[{}]\w*(?im)",args.args[0])
        );
    let caps = re
        .replace_all(&text,"");
    println!("{}",caps);
}

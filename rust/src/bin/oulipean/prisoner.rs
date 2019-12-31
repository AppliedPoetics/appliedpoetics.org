extern crate core;

use std::env;

pub fn main() {
    let mut args = core::Task::init();
        args.args();
    let text = core::read(args.file).to_lowercase();
    let re = core::regex(
            format!(r"(?m)\w*[bdfghjklpqty0-9()!?]\w*")
        );
    let caps = re
        .replace_all(&text,"");
    println!("{}",caps);
}

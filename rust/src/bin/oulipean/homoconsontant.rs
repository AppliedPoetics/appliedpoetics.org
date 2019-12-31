extern crate core;

pub fn main() {
    let mut args = core::Task::init();
        args.args();
    let text = core::read(args.file);
    let re = core::regex(
            format!(r"(?im)[aeiou]")
        );
    let caps = re
        .replace_all(&text,"");
    println!("{}",caps);
}

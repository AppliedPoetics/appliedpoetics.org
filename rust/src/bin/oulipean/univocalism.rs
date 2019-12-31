extern crate core;

pub fn main() {
    let mut args = core::Task::init();
        args.args();
    let text = core::read(args.file);
    let clean = core::remove_punct(&text);
    let vowel: Vec<char> = 
        args.args[0]
        .chars()
        .collect();
    let vowels = "aeiou"
        .chars()
        .filter(|v| *v != vowel[0]);
    let set: String = 
        vowels
        .collect();
    let re = core::regex(
            format!(r"(?ism)\w*[{}]\w*",set)
        );
    let caps = re
        .replace_all(&clean,"");
    println!("{}",caps);
}

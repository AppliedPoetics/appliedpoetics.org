extern crate core;

pub fn main() {
    let mut args = core::Task::init();
        args.args();
    let text = core::read(args.file);
    let re = core::regex(
            format!(r"(?im)\b{}[\w]*",args.args[0])
        );
    let caps = re
        .find_iter(&text)
        .map(|cap| cap.as_str())
        .collect::<Vec<_>>();
    let res = core::vec_result(&caps);
    println!("{}",res);
}

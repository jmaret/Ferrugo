export type Choice = {
  id: string;
  label: string;
};

export type Check = {
  id: string;
  prompt: string;
  options: Choice[];
  answer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  chapter: string;
  title: string;
  summary: string;
  code: string;
  notice: string;
  aside?: string;
  checks: Check[];
};

export function rust(code: string): string {
  const lines = code.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
  const pad = lines
    .filter((line) => line.trim().length > 0)
    .reduce((min, line) => Math.min(min, line.match(/^ */)?.[0].length ?? 0), 80);
  return lines.map((line) => line.slice(pad)).join("\n");
}

export const lessons: Lesson[] = [
  {
    id: "main",
    chapter: "A small program",
    title: "The program starts at main",
    summary:
      "An executable Rust program begins in a function named main. The body is a block. This one prints a single line and then ends.",
    code: rust(`
      fn main() {
          println!("The bridge holds.");
      }
    `),
    notice:
      "fn names a function. The empty parentheses mean main takes no arguments. The programs on this page are Rust 2024.",
    checks: [
      {
        id: "main-entry",
        prompt: "Where does this program start?",
        options: [
          { id: "a", label: "The first line of the file, whatever it says" },
          { id: "b", label: "The function named main" },
          { id: "c", label: "The println! line, because it is the only statement" },
        ],
        answer: "b",
        explanation: "The runtime calls main. A file can hold other functions, and main is still the start.",
      },
      {
        id: "main-output",
        prompt: "What line does the program write?",
        options: [
          { id: "a", label: "The bridge holds." },
          { id: "b", label: "fn main()" },
          { id: "c", label: "Nothing. println! only prepares the text." },
        ],
        answer: "a",
        explanation: "println! writes the text between the quotes, then a newline.",
      },
    ],
  },
  {
    id: "printing",
    chapter: "A small program",
    title: "println! fills a placeholder",
    summary:
      "println! is a macro, which is why the name ends in !. Braces in the string are a placeholder. The matching name is filled in when the line runs.",
    code: rust(`
      fn main() {
          let span = 12;
          println!("Span: {span} meters");
      }
    `),
    notice: "The braces are not printed. {span} is replaced by the value of the binding span.",
    checks: [
      {
        id: "print-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "Span: {span} meters" },
          { id: "b", label: "Span: 12 meters" },
          { id: "c", label: "span meters" },
        ],
        answer: "b",
        explanation: "The placeholder takes the value 12. The rest of the string is written as it appears.",
      },
      {
        id: "print-macro",
        prompt: "Why does println! end with an exclamation mark?",
        options: [
          { id: "a", label: "It is a macro, not an ordinary function" },
          { id: "b", label: "The mark means the call can fail" },
          { id: "c", label: "It prints to the error stream" },
        ],
        answer: "a",
        explanation: "Macros are invoked with !. println! can take a format string and values, which a normal function call cannot shape the same way.",
      },
    ],
  },
  {
    id: "cargo",
    chapter: "A small program",
    title: "The Cargo shape",
    summary:
      "A real package is a directory. Cargo.toml names it. src/main.rs holds the program. Cargo reads that layout when you build.",
    code: rust(`
      // ferrugo-bridge/
      // ├── Cargo.toml
      // └── src/
      //     └── main.rs

      fn main() {
          println!("cargo run");
      }
    `),
    notice:
      "Cargo.toml is the manifest. src/main.rs is the binary crate root. Comments with // are not executed.",
    aside:
      "This site does not run Cargo. Try it opens the program that would live in src/main.rs. On your own machine, cargo run builds and runs the package.",
    checks: [
      {
        id: "cargo-file",
        prompt: "Which file holds fn main?",
        options: [
          { id: "a", label: "Cargo.toml" },
          { id: "b", label: "src/main.rs" },
          { id: "c", label: "Cargo.lock" },
        ],
        answer: "b",
        explanation: "The program lives in src/main.rs. Cargo.toml describes the package. Cargo.lock records dependency versions.",
      },
      {
        id: "cargo-command",
        prompt: "On your own machine, which command builds and runs this package?",
        options: [
          { id: "a", label: "cargo run" },
          { id: "b", label: "npm start" },
          { id: "c", label: "rustup println" },
        ],
        answer: "a",
        explanation: "cargo run compiles the package and then runs the binary. This page only sends the source to the playground when you choose Try it.",
      },
    ],
  },
  {
    id: "bindings",
    chapter: "Syntax",
    title: "let and mut",
    summary:
      "let introduces a binding. It cannot be assigned again unless you write mut. The value can still be read either way.",
    code: rust(`
      fn main() {
          let bolts = 4;
          let mut coats = 1;
          coats += 1;
          println!("{bolts} bolts, {coats} coats");
      }
    `),
    notice: "bolts is immutable. coats is mutable, so coats += 1 is allowed and coats becomes 2.",
    checks: [
      {
        id: "bindings-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "4 bolts, 1 coats" },
          { id: "b", label: "4 bolts, 2 coats" },
          { id: "c", label: "5 bolts, 2 coats" },
        ],
        answer: "b",
        explanation: "bolts stays 4. coats starts at 1 and then increases by 1.",
      },
      {
        id: "bindings-assign",
        prompt: "What happens if you add the line bolts = 5?",
        options: [
          { id: "a", label: "It prints 5 bolts, 2 coats" },
          { id: "b", label: "It compiles, and bolts stays 4" },
          { id: "c", label: "It does not compile, because bolts is not mut" },
        ],
        answer: "c",
        explanation: "Assignment needs mut. Without it, the compiler rejects bolts = 5.",
      },
    ],
  },
  {
    id: "types",
    chapter: "Syntax",
    title: "A few types",
    summary:
      "A binding can name its type. i32 is a 32-bit integer. bool is true or false. char is one Unicode scalar, written with single quotes. &str is a borrowed view of text, written with double quotes.",
    code: rust(`
      fn main() {
          let piers: i32 = 2;
          let open: bool = true;
          let mark: char = 'F';
          let name: &str = "Ferrugo";
          println!("{piers} {open} {mark} {name}");
      }
    `),
    notice: "The compiler can often infer the type. Writing it out makes the four shapes easy to see.",
    checks: [
      {
        id: "types-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "2 true F Ferrugo" },
          { id: "b", label: "2 true 'F' \"Ferrugo\"" },
          { id: "c", label: "i32 bool char &str" },
        ],
        answer: "a",
        explanation: "The values are printed, not the type names and not the quote marks around the char and the string.",
      },
      {
        id: "types-str",
        prompt: "What is &str in this program?",
        options: [
          { id: "a", label: "An owned, growable string" },
          { id: "b", label: "A borrowed view of text" },
          { id: "c", label: "A single character" },
        ],
        answer: "b",
        explanation: "&str borrows text. String, which shows up later, owns growable text. char holds one character, so mark is a char and name is a &str.",
      },
    ],
  },
  {
    id: "functions",
    chapter: "Syntax",
    title: "Functions return a value",
    summary:
      "A function names its parameters and, after ->, the type it returns. The last expression in the body is the return value when it has no semicolon.",
    code: rust(`
      fn span(piers: i32) -> i32 {
          piers * 6
      }

      fn main() {
          println!("{}", span(2));
      }
    `),
    notice: "piers * 6 has no semicolon, so it is the returned i32. A semicolon would turn it into a statement and the function would not return that number.",
    checks: [
      {
        id: "functions-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "2" },
          { id: "b", label: "6" },
          { id: "c", label: "12" },
        ],
        answer: "c",
        explanation: "span(2) evaluates 2 * 6 and returns 12. println! writes that number.",
      },
      {
        id: "functions-semi",
        prompt: "Why is there no semicolon after piers * 6?",
        options: [
          { id: "a", label: "That expression is the value the function returns" },
          { id: "b", label: "Rust forbids semicolons inside functions" },
          { id: "c", label: "The semicolon is optional and would not change the return" },
        ],
        answer: "a",
        explanation: "An expression without a semicolon is the return value. Adding a semicolon would make the function return the unit value () instead, and the types would not match.",
      },
    ],
  },
  {
    id: "flow",
    chapter: "Syntax",
    title: "if and loops",
    summary:
      "if runs a block when the condition is true. for walks a range. 1..=2 includes both ends, so the body runs for 1 and for 2.",
    code: rust(`
      fn main() {
          let rust = 3;
          if rust > 2 {
              println!("coat");
          }
          for pier in 1..=2 {
              println!("pier {pier}");
          }
      }
    `),
    notice: "The if has no parentheses around the condition. The range 1..=2 is inclusive. 1..2 would stop before 2.",
    checks: [
      {
        id: "flow-first",
        prompt: "What is the first line printed?",
        options: [
          { id: "a", label: "coat" },
          { id: "b", label: "pier 1" },
          { id: "c", label: "Nothing. rust > 2 is false." },
        ],
        answer: "a",
        explanation: "3 is greater than 2, so the if block runs and prints coat before the loop starts.",
      },
      {
        id: "flow-range",
        prompt: "How many lines start with pier?",
        options: [
          { id: "a", label: "One, because ..= stops before the end" },
          { id: "b", label: "Two: pier 1 and pier 2" },
          { id: "c", label: "Three, counting from zero" },
        ],
        answer: "b",
        explanation: "1..=2 includes 1 and 2. The loop body prints one line each time.",
      },
    ],
  },
  {
    id: "structs",
    chapter: "Data",
    title: "Structs and methods",
    summary:
      "A struct groups named fields. impl adds methods. &self borrows the value, so calling the method does not move the struct away.",
    code: rust(`
      struct Bridge {
          span: i32,
      }

      impl Bridge {
          fn label(&self) -> String {
              format!("{}m", self.span)
          }
      }

      fn main() {
          let bridge = Bridge { span: 12 };
          println!("{}", bridge.label());
      }
    `),
    notice: "label returns an owned String built by format!. self.span reads the field through the borrow.",
    checks: [
      {
        id: "structs-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "12m" },
          { id: "c", label: "Bridge" },
        ],
        answer: "b",
        explanation: "format! builds the text 12m from the span field, and label returns that String.",
      },
      {
        id: "structs-self",
        prompt: "What does &self mean on label?",
        options: [
          { id: "a", label: "The method borrows the bridge" },
          { id: "b", label: "The method takes ownership and the bridge cannot be used again" },
          { id: "c", label: "self is a copy of the integer 12" },
        ],
        answer: "a",
        explanation: "&self is a shared borrow of the Bridge. The call bridge.label() leaves bridge in place.",
      },
    ],
  },
  {
    id: "enums",
    chapter: "Data",
    title: "Enums and match",
    summary:
      "An enum is a value that is one of a fixed set of variants. match must cover every variant, so a forgotten case is a compile error rather than a surprise at runtime.",
    code: rust(`
      enum Coat {
          Sound,
          Flaking,
      }

      fn report(coat: Coat) -> &'static str {
          match coat {
              Coat::Sound => "sound",
              Coat::Flaking => "flaking",
          }
      }

      fn main() {
          println!("{}", report(Coat::Flaking));
      }
    `),
    notice: "Each arm is a pattern and an expression. Coat::Flaking selects the second arm.",
    checks: [
      {
        id: "enums-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "sound" },
          { id: "b", label: "flaking" },
          { id: "c", label: "Coat::Flaking" },
        ],
        answer: "b",
        explanation: "The value is Coat::Flaking, so report returns the string flaking.",
      },
      {
        id: "enums-exhaustive",
        prompt: "What happens if the Sound arm is deleted?",
        options: [
          { id: "a", label: "The program prints an empty line when the coat is sound" },
          { id: "b", label: "It does not compile, because match must cover every variant" },
          { id: "c", label: "It compiles, and Sound falls through to flaking" },
        ],
        answer: "b",
        explanation: "match is exhaustive. Leaving out Coat::Sound is an error at compile time.",
      },
    ],
  },
  {
    id: "collections",
    chapter: "Data",
    title: "Vec and String",
    summary:
      "Vec is a growable list. String is growable owned text. push adds one item to the vector. push_str appends text to the String.",
    code: rust(`
      fn main() {
          let mut names = vec!["north", "south"];
          names.push("center");
          let mut title = String::from("span");
          title.push_str("s");
          println!("{} {}", names.len(), title);
      }
    `),
    notice: "vec! builds a Vec. The items here are &str. String::from owns the characters, so the String can grow.",
    checks: [
      {
        id: "collections-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "2 span" },
          { id: "b", label: "3 spans" },
          { id: "c", label: "3 span" },
        ],
        answer: "b",
        explanation: "The vector starts with two names and push adds a third, so len() is 3. push_str turns span into spans.",
      },
      {
        id: "collections-string",
        prompt: "Why is title a String instead of a &str?",
        options: [
          { id: "a", label: "String owns text that can grow" },
          { id: "b", label: "&str cannot be printed" },
          { id: "c", label: "String holds exactly one character" },
        ],
        answer: "a",
        explanation: "A &str is borrowed and does not grow. String owns its buffer, so push_str can append.",
      },
    ],
  },
  {
    id: "ownership",
    chapter: "The Rust idea",
    title: "Ownership and moves",
    summary:
      "A String has one owner. Assigning it to another binding moves it. The first binding cannot be used after the move. Integers are Copy, so they are duplicated instead. A String is not.",
    code: rust(`
      fn main() {
          let name = String::from("Ferrugo");
          let moved = name;
          println!("{moved}");
      }
    `),
    notice: "After the move, moved owns the text. name is no longer valid. That is why the print uses moved.",
    checks: [
      {
        id: "ownership-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "Ferrugo" },
          { id: "b", label: "name" },
          { id: "c", label: "Nothing. A move prevents the print." },
        ],
        answer: "a",
        explanation: "moved owns the String, and println! writes its text.",
      },
      {
        id: "ownership-use",
        prompt: "What happens if you also print name after the move?",
        options: [
          { id: "a", label: "Both prints write Ferrugo" },
          { id: "b", label: "It does not compile. The String moved, and String is not Copy." },
          { id: "c", label: "name prints an empty string" },
        ],
        answer: "b",
        explanation: "The owner is moved into moved. Using name afterward is a compile error. An i32 would still be usable, because i32 is Copy.",
      },
    ],
  },
  {
    id: "borrowing",
    chapter: "The Rust idea",
    title: "References and borrowing",
    summary:
      "A reference lets a function use a value without taking ownership. &name lends the String. When length returns, name is still the owner, so main can print it.",
    code: rust(`
      fn length(name: &str) -> usize {
          name.len()
      }

      fn main() {
          let name = String::from("Ferrugo");
          let count = length(&name);
          println!("{name} is {count}");
      }
    `),
    notice:
      "&name creates a shared borrow. The parameter type &str accepts that borrow. len() counts bytes, and these seven letters are one byte each.",
    checks: [
      {
        id: "borrowing-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "Ferrugo is 7" },
          { id: "b", label: "is 7" },
          { id: "c", label: "Ferrugo is 8" },
        ],
        answer: "a",
        explanation: "The borrow ends when length returns, so name can be printed. Ferrugo is seven bytes.",
      },
      {
        id: "borrowing-owner",
        prompt: "Who owns the String after length returns?",
        options: [
          { id: "a", label: "name, in main" },
          { id: "b", label: "the parameter inside length" },
          { id: "c", label: "Nobody. The borrow consumed it." },
        ],
        answer: "a",
        explanation: "A shared reference does not move the value. name was the owner before the call and is still the owner after it.",
      },
    ],
  },
  {
    id: "results",
    chapter: "The Rust idea",
    title: "Option, Result, and ?",
    summary:
      "Option is either Some(value) or None. Result is either Ok(value) or Err(error). The ? operator, used in a function that returns Result, returns the error early so the rest of the function runs only on Ok.",
    code: rust(`
      fn span_from(text: &str) -> Result<i32, std::num::ParseIntError> {
          let meters = text.parse::<i32>()?;
          Ok(meters)
      }

      fn main() {
          let meters = span_from("12").expect("span");
          println!("{meters}");
      }
    `),
    notice:
      "parse returns a Result. ? unwraps the Ok or leaves the function with the Err. expect is for main, which does not return that error type. None is the Option shape of absence. Err is the Result shape of failure.",
    checks: [
      {
        id: "results-output",
        prompt: "What does this program print?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "Ok(12)" },
          { id: "c", label: "span" },
        ],
        answer: "a",
        explanation: "\"12\" parses as the integer 12. expect takes the Ok value, and println! writes 12.",
      },
      {
        id: "results-question",
        prompt: "What does ? do when the text is not an integer?",
        options: [
          { id: "a", label: "It turns the error into 0 and continues" },
          { id: "b", label: "It returns the Err from span_from immediately" },
          { id: "c", label: "It panics inside span_from" },
        ],
        answer: "b",
        explanation: "? is an early return of the error. The panic would come from expect, and only if main called it on an Err.",
      },
    ],
  },
];

export function chapterId(chapter: string): string {
  return chapter
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function lessonsByChapter(source: Lesson[] = lessons): { chapter: string; lessons: Lesson[] }[] {
  const order: string[] = [];
  const groups = new Map<string, Lesson[]>();
  for (const lesson of source) {
    const group = groups.get(lesson.chapter);
    if (group) {
      group.push(lesson);
    } else {
      order.push(lesson.chapter);
      groups.set(lesson.chapter, [lesson]);
    }
  }
  return order.map((chapter) => ({ chapter, lessons: groups.get(chapter) ?? [] }));
}
